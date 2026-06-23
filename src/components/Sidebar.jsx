import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaCalendarAlt,
  FaTrophy,
  FaChartPie,
  FaStar,
  FaFileAlt,
  FaStore,
  FaUserCog
  
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

// Menu khusus admin
const adminMenuItems = [
  { path: '/users', name: 'Users', icon: FaUserCog },
];


export default function Sidebar() {
  // Ambil data user dari localStorage
  const userData = localStorage.getItem("user");
  let isAdmin = false;
  
  if (userData) {
    try {
      const user = JSON.parse(userData);
      isAdmin = user.role === "admin";
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  // Gabungkan menu items + menu admin jika isAdmin true
  const allMenuItems = isAdmin ? [...menuItems, ...adminMenuItems] : menuItems;

  return (
    <aside
      className="w-64 shadow-lg h-screen sticky top-0 flex flex-col"
      style={{ backgroundColor: '#F5F6FA' }}
    >

      {/* LOGO SECTION */}
      <div className="p-2.5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-1">

          {/* LOGO */}
          <div className="relative w-12 h-12 flex items-center justify-center">

            {/* Bentuk C merah */}
            <div
              className="w-12 h-12 rounded-full border-[16.5px] border-red-600"
              style={{
                borderRightColor: 'transparent',
              }}
            ></div>

            {/* Garis putih */}
            <div className="absolute left-[1.5px] top-1/2 -translate-y-1/2">
              <div className="w-[14px] h-[5px] bg-white rounded-full"></div>
            </div>

          </div>

          {/* TEXT */}
          <div className="-ml-1 flex flex-col">

            <h1 className="text-gray-800 font-bold text-lg leading-none m-0">
              Cendekia
            </h1>

            <p className="text-gray-500 text-xs leading-none m-0">
              Toko Buku & Alat Tulis
            </p>

          </div>

        </div>
      </div>

      {/* MENU ITEMS */}
      <nav className="flex-1 py-4">
        <div className="px-3">

          {/* Menu Utama */}
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1e5eff] text-white font-medium shadow-md'
                    : 'text-gray-500 hover:bg-white hover:text-gray-700'
                }`
              }
            >
              <item.icon className="w-4 h-4" />

              <span className="text-sm font-medium">
                {item.name}
              </span>

            </NavLink>
          ))}

          {/* Menu Admin (hanya untuk admin) */}
          {isAdmin && (
            <>
              {/* Separator */}
              <div className="my-3 border-t border-gray-200"></div>
              
              {/* Label Admin */}
              <div className="px-3 py-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Admin
                </span>
              </div>

              {adminMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 ${
                      isActive
                        ? 'bg-[#1e5eff] text-white font-medium shadow-md'
                        : 'text-gray-500 hover:bg-white hover:text-gray-700'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>

                </NavLink>
              ))}
            </>
          )}

        </div>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-200">

        <div className="bg-white rounded-lg p-3 text-center shadow-sm">

          <p className="text-xs text-gray-500">
            Jl. Paus No.73, Pekanbaru
          </p>

          <p className="text-xs text-gray-400 mt-1">
            © 2025 Toko Buku Cendekia
          </p>

        </div>

      </div>

    </aside>
  );
}