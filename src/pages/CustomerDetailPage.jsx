import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp, FaEdit, FaTrash, FaUser, FaPhone, FaMapMarkerAlt, FaTag, FaTrophy, FaShoppingBag, FaCalendarAlt, FaClock, FaRegStar, FaStore, FaMobileAlt } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCustomerById, deleteCustomer, updateCustomer } from '../data/customers';
import { formatRupiah } from '../data/formatters';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: '',
    status: ''
  });

  useEffect(() => {
    loadCustomer();
  }, [id]);

  const loadCustomer = () => {
    const data = getCustomerById(parseInt(id));
    if (!data) {
      setError('Pelanggan tidak ditemukan');
    } else {
      setCustomer(data);
      setFormData({
        name: data.name,
        phone: data.phone,
        address: data.address,
        category: data.category,
        status: data.status
      });
    }
    setLoading(false);
  };

  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus pelanggan ini?')) {
      deleteCustomer(parseInt(id));
      navigate('/customers');
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateCustomer(parseInt(id), formData);
    loadCustomer();
    setShowEditModal(false);
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'ortu_murid': return 'Orang Tua Murid';
      case 'santri': return 'Santri';
      case 'mahasiswa_umum': return 'Mahasiswa/Umum';
      default: return category;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'ortu_murid': return '👨‍👩‍👧';
      case 'santri': return '🕌';
      case 'mahasiswa_umum': return '🎓';
      default: return '📋';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'aktif': 
        return <span className="px-2 py-1 rounded-full text-xs bg-[#DAF9EC] text-[#06A561] font-medium">Aktif</span>;
      case 'tidak_aktif': 
        return <span className="px-2 py-1 rounded-full text-xs bg-[#FDE7EA] text-[#F0142F] font-medium">Tidak Aktif</span>;
      default: 
        return <span className="px-2 py-1 rounded-full text-xs bg-[#E6E9F4] text-[#5A607F]">{status}</span>;
    }
  };

  const getMemberLevelBadge = (level) => {
    switch(level) {
      case 'gold': return <span className="px-2 py-1 rounded-full text-xs bg-[#FFF9E1] text-[#F99600] font-medium flex items-center gap-1">🏆 Gold</span>;
      case 'silver': return <span className="px-2 py-1 rounded-full text-xs bg-[#E6E9F4] text-[#5A607F] font-medium flex items-center gap-1">🥈 Silver</span>;
      default: return <span className="px-2 py-1 rounded-full text-xs bg-[#F5F6FA] text-[#7E84A3] font-medium flex items-center gap-1">⭐ Reguler</span>;
    }
  };

  const getSourceIcon = (source) => {
    switch(source) {
      case 'offline': return <FaStore className="text-[#1E5EFF]" />;
      case 'whatsapp': return <FaWhatsapp className="text-[#06A561]" />;
      default: return <FaMobileAlt className="text-[#7E84A3]" />;
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-20 h-20 bg-[#FDE7EA] rounded-full flex items-center justify-center mb-4">
        <FaTrash className="text-[#F0142F] text-3xl" />
      </div>
      <p className="text-[#F0142F] font-medium">{error}</p>
      <Link to="/customers" className="mt-4 px-4 py-2 bg-[#1E5EFF] text-white rounded-lg hover:bg-blue-700 transition">
        Kembali ke Daftar Pelanggan
      </Link>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header dengan tombol back */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/customers" 
            className="p-2 rounded-lg border border-[#D7DBEC] hover:bg-[#F5F6FA] transition group"
          >
            <FaArrowLeft className="text-[#5A607F] group-hover:text-[#1E5EFF] transition" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#131523]">Detail Pelanggan</h1>
            <p className="text-sm text-[#7E84A3]">Informasi lengkap profil pelanggan</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 bg-[#1E5EFF] text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
          >
            <FaEdit size={14} /> Edit Profil
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-white border border-[#FDE7EA] text-[#F0142F] rounded-lg flex items-center gap-2 hover:bg-[#FDE7EA] transition"
          >
            <FaTrash size={14} /> Hapus
          </button>
        </div>
      </div>

      {/* Kartu Detail Pelanggan - Desain lebih bagus */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] overflow-hidden">
        {/* Header Profil dengan background gradien */}
        <div className="bg-gradient-to-r from-[#1E5EFF] to-[#608DFF] px-6 py-6">
          <div className="flex items-center gap-5">
            {/* Avatar besar dengan border putih */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[#1E5EFF] font-bold text-3xl">
                {customer?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{customer?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-blue-100 text-sm">ID: {customer?.id}</p>
                <span className="text-blue-200">•</span>
                <p className="text-blue-100 text-sm flex items-center gap-1">
                  {getCategoryIcon(customer?.category)} {getCategoryLabel(customer?.category)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body Kartu - Informasi Detail dengan grid yang lebih rapi */}
        <div className="p-6">
          {/* Statistik Singkat */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#D7DBEC]">
            <div className="bg-[#F5F6FA] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#1E5EFF]">{formatRupiah(customer?.totalSpent)}</p>
              <p className="text-xs text-[#7E84A3] mt-1">Total Belanja</p>
            </div>
            <div className="bg-[#F5F6FA] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#F99600]">{customer?.points || 0}</p>
              <p className="text-xs text-[#7E84A3] mt-1">Poin</p>
            </div>
            <div className="bg-[#F5F6FA] rounded-xl p-4 text-center">
              <div className="flex justify-center">{getMemberLevelBadge(customer?.memberLevel)}</div>
              <p className="text-xs text-[#7E84A3] mt-2">Member Level</p>
            </div>
          </div>

          {/* Informasi Detail 2 Kolom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* Kolom Kiri */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F5F6FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-[#1E5EFF] text-sm" />
                </div>
                <div>
                  <p className="text-xs text-[#A1A7C4] uppercase tracking-wide">Nomor WhatsApp</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[#131523] font-medium">{customer?.phone}</p>
                    <a 
                      href={`https://wa.me/${customer?.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#06A561] hover:text-green-700 transition"
                    >
                      <FaWhatsapp size={16} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F5F6FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-[#1E5EFF] text-sm" />
                </div>
                <div>
                  <p className="text-xs text-[#A1A7C4] uppercase tracking-wide">Alamat</p>
                  <p className="text-[#131523] mt-0.5">{customer?.address || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F5F6FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaTag className="text-[#1E5EFF] text-sm" />
                </div>
                <div>
                  <p className="text-xs text-[#A1A7C4] uppercase tracking-wide">Kategori</p>
                  <p className="text-[#131523] font-medium mt-0.5 flex items-center gap-1">
                    {getCategoryIcon(customer?.category)} {getCategoryLabel(customer?.category)}
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F5F6FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaTrophy className="text-[#1E5EFF] text-sm" />
                </div>
                <div>
                  <p className="text-xs text-[#A1A7C4] uppercase tracking-wide">Member Level</p>
                  <div className="mt-0.5">{getMemberLevelBadge(customer?.memberLevel)}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F5F6FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-[#1E5EFF] text-sm" />
                </div>
                <div>
                  <p className="text-xs text-[#A1A7C4] uppercase tracking-wide">Status</p>
                  <div className="mt-0.5">{getStatusBadge(customer?.status)}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F5F6FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  {getSourceIcon(customer?.registeredVia)}
                </div>
                <div>
                  <p className="text-xs text-[#A1A7C4] uppercase tracking-wide">Registrasi via</p>
                  <p className="text-[#131523] font-medium mt-0.5 capitalize">{customer?.registeredVia || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Tambahan - Timeline */}
          <div className="mt-6 pt-6 border-t border-[#D7DBEC]">
            <h3 className="text-sm font-semibold text-[#131523] mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-[#1E5EFF]" />
              Informasi Waktu
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#F5F6FA] rounded-lg p-3">
                <p className="text-[#7E84A3] text-xs">Bergabung sejak</p>
                <p className="text-[#131523] font-medium mt-1">{customer?.joinDate || '-'}</p>
              </div>
              <div className="bg-[#F5F6FA] rounded-lg p-3">
                <p className="text-[#7E84A3] text-xs">Terakhir transaksi</p>
                <p className="text-[#131523] font-medium mt-1">{customer?.lastTransaction || '-'}</p>
              </div>
              <div className="bg-[#F5F6FA] rounded-lg p-3">
                <p className="text-[#7E84A3] text-xs">Preferensi Produk</p>
                <p className="text-[#131523] font-medium mt-1">
                  {customer?.preferences?.length > 0 ? customer.preferences.slice(0, 2).join(', ') : '-'}
                  {customer?.preferences?.length > 2 && '...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="bg-[#F5F6FA] px-6 py-4 border-t border-[#D7DBEC] flex justify-between items-center">
          <Link
            to="/customers"
            className="px-4 py-2 border border-[#D7DBEC] rounded-lg text-[#5A607F] hover:bg-white transition flex items-center gap-2"
          >
            <FaArrowLeft size={12} /> Kembali ke Daftar
          </Link>
          <a
            href={`https://wa.me/${customer?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#06A561] text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-sm"
          >
            <FaWhatsapp size={16} /> Chat via WhatsApp
          </a>
        </div>
      </div>

      {/* Modal Edit Customer - Diperbagus */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-[#131523]">Edit Profil Pelanggan</h2>
              <button onClick={() => setShowEditModal(false)} className="text-[#A1A7C4] hover:text-[#5A607F] transition">
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523]"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523]"
                  placeholder="628xxxxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Alamat</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523]"
                  rows="3"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] bg-white"
                >
                  <option value="ortu_murid">👨‍👩‍👧 Orang Tua Murid</option>
                  <option value="santri">🕌 Santri</option>
                  <option value="mahasiswa_umum">🎓 Mahasiswa/Umum</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] bg-white"
                >
                  <option value="aktif">✅ Aktif</option>
                  <option value="tidak_aktif">❌ Tidak Aktif</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-[#1E5EFF] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
                  Simpan Perubahan
                </button>
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-[#F5F6FA] text-[#5A607F] py-2.5 rounded-lg font-medium hover:bg-[#E6E9F4] transition">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}