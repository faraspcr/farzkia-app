// src/pages/TransactionsPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaSearch, 
  FaEye, 
  FaChevronLeft, 
  FaChevronRight, 
  FaShoppingBag, 
  FaStore, 
  FaWhatsapp, 
  FaShopify,
  FaFilter,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaBoxOpen,
  FaTruck,
  FaUser,
  FaReceipt,
  FaEdit,
  FaTimes,
  FaSave
} from 'react-icons/fa';
import { 
  FiDollarSign,
  FiPackage,
  FiTrendingUp
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  getTransactions, 
  updateTransaction, 
  cancelTransaction,
  getTransactionStats 
} from '../data/transactions';

const TransactionsPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({});
  
  // State untuk Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  
  // State untuk Batal
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [transactionToCancel, setTransactionToCancel] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, statusFilter, sourceFilter]);

  const loadTransactions = () => {
    const data = getTransactions();
    const sorted = [...data].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    setTransactions(sorted);
    setStats(getTransactionStats());
    setLoading(false);
  };

  const filterTransactions = () => {
    let filtered = [...transactions];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(t => t.source === sourceFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.id.toString().includes(searchTerm)
      );
    }
    
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  // ============== FUNGSI EDIT ==============
  const handleEditClick = (transaction) => {
    setEditData({ ...transaction });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = () => {
    const updated = updateTransaction(editData.id, editData);
    if (updated) {
      loadTransactions();
      setIsEditOpen(false);
      setEditData(null);
      alert(`✅ Transaksi #${editData.id} berhasil diperbarui!`);
    } else {
      alert('❌ Gagal memperbarui transaksi!');
    }
  };

  // ============== FUNGSI BATAL ==============
  const handleCancelClick = (transaction) => {
    setTransactionToCancel(transaction);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (transactionToCancel) {
      const cancelled = cancelTransaction(transactionToCancel.id);
      if (cancelled) {
        loadTransactions();
        setCancelDialogOpen(false);
        setTransactionToCancel(null);
        alert(`⛔ Transaksi #${transactionToCancel.id} dibatalkan!`);
      } else {
        alert('❌ Gagal membatalkan transaksi!');
      }
    }
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getStatusConfig = (status) => {
    const configs = {
      pesanan_diterima: { label: 'Diterima', color: 'bg-blue-100 text-blue-700', icon: FaCheckCircle },
      diproses: { label: 'Diproses', color: 'bg-yellow-100 text-yellow-700', icon: FaSpinner },
      siap_diambil: { label: 'Siap Diambil', color: 'bg-purple-100 text-purple-700', icon: FaBoxOpen },
      selesai: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: FaTruck },
      dibatalkan: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: FaTimes },
    };
    return configs[status] || { label: status, color: 'bg-gray-100 text-gray-700', icon: FaClock };
  };

  const getSourceConfig = (source) => {
    const configs = {
      offline: { label: 'Offline', color: 'bg-gray-100 text-gray-700', icon: FaStore },
      whatsapp: { label: 'WhatsApp', color: 'bg-green-100 text-green-700', icon: FaWhatsapp },
      shopee: { label: 'Shopee', color: 'bg-orange-100 text-orange-700', icon: FaShopify },
    };
    return configs[source] || { label: source, color: 'bg-gray-100 text-gray-700', icon: FaStore };
  };

  const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
                <FaReceipt className="w-7 h-7 text-[#1A5CFF]" />
                Riwayat Transaksi
              </h1>
              <p className="text-[#7E84A3] mt-1">Kelola dan pantau semua transaksi toko buku Cendekia</p>
            </div>
            <button className="px-5 py-2.5 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
              <FaPlus size={16} />
              Tambah Transaksi
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Total Transaksi</p>
                <p className="text-2xl font-bold text-[#131523] mt-1">{stats.total || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <FaReceipt className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Total Pendapatan</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(stats.totalRevenue || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <FiDollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Transaksi Selesai</p>
                <p className="text-2xl font-bold text-[#131523] mt-1">{stats.byStatus?.selesai || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <FiPackage className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Bulan Ini</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{stats.thisMonthCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <FiTrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-5 mb-6">
          <div className="mb-4">
            <p className="text-sm font-medium text-[#131523] mb-3 flex items-center gap-2">
              <FaFilter className="text-[#7E84A3]" />
              Filter Status
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Semua', color: 'bg-gray-100' },
                { value: 'pesanan_diterima', label: 'Diterima', color: 'bg-blue-100 text-blue-700' },
                { value: 'diproses', label: 'Diproses', color: 'bg-yellow-100 text-yellow-700' },
                { value: 'siap_diambil', label: 'Siap Diambil', color: 'bg-purple-100 text-purple-700' },
                { value: 'selesai', label: 'Selesai', color: 'bg-green-100 text-green-700' },
                { value: 'dibatalkan', label: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => setStatusFilter(status.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    statusFilter === status.value
                      ? 'bg-[#1A5CFF] text-white shadow-md shadow-blue-500/30'
                      : `${status.color} hover:opacity-80`
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D7DBEC]">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-[#131523]">Sumber:</p>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'Semua', icon: null },
                  { value: 'offline', label: 'Offline', icon: FaStore },
                  { value: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp },
                  { value: 'shopee', label: 'Shopee', icon: FaShopify }
                ].map((source) => {
                  const Icon = source.icon;
                  const isActive = sourceFilter === source.value;
                  return (
                    <button
                      key={source.value}
                      onClick={() => setSourceFilter(source.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#1A5CFF] text-white shadow-md shadow-blue-500/30'
                          : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
                      }`}
                    >
                      {Icon && <Icon size={12} />}
                      {source.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full md:w-80 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3]" />
              <input
                type="text"
                placeholder="Cari nama pelanggan atau ID transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Transaction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedTransactions.map((transaction) => {
            const StatusIcon = getStatusConfig(transaction.status).icon;
            const statusConfig = getStatusConfig(transaction.status);
            const sourceConfig = getSourceConfig(transaction.source);
            const SourceIcon = sourceConfig.icon;
            const isCancelled = transaction.status === 'dibatalkan';

            return (
              <div
                key={transaction.id}
                className={`bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all ${
                  isCancelled ? 'border-red-200 opacity-75' : 'border-[#D7DBEC]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-mono font-semibold ${isCancelled ? 'text-red-500' : 'text-[#1A5CFF]'}`}>
                        #{transaction.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${sourceConfig.color} flex items-center gap-1`}>
                        <SourceIcon size={10} />
                        {sourceConfig.label}
                      </span>
                      {isCancelled && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 flex items-center gap-1">
                          <FaTimes size={10} />
                          Dibatalkan
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <FaUser className="text-[#7E84A3] text-xs" />
                      <p className="font-medium text-[#131523]">{transaction.customerName}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color} flex items-center gap-1`}>
                    <StatusIcon size={12} />
                    {statusConfig.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#F5F6FA] rounded-lg p-2">
                    <p className="text-[10px] text-[#7E84A3] uppercase tracking-wider">Total</p>
                    <p className={`font-bold ${isCancelled ? 'text-red-500 line-through' : 'text-[#131523]'}`}>
                      {formatCurrency(transaction.total)}
                    </p>
                  </div>
                  <div className="bg-[#F5F6FA] rounded-lg p-2">
                    <p className="text-[10px] text-[#7E84A3] uppercase tracking-wider">Tanggal</p>
                    <p className="text-sm font-medium text-[#131523]">{formatDate(transaction.orderDate)}</p>
                  </div>
                </div>

                {transaction.items && transaction.items.length > 0 && (
                  <div className="bg-[#F8F9FC] rounded-lg p-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-[#7E84A3]">
                      <FaShoppingBag size={10} />
                      <span>{transaction.items.length} item</span>
                      <span className="mx-1">•</span>
                      <span className="truncate">
                        {transaction.items.map(item => item.productName).join(', ')}
                      </span>
                    </div>
                  </div>
                )}

                {/* ========== TOMBOL AKSI ========== */}
                <div className="flex justify-end gap-2 pt-3 border-t border-[#D7DBEC]">
                  <button
                    onClick={() => navigate(`/tracking/${transaction.id}`)}
                    className="px-3 py-1.5 text-sm bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-1.5 transition-all"
                  >
                    <FaEye size={12} />
                    Detail
                  </button>
                  
                  {!isCancelled && (
                    <>
                      <button
                        onClick={() => handleEditClick(transaction)}
                        className="px-3 py-1.5 text-sm border border-yellow-400 text-yellow-600 hover:bg-yellow-50 rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        <FaEdit size={12} />
                        Edit
                      </button>
                      {transaction.status !== 'selesai' && (
                        <button
                          onClick={() => handleCancelClick(transaction)}
                          className="px-3 py-1.5 text-sm border border-red-300 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1.5 transition-all"
                        >
                          <FaTimes size={12} />
                          Batalkan
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingBag className="text-[#A1A7C4] text-4xl" />
            </div>
            <p className="text-[#7E84A3] font-medium">Tidak ada transaksi yang ditemukan</p>
            <p className="text-sm text-[#A1A7C4] mt-1">Coba ubah filter atau cari dengan kata kunci lain</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#D7DBEC] mt-6">
            <p className="text-sm text-[#7E84A3]">
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} dari {filteredTransactions.length} transaksi
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#D7DBEC] hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft size={14} />
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#1A5CFF] text-white shadow-md shadow-blue-500/30'
                        : 'border border-[#D7DBEC] hover:bg-[#F5F6FA]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#D7DBEC] hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ========== MODAL EDIT ========== */}
        {isEditOpen && editData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-[#D7DBEC] px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                  <FaEdit className="text-yellow-600" />
                  Edit Transaksi #{editData.id}
                </h2>
                <button
                  onClick={() => {
                    setIsEditOpen(false);
                    setEditData(null);
                  }}
                  className="p-2 hover:bg-[#F5F6FA] rounded-lg text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#131523] mb-1">ID Transaksi</label>
                    <input
                      type="text"
                      value={editData.id}
                      disabled
                      className="w-full px-4 py-2 border border-[#D7DBEC] rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#131523] mb-1">Nama Pelanggan *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={editData.customerName}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#131523] mb-1">Total Transaksi *</label>
                    <input
                      type="number"
                      name="total"
                      value={editData.total}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#131523] mb-1">Status *</label>
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                    >
                      <option value="pesanan_diterima">Diterima</option>
                      <option value="diproses">Diproses</option>
                      <option value="siap_diambil">Siap Diambil</option>
                      <option value="selesai">Selesai</option>
                      <option value="dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#131523] mb-1">Tanggal Order</label>
                    <input
                      type="date"
                      name="orderDate"
                      value={editData.orderDate}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-[#D7DBEC]">
                  <button
                    onClick={() => {
                      setIsEditOpen(false);
                      setEditData(null);
                    }}
                    className="px-4 py-2 border border-[#D7DBEC] rounded-lg hover:bg-[#F5F6FA] flex items-center gap-2"
                  >
                    <FaTimes />
                    Batal
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2"
                  >
                    <FaSave />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== DIALOG KONFIRMASI BATAL ========== */}
        {cancelDialogOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaClock className="text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#131523]">Batalkan Transaksi?</h3>
                </div>
                <p className="text-[#7E84A3]">
                  Transaksi #{transactionToCancel?.id} - {transactionToCancel?.customerName} akan dibatalkan.
                </p>
                <p className="text-orange-600 text-sm mt-2">
                  ⚠️ Status akan berubah menjadi "Dibatalkan"
                </p>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setCancelDialogOpen(false)}
                    className="px-4 py-2 border border-[#D7DBEC] rounded-lg hover:bg-[#F5F6FA] transition-all"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={confirmCancel}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-md shadow-red-500/30"
                  >
                    Ya, Batalkan
                  </button>
                </div>
              </div>
            </div>
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

export default TransactionsPage;