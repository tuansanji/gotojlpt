"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { registerUser } from "@/services/authService";
import useStatusStore from "@/store/statusStore";
function PageRegister() {
  const router = useRouter();

  const [name, setName] = useState(""); // Thêm state cho Tên
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState(""); // Thêm state cho Nhập lại Mật khẩu

  const setLoading = useStatusStore((state) => state.setLoading);

  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user); // Giữ lại để debug
  const token = useAuthStore((state) => state.token); // Giữ lại để debug

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. KIỂM TRA MẬT KHẨU
    if (password !== password_confirmation) {
      console.log("Lỗi: Mật khẩu và Nhập lại Mật khẩu không khớp.");
      toast.error("mật khẩu không khớp");
      setLoading(false);

      return;
    }
    try {
      const newUser = {
        name,
        email,
        password,
        password_confirmation,
      };

      const data = await registerUser(newUser);

      login(data.user, data.token);
      router.push("/");
      setLoading(false);
      toast.success("Đăng ký thành công");
    } catch (err) {
      toast.error(err.message || " Đăng kí thất bại");
      setLoading(false);
      console.log(err.message);
      // 4. BẮT VÀ HIỂN THỊ LỖI ĐĂNG KÝ
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-center bg-cover bg-bg-form bg-form ">
      <div className="form-container w-[350px] h-[600px] bg-white shadow-lg shadow-gray-400/35 rounded-xl box-border p-5">
        <p className="title text-center my-2.5 mx-0 text-[28px] font-extrabold">
          Đăng ký
        </p>
        <form
          className="form w-full flex flex-col gap-[18px] mb-[15px]"
          onSubmit={handleSubmit}
        >
          {/* TRƯỜNG TÊN (NAME) */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input rounded-[20px] border border-gray-300 outline-none box-border px-4 py-3"
            placeholder="Tên của bạn"
            required
          />

          {/* TRƯỜNG EMAIL (GIỮ NGUYÊN) */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username" // Đổi từ current-email thành username cho form đăng ký
            className="input rounded-[20px] border border-gray-300 outline-none box-border px-4 py-3"
            placeholder="Email"
            required
          />

          {/* TRƯỜNG MẬT KHẨU (PASSWORD) */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password" // Cú pháp chuẩn cho trường mật khẩu mới
            className="input rounded-[20px] border border-gray-300 outline-none box-border px-4 py-3"
            placeholder="Mật Khẩu"
            required
            minLength="6"
          />

          {/* TRƯỜNG NHẬP LẠI MẬT KHẨU (CONFIRM PASSWORD) */}
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            autoComplete="new-password" // Sử dụng new-password
            className="input rounded-[20px] border border-gray-300 outline-none box-border px-4 py-3"
            placeholder="Nhập lại Mật Khẩu"
            required
            minLength="6"
          />

          <p className="text-gray-500 underline page-link text-end underline-offset-2 decoration-gray-500">
            {/* Thường thì form đăng ký không có quên mật khẩu, nhưng có thể giữ lại */}
            <span className="text-xs font-bold cursor-pointer page-link-label hover:text-black">
              Cần trợ giúp ?
            </span>
          </p>
          <button
            type="submit"
            className="form-btn px-4 py-2.5 font-sans rounded-[20px] border-none outline-none bg-teal-500 text-white cursor-pointer shadow-md shadow-black/25 active:shadow-none"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-xs text-gray-500 sign-up-label">
          Đã có tài khoản ?
          <span
            onClick={() => {
              router.push("/login");
            }}
            className="sign-up-link ml-0.5 text-xs underline decoration-teal-500 text-teal-500 cursor-pointer font-extrabold"
          >
            Đăng nhập
          </span>
        </p>
        {/* Giữ lại phần Đăng nhập bằng bên thứ 3 (Apple, Google) nếu cần */}
        <div className="buttons-container w-full flex flex-col justify-start mt-5 gap-[15px]">
          {/* ... Apple và Google buttons ... */}
        </div>
      </div>
    </div>
  );
}

export default PageRegister;
