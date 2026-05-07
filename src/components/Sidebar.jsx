import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaShoppingCart, FaBox, 
  FaCalendarAlt, FaTrophy, FaChartPie, FaStar, 
  FaFileAlt, FaStore, FaBook 
} from 'react-icons/fa';

const menuItems = [
  { path: '/', name: 'Dashboard', icon: FaTachometerAlt },
  { path: '/customers', name: 'Pelanggan', icon: FaUsers },
  { path: '/transactions', name: 'Transaksi', icon: FaShoppingCart },
  { path: '/stock', name: 'Stok', icon: FaBox },
  { path: '/preorder', name: 'Pre-Order', icon: FaCalendarAlt },
  { path: '/loyalty', name: 'Loyalitas', icon: FaTrophy },
  { path: '/segmentation', name: 'Segmentasi', icon: FaChartPie },
  { path: '/feedback', name: 'Feedback', icon: FaStar },
  { path: '/reports', name: 'Laporan', icon: FaFileAlt },
  { path: '/omnichannel', name: 'Omnichannel', icon: FaStore },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 h-full flex flex-col shadow-lg">
      <div className="p-5 border-b border-blue-700">
        <div className="flex items-center gap-3">
          <FaBook className="text-white text-2xl" />
          <div>
            <h1 className="text-white font-bold text-lg">Cendekia<span className="text-yellow-300">.</span></h1>
            <p className="text-blue-300 text-xs">Toko Buku CRM</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-700 text-yellow-300 font-semibold'
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-blue-700">
        <p className="text-blue-400 text-xs text-center">Jl. Paus No.73, Pekanbaru</p>
        <p className="text-blue-500 text-xs text-center mt-1">© 2025 Toko Buku Cendekia</p>
      </div>
    </aside>
  );
}