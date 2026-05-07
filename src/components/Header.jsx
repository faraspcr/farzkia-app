import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaBell, FaSearch, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-700">
            <FaBars size={18} />
          </button>
          <div className="relative">
            <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
              <FaSearch className="text-gray-400 text-sm" />
              <span className="text-gray-500 text-sm hidden md:inline">Cari pelanggan, transaksi...</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaBell className="text-gray-500 text-lg cursor-pointer hover:text-blue-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </div>
          <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
            <FaUserCircle className="text-gray-500 text-2xl" />
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">Toko Buku Cendekia</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg">
            <FaSignOutAlt size={14} />
            <span className="text-sm hidden md:inline">Logout</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSearchOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-3">🔍 Cari Data</h2>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Cari pelanggan, order..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && <p className="text-sm text-gray-500 mt-3">Hasil pencarian: <b>{keyword}</b></p>}
            <button className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800" onClick={() => setSearchOpen(false)}>Tutup</button>
          </div>
        </div>
      )}
    </header>
  );
}