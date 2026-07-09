// src/pages/LoyaltyPage.jsx
import { useState, useEffect } from 'react';
import { 
  FaTrophy, 
  FaStar, 
  FaCrown, 
  FaGem, 
  FaMedal,
  FaUser,
  FaCoins,
  FaChartLine,
  FaWallet,
  FaAward,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaGift,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaSave,
  FaSpinner,
  FaInfoCircle,
  FaEye
} from 'react-icons/fa';
import { FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getCustomers, saveCustomers } from '../data/customers';

const LoyaltyPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    nama_pelanggan: '',
    points: '',
    totalSpent: '',
    tier: 'Silver'
  });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');

  const itemsPerPage = 10;

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm, tierFilter]);

  const loadCustomers = () => {
    setLoading(true);
    const rawCustomers = getCustomers();
    const processed = rawCustomers.map((c, index) => {
      const points = c.points || c.poin || Math.floor(Math.random() * 2500) + 50;
      return {
        ...c,
        id_pelanggan: c.id_pelanggan || `CEND-${String(index + 1).padStart(3, '0')}`,
        nama_pelanggan: c.nama_pelanggan || c.name || 'Tidak Diketahui',
        points: points,
        totalSpent: c.totalSpent || c.total_spent || points * 10000,
        tier: c.tier || getTier(points)
      };
    });
    const sorted = processed.sort((a, b) => b.points - a.points);
    setCustomers(sorted);
    setFilteredCustomers(sorted);
    setLoading(false);
  };

  const getTier = (points) => {
    if (points >= 1000) return 'Platinum';
    if (points >= 300) return 'Gold';
    return 'Silver';
  };

  const getTierIcon = (tier) => {
    switch(tier) {
      case 'Platinum': return <FaGem className="text-purple-600" />;
      case 'Gold': return <FaCrown className="text-yellow-500" />;
      case 'Silver': return <FaMedal className="text-gray-400" />;
      default: return <FaStar className="text-gray-300" />;
    }
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Gold': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Silver': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const getTierBadge = (tier, points) => {
    const colors = {
      Platinum: 'bg-purple-100 text-purple-700',
      Gold: 'bg-yellow-100 text-yellow-700',
      Silver: 'bg-gray-100 text-gray-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[tier] || colors.Silver}`}>
        {tier} ({points} pts)
      </span>
    );
  };

  const filterCustomers = () => {
    let filtered = [...customers];
    
    if (tierFilter !== 'all') {
      filtered = filtered.filter(c => c.tier === tierFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.nama_pelanggan.toLowerCase().includes(term) ||
        c.id_pelanggan.toLowerCase().includes(term)
      );
    }
    
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPoints = (points) => {
    return points.toLocaleString('id-ID');
  };

  // ============================================
  // CRUD FUNCTIONS
  // ============================================

  // READ - Detail
  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  // CREATE - Tambah Member Loyalty
  const handleAddSubmit = () => {
    if (!formData.nama_pelanggan.trim()) {
      setFormError('Nama pelanggan wajib diisi.');
      return;
    }

    const points = Number(formData.points);
    if (Number.isNaN(points) || points < 0) {
      setFormError('Poin harus berupa angka positif.');
      return;
    }

    const totalSpent = Number(formData.totalSpent);
    if (Number.isNaN(totalSpent) || totalSpent < 0) {
      setFormError('Total pengeluaran harus berupa angka positif.');
      return;
    }

    setSaving(true);
    setFormError('');

    const newCustomer = {
      id_pelanggan: `CEND-${String(customers.length + 1).padStart(3, '0')}`,
      nama_pelanggan: formData.nama_pelanggan.trim(),
      points: points,
      totalSpent: totalSpent,
      tier: getTier(points)
    };

    const updatedCustomers = [newCustomer, ...customers];
    setCustomers(updatedCustomers);
    saveCustomers(updatedCustomers);
    setIsAddModalOpen(false);
    resetForm();
    setSaving(false);
    showFeedback('Member loyalitas berhasil ditambahkan.', 'success');
  };

  // UPDATE - Edit Member Loyalty
  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      nama_pelanggan: customer.nama_pelanggan,
      points: customer.points,
      totalSpent: customer.totalSpent,
      tier: customer.tier
    });
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (!formData.nama_pelanggan.trim()) {
      setFormError('Nama pelanggan wajib diisi.');
      return;
    }

    const points = Number(formData.points);
    if (Number.isNaN(points) || points < 0) {
      setFormError('Poin harus berupa angka positif.');
      return;
    }

    const totalSpent = Number(formData.totalSpent);
    if (Number.isNaN(totalSpent) || totalSpent < 0) {
      setFormError('Total pengeluaran harus berupa angka positif.');
      return;
    }

    setSaving(true);
    setFormError('');

    const updatedCustomer = {
      ...selectedCustomer,
      nama_pelanggan: formData.nama_pelanggan.trim(),
      points: points,
      totalSpent: totalSpent,
      tier: getTier(points)
    };

    const updatedCustomers = customers.map(c => 
      c.id_pelanggan === selectedCustomer.id_pelanggan ? updatedCustomer : c
    );
    setCustomers(updatedCustomers);
    saveCustomers(updatedCustomers);
    setIsEditModalOpen(false);
    resetForm();
    setSaving(false);
    showFeedback('Data member loyalitas berhasil diperbarui.', 'success');
  };

  // DELETE - Hapus Member Loyalty
  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setSaving(true);
    const updatedCustomers = customers.filter(c => c.id_pelanggan !== selectedCustomer.id_pelanggan);
    setCustomers(updatedCustomers);
    saveCustomers(updatedCustomers);
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
    setSaving(false);
    showFeedback('Member loyalitas berhasil dihapus.', 'success');
  };

  // UPDATE POINTS - Tambah poin
  const handleAddPoints = (customer, amount) => {
    const updatedCustomer = {
      ...customer,
      points: customer.points + amount,
      tier: getTier(customer.points + amount)
    };
    const updatedCustomers = customers.map(c => 
      c.id_pelanggan === customer.id_pelanggan ? updatedCustomer : c
    );
    setCustomers(updatedCustomers);
    saveCustomers(updatedCustomers);
    showFeedback(`✅ ${amount} poin berhasil ditambahkan ke ${customer.nama_pelanggan}`, 'success');
  };

  // Helper functions
  const resetForm = () => {
    setFormData({
      nama_pelanggan: '',
      points: '',
      totalSpent: '',
      tier: 'Silver'
    });
    setFormError('');
    setSelectedCustomer(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showFeedback = (message, type = 'success') => {
    setFeedback(message);
    setFeedbackType(type);
    setTimeout(() => setFeedback(''), 5000);
  };

  // Tier Statistics
  const tierStats = {
    total: customers.length,
    platinum: customers.filter(c => c.tier === 'Platinum').length,
    gold: customers.filter(c => c.tier === 'Gold').length,
    silver: customers.filter(c => c.tier === 'Silver').length
  };

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#F0F2F8] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#131523] flex items-center gap-3">
                <FaAward className="w-7 h-7 text-[#1A5CFF]" />
                Loyalty & Rewards Program
              </h1>
              <p className="text-[#7E84A3] mt-1">
                Pantau kontribusi transaksi, distribusi poin, dan manajemen tier loyalitas member.
              </p>
              <p className="text-sm text-[#7E84A3] mt-1">Total member: {customers.length} pelanggan</p>
            </div>
            <button 
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2.5 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
            >
              <FaPlus size={16} />
              Tambah Member
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
            feedbackType === 'success' 
              ? 'border-green-200 bg-green-50 text-green-700' 
              : 'border-red-200 bg-red-50 text-red-700'
          }`}>
            {feedback}
          </div>
        )}

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Tier Platinum */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-300 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaGem className="text-purple-600 text-xl" />
                <h3 className="font-bold text-purple-800">TIER PLATINUM</h3>
              </div>
              <span className="text-xs font-bold text-purple-600">≥ 1.000 Poin</span>
            </div>
            <ul className="space-y-1.5 text-sm text-purple-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                <span>Diskon 15% + Prioritas Antrean Produksi Utama CendekiaBook</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-purple-200 flex justify-between items-center">
              <span className="text-xs text-purple-600 font-medium">{tierStats.platinum} Member</span>
              <span className="text-xs text-purple-400">≥ 1.000 Poin</span>
            </div>
          </div>

          {/* Tier Gold */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-2 border-yellow-300 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaCrown className="text-yellow-600 text-xl" />
                <h3 className="font-bold text-yellow-800">TIER GOLD</h3>
              </div>
              <span className="text-xs font-bold text-yellow-600">300 - 1.000 Poin</span>
            </div>
            <ul className="space-y-1.5 text-sm text-yellow-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Diskon 10% + Layanan Free Ongkir Seluruh Riau</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Khusus Pembelian Kategori Buku Umum</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-yellow-200 flex justify-between items-center">
              <span className="text-xs text-yellow-600 font-medium">{tierStats.gold} Member</span>
              <span className="text-xs text-yellow-400">300 - 1.000 Poin</span>
            </div>
          </div>

          {/* Tier Silver */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-300 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaMedal className="text-gray-500 text-xl" />
                <h3 className="font-bold text-gray-700">TIER SILVER</h3>
              </div>
              <span className="text-xs font-bold text-gray-500">&lt; 300 Poin</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Diskon 5% Khusus Pembelian Kategori Buku Umum</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="text-xs text-gray-500 font-medium">{tierStats.silver} Member</span>
              <span className="text-xs text-gray-400">&lt; 300 Poin</span>
            </div>
          </div>

          {/* Total Members */}
          <div className="bg-white rounded-xl p-5 border border-[#D7DBEC] shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#7E84A3]">Total Member</p>
                <p className="text-2xl font-bold text-[#131523]">{tierStats.total}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">P: {tierStats.platinum}</span>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 text-xs rounded-full">G: {tierStats.gold}</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">S: {tierStats.silver}</span>
            </div>
          </div>
        </div>

        {/* Database Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] overflow-hidden">
          {/* Header Table */}
          <div className="px-6 py-4 border-b border-[#D7DBEC] flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-[#131523]">Database Tingkat Anggota</h2>
              <p className="text-sm text-[#7E84A3]">
                Ditemukan <span className="font-semibold text-[#131523]">{filteredCustomers.length}</span> pelanggan yang cocok
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filter Tier */}
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="px-3 py-1.5 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] bg-white"
              >
                <option value="all">Semua Tier</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </select>

              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3] text-sm" />
                <input
                  type="text"
                  placeholder="Cari nama atau ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] w-48"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F6FA]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#7E84A3] uppercase tracking-wider">
                    ID Pelanggan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#7E84A3] uppercase tracking-wider">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#7E84A3] uppercase tracking-wider">
                    Total Poin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#7E84A3] uppercase tracking-wider">
                    Status Tingkat (Tier)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#7E84A3] uppercase tracking-wider">
                    Total Kontribusi
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-[#7E84A3] uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F8]">
                {paginatedCustomers.map((customer, idx) => (
                  <tr key={customer.id_pelanggan || idx} className="hover:bg-[#F8F9FC] transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-[#1A5CFF]">
                      {customer.id_pelanggan}
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-[#131523]">
                      {customer.nama_pelanggan}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-[#131523]">
                      {formatPoints(customer.points)} Pts
                    </td>
                    <td className="px-6 py-3">
                      {getTierBadge(customer.tier, customer.points)}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-[#131523]">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetail(customer)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Detail"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEditClick(customer)}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(customer)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <FaUsers className="text-[#A1A7C4] text-4xl mb-3" />
                        <p className="text-[#7E84A3] font-medium">Tidak ada pelanggan yang ditemukan</p>
                        <p className="text-sm text-[#A1A7C4] mt-1">Coba ubah filter atau kata kunci pencarian</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-t border-[#D7DBEC] flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#7E84A3]">
                Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length} pelanggan
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-[#D7DBEC] hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronLeft size={12} />
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
                      className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#1A5CFF] text-white'
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
                  className="p-1.5 rounded-lg border border-[#D7DBEC] hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#A1A7C4] py-6 mt-6">
          <p className="font-medium">Jl. Paus No.73, Pekanbaru</p>
          <p className="mt-1">© 2025 Toko Buku Cendekia</p>
        </div>
      </div>

      {/* ============================================ */}
      {/* ADD MODAL */}
      {/* ============================================ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                <FaPlus className="w-5 h-5 text-[#1A5CFF]" />
                Tambah Member Loyalitas
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-[#F5F6FA] rounded-lg text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {formError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Pelanggan *</label>
                  <input
                    type="text"
                    name="nama_pelanggan"
                    value={formData.nama_pelanggan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Total Poin</label>
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Total Pengeluaran</label>
                  <input
                    type="number"
                    name="totalSpent"
                    value={formData.totalSpent}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E1E5F0]">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] flex items-center gap-2"
                >
                  <FaTimes className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleAddSubmit}
                  disabled={saving}
                  className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <FaSave className="w-4 h-4" />
                  {saving ? 'Menyimpan...' : 'Simpan Member'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* EDIT MODAL */}
      {/* ============================================ */}
      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                <FaEdit className="w-5 h-5 text-yellow-600" />
                Edit Member Loyalitas
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-[#F5F6FA] rounded-lg text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {formError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">ID Pelanggan</label>
                  <input
                    type="text"
                    value={selectedCustomer.id_pelanggan}
                    disabled
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Pelanggan *</label>
                  <input
                    type="text"
                    name="nama_pelanggan"
                    value={formData.nama_pelanggan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Total Poin</label>
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Total Pengeluaran</label>
                  <input
                    type="number"
                    name="totalSpent"
                    value={formData.totalSpent}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E1E5F0]">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] flex items-center gap-2"
                >
                  <FaTimes className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleEditSubmit}
                  disabled={saving}
                  className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <FaSave className="w-4 h-4" />
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* DETAIL MODAL */}
      {/* ============================================ */}
      {isDetailModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                <FaInfoCircle className="w-5 h-5 text-[#1A5CFF]" />
                Detail Member Loyalitas
              </h2>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedCustomer(null);
                }}
                className="p-2 hover:bg-[#F5F6FA] rounded-lg text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className={`bg-gradient-to-r rounded-xl p-4 ${
                selectedCustomer.tier === 'Platinum' 
                  ? 'from-purple-100 to-purple-200 border-2 border-purple-300'
                  : selectedCustomer.tier === 'Gold'
                  ? 'from-yellow-100 to-yellow-200 border-2 border-yellow-300'
                  : 'from-gray-100 to-gray-200 border-2 border-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#7E84A3] uppercase">ID Pelanggan</p>
                    <p className="font-bold text-[#1A5CFF]">{selectedCustomer.id_pelanggan}</p>
                  </div>
                  <div className="text-4xl">
                    {getTierIcon(selectedCustomer.tier)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#131523] mt-2">{selectedCustomer.nama_pelanggan}</h3>
                <div className="mt-2">
                  {getTierBadge(selectedCustomer.tier, selectedCustomer.points)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F5F6FA] rounded-lg p-3">
                  <p className="text-xs text-[#7E84A3] uppercase">Total Poin</p>
                  <p className="font-semibold text-[#131523] mt-1 text-lg">{formatPoints(selectedCustomer.points)} Pts</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-3">
                  <p className="text-xs text-[#7E84A3] uppercase">Total Pengeluaran</p>
                  <p className="font-semibold text-[#131523] mt-1 text-lg">{formatCurrency(selectedCustomer.totalSpent)}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-3 col-span-2">
                  <p className="text-xs text-[#7E84A3] uppercase">Tier</p>
                  <p className={`font-bold mt-1 ${
                    selectedCustomer.tier === 'Platinum' ? 'text-purple-600' :
                    selectedCustomer.tier === 'Gold' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {selectedCustomer.tier}
                  </p>
                </div>
              </div>

              {/* Aksi Tambah Poin */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm font-medium text-blue-700 mb-2">Tambah Poin</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      handleAddPoints(selectedCustomer, 10);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                  >
                    +10 Poin
                  </button>
                  <button
                    onClick={() => {
                      handleAddPoints(selectedCustomer, 50);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                  >
                    +50 Poin
                  </button>
                  <button
                    onClick={() => {
                      handleAddPoints(selectedCustomer, 100);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                  >
                    +100 Poin
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E1E5F0]">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setSelectedCustomer(null);
                  }}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA]"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleEditClick(selectedCustomer);
                  }}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* DELETE MODAL */}
      {/* ============================================ */}
      {isDeleteModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <FaTrash className="w-5 h-5" />
                <h3 className="text-lg font-bold">Yakin ingin menghapus?</h3>
              </div>
              <p className="text-[#7E84A3]">
                Member <span className="font-semibold text-[#131523]">"{selectedCustomer.nama_pelanggan}"</span> dengan ID <span className="font-semibold text-[#131523]">{selectedCustomer.id_pelanggan}</span> akan dihapus secara permanen.
              </p>
              <p className="text-[#7E84A3] mt-2">
                Semua data poin dan tier member ini akan hilang dan tidak bisa dikembalikan.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedCustomer(null);
                  }}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA]"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={saving}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                  {saving ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyPage;