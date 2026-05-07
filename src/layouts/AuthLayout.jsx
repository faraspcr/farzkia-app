import { Outlet } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FaBook className="text-blue-700 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Toko Buku <span className="text-blue-700">Cendekia</span></h1>
          <p className="text-gray-500 text-sm mt-1">Customer Relationship Management</p>
          <p className="text-gray-400 text-xs mt-1">Jl. Paus No.73, Tangkerang Tengah, Pekanbaru</p>
        </div>
        <Outlet />
        <p className="text-center text-xs text-gray-400 mt-6">© 2025 Toko Buku Cendekia. All rights reserved.</p>
      </div>
    </div>
  );
}