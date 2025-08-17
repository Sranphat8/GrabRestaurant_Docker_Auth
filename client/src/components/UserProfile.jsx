import React from "react";
import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { logout } = useAuthContext();

  const handleLogOut = () => {
    logout();
    // หลัง logout กลับไปหน้า login
    window.location.href = "/login";
  };

  return (
    <div className="relative inline-block text-left">
      {/* Avatar */}
      <div className="cursor-pointer" tabIndex={0}>
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
        />
      </div>

      {/* Dropdown */}
      <ul className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-xl shadow-lg py-2 text-gray-900 z-20 hidden group-focus:block">
        <li>
          <a
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Settings
          </a>
        </li>
        <li>
          <button
            onClick={handleLogOut}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
