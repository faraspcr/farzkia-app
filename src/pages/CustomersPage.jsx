import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 👈 TAMBAHKAN IMPORT LINK
import { FaPlus, FaSearch, FaWhatsapp, FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCustomers, deleteCustomer, addCustomer, updateCustomer } from '../data/customers';
import { formatRupiah } from '../data/formatters';

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

  const getAvatarColor = (name) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500',
      'bg-teal-500', 'bg-cyan-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'aktif': 
        return <span className="px-2 py-1 rounded-full text-xs bg-[#DAF9EC] text-[#06A561]">Aktif</span>;
      case 'tidak_aktif': 
        return <span className="px-2 py-1 rounded-full text-xs bg-[#FDE7EA] text-[#F0142F]">Tidak Aktif</span>;
      default: 
        return <span className="px-2 py-1 rounded-full text-xs bg-[#E6E9F4] text-[#5A607F]">{status}</span>;
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

  const getMemberLevelBadge = (level) => {
    switch(level) {
      case 'gold': return <span className="px-2 py-1 rounded-full text-xs bg-[#FFF9E1] text-[#F99600]">Gold</span>;
      case 'silver': return <span className="px-2 py-1 rounded-full text-xs bg-[#E6E9F4] text-[#5A607F]">Silver</span>;
      default: return <span className="px-2 py-1 rounded-full text-xs bg-[#F5F6FA] text-[#7E84A3]">Reguler</span>;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#131523]">Pelanggan</h1>
        <button 
          onClick={openAddModal}
          className="bg-[#1E5EFF] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus size={14} /> Tambah Pelanggan
        </button>
      </div>

      {/* Filter dan Search */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4">
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
            <option value="all">All</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="reguler">Reguler</option>
          </select>

          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A7C4] text-sm" />
            <input
              type="text"
              placeholder="Cari nama atau nomor telepon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] text-[#131523] placeholder:text-[#A1A7C4] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Tabel Data - Nama menjadi LINK ke detail */}
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
                  {/* Kolom Nama - DIUBAH JADI LINK KE DETAIL */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(customer.name)}`}>
                        {getInitials(customer.name)}
                      </div>
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
                  <td className="py-3 px-4 font-semibold text-[#1E5EFF]">{formatRupiah(customer.totalSpent)}</td>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t border-[#D7DBEC]">
            <div className="text-sm text-[#7E84A3]">
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length} data
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#D7DBEC] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F6FA] text-[#5A607F]"
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
                    className={`px-3 py-1 rounded-lg transition ${
                      currentPage === pageNum
                        ? 'bg-[#1E5EFF] text-white'
                        : 'text-[#7E84A3] hover:bg-[#F5F6FA]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#D7DBEC] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F6FA] text-[#5A607F]"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah/Edit Customer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[#131523] mb-5">
              {editingCustomer ? 'Edit Pelanggan' : 'Tambah Pelanggan'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] placeholder:text-[#A1A7C4] bg-white"
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
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] placeholder:text-[#A1A7C4] bg-white"
                  placeholder="628xxxxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A607F] mb-1.5">Alamat</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] placeholder:text-[#A1A7C4] bg-white"
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
                  <option value="ortu_murid">Orang Tua Murid</option>
                  <option value="santri">Santri</option>
                  <option value="mahasiswa_umum">Mahasiswa/Umum</option>
                </select>
              </div>
              <div>
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
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#1E5EFF] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  {editingCustomer ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#F5F6FA] text-[#5A607F] py-2.5 rounded-lg font-medium hover:bg-[#E6E9F4] transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-[#A1A7C4] py-4">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </div>
  );
}