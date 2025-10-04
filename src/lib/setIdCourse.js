// Dữ liệu Course đầy đủ của bạn
const ALL_COURSES_DATA = [
  { id: 1, provider: "riki", level: "N5", code: "RIKI-N5" },
  { id: 2, provider: "riki", level: "N4", code: "RIKI-N4" },
  { id: 3, provider: "riki", level: "N3", code: "RIKI-N3" },
  { id: 4, provider: "riki", level: "N2", code: "RIKI-N2" },
  { id: 5, provider: "riki", level: "N1", code: "RIKI-N1" },
  { id: 6, provider: "dungmori", level: "N5", code: "DM-N5" },
  { id: 7, provider: "dungmori", level: "N4", code: "DM-N4" },
  { id: 8, provider: "dungmori", level: "N3", code: "DM-N3" },
  { id: 9, provider: "dungmori", level: "N2", code: "DM-N2" },
  { id: 10, provider: "dungmori", level: "N1", code: "DM-N1" },
];

/**
 * Tìm ID khóa học dựa trên Slug (Provider) và CourseN (Level).
 * @param {string} slug Tên nhà cung cấp (riki, dungmori...).
 * @param {string} courseN Cấp độ JLPT (N1, n1, N5, n5...).
 * @returns {number | null} ID của khóa học tìm được, hoặc null nếu không tìm thấy.
 */
export const setIdCourse = (slug, courseN) => {
  if (!slug || !courseN) {
    return null;
  }

  // Chuẩn hóa input: slug về chữ thường, level về chữ hoa để so sánh chính xác.
  const normalizedSlug = slug.toLowerCase();
  const normalizedCourseN = courseN.toUpperCase();

  const foundCourse = ALL_COURSES_DATA.find((course) => {
    return (
      course.provider.toLowerCase() === normalizedSlug &&
      course.level.toUpperCase() === normalizedCourseN
    );
  });

  // Trả về ID nếu tìm thấy, ngược lại trả về null
  return foundCourse ? foundCourse.id : null;
};
