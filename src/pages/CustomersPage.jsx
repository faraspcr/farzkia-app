// src/pages/CustomersPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaWhatsapp, FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCustomers, deleteCustomer, addCustomer, updateCustomer } from '../data/customers';
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
import SearchBar from '../components/SearchBar';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: 'mahasiswa_umum',
    status: 'aktif'
  });

  const itemsPerPage = 10;

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm, statusFilter, levelFilter]);

  const loadCustomers = () => {
    const data = getCustomers();
    const cleanedData = data.map(c => {
      if (c.status === 'dormant') {
        return { ...c, status: 'tidak_aktif' };
      }
      return c;
    });
    setCustomers(cleanedData);
    setLoading(false);
  };

  const filterCustomers = () => {
    let filtered = [...customers];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    if (levelFilter !== 'all') {
      filtered = filtered.filter(c => c.memberLevel === levelFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.phone.includes(searchTerm)
      );
    }
    
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus pelanggan ini?')) {
      deleteCustomer(id);
      loadCustomers();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setShowModal(false);
    setEditingCustomer(null);
    setFormData({ name: '', phone: '', address: '', category: 'mahasiswa_umum', status: 'aktif' });
    loadCustomers();
  };

  const openAddModal = () => {
    setEditingCustomer(null);
    setFormData({ name: '', phone: '', address: '', category: 'mahasiswa_umum', status: 'aktif' });
    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      category: customer.category,
      status: customer.status
    });
    setShowModal(true);
  };

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // HAPUS fungsi getAvatarColor dan getInitials karena sudah pakai Avatar component

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

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'ortu_murid': return 'Orang Tua';
      case 'santri': return 'Santri';
      case 'mahasiswa_umum': return 'Mahasiswa/Umum';
      default: return category;
    }
  };

  // PAKAI BADGE COMPONENT untuk member level
  const getMemberLevelBadge = (level) => {
    switch(level) {
      case 'gold': return <Badge type="gold">Gold</Badge>;
      case 'silver': return <Badge type="silver">Silver</Badge>;
      default: return <Badge type="gray">Reguler</Badge>;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Header - PAKAI PAGEHEADER dan BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <PageHeader title="Pelanggan" description="Kelola data pelanggan toko buku" />
        <Button type="primary" onClick={openAddModal}>
          <FaPlus size={14} className="inline mr-2" /> Tambah Pelanggan
        </Button>
      </div>

      {/* Filter dan Search - PAKAI SEARCHBAR */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] bg-white text-[#131523]"
          >
            <option value="all">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="tidak_aktif">Tidak Aktif</option>
          </select>

          <select 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] bg-white text-[#131523]"
          >
            <option value="all">Semua Level</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="reguler">Reguler</option>
          </select>

          <div className="flex-1">
            <SearchBar 
              placeholder="Cari nama atau nomor telepon..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D7DBEC] bg-[#F5F6FA]">
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Nama</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">No WhatsApp</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Kategori</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Level</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Status</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Total Belanja</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-[#D7DBEC] hover:bg-[#F5F6FA] transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {/* ✅ PAKAI AVATAR COMPONENT */}
                      <Avatar name={customer.name} size="sm" />
                      <Link 
                        to={`/customers/${customer.id}`} 
                        className="text-[#131523] font-medium hover:text-[#1E5EFF] hover:underline transition"
                      >
                        {customer.name}
                      </Link>
                    </div>
                   </td>
                  <td className="py-3 px-4 text-[#5A607F]">{customer.phone}</td>
                  <td className="py-3 px-4 text-[#5A607F]">{getCategoryLabel(customer.category)}</td>
                  <td className="py-3 px-4">{getMemberLevelBadge(customer.memberLevel)}</td>
                  <td className="py-3 px-4">{getStatusBadge(customer.status)}</td>
                  <td className="py-3 px-4">
                    <PriceDisplay amount={customer.totalSpent} className="font-semibold text-[#1E5EFF]" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <a 
                        href={`https://wa.me/${customer.phone}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#06A561] hover:text-green-700 transition"
                        title="WhatsApp"
                      >
                        <FaWhatsapp size={18} />
                      </a>
                      <button 
                        onClick={() => openEditModal(customer)}
                        className="text-[#1E5EFF] hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)}
                        className="text-[#F0142F] hover:text-red-700 transition"
                        title="Hapus"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - PAKAI BUTTON */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t border-[#D7DBEC]">
            <div className="text-sm text-[#7E84A3]">
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length} data
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="secondary"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2"
              >
                <FaChevronLeft size={14} />
              </Button>
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
                  <Button
                    key={idx}
                    type={currentPage === pageNum ? "primary" : "secondary"}
                    onClick={() => setCurrentPage(pageNum)}
                    className="px-3 py-1"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                type="secondary"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2"
              >
                <FaChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah/Edit Customer - PAKAI MODAL dan INPUT FIELD */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCustomer ? 'Edit Pelanggan' : 'Tambah Pelanggan'}
        onConfirm={handleSubmit}
        confirmText={editingCustomer ? 'Update' : 'Simpan'}
        cancelText="Batal"
      >
        <form onSubmit={handleSubmit}>
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
              className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] placeholder:text-[#A1A7C4] bg-white"
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
              <option value="ortu_murid">Orang Tua Murid</option>
              <option value="santri">Santri</option>
              <option value="mahasiswa_umum">Mahasiswa/Umum</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] bg-white"
            >
              <option value="aktif">Aktif</option>
              <option value="tidak_aktif">Tidak Aktif</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Footer */}
      <div className="text-center text-xs text-[#A1A7C4] py-4">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </Container>
  );
}