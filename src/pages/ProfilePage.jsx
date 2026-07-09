import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/login';
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'pelanggan') {
      window.location.href = '/dashboard';
      return;
    }
    
    setCustomer(user);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    // Hapus semua session
    localStorage.removeItem('user');
    localStorage.removeItem('cendekia_customer_session');
    // Redirect pake window.location biar force reload
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">👤 Profil Saya</h1>
              <p className="text-gray-500 text-sm">Kelola data diri Anda</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Profil Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-4xl font-bold text-white">
                {customer?.nama?.charAt(0) || customer?.email?.charAt(0) || 'P'}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {customer?.nama || customer?.email || 'Pelanggan'}
              </h2>
              <p className="text-gray-500 text-sm">{customer?.email || '-'}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                  {customer?.role || 'Pelanggan'}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                  ✅ Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Profil */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Lengkap</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">ID User</label>
              <p className="font-medium text-gray-800">{customer?.id || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium text-gray-800">{customer?.email || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Nama</label>
              <p className="font-medium text-gray-800">{customer?.nama || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Role</label>
              <p className="font-medium text-gray-800 capitalize">{customer?.role || '-'}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500">Data Lengkap</label>
              <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-xs overflow-auto max-h-60">
                {JSON.stringify(customer, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;