import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaChevronDown,
  FaRegCommentDots
} from 'react-icons/fa';

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-[#D7DBEC] sticky top-0 z-10 w-full">
      <div className="flex items-center justify-between px-6 py-3 w-full">

        {/* LEFT SECTION - Toggle + Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-[#5A607F] hover:text-[#1E5EFF] transition"
          >
            <FaBars size={18} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <FaSearch className="text-[#A1A7C4] text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-[#131523] placeholder:text-[#A1A7C4] text-sm w-64"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5">
          {/* Message Icon */}
          <button className="text-[#A1A7C4] hover:text-[#1E5EFF] transition text-xl">
            <FaRegCommentDots />
          </button>

          {/* Notification Bell */}
          <div className="relative cursor-pointer">
            <FaBell className="text-[#A1A7C4] text-xl hover:text-[#1E5EFF] transition" />
            <span className="absolute -top-2 -right-2 bg-[#1E5EFF] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              5
            </span>
          </div>

          {/* Profile Section - Avatar LOOPY + Name + Role */}
          <div className="flex items-center gap-2 cursor-pointer">
            {/* Avatar Loopy */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center">
              <img
                src="https://i.pinimg.com/564x/4d/5c/4c/4d5c4c6d4e6d4f4d4c4d4c4d4c4d4c4d.jpg"
                alt="Loopy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.pinimg.com/564x/7e/5c/8a/7e5c8a6d5e4d3c2b1a0f9e8d7c6b5a4f.jpg";
                }}
              />
            </div>

            {/* Name & Role */}
            <div className="hidden md:block">
              <span className="text-[#131523] text-sm font-medium">
                Admin
              </span>
              <p className="text-[#7E84A3] text-xs -mt-0.5">
                Admin Toko Cendekia
              </p>
            </div>

            {/* Chevron Down */}
            <FaChevronDown className="text-[#A1A7C4] text-xs" />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-[#F0142F] hover:bg-[#FDE7EA] p-2 rounded-lg transition ml-2"
          >
            <FaSignOutAlt size={16} />
          </button>
        </div>
      </div>

      {/* SEARCH MODAL MOBILE */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-96 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-3 text-[#131523]">
              Cari Data
            </h2>

            <input
              type="text"
              className="w-full border border-[#D7DBEC] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] text-[#131523] placeholder:text-[#A1A7C4]"
              placeholder="Cari pelanggan, order..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            {keyword && (
              <p className="text-sm text-[#7E84A3] mt-3">
                Hasil pencarian: <b>{keyword}</b>
              </p>
            )}

            <button
              className="mt-4 w-full bg-[#1E5EFF] text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setSearchOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </header>
  );
}