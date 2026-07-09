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
  FaClipboardList,
  FaRocket,
  FaEye,
  FaCheck,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSpinner,
  FaInfoCircle,
  FaSearch
} from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  getPreorders, 
  updatePreorderStatus, 
  deletePreorder, 
  addPreorder, 
  updatePreorder 
} from '../data/preorders';
import { formatDate } from '../data/formatters';

const PreOrderPage = () => {
  const [preorders, setPreorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPreorder, setSelectedPreorder] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    customerName: '',
    customerPhone: '',
    requestDate: '',
    estimatedArrival: '',
    status: 'waiting_stock'
  });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');

  useEffect(() => {
    loadPreorders();
  }, []);

  const loadPreorders = () => {
    setLoading(true);
    setPreorders(getPreorders());
    setLoading(false);
  };

  // Filter preorders based on search
  const filteredPreorders = preorders.filter(preorder =>
    preorder.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preorder.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preorder.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ============================================
  // CRUD FUNCTIONS
  // ============================================

  // CREATE
  const handleAddSubmit = () => {
    if (!formData.productName.trim() || !formData.customerName.trim() || !formData.customerPhone.trim()) {
      setFormError('Nama produk, nama pelanggan, dan nomor telepon wajib diisi.');
      return;
    }

    setSaving(true);
    setFormError('');

    const newPreorder = {
      id: `PO-${String(preorders.length + 1).padStart(3, '0')}`,
      productName: formData.productName.trim(),
      customerName: formData.customerName.trim(),
      customerPhone: formData.customerPhone.trim(),
      requestDate: formData.requestDate || new Date().toISOString().split('T')[0],
      estimatedArrival: formData.estimatedArrival || '',
      status: formData.status || 'waiting_stock'
    };

    try {
      addPreorder(newPreorder);
      loadPreorders();
      setIsAddModalOpen(false);
      resetForm();
      showFeedback('Pre-order berhasil ditambahkan.', 'success');
    } catch (err) {
      setFormError('Gagal menambah pre-order. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  // READ - Detail
  const handleViewDetail = (preorder) => {
    setSelectedPreorder(preorder);
    setIsDetailModalOpen(true);
  };

  // UPDATE
  const handleEditClick = (preorder) => {
    setSelectedPreorder(preorder);
    setFormData({
      productName: preorder.productName,
      customerName: preorder.customerName,
      customerPhone: preorder.customerPhone,
      requestDate: preorder.requestDate,
      estimatedArrival: preorder.estimatedArrival || '',
      status: preorder.status
    });
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (!formData.productName.trim() || !formData.customerName.trim() || !formData.customerPhone.trim()) {
      setFormError('Nama produk, nama pelanggan, dan nomor telepon wajib diisi.');
      return;
    }

    setSaving(true);
    setFormError('');

    const updatedData = {
      ...selectedPreorder,
      productName: formData.productName.trim(),
      customerName: formData.customerName.trim(),
      customerPhone: formData.customerPhone.trim(),
      requestDate: formData.requestDate,
      estimatedArrival: formData.estimatedArrival || '',
      status: formData.status
    };

    try {
      updatePreorder(selectedPreorder.id, updatedData);
      loadPreorders();
      setIsEditModalOpen(false);
      resetForm();
      showFeedback('Pre-order berhasil diperbarui.', 'success');
    } catch (err) {
      setFormError('Gagal mengupdate pre-order. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDeleteClick = (preorder) => {
    setSelectedPreorder(preorder);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setSaving(true);
    try {
      deletePreorder(selectedPreorder.id);
      loadPreorders();
      setIsDeleteModalOpen(false);
      setSelectedPreorder(null);
      showFeedback('Pre-order berhasil dihapus.', 'success');
    } catch (err) {
      showFeedback('Gagal menghapus pre-order. Coba lagi.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // UPDATE STATUS
  const handleStatusUpdate = (preorder, newStatus) => {
    try {
      updatePreorderStatus(preorder.id, newStatus);
      loadPreorders();
      if (newStatus === 'notified') {
        showFeedback(`✅ Notifikasi akan dikirim ke ${preorder.customerName}`, 'success');
      } else if (newStatus === 'completed') {
        showFeedback(`✅ Pre-order ${preorder.productName} telah selesai`, 'success');
      } else {
        showFeedback(`Status berhasil diubah`, 'success');
      }
    } catch (err) {
      showFeedback('Gagal mengupdate status. Coba lagi.', 'error');
    }
  };

  // Helper functions
  const resetForm = () => {
    setFormData({
      productName: '',
      customerName: '',
      customerPhone: '',
      requestDate: '',
      estimatedArrival: '',
      status: 'waiting_stock'
    });
    setFormError('');
    setSelectedPreorder(null);
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
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#131523] flex items-center gap-3">
                <FaClipboardList className="w-7 h-7 text-[#1A5CFF]" />
                Pre-Order & Notifikasi Stok
              </h1>
              <p className="text-[#7E84A3] mt-1">Kelola permintaan pre-order dan notifikasi stok kosong</p>
              <p className="text-sm text-[#7E84A3] mt-1">Total data: {preorders.length} pre-order</p>
            </div>
            <button 
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2.5 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
            >
              <FaPlus size={16} />
              Tambah Pre-Order
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

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3]" />
            <input
              type="text"
              placeholder="Cari pre-order..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D7DBEC] rounded-xl focus:border-[#1A5CFF] focus:outline-none"
            />
          </div>
        </div>

        {/* Statistics Cards - DIHAPUS */}

        {/* Pre-Order Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPreorders.map((preorder, index) => {
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
                <div className="p-5">
                  {/* Status Badge & ID */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#7E84A3] bg-[#F5F6FA] px-2 py-0.5 rounded">
                        {preorder.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                        <StatusIcon className="inline mr-1 text-xs" />
                        {statusConfig.label}
                      </span>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewDetail(preorder)}
                        className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                        title="Detail"
                      >
                        <FaEye className="w-4 h-4 text-[#7E84A3] hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleEditClick(preorder)}
                        className="p-1.5 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4 text-[#7E84A3] hover:text-yellow-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(preorder)}
                        className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <FaTrash className="w-4 h-4 text-[#7E84A3] hover:text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-bold text-[#131523] text-lg mt-2">{preorder.productName}</h3>

                  {/* Progress Bar */}
                  <div className="mb-3 mt-3">
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

                  {/* Customer Info */}
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

                  {/* Action Buttons - Status Management */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {preorder.status === 'waiting_stock' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(preorder, 'notified')}
                          className="px-3 py-1.5 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg text-xs flex items-center gap-1.5 transition-all"
                        >
                          <FaBell size={11} />
                          Kirim Notifikasi
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(preorder, 'completed')}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition-all"
                        >
                          <FaCheck size={11} />
                          Selesai
                        </button>
                      </>
                    )}
                    {preorder.status === 'notified' && (
                      <button
                        onClick={() => handleStatusUpdate(preorder, 'completed')}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition-all"
                      >
                        <FaCheck size={11} />
                        Tandai Selesai
                      </button>
                    )}
                    <button
                      className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                        preorder.status !== 'completed'
                          ? 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                      }`}
                      disabled={preorder.status === 'completed'}
                      onClick={() => {
                        if (preorder.customerPhone) {
                          window.open(`https://wa.me/${preorder.customerPhone}`, '_blank');
                        } else {
                          showFeedback('Nomor telepon tidak tersedia', 'error');
                        }
                      }}
                    >
                      <FaWhatsapp size={13} />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : preorder.id)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#7E84A3] rounded-lg text-xs flex items-center gap-1.5 transition-all ml-auto"
                    >
                      <FaEye size={11} />
                      {isExpanded ? 'Tutup' : 'Lihat Detail'}
                    </button>
                  </div>
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
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredPreorders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClipboardList className="text-[#A1A7C4] text-4xl" />
            </div>
            <p className="text-[#7E84A3] font-medium">
              {searchTerm ? 'Tidak ada pre-order yang cocok dengan pencarian' : 'Belum ada permintaan pre-order'}
            </p>
            <p className="text-sm text-[#A1A7C4] mt-1">
              {searchTerm ? 'Coba dengan kata kunci lain' : 'Silakan tambahkan pre-order baru'}
            </p>
            <button 
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg text-sm"
            >
              <FaPlus size={12} />
              {searchTerm ? 'Tambah Pre-Order Baru' : 'Tambah Pre-Order Sekarang'}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-[#A1A7C4] py-6">
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
                Tambah Pre-Order Baru
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
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Produk *</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Buku Matematika Kelas 3"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Pelanggan *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">No Handphone *</label>
                  <input
                    type="text"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="6281234567890"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Tanggal Request</label>
                  <input
                    type="date"
                    name="requestDate"
                    value={formData.requestDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Estimasi Kedatangan</label>
                  <input
                    type="date"
                    name="estimatedArrival"
                    value={formData.estimatedArrival}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="waiting_stock">Menunggu Stok</option>
                    <option value="notified">Sudah Diberitahu</option>
                    <option value="completed">Sudah Terpenuhi</option>
                  </select>
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
                  {saving ? 'Menyimpan...' : 'Simpan Pre-Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* EDIT MODAL */}
      {/* ============================================ */}
      {isEditModalOpen && selectedPreorder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                <FaEdit className="w-5 h-5 text-yellow-600" />
                Edit Pre-Order
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
                  <label className="block text-sm font-medium text-[#131523] mb-1">ID Pre-Order</label>
                  <input
                    type="text"
                    value={selectedPreorder.id}
                    disabled
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Produk *</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Buku Matematika Kelas 3"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Pelanggan *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">No Handphone *</label>
                  <input
                    type="text"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="6281234567890"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Tanggal Request</label>
                  <input
                    type="date"
                    name="requestDate"
                    value={formData.requestDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Estimasi Kedatangan</label>
                  <input
                    type="date"
                    name="estimatedArrival"
                    value={formData.estimatedArrival}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="waiting_stock">Menunggu Stok</option>
                    <option value="notified">Sudah Diberitahu</option>
                    <option value="completed">Sudah Terpenuhi</option>
                  </select>
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
      {isDetailModalOpen && selectedPreorder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                <FaInfoCircle className="w-5 h-5 text-[#1A5CFF]" />
                Detail Pre-Order
              </h2>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedPreorder(null);
                }}
                className="p-2 hover:bg-[#F5F6FA] rounded-lg text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#7E84A3] uppercase">ID Pre-Order</p>
                    <p className="font-bold text-[#1A5CFF]">{selectedPreorder.id}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusConfig(selectedPreorder.status).bg} ${getStatusConfig(selectedPreorder.status).color}`}>
                    <span className="flex items-center gap-1">
                      {getStatusConfig(selectedPreorder.status).label}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#131523] mt-2">{selectedPreorder.productName}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F5F6FA] rounded-lg p-3">
                  <p className="text-xs text-[#7E84A3] uppercase">Nama Pelanggan</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedPreorder.customerName}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-3">
                  <p className="text-xs text-[#7E84A3] uppercase">No Handphone</p>
                  <p className="font-semibold text-[#131523] mt-1 font-mono">{formatPhoneNumber(selectedPreorder.customerPhone)}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-3">
                  <p className="text-xs text-[#7E84A3] uppercase">Tanggal Request</p>
                  <p className="font-semibold text-[#131523] mt-1">{formatDate(selectedPreorder.requestDate)}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-3">
                  <p className="text-xs text-[#7E84A3] uppercase">Estimasi Kedatangan</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedPreorder.estimatedArrival ? formatDate(selectedPreorder.estimatedArrival) : '-'}</p>
                </div>
              </div>

              <div className="bg-[#F5F6FA] rounded-lg p-3">
                <p className="text-xs text-[#7E84A3] uppercase">Progress</p>
                <div className="mt-2">
                  <div className="w-full h-2 bg-[#E1E5F0] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${getStatusConfig(selectedPreorder.status).progress}`}
                      style={{ width: `${getProgress(selectedPreorder.status)}%` }}
                    />
                  </div>
                  <p className="text-sm text-[#7E84A3] mt-1">
                    {getProgress(selectedPreorder.status)}% • {selectedPreorder.status === 'waiting_stock' ? 'Menunggu stok' : selectedPreorder.status === 'notified' ? 'Menunggu konfirmasi' : 'Selesai'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E1E5F0]">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setSelectedPreorder(null);
                  }}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA]"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleEditClick(selectedPreorder);
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
      {isDeleteModalOpen && selectedPreorder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <FaTrash className="w-5 h-5" />
                <h3 className="text-lg font-bold">Yakin ingin menghapus?</h3>
              </div>
              <p className="text-[#7E84A3]">
                Pre-order <span className="font-semibold text-[#131523]">"{selectedPreorder.productName}"</span> untuk pelanggan <span className="font-semibold text-[#131523]">"{selectedPreorder.customerName}"</span> akan dihapus secara permanen.
              </p>
              <p className="text-[#7E84A3] mt-2">
                Data ini akan hilang dan tidak bisa dikembalikan.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedPreorder(null);
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

export default PreOrderPage;