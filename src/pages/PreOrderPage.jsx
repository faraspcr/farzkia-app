// src/pages/PreOrderPage.jsx
import { useState, useEffect } from 'react';
import { 
  FaBell, 
  FaCheckCircle, 
  FaClock, 
  FaWhatsapp,
  FaBox,
  FaUser,
  FaCalendarAlt,
  FaPhone,
  FaPercent,
  FaShoppingBag,
  FaChartLine,
  FaClipboardList,
  FaRocket,
  FaEye,
  FaCheck,
  FaSpinner
} from 'react-icons/fa';
import { FiPackage, FiUsers, FiTrendingUp } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPreorders, updatePreorderStatus } from '../data/preorders';
import { formatDate } from '../data/formatters';

const PreOrderPage = () => {
  const [preorders, setPreorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadPreorders();
  }, []);

  const loadPreorders = () => {
    setLoading(true);
    setPreorders(getPreorders());
    setLoading(false);
  };

  const handleNotify = (preorder) => {
    updatePreorderStatus(preorder.id, 'notified');
    loadPreorders();
    alert(`✅ Notifikasi akan dikirim ke ${preorder.customerName}`);
  };

  // Statistics
  const stats = {
    total: preorders.length,
    waiting: preorders.filter(p => p.status === 'waiting_stock').length,
    notified: preorders.filter(p => p.status === 'notified').length,
    completed: preorders.filter(p => p.status === 'completed').length
  };

  const getStatusConfig = (status) => {
    const configs = {
      waiting_stock: {
        label: 'Menunggu Stok',
        icon: FaClock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        border: 'border-yellow-300',
        progress: 'bg-yellow-400'
      },
      notified: {
        label: 'Sudah Diberitahu',
        icon: FaBell,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        border: 'border-blue-300',
        progress: 'bg-blue-400'
      },
      completed: {
        label: 'Sudah Terpenuhi',
        icon: FaCheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-100',
        border: 'border-green-300',
        progress: 'bg-green-400'
      }
    };
    return configs[status] || configs.waiting_stock;
  };

  // Generate progress percentage based on status
  const getProgress = (status) => {
    switch(status) {
      case 'waiting_stock': return 25;
      case 'notified': return 50;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '-';
    if (phone.startsWith('62')) {
      return '+62 ' + phone.slice(2);
    }
    return phone;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#F0F2F8] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#131523] flex items-center gap-3">
                <FaClipboardList className="w-7 h-7 text-[#1A5CFF]" />
                Pre-Order & Notifikasi Stok
              </h1>
              <p className="text-[#7E84A3] mt-1">Kelola permintaan pre-order dan notifikasi stok kosong</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                <FaRocket size={16} />
                Tambah Pre-Order
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Total Pre-Order</p>
                <p className="text-2xl font-bold text-[#131523] mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <FiPackage className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Menunggu Stok</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.waiting}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                <FaClock className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Sudah Diberitahu</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.notified}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <FaBell className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Sudah Terpenuhi</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <FiTrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Pre-Order Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preorders.map((preorder) => {
            const statusConfig = getStatusConfig(preorder.status);
            const StatusIcon = statusConfig.icon;
            const progress = getProgress(preorder.status);
            const isExpanded = expandedId === preorder.id;

            return (
              <div
                key={preorder.id}
                className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  preorder.status === 'waiting_stock' 
                    ? 'border-yellow-200 hover:border-yellow-300' 
                    : preorder.status === 'notified'
                    ? 'border-blue-200 hover:border-blue-300'
                    : 'border-green-200 hover:border-green-300'
                }`}
              >
                {/* Card Header */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#7E84A3] bg-[#F5F6FA] px-2 py-0.5 rounded">
                          {preorder.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                          <StatusIcon className="inline mr-1 text-xs" />
                          {statusConfig.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#131523] text-lg mt-2">{preorder.productName}</h3>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusConfig.bg} ${statusConfig.color}`}>
                      <FaBox className="text-lg" />
                    </div>
                  </div>

                  {/* Progress Bar - seperti di gambar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-[#7E84A3] mb-1">
                      <span>Kuota Terisi</span>
                      <span className="font-medium">
                        {progress === 25 ? 'Menunggu' : progress === 50 ? 'Diberitahu' : 'Terpenuhi'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#F0F2F8] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${statusConfig.progress}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#7E84A3] mt-1">
                      {progress}% • {preorder.status === 'waiting_stock' ? 'Menunggu stok' : preorder.status === 'notified' ? 'Menunggu konfirmasi' : 'Selesai'}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center gap-4 text-sm text-[#7E84A3]">
                    <div className="flex items-center gap-1.5">
                      <FaUser className="text-xs" />
                      <span>{preorder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-xs" />
                      <span>{formatDate(preorder.requestDate)}</span>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : preorder.id)}
                    className="mt-3 w-full py-2 text-sm text-[#1A5CFF] hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEye className="text-xs" />
                    {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
                  </button>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t border-[#D7DBEC]">
                    <div className="bg-[#F8F9FC] rounded-lg p-4 mt-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Detail Pelanggan</p>
                          <div className="mt-2 space-y-1.5">
                            <div className="flex items-center gap-2 text-sm">
                              <FaUser className="text-[#7E84A3] text-xs" />
                              <span className="font-medium text-[#131523]">{preorder.customerName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <FaPhone className="text-[#7E84A3] text-xs" />
                              <span className="text-[#131523]">{formatPhoneNumber(preorder.customerPhone)}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Info Pre-Order</p>
                          <div className="mt-2 space-y-1.5">
                            <div className="flex items-center gap-2 text-sm">
                              <FaCalendarAlt className="text-[#7E84A3] text-xs" />
                              <span className="text-[#131523]">Request: {formatDate(preorder.requestDate)}</span>
                            </div>
                            {preorder.estimatedArrival && (
                              <div className="flex items-center gap-2 text-sm">
                                <FaClock className="text-[#7E84A3] text-xs" />
                                <span className="text-[#1A5CFF] font-medium">Estimasi: {formatDate(preorder.estimatedArrival)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-[#D7DBEC]">
                        {preorder.status === 'waiting_stock' && (
                          <button
                            onClick={() => handleNotify(preorder)}
                            className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2 text-sm transition-all shadow-sm"
                          >
                            <FaBell size={12} />
                            Kirim Notifikasi
                          </button>
                        )}
                        <button
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                            preorder.status === 'waiting_stock'
                              ? 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                              : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                          }`}
                          disabled={preorder.status === 'waiting_stock'}
                        >
                          <FaWhatsapp size={14} />
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {preorders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClipboardList className="text-[#A1A7C4] text-4xl" />
            </div>
            <p className="text-[#7E84A3] font-medium">Belum ada permintaan pre-order</p>
            <p className="text-sm text-[#A1A7C4] mt-1">Silakan tambahkan pre-order baru</p>
            <button className="mt-4 px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg text-sm">
              Tambah Pre-Order Sekarang
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-[#A1A7C4] py-6">
          <p className="font-medium">Jl. Paus No.73, Pekanbaru</p>
          <p className="mt-1">© 2025 Toko Buku Cendekia</p>
        </div>
      </div>
    </div>
  );
};

export default PreOrderPage;