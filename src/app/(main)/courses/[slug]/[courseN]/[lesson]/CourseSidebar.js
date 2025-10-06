"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Video,
  FileText,
  Lock,
  Volume2,
  BookOpen,
  ClipboardList,
  CheckCircle,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useCourseStore from "@/store/courseStore";

// Tên key dùng để lưu ID bài học đã xem cuối cùng trong Local Storage
const LAST_VIEWED_KEY = "last_viewed_asset_id";

// Variants cho animation đóng/mở Accordion
const collapseVariants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.3 },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ----------------------------------------------------------------------
// --- HÀM TÌM KIẾM VÀ ÁNH XẠ DỮ LIỆU ---
// ----------------------------------------------------------------------

// Hàm tìm ID của Asset đầu tiên trong cấu trúc dữ liệu
const findFirstAssetId = (stages) => {
  if (!stages || stages.length === 0) return null;

  const firstAsset = stages[0].sections?.[0]?.lessons?.[0]?.assets?.[0];
  return firstAsset?.id || null;
};

// Hàm ánh xạ Assets (Cấp 4)
const mapAssetsToItems = (assets, isItemActive) => {
  return assets.map((asset) => {
    let icon;
    if (asset.url_video) {
      icon = <Video size={16} />;
    } else if (asset.url_pdf) {
      icon = <FileText size={16} />;
    } else if (asset.url_sound) {
      icon = <Volume2 size={16} />;
    } else if (asset.url_test) {
      icon = <CheckCircle size={16} />;
    } else {
      icon = <BookOpen size={16} />;
    }

    return {
      ...asset,
      id: asset.id,
      title: asset.title,
      link:
        asset.url_video ||
        asset.url_pdf ||
        asset.url_sound ||
        asset.url_test ||
        "#",
      icon: icon,
      isLocked: asset.is_lock,
      isActive: isItemActive(asset.id),
    };
  });
};

// Hàm ánh xạ Lessons (Cấp 3)
const mapLessonsToModules = (lessons, isItemActive) => {
  return lessons.map((lesson) => {
    const items = mapAssetsToItems(lesson.assets || [], isItemActive);
    const isActive = items.some((item) => item.isActive);

    return {
      id: lesson.id,
      title: lesson.title,
      items: items,
      isActive: isActive,
    };
  });
};

// Hàm ánh xạ Sections (Cấp 2)
const mapSectionsToTopics = (sections, isItemActive) => {
  return sections.map((section) => {
    const modules = mapLessonsToModules(section.lessons || [], isItemActive);
    const isActive = modules.some((module) => module.isActive);

    return {
      id: section.id,
      title: section.title,
      modules: modules,
      isActive: isActive,
    };
  });
};

// Hàm ánh xạ Stages (Cấp 1 - Tabs)
const mapStagesToTabs = (stages, activeIdSource) => {
  // 1. XÁC ĐỊNH ID BÀI HỌC CẦN ACTIVE
  const isInitialVisit = activeIdSource === null;
  let activeAssetId;

  if (isInitialVisit) {
    // Nếu là lần đầu, ta không muốn bất kỳ bài nào ACTIVE (màu xanh),
    // ta chỉ cần ID của bài đầu tiên để có thể chạy các logic map khác
    activeAssetId = findFirstAssetId(stages);
  } else {
    // Nếu có bài học cũ (hoặc người dùng click), dùng ID đó
    activeAssetId = activeIdSource;
  }

  // 2. ĐỊNH NGHĨA HÀM IS ACTIVE
  const isItemActive = (itemId) => {
    // Nếu là lần đầu (không có bài học cũ), KHÔNG CÓ BÀI NÀO active.
    if (isInitialVisit) return false;

    // Ngược lại, chỉ bài có ID khớp mới active.
    return itemId === activeAssetId;
  };

  // 3. Thực hiện ánh xạ
  return stages.map((stage) => {
    const topics = mapSectionsToTopics(stage.sections || [], isItemActive);
    const isActive = topics.some((t) => t.isActive);

    return {
      id: stage.id,
      name: stage.name,
      slug: stage.slug,
      topics: topics,
      isActive: isActive,
    };
  });
};

// ----------------------------------------------------------------------
// --- CÁC HÀM COMPONENT ---
// ----------------------------------------------------------------------

// Component cấp độ 4: Asset/Item
const AssetItem = ({ item, setIsSidebarOpen, isSidebarOpen }) => {
  const setAssetCurrent = useCourseStore((state) => state.setAssetCurrent);

  // 🌟 Đảm bảo item.is_lock được sử dụng thay vì item.isLocked nếu tên thuộc tính là 'is_lock'
  const isLocked = item.is_lock;

  const handleClick = () => {
    // 🌟 1. CHẶN SỰ KIỆN NẾU ASSET BỊ KHÓA
    if (isLocked) {
      return; // Dừng hàm nếu tài sản bị khóa
    }

    const { icon, ...assetDataToStore } = item;

    // CẬP NHẬT STATE GLOBAL VÀ LOCAL STORAGE
    setAssetCurrent(assetDataToStore);
    isSidebarOpen && setIsSidebarOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_VIEWED_KEY, item.id.toString());
    }
  };

  return (
    <div
      onClick={handleClick}
      // 🌟 2. THAY ĐỔI CSS DỰA TRÊN isLocked
      className={`flex items-center gap-2 py-2 text-sm transition-colors w-full
        ${
          // Thêm class cho trạng thái BỊ KHÓA: mờ và con trỏ không được phép
          isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer" // Con trỏ bình thường khi không khóa
        }
        ${
          item.isActive
            ? "bg-[#E5F6F6] font-medium border-l-[3px] border-[#00839D]"
            : "hover:bg-gray-100 border-l-[3px] border-transparent"
        }`}
      style={{ paddingLeft: "3rem" }}
    >
      <div
        className={`rounded-full p-1 border-2 flex-shrink-0 flex items-center justify-center ${
          // 3. ĐIỀU CHỈNH MÀU SẮC BIỂU TƯỢNG VÀ VIỀN
          isLocked
            ? "bg-gray-100 text-gray-500 border-gray-400" // Màu sắc khi bị khóa
            : item.isActive
            ? "bg-white text-[#00839D] border-[#00839D]"
            : "bg-white text-red-400 border-red-400"
        }`}
      >
        {item.is_lock ? (
          <Lock size={12} className="text-gray-500" /> // Biểu tượng khóa (dùng item.is_lock)
        ) : (
          React.cloneElement(item.icon, { size: 12 })
        )}
      </div>

      <span
        className={`truncate ${
          isLocked
            ? "text-gray-500" // Màu chữ khi bị khóa
            : item.isActive
            ? "text-[#00839D]"
            : "text-gray-700"
        }`}
      >
        {item.title}
      </span>
    </div>
  );
};

// Component cấp độ 3: Module
const ModuleItem = ({
  module,
  openModuleId,
  setOpenModuleId,
  setIsSidebarOpen,
  isSidebarOpen,
}) => {
  const isOpen = module.id === openModuleId;
  const isActive = module.isActive;

  const toggleOpen = () => {
    setOpenModuleId(isOpen ? null : module.id);
  };

  // 🔑 Kiểm tra xem module có asset bị khóa không (ngoại trừ bài đầu tiên free)
  const lockedItems = module.items?.filter(
    (item, index) => index > 0 && item.is_lock
  );

  return (
    <div className="border-b border-gray-100 relative">
      {/* Header module */}
      <button
        className={`w-full flex justify-between items-center py-3 text-sm font-semibold transition-colors 
                         ${
                           isActive
                             ? "border-l-4 border-[#00839D] text-[#00839D]"
                             : "border-l-4 border-transparent text-gray-700"
                         }
                         ${!isActive && "hover:bg-gray-100"}`}
        onClick={toggleOpen}
        style={{ paddingLeft: "1.5rem" }}
      >
        <span className="truncate">{module.title}</span>

        {module.items &&
          module.items.length > 0 &&
          (isOpen ? (
            <ChevronUp size={16} className="text-gray-500 mr-3" />
          ) : (
            <ChevronDown size={16} className="text-gray-500 mr-3" />
          ))}
      </button>

      {/* Danh sách asset */}
      <motion.div
        variants={collapseVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="overflow-hidden relative"
      >
        <ul className="bg-white relative">
          {module.items.map((item, idx) => (
            <li key={item.id}>
              <AssetItem
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                item={item}
              />
            </li>
          ))}
        </ul>

        {/* Nếu có asset bị khóa (ngoài bài free đầu tiên) thì show overlay */}
        {lockedItems?.length > 0 && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Đi tới trang thanh toán!");
              }}
              className="mt-3 px-4 py-2 bg-[#00839D] text-white rounded-lg font-medium shadow-md hover:bg-[#006d82] transition pointer-events-auto"
            >
              Mua khóa học
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Component cấp độ 2: Topic (ACCORDION)
const TopicItem = ({
  topic,
  openTopicId,
  setOpenTopicId,
  setIsSidebarOpen,
  isSidebarOpen,
}) => {
  const isTopicOpen = topic.id === openTopicId;

  // Lấy ID Module Active (Chỉ cần nếu Topic này là Topic Active)
  const initiallyOpenModuleId = useMemo(() => {
    if (topic.isActive) {
      return topic.modules.find((m) => m.isActive)?.id || null;
    }
    return null;
  }, [topic.modules, topic.isActive]);

  // Luôn đặt Module con ban đầu là đóng (null)
  const [openModuleId, setOpenModuleId] = useState(null);

  const toggleTopicOpen = () => {
    setOpenTopicId(isTopicOpen ? null : topic.id);
  };

  // LOGIC ĐIỀU KHIỂN MODULE CON (CẤP 3)
  useEffect(() => {
    if (topic.isActive && isTopicOpen) {
      // Logic Active: Nếu Topic chứa bài học cũ VÀ đang mở, mở Module con
      if (initiallyOpenModuleId) {
        setOpenModuleId(initiallyOpenModuleId);
      }
    } else if (!isTopicOpen) {
      // Đóng Topic: Đóng Module con
      setOpenModuleId(null);
    }
    // KHÔNG CÓ LOGIC NÀO TỰ ĐỘNG MỞ MODULE KHI topic.isActive = false và isTopicOpen = true
    // -> Đảm bảo Module con luôn đóng khi truy cập lần đầu.
  }, [topic.isActive, isTopicOpen, initiallyOpenModuleId]);

  const shouldBeOpen = isTopicOpen; // TopicItem chỉ mở khi openTopicId khớp
  const isActiveTopic = topic.isActive;

  return (
    <motion.div
      layout
      className={`
                 bg-white 
                 rounded-lg 
                 shadow-sm 
                 border 
                 border-gray-200 
                 overflow-hidden 
             `}
    >
      <button
        className={`w-full flex justify-between items-center p-3 pl-4 text-sm font-bold transition-colors 
                         ${
                           isActiveTopic
                             ? "bg-[#E5F6F6] text-[#00839D] border-l-4 border-[#00839D] rounded-lg"
                             : "hover:bg-gray-50 text-gray-800"
                         }`}
        onClick={toggleTopicOpen}
      >
        <span className="truncate">{topic.title}</span>

        <div className="flex items-center gap-1 mr-1">
          {topic.modules &&
            topic.modules.length > 0 &&
            (shouldBeOpen ? (
              <ChevronDown size={16} className="text-[#00839D]" />
            ) : (
              <ChevronRight size={16} className="text-gray-500" />
            ))}
        </div>
      </button>

      <motion.div
        variants={collapseVariants}
        initial="closed"
        animate={shouldBeOpen ? "open" : "closed"}
        className="overflow-hidden border-t border-gray-200"
      >
        <div className="bg-white">
          {topic.modules.map((module) => (
            <ModuleItem
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
              key={module.id}
              module={module}
              openModuleId={openModuleId}
              setOpenModuleId={setOpenModuleId}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Component Sidebar chính (Cấp 1)
export default function CourseSidebar({
  rawData,
  setIsSidebarOpen,
  isSidebarOpen,
}) {
  const stages = rawData?.stages || [];
  const assetCurrent = useCourseStore((state) => state.assetCurrent);

  // 1. XÁC ĐỊNH ID BÀI HỌC CUỐI CÙNG VÀ TRẠNG THÁI TRUY CẬP
  const lastViewedId = useMemo(() => {
    if (typeof window === "undefined") return 0;
    return parseInt(localStorage.getItem(LAST_VIEWED_KEY) || "0", 10);
  }, [assetCurrent?.id]);

  const activeIdSource = lastViewedId > 0 ? lastViewedId : null;

  // Tính toán lại Tabs khi có thay đổi
  const finalCourseTabs = useMemo(() => {
    // Truyền activeIdSource: null nếu là lần đầu, hoặc ID nếu có bài cũ
    return mapStagesToTabs(stages, activeIdSource);
  }, [stages, activeIdSource]);

  // 2. TÌM TAB MỞ MẶC ĐỊNH
  // Tab mặc định là Tab chứa bài học Active (nếu có), nếu không là Tab đầu tiên
  const defaultTab =
    finalCourseTabs.find((tab) => tab.isActive)?.slug ||
    finalCourseTabs[0]?.slug ||
    "n1-junbi";
  const [activeTabSlug, setActiveTabSlug] = useState(defaultTab);

  const activeTabData = finalCourseTabs.find(
    (tab) => tab.slug === activeTabSlug
  );

  // 3. TÌM TOPIC MỞ MẶC ĐỊNH (CẤP 2)
  const initiallyOpenTopicId = useMemo(() => {
    // A. Nếu CÓ bài học cũ (activeIdSource != null), mở Topic chứa bài đó
    if (activeIdSource) {
      return activeTabData?.topics.find((t) => t.isActive)?.id || null;
    }
    // B. Nếu KHÔNG CÓ bài học cũ, mở Topic đầu tiên của Tab hiện tại (YÊU CẦU CỦA BẠN)
    return activeTabData?.topics[0]?.id || null;
  }, [activeTabData, activeIdSource]);

  const [openTopicId, setOpenTopicId] = useState(initiallyOpenTopicId);

  // Kích hoạt lại Topic mặc định khi Tab thay đổi (và lần đầu render)
  useEffect(() => {
    setOpenTopicId(initiallyOpenTopicId);
  }, [activeTabSlug, initiallyOpenTopicId]);

  // Kích hoạt lại Active Tab khi dữ liệu thay đổi
  useEffect(() => {
    setActiveTabSlug(defaultTab);
  }, [defaultTab]);

  return (
    <div className="w-full min-w-72 h-[88%] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden md:h-[80vh] flex flex-col font-sans">
      <div className="flex flex-col h-full">
        {/* Thanh Tabs trên cùng (Cấp 1) */}
        <div className="flex justify-around flex-shrink-0 p-2 bg-white border-b border-gray-200">
          {finalCourseTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabSlug(tab.slug)}
              className={`flex flex-col items-center py-1 px-2 text-xs font-medium transition-colors 
                                 ${
                                   activeTabSlug === tab.slug
                                     ? "text-[#00839D] border-b-2 border-[#00839D]"
                                     : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                                 }`}
            >
              {tab.slug === "n1-luyen_de" || tab.slug === "n1-bo_tro" ? (
                <ClipboardList size={20} className="mb-1" />
              ) : (
                <Video size={20} className="mb-1" />
              )}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Nội dung Menu cuộn (Chứa Menu Cấp 2, 3, 4) */}

        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          <AnimatePresence initial={false}>
            {activeTabData?.topics.map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                openTopicId={openTopicId}
                setOpenTopicId={setOpenTopicId}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
            {/* Mục Test đầu vào N1 (thêm layout motion để di chuyển mượt) */}
            <motion.div
              layout
              className={`bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors`}
            >
              <span className="flex items-center p-3 text-sm font-bold text-[#00839D]">
                <BookOpen size={16} className="mr-2" />
                Tài liệu
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
