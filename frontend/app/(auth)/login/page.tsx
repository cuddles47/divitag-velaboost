"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";


import Button
  from "frontend/components/UI/button";
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    signIn("credentials", {
      ...loginData,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/admin");
        }

        if (callback?.error) {
          setError(callback.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="w-5/6 lg:w-[450px] p-8 rounded-xl shadow-lg flex flex-col gap-6 bg-white border border-gray-100">
        {/* Logo và tiêu đề */}
        <div className="flex flex-col items-center mb-4">
          <Image alt="Bitex Logo" src="/images/logo.png" width={150} height={48} quality={100} className="mb-4" />
          <h1 className="text-2xl font-medium text-gray-800">Đăng nhập quản trị</h1>
          <p className="text-gray-500 text-sm mt-2">Nhập thông tin để truy cập hệ thống</p>
        </div>

        {/* Form đăng nhập */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="text"
                value={loginData.email}
                className="w-full border border-gray-300 rounded-lg p-3 pl-4 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="admin@bitex.com"
                onChange={(e) => setLoginData({ ...loginData, email: e.currentTarget.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={loginData.password}
                className="w-full border border-gray-300 rounded-lg p-3 pl-4 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                onChange={(e) => setLoginData({ ...loginData, password: e.currentTarget.value })}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              {error}
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} BITEX Store. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
