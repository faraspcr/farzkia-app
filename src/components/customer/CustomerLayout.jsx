// src/components/customer/CustomerLayout.jsx
import { Navigate, Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { isCustomerLoggedIn } from '../../data/customerSession';

function CustomerLayout() {
  if (!isCustomerLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-[#F0F2F8] min-h-screen">
      <div className="max-w-md mx-auto pb-20">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default CustomerLayout;
