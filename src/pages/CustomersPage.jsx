// src/pages/CustomersPage.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaWhatsapp, FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCustomers, deleteCustomer, addCustomer, updateCustomer } from '../data/customers';
import { formatRupiah } from '../data/formatters';

// IMPORT KOMPONEN
import Button from '../components/Button';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import PriceDisplay from '../components/PriceDisplay';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';

// IMPORT ALERT DIALOG
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  
  // STATE UNTUK ALERT DIALOG
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: 'mahasiswa_umum',
    status: 'aktif'
  });

  // USEREF UNTUK SEARCH BAR
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isSearchReady, setIsSearchReady] = useState(false);

  const itemsPerPage = 10;

  // LOAD DATA CUSTOMERS
  useEffect(() => {
    loadCustomers();
  }, []);

  // SETUP SEARCH BAR READY
  useEffect(() => {
    if (searchRef.current) {
      setIsSearchReady(true);
    }
  }, []);

  // AUTO FOCUS KE SEARCH BAR - UTAMA
  useEffect(() => {
    const focusSearchBar = () => {
      // Coba fokus via ref
      if (searchRef.current) {
        searchRef.current.focus();
        return true;
      }
      
      // Fallback: cari input di dalam container
      if (searchContainerRef.current) {
        const input = searchContainerRef.current.querySelector('input');
        if (input) {
          input.focus();
          return true;
        }
      }
      
      return false;
    };

    // Tunggu sebentar agar DOM siap
    const timer = setTimeout(() => {
      focusSearchBar();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // AUTO FOCUS KETIKA SEARCH BAR 
  useEffect(() => {
    if (isSearchReady && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchReady]);

  // AUTO FOCUS KETIKA LOADING SELESAI
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 50);
    }
  }, [loading]);

  // FILTER CUSTOMERS
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
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.phone.includes(searchTerm)
      );
    }
    
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  // FUNGSI HAPUS DENGAN ALERT DIALOG
  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete.id);
      loadCustomers();
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
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
      case 'ortu_murid': return 'Orang Tua Murid';
      case 'santri': return 'Santri';
      case 'mahasiswa_umum': return 'Mahasiswa/Umum';
      default: return category;
    }
  };

  const getMemberLevelBadge = (level) => {
    switch(level) {
      case 'gold': return <Badge type="gold">Gold</Badge>;
      case 'silver': return <Badge type="silver">Silver</Badge>;
      default: return <Badge type="gray">Reguler</Badge>;
    }
  };

  // HANDLE KEYBOARD SHORTCUT (Ctrl+F atau Cmd+F)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+F atau Cmd+F untuk fokus ke search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
          searchRef.current.select();
        }
      }
      
      // Escape untuk clear search
      if (e.key === 'Escape' && searchRef.current === document.activeElement) {
        setSearchTerm('');
        searchRef.current.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <PageHeader title="Pelanggan" description="Kelola data pelanggan toko buku" />
        <Button type="primary" onClick={openAddModal} className="whitespace-nowrap">
          <FaPlus size={14} className="inline mr-2" /> Tambah Pelanggan
        </Button>
      </div>

      {/* FILTER DAN SEARCH */}
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

          {/* SEARCHBAR DENGAN REF UNTUK AUTO FOCUS */}
          <div className="flex-1 min-w-[200px]" ref={searchContainerRef}>
            <SearchBar 
              placeholder="Cari nama atau nomor telepon... "
              value={searchTerm}
              onChange={setSearchTerm}
              ref={searchRef}
            />
          </div>

          {/* INDIKATOR JUMLAH HASIL */}
          {searchTerm && (
            <div className="text-sm text-[#7E84A3] whitespace-nowrap">
              Ditemukan: {filteredCustomers.length} data
            </div>
          )}
        </div>
      </div>

      {/* TABEL CUSTOMERS */}
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
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-[#D7DBEC] hover:bg-[#F5F6FA] transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
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
                          className="text-[#06A561] hover:text-green-700 transition p-1 hover:bg-green-50 rounded"
                          title="WhatsApp"
                        >
                          <FaWhatsapp size={18} />
                        </a>
                        <button 
                          onClick={() => openEditModal(customer)}
                          className="text-[#1E5EFF] hover:text-blue-700 transition p-1 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(customer)}
                          className="text-[#F0142F] hover:text-red-700 transition p-1 hover:bg-red-50 rounded"
                          title="Hapus"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-[#7E84A3]">
                    {searchTerm ? 'Tidak ada pelanggan yang sesuai dengan pencarian' : 'Belum ada data pelanggan'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-[#D7DBEC]">
            <div className="text-sm text-[#7E84A3]">
              Menampilkan {filteredCustomers.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length} data
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Button
                type="secondary"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2"
              >
                <FaChevronLeft size={14} />
              </Button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => {
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
                    className="px-3 py-1 min-w-[32px]"
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

      {/* MODAL TAMBAH/EDIT CUSTOMER */}
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
            autoFocus
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
            <label className="block text-sm font-medium text-[#5A607F] mb-1.5">
              Alamat
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] placeholder:text-[#A1A7C4] bg-white"
              rows="3"
              placeholder="Masukkan alamat lengkap"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#5A607F] mb-1.5">
              Kategori
            </label>
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
            <label className="block text-sm font-medium text-[#5A607F] mb-1.5">
              Status
            </label>
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

      {/* ALERT DIALOG KONFIRMASI HAPUS */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Pelanggan "{customerToDelete?.name}" akan dihapus secara permanen.
              {customerToDelete?.totalSpent > 0 && (
                <span className="block mt-2 text-red-600">
                  ⚠️ Pelanggan ini memiliki riwayat transaksi sebesar {formatRupiah(customerToDelete.totalSpent)}.
                </span>
              )}
              <span className="block mt-2">
                Data transaksi pelanggan ini juga akan ikut terhapus.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* FOOTER */}
      <div className="text-center text-xs text-[#A1A7C4] py-4 border-t border-[#D7DBEC] mt-6">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </Container>
  );
}