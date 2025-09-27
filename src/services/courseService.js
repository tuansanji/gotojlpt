const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getCourses = async (idCourse, authToken) => {
  // 1. Kiểm tra Token
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(
      `${API_URL}courses/${idCourse}/lesson-assets`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      // Xử lý lỗi từ Server (ví dụ: 401 Unauthorized, 404 Not Found)
      const errorMsg =
        data.message || `Tải khóa học thất bại. Mã lỗi: ${response.status}`;
      if (response.status === 401 || response.status === 403) {
      } else {
        toast.error(errorMsg);
      }
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    // Xử lý lỗi mạng hoặc lỗi không xác định
    if (error.message && error.message.includes("Failed to fetch")) {
    } else {
    }
    throw error;
  }
};

export const getCourseUser = async (authToken) => {
  // 1. Kiểm tra Token
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API_URL}user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      // Xử lý lỗi từ Server (ví dụ: 401 Unauthorized, 404 Not Found)
      const errorMsg =
        data.message || `Tải khóa học thất bại. Mã lỗi: ${response.status}`;
      if (response.status === 401 || response.status === 403) {
      } else {
        toast.error(errorMsg);
      }
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    // Xử lý lỗi mạng hoặc lỗi không xác định
    if (error.message && error.message.includes("Failed to fetch")) {
    } else {
    }
    throw error;
  }
};
