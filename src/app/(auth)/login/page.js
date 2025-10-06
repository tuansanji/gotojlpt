"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { loginUser } from "@/services/authService";
import useStatusStore from "@/store/statusStore";
function PageLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);

  const setLoading = useStatusStore((state) => state.setLoading);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      login(data.user, data.token);
      router.push("/");
      setLoading(false);
      toast.success("Đăng nhập thành công");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || " Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-center bg-cover bg-bg-form bg-form ">
      {/* <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 stroke-current shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div> */}
      <div className="form-container w-[350px] h-[500px] bg-white shadow-lg shadow-gray-400/35 rounded-xl box-border p-5">
        <p className="title text-center my-2.5 mx-0 text-[28px] font-extrabold">
          Đăng nhập
        </p>
        <form
          className="form w-full flex flex-col gap-[18px] mb-[15px]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="current-email"
            className="input rounded-[20px] border border-gray-300 outline-none box-border px-4 py-3"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="input rounded-[20px] border border-gray-300 outline-none box-border px-4 py-3"
            placeholder="Mật Khẩu"
          />
          <p className="text-gray-500 underline page-link text-end underline-offset-2 decoration-gray-500">
            <span className="text-xs font-bold cursor-pointer page-link-label hover:text-black">
              Quên mật khẩu ?
            </span>
          </p>
          <button
            type="submit"
            className="form-btn px-4 py-2.5 font-sans rounded-[20px] border-none outline-none bg-teal-500 text-white cursor-pointer shadow-md shadow-black/25 active:shadow-none"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-xs text-gray-500 sign-up-label">
          Chưa có tài khoản ?
          <span
            onClick={() => {
              router.push("/register");
            }}
            className="ml-2 text-xs font-extrabold text-teal-500 underline cursor-pointer sign-up-link decoration-teal-500"
          >
            Đăng ký
          </span>
        </p>
        <div className="buttons-container w-full flex flex-col justify-start mt-5 gap-[15px]">
          <div className="apple-login-button bg-black text-white rounded-[20px] box-border p-2.5 shadow-lg shadow-black/15 cursor-pointer flex justify-center items-center text-xs gap-1.5">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              className="mb-px text-lg apple-icon"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
            </svg>
            <span>Log in with Apple</span>
          </div>
          <div className="google-login-button border-2 border-gray-400 rounded-[20px] box-border p-2.5 shadow-lg shadow-black/15 cursor-pointer flex justify-center items-center text-xs gap-1.5">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              x="0px"
              y="0px"
              className="mb-px text-lg google-icon"
              viewBox="0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
              c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
              c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
              c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
              c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Log in with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
