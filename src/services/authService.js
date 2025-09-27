const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const registerUser = async (newUser) => {
  const response = await fetch(`${API_URL}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      password_confirmation: newUser.password_confirmation,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Nếu API trả về lỗi (response.status là 4xx hoặc 5xx)
    throw new Error(data.message || "Đăng ký thất bại");
  }
  return data;
};

// Hàm để xử lý logic gọi API đăng nhập
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Đăng nhập thất bại");
  }
  return data;
};
