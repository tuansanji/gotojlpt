"use client";

import React, { useState, useMemo, useEffect } from "react";
// Giả định lucide-react đã được cài đặt và hoạt động
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
  MonitorPlay,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // <-- Import Framer Motion
import useCourseStore from "@/store/courseStore";

// ----------------------------------------------------------------------
// 🚨 ĐIỀU CHỈNH CỐT LÕI Ở ĐÂY: DÙNG ID CỦA ASSET BẠN MUỐN MỞ MẶC ĐỊNH
// ----------------------------------------------------------------------
const TARGET_ASSET_ID = 22;
const isItemActive = (itemId) => itemId === TARGET_ASSET_ID;
// ----------------------------------------------------------------------

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

// --- LOGIC CHUYỂN ĐỔI DỮ LIỆU (Giữ nguyên cấu trúc Active) ---

const mapAssetsToItems = (assets) => {
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

const mapLessonsToModules = (lessons) => {
  return lessons.map((lesson) => {
    const items = mapAssetsToItems(lesson.assets || []);
    const isActive = items.some((item) => item.isActive);
    return {
      id: lesson.id,
      title: lesson.title,
      items: items,
      isActive: isActive,
    };
  });
};

const mapSectionsToTopics = (sections) => {
  return sections.map((section) => {
    const modules = mapLessonsToModules(section.lessons || []);
    const isActive = modules.some((module) => module.isActive);
    return {
      id: section.id,
      title: section.title,
      modules: modules,
      isActive: isActive,
    };
  });
};

const mapStagesToTabs = (stages) => {
  return stages.map((stage) => {
    const topics = mapSectionsToTopics(stage.sections || []);
    return {
      id: stage.id,
      name: stage.name,
      slug: stage.slug,
      topics: topics,
      isActive: topics.some((t) => t.isActive),
    };
  });
};

// --- CÁC HÀM COMPONENT ---

// Component cấp độ 4: Asset/Item
const AssetItem = ({ item }) => {
  const setAssetCurrent = useCourseStore((state) => state.setAssetCurrent);
  return (
    <div
      onClick={() => {
        const { icon, ...assetDataToStore } = item;
        setAssetCurrent(assetDataToStore);
      }}
      className={`flex items-center gap-2 py-2 text-sm transition-colors cursor-pointer w-full
             ${
               item.isActive
                 ? "bg-[#E5F6F6] font-medium border-l-[3px] border-[#00839D]"
                 : "hover:bg-gray-100 border-l-[3px] border-transparent"
             }`}
      style={{ paddingLeft: "3rem" }}
    >
      {/* BỌC ICON TRONG MỘT DIV ĐỂ ÁP DỤNG STYLE HÌNH TRÒN VIỀN */}
      <div
        className={`rounded-full p-1 border-2 bg-white flex-shrink-0 flex items-center justify-center ${
          // Icon Active sẽ có màu xanh, Inactive có màu hồng/đỏ
          item.isActive
            ? "text-[#00839D] border-[#00839D]"
            : "text-red-400 border-red-400"
        }`}
      >
        {/* Hiển thị icon Lock nếu bị khóa, nếu không hiển thị icon nội dung */}
        {item.isLocked ? (
          <Lock size={12} className="text-gray-400" />
        ) : (
          // Sử dụng cloneElement để đảm bảo icon nhận được prop size=16
          React.cloneElement(item.icon, { size: 12 })
        )}
      </div>

      <span
        className={`truncate ${
          item.isActive ? "text-[#00839D]" : "text-gray-700"
        }`}
      >
        {item.title}
      </span>
    </div>
  );
};

// Component cấp độ 3: Module
const ModuleItem = ({ module, openModuleId, setOpenModuleId }) => {
  const isOpen = module.id === openModuleId;
  const isActive = module.isActive;

  const toggleOpen = () => {
    setOpenModuleId(isOpen ? null : module.id);
  };

  return (
    <div className="border-b border-gray-100 ">
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

      {/* KHU VỰC THÊM ANIMATION CẤP 3: Module -> Asset */}
      {/* KHÔNG CẦN DÙNG AnimatePresence Ở ĐÂY VÌ NỘI DUNG KHÔNG BỊ XÓA KHỎI DOM */}
      <motion.div
        variants={collapseVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="overflow-hidden"
      >
        <ul className="bg-white">
          {module.items.map((item) => (
            <li key={item.id}>
              <AssetItem item={item} />
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

// Component cấp độ 2: Topic (ACCORDION)
const TopicItem = ({ topic, openTopicId, setOpenTopicId }) => {
  const isTopicOpen = topic.id === openTopicId;

  // Logic active/state giữ nguyên
  const initiallyOpenModuleId = useMemo(() => {
    if (topic.isActive) {
      return topic.modules.find((m) => m.isActive)?.id || null;
    }
    return null;
  }, [topic.modules, topic.isActive]);

  const [openModuleId, setOpenModuleId] = useState(initiallyOpenModuleId);

  const toggleTopicOpen = () => {
    setOpenTopicId(isTopicOpen ? null : topic.id);
  };

  useEffect(() => {
    if (topic.isActive) {
      setOpenTopicId(topic.id);
      setOpenModuleId(initiallyOpenModuleId);
    } else if (!isTopicOpen) {
      setOpenModuleId(null);
    }
  }, [
    isTopicOpen,
    initiallyOpenModuleId,
    topic.isActive,
    topic.id,
    setOpenTopicId,
  ]);

  const shouldBeOpen = isTopicOpen || topic.isActive;
  const isActiveTopic = topic.isActive;

  return (
    <motion.div
      layout // Quan trọng để các TopicItem khác di chuyển mượt mà
      className={`

            bg-white 
            rounded-lg 
            shadow-sm 
            border 
            border-gray-200 
            overflow-hidden 
        `}
    >
      {/* Thanh tiêu đề chính (Cấp 2) */}
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

      {/* KHU VỰC THÊM ANIMATION CẤP 2: Topic -> Module */}
      {/* SỬ DỤNG motion.div và variants */}
      <motion.div
        variants={collapseVariants}
        initial="closed"
        animate={shouldBeOpen ? "open" : "closed"}
        className="overflow-hidden border-t border-gray-200"
      >
        <div className="bg-white">
          {topic.modules.map((module) => (
            <ModuleItem
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
export default function CourseSidebar({ rawData }) {
  const stages = rawData?.stages || [];
  const courseTabs = useMemo(() => mapStagesToTabs(stages), [stages]);

  const defaultTab = courseTabs.find((tab) => tab.isActive)?.slug || "n1-junbi";
  const [activeTabSlug, setActiveTabSlug] = useState(defaultTab);

  const activeTabData = courseTabs.find((tab) => tab.slug === activeTabSlug);

  const initiallyOpenTopicId = useMemo(() => {
    return activeTabData?.topics.find((t) => t.isActive)?.id || null;
  }, [activeTabData]);

  const [openTopicId, setOpenTopicId] = useState(initiallyOpenTopicId);

  useEffect(() => {
    setOpenTopicId(initiallyOpenTopicId);
  }, [activeTabSlug, initiallyOpenTopicId]);

  return (
    <div className="w-full min-w-72 flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden h-[80vh] flex flex-col font-sans">
      <div className="flex flex-col h-full">
        {/* Thanh Tabs trên cùng (Cấp 1) */}
        <div className="flex justify-around flex-shrink-0 p-2 bg-white border-b border-gray-200">
          {courseTabs.map((tab) => (
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
