import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  // Ambil data user dari localStorage
  const userData = localStorage.getItem("user");
  let userRole = "user";
  let isAdmin = false;
  
  if (userData) {
    try {
      const user = JSON.parse(userData);
      userRole = user.role || "user";
      isAdmin = userRole === "admin";
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  // Kirim role ke Sidebar melalui props
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - fixed width */}
      <div className="w-64 flex-shrink-0">
        <Sidebar isAdmin={isAdmin} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}