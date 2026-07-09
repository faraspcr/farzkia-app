// src/components/customer/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import { FaHome, FaThLarge, FaShoppingCart, FaBoxOpen, FaUser } from 'react-icons/fa';
import { getCartCount } from '../../data/cart';
import { useEffect, useState } from 'react';

const navItems = [
  { to: '/beranda', label: 'Beranda', icon: FaHome },
  { to: '/katalog', label: 'Katalog', icon: FaThLarge },
  { to: '/keranjang', label: 'Keranjang', icon: FaShoppingCart, showBadge: true },
  { to: '/pesanan', label: 'Pesanan', icon: FaBoxOpen },
  { to: '/profil', label: 'Akun', icon: FaUser },
];

function BottomNav() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
    // sinkron ulang tiap kali tab difokuskan lagi (misal habis nambah dari halaman lain)
    const handler = () => setCartCount(getCartCount());
    window.addEventListener('focus', handler);
    window.addEventListener('cendekia:cart-updated', handler);
    return () => {
      window.removeEventListener('focus', handler);
      window.removeEventListener('cendekia:cart-updated', handler);
    };
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E1E5F0] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {navItems.map(({ to, label, icon: Icon, showBadge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2.5 gap-1 text-xs relative transition-colors ${
                isActive ? 'text-[#1A5CFF]' : 'text-[#7E84A3]'
              }`
            }
          >
            <div className="relative">
              <Icon className="text-lg" />
              {showBadge && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </div>
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
