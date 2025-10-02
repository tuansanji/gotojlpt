"use client";

import React, { useState, useMemo, useEffect } from "react";
// Import các icon
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
  Plus, // Icon Thêm
  Edit, // Icon Sửa
  Trash2, // Icon Xóa
} from "lucide-react";

// ----------------------------------------------------------------------
// CẤU HÌNH MỤC TIÊU (GIỮ NGUYÊN)
// ----------------------------------------------------------------------
const TARGET_ASSET_ID = 1;
const isItemActive = (itemId) => itemId === TARGET_ASSET_ID;
// ----------------------------------------------------------------------

// DỮ LIỆU GỐC ĐÃ CẬP NHẬT VỚI CẤU TRÚC CHI TIẾT (GIỮ NGUYÊN)
const RAW_DATA = {
  courses: {
    id: 5,
    provider: "riki",
    level: "N1",
    code: "RIKI-N1",
    title: "RikiOnline JLPT N1",
    short_desc: "Phân tích bẫy đề, luyện đề chuyên sâu đạt điểm cao.",
    url: "https://example.com/riki/n1",
    price: "2600000.00",
    currency: "VND",
    delivery_mode: "hybrid",
    is_active: true,
    sort_order: 4,
    stages: [
      {
        id: 1,
        course_id: 5,
        name: "N1 JUNBI",
        slug: "n1-junbi",
        url_intro: "https://www.youtube.com/embed/hdUSe5etFKM",
        sort_order: 1,
        sections: [
          {
            id: 1,
            stage_id: 1,
            slug: "n1-junbi-kanji",
            title: "Kanji",
            summary: "học kanji",
            content_md: null,
            resources_json: null,
            sort_order: 1,
            is_active: true,
            lessons: [
              {
                id: 1,
                section_id: 1,
                slug: "huong-dan-hoc-kanji-n1",
                title: "Hướng dẫn học Kanji N1",
                objective: null,
                content_md: null,
                sort_order: 1,
                is_active: true,
                assets: [
                  {
                    id: 1,
                    lesson_id: 1,
                    url_video:
                      "N1/N1_junbi/Kanji/1.%20Video%20h%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20h%E1%BB%8Dc/Video%20h%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20h%E1%BB%8Dc.mp4",
                    url_sound: "",
                    url_pdf: "",
                    url_image: "",
                    title: "Hướng dẫn học Kanji N1",
                    thumbnail_url: null,
                    sort_order: 1,
                    is_lock: false,
                    is_active: true,
                    file_path: null,
                    file_name: null,
                    mime_type: null,
                    file_size: null,
                    duration: null,
                    is_protected: true,
                    last_accessed_at: "2025-09-27T14:00:07.000000Z",
                    access_count: 116,
                    video_qualities: null,
                    default_quality: "720p",
                    available_qualities: null,
                  },
                ],
              },
              {
                id: 8,
                section_id: 1,
                slug: "on-tap-n2",
                title: "Ôn tập N2",
                objective: null,
                content_md: null,
                sort_order: 2,
                is_active: true,
                assets: [
                  {
                    id: 2,
                    lesson_id: 8,
                    url_video:
                      "N1/N1_junbi/Kanji/2.Ôn tập N2/Ôn tập N2- Phần 1.mp4",
                    url_sound: "",
                    url_pdf: "",
                    url_image: "",
                    title: "Ôn tập N2 - Phần 1",
                    thumbnail_url: null,
                    sort_order: 1,
                    is_lock: false,
                    is_active: true,
                    file_path: null,
                    file_name: null,
                    mime_type: null,
                    file_size: null,
                    duration: null,
                    is_protected: true,
                    last_accessed_at: "2025-09-27T10:24:58.000000Z",
                    access_count: 21,
                    video_qualities: null,
                    default_quality: "720p",
                    available_qualities: null,
                  },
                  {
                    id: 3,
                    lesson_id: 8,
                    url_video:
                      "N1/N1_junbi/Kanji/2.Ôn tập N2/Ôn tập N2- Phần 2.mp4",
                    url_sound: "",
                    url_pdf: "",
                    url_image: "",
                    title: "Ôn tập N2 - Phần 2",
                    thumbnail_url: null,
                    sort_order: 2,
                    is_lock: false,
                    is_active: true,
                    file_path: null,
                    file_name: null,
                    mime_type: null,
                    file_size: null,
                    duration: null,
                    is_protected: true,
                    last_accessed_at: "2025-09-27T13:27:47.000000Z",
                    access_count: 9,
                    video_qualities: null,
                    default_quality: "720p",
                    available_qualities: null,
                  },
                  {
                    id: 4,
                    lesson_id: 8,
                    url_video:
                      "N1/N1_junbi/Kanji/2.Ôn tập N2/Ôn tập N2- Phần 3.mp4",
                    url_sound: "",
                    url_pdf: "",
                    url_image: "",
                    title: "Ôn tập N2 - Phần 3",
                    thumbnail_url: null,
                    sort_order: 3,
                    is_lock: false,
                    is_active: true,
                    file_path: null,
                    file_name: null,
                    mime_type: null,
                    file_size: null,
                    duration: null,
                    is_protected: true,
                    last_accessed_at: "2025-09-27T08:51:21.000000Z",
                    access_count: 2,
                    video_qualities: null,
                    default_quality: "720p",
                    available_qualities: null,
                  },
                ],
              },
              {
                id: 9,
                section_id: 1,
                slug: "bai-1",
                title: "Bài 1",
                objective: null,
                content_md: null,
                sort_order: 3,
                is_active: true,
                assets: [
                  {
                    id: 5,
                    lesson_id: 9,
                    url_video:
                      "N1/N1_junbi/Kanji/Bài (1)/Phần_1_挑_跳_眺_桃.mp4",
                    url_sound: "",
                    url_pdf: "",
                    url_image: "",
                    title: "挑_跳_眺_桃",
                    thumbnail_url: null,
                    sort_order: 1,
                    is_lock: false,
                    is_active: true,
                    file_path: null,
                    file_name: null,
                    mime_type: null,
                    file_size: null,
                    duration: null,
                    is_protected: true,
                    last_accessed_at: "2025-09-27T10:21:16.000000Z",
                    access_count: 4,
                    video_qualities: null,
                    default_quality: "720p",
                    available_qualities: null,
                  },
                  {
                    id: 6,
                    lesson_id: 9,
                    url_video:
                      "N1/N1_junbi/Kanji/Bài (1)/Phần_2_譲_嬢_謙_帝_諦_締.mp4",
                    url_sound: "",
                    url_pdf: "",
                    url_image: "",
                    title: "譲_嬢_謙_帝_諦_締",
                    thumbnail_url: null,
                    sort_order: 2,
                    is_lock: false,
                    is_active: true,
                    file_path: null,
                    file_name: null,
                    mime_type: null,
                    file_size: null,
                    duration: null,
                    is_protected: true,
                    last_accessed_at: "2025-09-27T10:22:19.000000Z",
                    access_count: 2,
                    video_qualities: null,
                    default_quality: "720p",
                    available_qualities: null,
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            stage_id: 1,
            slug: "n1-junbi-tuvung",
            title: "Từ vựng",
            summary: "học Từ vựng",
            content_md: null,
            resources_json: null,
            sort_order: 2,
            is_active: true,
            lessons: [
              {
                id: 2,
                section_id: 2,
                slug: "Danh tu - Bai 1",
                title:
                  "試験によく出る Danh từ - Bài 1 (1 - 60)\r\n                              ",
                objective: null,
                content_md: null,
                sort_order: 1,
                is_active: true,
                assets: [],
              },
              {
                id: 3,
                section_id: 2,
                slug: "Danh tu - Bai 2",
                title: "試験によく出る Danh từ - Bài 2 (61 - 120)",
                objective: null,
                content_md: null,
                sort_order: 2,
                is_active: true,
                assets: [],
              },
            ],
          },
          {
            id: 3,
            stage_id: 1,
            slug: "n1-junbi-nguphap",
            title: "Ngữ pháp",
            summary: "học Ngữ pháp",
            content_md: null,
            resources_json: null,
            sort_order: 3,
            is_active: true,
            lessons: [
              {
                id: 4,
                section_id: 3,
                slug: "Video giới thiệu ngữ pháp",
                title: "video-gioi-thieu-ngu-phap",
                objective: null,
                content_md: null,
                sort_order: 1,
                is_active: true,
                assets: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        course_id: 5,
        name: "N1 TAISAKU",
        slug: "n1-taisaku",
        url_intro: "https://www.youtube.com/embed/hdUSe5etFKM",
        sort_order: 1,
        sections: [
          {
            id: 4,
            stage_id: 2,
            slug: "n1-taishaku-dochieu",
            title: "Đọc hiểu",
            summary: "học Đọc hiểu",
            content_md: null,
            resources_json: null,
            sort_order: 1,
            is_active: true,
            lessons: [
              {
                id: 5,
                section_id: 4,
                slug: "chinh-phuc-短文",
                title: "Chinh phục 短文",
                objective: null,
                content_md: null,
                sort_order: 1,
                is_active: true,
                assets: [],
              },
              {
                id: 6,
                section_id: 4,
                slug: "video-gioi-thieu-djoc-hieu",
                title: "Video giới thiệu - Đọc hiểu",
                objective: null,
                content_md: null,
                sort_order: 2,
                is_active: true,
                assets: [],
              },
            ],
          },
          {
            id: 5,
            stage_id: 2,
            slug: "n1-taishaku-nghehieu",
            title: "Nghe Hiểu",
            summary: "học Nghe hiểu",
            content_md: null,
            resources_json: null,
            sort_order: 2,
            is_active: true,
            lessons: [
              {
                id: 7,
                section_id: 5,
                slug: "mondai-1-ky-nang-nghe-hieu-viec-phai-lam",
                title: "Mondai 1: Kỹ năng nghe hiểu việc phải làm",
                objective: null,
                content_md: null,
                sort_order: 1,
                is_active: true,
                assets: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        course_id: 5,
        name: "N1 LUYỆN ĐỀ",
        slug: "n1-luyen_de",
        url_intro: "https://www.youtube.com/embed/hdUSe5etFKM",
        sort_order: 1,
        sections: [
          {
            id: 6,
            stage_id: 3,
            slug: "n1-luyende-n1-12-2024",
            title: "N1 12-2024",
            summary: "N1 12-2024",
            content_md: null,
            resources_json: null,
            sort_order: 1,
            is_active: true,
            lessons: [],
          },
          {
            id: 7,
            stage_id: 3,
            slug: "n1-luyende-n1-07-2024",
            title: "N1 07-2024",
            summary: "N1 07-2024",
            content_md: null,
            resources_json: null,
            sort_order: 2,
            is_active: true,
            lessons: [],
          },
        ],
      },
    ],
  },
  lesson: { lessonCurrent: 0 },
};

// --- LOGIC CHUYỂN ĐỔI DỮ LIỆU (GIỮ NGUYÊN) ---

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
      ...asset,
      icon: icon,
      isLocked: asset.is_lock,
      isActive: isItemActive(asset.id),
      level: "Asset",
    };
  });
};

const mapLessonsToModules = (lessons) => {
  return lessons.map((lesson) => {
    const items = mapAssetsToItems(lesson.assets || []);
    const isActive = items.some((item) => item.isActive);
    return {
      ...lesson,
      title: lesson.title.trim(),
      items: items,
      isActive: isActive,
      level: "Module",
    };
  });
};

const mapSectionsToTopics = (sections) => {
  return sections.map((section) => {
    const modules = mapLessonsToModules(section.lessons || []);
    const isActive = modules.some((module) => module.isActive);
    return {
      ...section,
      modules: modules,
      isActive: isActive,
      level: "Topic",
    };
  });
};

const mapStagesToTabs = (stages) => {
  return stages.map((stage) => {
    const topics = mapSectionsToTopics(stage.sections || []);
    return {
      ...stage,
      name: stage.name,
      slug: stage.slug,
      topics: topics,
      isActive: topics.some((t) => t.isActive),
      level: "Stage",
    };
  });
};

// ----------------------------------------------------------------------
// COMPONENT: ADMIN BUTTONS (ĐÃ CẬP NHẬT HÀM XÓA)
// ----------------------------------------------------------------------
const AdminButtons = ({ dataObject }) => {
  const { id, level, title } = dataObject;

  // 1. CHỨC NĂNG THÊM MỚI (GIỮ NGUYÊN)
  const handleAdd = (e) => {
    e.stopPropagation();
    let targetLevel =
      level === "Stage" ? "Topic" : level === "Topic" ? "Module" : "Asset";
    let action = level === "Asset" ? "THÊM NGANG CẤP" : `THÊM ${targetLevel}`;

    console.groupCollapsed(`✅ ${action} vào ${level} "${title}" (ID: ${id})`);
    console.log("HÀNH ĐỘNG:", action);
    console.log("DỮ LIỆU GỐC (Cấp menu hiện tại):", dataObject);
    console.groupEnd();
  };

  // 2. CHỨC NĂNG SỬA (GIỮ NGUYÊN)
  const handleEdit = (e) => {
    e.stopPropagation();
    console.groupCollapsed(`✏️ SỬA ${level} "${title}" (ID: ${id})`);
    console.log("HÀNH ĐỘNG:", "SỬA");
    console.log("DỮ LIỆU GỐC:", dataObject);
    console.groupEnd();
  };

  // 3. CHỨC NĂNG XÓA (ĐÃ CẬP NHẬT)
  const handleDelete = (e) => {
    e.stopPropagation();
    // Sử dụng confirm() để hỏi người dùng trước khi "xóa"
    if (
      confirm(
        `Bạn có chắc chắn muốn XÓA ${level} "${title}" (ID: ${id})? Hành động này không thể hoàn tác.`
      )
    ) {
      // Log ra console.warn để dễ dàng nhận thấy hành động quan trọng này
      console.groupCollapsed(
        `🗑️ ĐÃ XÁC NHẬN XÓA ${level} "${title}" (ID: ${id})`
      );
      console.warn("HÀNH ĐỘNG:", "ĐÃ XÓA (Thao tác Admin)");
      console.warn("Cấp độ (Level):", level);
      console.warn("DỮ LIỆU GỐC ĐÃ XÓA:", dataObject);
      console.groupEnd();
    } else {
      // Log ra console nếu người dùng hủy bỏ
      console.log(`❌ Hủy bỏ hành động XÓA ${level} "${title}" (ID: ${id})`);
    }
  };

  const getAddIcon = () => {
    let titleText;
    if (level === "Stage") titleText = "Thêm Topic";
    else if (level === "Topic") titleText = "Thêm Module";
    else if (level === "Module") titleText = "Thêm Asset";
    else if (level === "Asset") titleText = "Thêm Asset ngang cấp";

    return (
      <button
        onClick={handleAdd}
        className="p-1 text-green-600 rounded hover:bg-green-100 focus:outline-none"
        title={titleText}
      >
        <Plus size={14} />
      </button>
    );
  };

  return (
    <div className="flex items-center flex-shrink-0 space-x-1">
      {getAddIcon()}
      <button
        onClick={handleEdit}
        className="p-1 text-blue-600 rounded hover:bg-blue-100 focus:outline-none"
        title={`Sửa ${title}`}
      >
        <Edit size={14} />
      </button>
      <button
        onClick={handleDelete}
        className="p-1 text-red-600 rounded hover:bg-red-100 focus:outline-none"
        title={`Xóa ${title}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};
// ----------------------------------------------------------------------

// --- CÁC HÀM COMPONENT KHÁC (GIỮ NGUYÊN) ---

// Component cấp độ 4: Asset/Item
const AssetItem = ({ item }) => (
  <div
    className={`flex justify-between items-center gap-2 py-2 text-sm transition-colors cursor-pointer w-full
             ${
               item.isActive
                 ? "bg-[#E5F6F6] text-[#00839D] font-medium border-l-4 border-[#00839D]"
                 : "hover:bg-gray-100 text-gray-700"
             }`}
    style={{ paddingLeft: "4rem", paddingRight: "0.5rem" }}
  >
    <a href={item.link} className="flex items-center flex-grow min-w-0 gap-2">
      {item.isLocked ? <Lock size={16} className="text-gray-400" /> : item.icon}
      <span className="truncate">{item.title}</span>
    </a>
    <AdminButtons dataObject={item} />
  </div>
);

// Component cấp độ 3: Module
const ModuleItem = ({ module, openModuleId, setOpenModuleId }) => {
  const isOpen = module.id === openModuleId;

  const toggleOpen = () => {
    setOpenModuleId(isOpen ? null : module.id);
  };

  return (
    <div className="border-b border-gray-100">
      <button
        className={`w-full flex justify-between items-center py-3 text-sm font-semibold transition-colors 
                        ${
                          module.isActive
                            ? "bg-gray-50 text-[#00839D]"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
        onClick={toggleOpen}
        style={{ paddingLeft: "2.5rem" }}
      >
        <span className="truncate">{module.title}</span>
        <div className="flex items-center gap-2 pr-2">
          <AdminButtons dataObject={module} />
          {module.items &&
            module.items.length > 0 &&
            (isOpen ? (
              <ChevronDown size={16} className="text-[#00839D]" />
            ) : (
              <ChevronRight size={16} className="text-gray-500" />
            ))}
        </div>
      </button>

      {isOpen && (
        <ul className="bg-white">
          {module.items.map((item) => (
            <li key={item.id}>
              <AssetItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Component cấp độ 2: Topic
const TopicItem = ({ topic, openTopicId, setOpenTopicId }) => {
  const isTopicOpen = topic.id === openTopicId;

  const initiallyOpenModuleId = useMemo(() => {
    if (topic.isActive) {
      return topic.modules.find((m) => m.isActive)?.id || null;
    }
    return null;
  }, [topic.modules, topic.isActive]);

  const [openModuleId, setOpenModuleId] = useState(initiallyOpenModuleId);

  useEffect(() => {
    if (isTopicOpen) {
      setOpenModuleId(initiallyOpenModuleId);
    } else {
      setOpenModuleId(null);
    }
  }, [isTopicOpen, initiallyOpenModuleId]);

  const toggleTopicOpen = () => {
    setOpenTopicId(isTopicOpen ? null : topic.id);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className={`w-full flex justify-between items-center p-3 pl-4 text-sm font-bold transition-colors 
                        ${
                          topic.isActive
                            ? "bg-[#D6F0F2] text-[#00839D]"
                            : "hover:bg-gray-200 text-gray-800"
                        }`}
        onClick={toggleTopicOpen}
      >
        <span className="truncate">{topic.title}</span>
        <div className="flex items-center gap-1">
          {topic.isActive && (
            <div className="w-2 h-2 rounded-full bg-[#00839D] mr-2 flex-shrink-0"></div>
          )}
          <div className="flex items-center gap-2">
            <AdminButtons dataObject={topic} />
            {topic.modules.length > 0 &&
              (isTopicOpen ? (
                <ChevronDown size={16} className="text-[#00839D]" />
              ) : (
                <ChevronRight size={16} className="text-gray-500" />
              ))}
          </div>
        </div>
      </button>

      {isTopicOpen && (
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
      )}
    </div>
  );
};

// Component Sidebar chính (Cấp 1)
export default function CourseSidebarAdmin() {
  const stages = RAW_DATA.courses?.stages || [];
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
    <div className="w-96 min-w-96 flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden h-[80vh] flex flex-col font-sans">
      <div className="flex flex-col h-full">
        {/* Thanh Tabs trên cùng (Cấp 1) */}
        <div className="flex justify-around flex-shrink-0 p-2 bg-white border-b border-gray-200">
          {courseTabs.map((tab) => (
            <div
              key={tab.id}
              className="relative flex flex-col items-center group/tab"
            >
              <button
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
              {/* Nút Admin ẩn hiện - Cấp 1 */}
              <div className="absolute z-10 hidden p-1 mt-1 bg-white border border-gray-300 rounded shadow-md top-full group-hover/tab:flex">
                <AdminButtons dataObject={tab} />
              </div>
            </div>
          ))}
        </div>

        {/* Nội dung Menu cuộn (Chứa Menu Cấp 2, 3, 4) */}
        <div className="flex-grow overflow-y-auto">
          {activeTabData?.topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              openTopicId={openTopicId}
              setOpenTopicId={setOpenTopicId}
            />
          ))}
          {/* Mục cố định */}
          <a
            href="#"
            className="flex items-center gap-2 p-3 pl-4 text-sm font-bold text-gray-700 transition-colors border-b border-gray-200 hover:bg-gray-100"
          >
            <BookOpen size={16} />
            Test đầu vào N1
          </a>
        </div>
      </div>
    </div>
  );
}
