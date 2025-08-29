import React from "react";
import { Link } from "react-router";

const NotAllowed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br px-4 text-center">
      <div className="max-w-lg bg-white rounded-3xl shadow-2xl p-10 transform transition duration-500 hover:scale-105">
        <h1 className="text-8xl font-extrabold text-yellow-600 animate-pulse">⚠️ 403</h1>
        <h2 className="text-3xl font-bold mt-4 text-gray-800">Access Denied</h2>
        <p className="mt-4 text-gray-700 text-base">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้! <br />
          หากคิดว่านี่เป็นข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        >
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default NotAllowed;
