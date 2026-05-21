// src/pages/CustomerDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp, FaEdit, FaTrash, FaUser, FaPhone, FaMapMarkerAlt, FaTag, FaTrophy, FaShoppingBag, FaCalendarAlt, FaClock, FaRegStar, FaStore, FaMobileAlt } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCustomerById, deleteCustomer, updateCustomer } from '../data/customers';
import { formatRupiah } from '../data/formatters';

// IMPORT KOMPONEN BARU
import Button from '../components/Button';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import PriceDisplay from '../components/PriceDisplay';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

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

  // PAKAI BADGE COMPONENT untuk status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'aktif': 
        return <Badge type="success">Aktif</Badge>;
      case 'tidak_aktif': 
        return <Badge type="danger">Tidak Aktif</Badge>;
      default: 
        return <Badge type="gray">{status}</Badge>;
    }
  };

  // PAKAI BADGE COMPONENT untuk member level
  const getMemberLevelBadge = (level) => {
    switch(level) {
      case 'gold': return <Badge type="gold">🏆 Gold</Badge>;
      case 'silver': return <Badge type="silver">🥈 Silver</Badge>;
      default: return <Badge type="gray">⭐ Reguler</Badge>;
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
    <Container>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-[#FDE7EA] rounded-full flex items-center justify-center mb-4">
          <FaTrash className="text-[#F0142F] text-3xl" />
        </div>
        <p className="text-[#F0142F] font-medium">{error}</p>
        <Link to="/customers" className="mt-4">
          <Button type="primary">Kembali ke Daftar Pelanggan</Button>
        </Link>
      </div>
    </Container>
  );

  return (
    <Container>
      {/* Header dengan tombol back - PAKAI PAGEHEADER */}
      <div className="flex items-center justify-between mb-6">
        <PageHeader 
          title="Detail Pelanggan" 
          description="Informasi lengkap profil pelanggan"
        />
        <div className="flex gap-3">
          <Button type="primary" onClick={() => setShowEditModal(true)}>
            <FaEdit size={14} className="inline mr-2" /> Edit Profil
          </Button>
          <Button type="danger" onClick={handleDelete}>
            <FaTrash size={14} className="inline mr-2" /> Hapus
          </Button>
        </div>
      </div>

      {/* Kartu Detail Pelanggan */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] overflow-hidden">
        {/* Header Profil dengan background gradien */}
        <div className="bg-gradient-to-r from-[#1E5EFF] to-[#608DFF] px-6 py-6">
          <div className="flex items-center gap-5">
            {/* PAKAI AVATAR COMPONENT */}
            <Avatar name={customer?.name} size="lg" className="w-20 h-20 text-3xl border-4 border-white shadow-lg" />
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

        {/* Body Kartu */}
        <div className="p-6">
          {/* Statistik Singkat - PAKAI PRICEDISPLAY */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#D7DBEC]">
            <div className="bg-[#F5F6FA] rounded-xl p-4 text-center">
              <PriceDisplay amount={customer?.totalSpent} className="text-2xl font-bold text-[#1E5EFF]" />
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

          {/* Informasi Tambahan */}
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

        {/* Tombol Aksi - PAKAI BUTTON COMPONENT */}
        <div className="bg-[#F5F6FA] px-6 py-4 border-t border-[#D7DBEC] flex justify-between items-center">
          <Link to="/customers">
            <Button type="secondary">
              <FaArrowLeft size={12} className="inline mr-2" /> Kembali ke Daftar
            </Button>
          </Link>
          <a
            href={`https://wa.me/${customer?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="success">
              <FaWhatsapp size={16} className="inline mr-2" /> Chat via WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* Modal Edit Customer - PAKAI MODAL COMPONENT dan INPUT FIELD */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profil Pelanggan"
        onConfirm={handleUpdate}
        confirmText="Simpan Perubahan"
        cancelText="Batal"
      >
        <form onSubmit={handleUpdate}>
          <InputField
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Masukkan nama lengkap"
            required
          />
          <InputField
            label="Nomor WhatsApp"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="628xxxxxxxxxx"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Alamat</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523]"
              rows="3"
              placeholder="Masukkan alamat lengkap"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
        </form>
      </Modal>
    </Container>
  );
}