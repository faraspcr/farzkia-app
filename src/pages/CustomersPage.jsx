import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Users,
  RefreshCw,
  Calendar,
  Phone,
  MapPin,
  ShoppingBag,
  Star,
  User,
  X,
  Save,
  Loader2
} from 'lucide-react';

// ============================================
// KONFIGURASI SUPABASE
// ============================================
const API_URL = "https://ajzhvqiottyeodhhtyqb.supabase.co/rest/v1/pelanggan";
const API_KEY = "sb_publishable_g_qv9oZdohhB98Z33_AWuw_9cT4MS-E";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// headers khusus buat POST/PATCH biar Supabase balikin data barunya
const headersReturn = {
  ...headers,
  Prefer: "return=representation",
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [categoryFilter, setCategoryFilter] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addData, setAddData] = useState(null);
  const [addFormError, setAddFormError] = useState('');

  const itemsPerPage = 10;

  const emptyCustomerForm = () => ({
    nama_pelanggan: '',
    no_handphone: '',
    alamat: '',
    tgl_lahir: '',
    kategori_pelanggan: 'mahasiswa_umum',
    preferensi_produk: '',
    level_member: 'pembaca_baru',
    tgl_transaksi_terakhir: '',
    total_transaksi: 0,
    status_pelanggan: 'aktif',
    poin_loyalitas: 0,
    status_preorder: 'Tidak ada pre-order',
    aksi: ''
  });

  // ============================================
  // FETCH DATA DARI SUPABASE
  // ============================================
  const fetchCustomers = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.get(`${API_URL}?order=id_pelanggan.asc`, { headers });
      setCustomers(response.data);
    } catch (err) {
      console.error("Gagal fetch pelanggan:", err);
      setErrorMsg("Gagal memuat data pelanggan dari server. Cek koneksi atau konfigurasi Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Helper functions
  const getCategoryLabel = (category) => {
    const labels = {
      orang_tua_murid: '👨‍👩‍👧 Orang Tua Murid',
      santri: '🕌 Santri',
      mahasiswa_umum: '🎓 Mahasiswa/Umum'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      orang_tua_murid: 'bg-blue-100 text-blue-700',
      santri: 'bg-green-100 text-green-700',
      mahasiswa_umum: 'bg-purple-100 text-purple-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getMemberLevelBadge = (level) => {
    const badges = {
      pembaca_baru: { label: '📖 Pembaca Baru', color: 'bg-gray-100 text-gray-700' },
      pembaca_setia: { label: '⭐ Pembaca Setia', color: 'bg-blue-100 text-blue-700' },
      mitra_cendekia: { label: '🌟 Mitra Cendekia', color: 'bg-yellow-100 text-yellow-700' },
      loyal: { label: '💎 Loyal', color: 'bg-purple-100 text-purple-700' }
    };
    return badges[level] || badges.pembaca_baru;
  };

  const getStatusBadge = (status) => {
    const badges = {
      aktif: { label: '🟢 Aktif', color: 'bg-green-100 text-green-700' },
      tidak_aktif: { label: '🔴 Tidak Aktif', color: 'bg-red-100 text-red-700' },
      loyal: { label: '💛 Loyal', color: 'bg-yellow-100 text-yellow-700' }
    };
    return badges[status] || badges.aktif;
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

  const formatDateInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '-';
    if (phone.startsWith('62')) {
      return '+62 ' + phone.slice(2).replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  };

  // Filtering data
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.nama_pelanggan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id_pelanggan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.no_handphone?.includes(searchTerm);
    const matchesStatus = statusFilter === 'semua' || customer.status_pelanggan === statusFilter;
    const matchesCategory = categoryFilter === 'semua' || customer.kategori_pelanggan === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Hitung ID berikutnya secara berurutan, misal data terakhir CEND-010 -> CEND-011
  const getNextCustomerId = () => {
    const numbers = customers
      .map(c => {
        const match = c.id_pelanggan?.match(/CEND-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
    const nextNumber = maxNumber + 1;
    return `CEND-${String(nextNumber).padStart(3, '0')}`;
  };

  // ============================================
  // TAMBAH PELANGGAN -> buka form dulu, baru POST ke Supabase
  // ============================================
  const handleOpenAddModal = () => {
    setAddData(emptyCustomerForm());
    setAddFormError('');
    setIsAddOpen(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubmit = async () => {
    if (!addData.nama_pelanggan.trim() || !addData.no_handphone.trim()) {
      setAddFormError('Nama pelanggan dan No Handphone wajib diisi.');
      return;
    }

    setSaving(true);
    setAddFormError('');
    setErrorMsg('');

    const newCustomer = {
      id_pelanggan: getNextCustomerId(),
      nama_pelanggan: addData.nama_pelanggan.trim(),
      no_handphone: addData.no_handphone.trim(),
      alamat: addData.alamat || null,
      tgl_lahir: addData.tgl_lahir || null,
      kategori_pelanggan: addData.kategori_pelanggan,
      preferensi_produk: addData.preferensi_produk || null,
      level_member: addData.level_member,
      tgl_transaksi_terakhir: addData.tgl_transaksi_terakhir || null,
      total_transaksi: Number(addData.total_transaksi) || 0,
      status_pelanggan: addData.status_pelanggan,
      poin_loyalitas: Number(addData.poin_loyalitas) || 0,
      status_preorder: addData.status_preorder || 'Tidak ada pre-order',
      aksi: addData.aksi || null
    };

    try {
      const response = await axios.post(API_URL, newCustomer, { headers: headersReturn });
      const inserted = response.data[0];
      setCustomers(prev =>
        [...prev, inserted].sort((a, b) => a.id_pelanggan.localeCompare(b.id_pelanggan, undefined, { numeric: true }))
      );
      setIsAddOpen(false);
      setAddData(null);
    } catch (err) {
      console.error("Gagal menambah pelanggan:", err);
      setAddFormError("Gagal menambah pelanggan baru. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // EDIT PELANGGAN -> PATCH ke Supabase
  // ============================================
  const handleEditClick = (customer) => {
    setEditData({ ...customer });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    setSaving(true);
    setErrorMsg('');
    try {
      const response = await axios.patch(
        `${API_URL}?id_pelanggan=eq.${editData.id_pelanggan}`,
        editData,
        { headers: headersReturn }
      );
      const updated = response.data[0];
      setCustomers(prev =>
        prev.map(customer =>
          customer.id_pelanggan === updated.id_pelanggan ? updated : customer
        )
      );
      setIsEditOpen(false);
      setEditData(null);
    } catch (err) {
      console.error("Gagal update pelanggan:", err);
      setErrorMsg("Gagal menyimpan perubahan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // HAPUS PELANGGAN -> DELETE ke Supabase
  // ============================================
  const handleDelete = async () => {
    setSaving(true);
    setErrorMsg('');
    try {
      await axios.delete(
        `${API_URL}?id_pelanggan=eq.${customerToDelete.id_pelanggan}`,
        { headers }
      );
      setCustomers(prev =>
        prev.filter(customer => customer.id_pelanggan !== customerToDelete.id_pelanggan)
      );
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    } catch (err) {
      console.error("Gagal menghapus pelanggan:", err);
      setErrorMsg("Gagal menghapus pelanggan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#F0F2F8] min-h-screen p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#131523] flex items-center gap-3">
            <Users className="w-8 h-8 text-[#1A5CFF]" />
            Manajemen Pelanggan
          </h1>
          <p className="text-[#7E84A3] mt-1">Kelola data pelanggan toko buku Cendekia</p>
          <p className="text-sm text-[#7E84A3] mt-1">Total data: {customers.length} pelanggan</p>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {errorMsg}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-[#7E84A3] py-20">
            <Loader2 className="w-5 h-5 animate-spin" />
            Memuat data pelanggan dari server...
          </div>
        ) : (
        <>
        {/* Statistics Cards - DIHAPUS */}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari ID, nama, atau nomor telepon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-[#E1E5F0] rounded-lg focus:outline-none focus:border-[#1A5CFF]"
            >
              <option value="semua">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="tidak_aktif">Tidak Aktif</option>
              <option value="loyal">Loyal</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-[#E1E5F0] rounded-lg focus:outline-none focus:border-[#1A5CFF]"
            >
              <option value="semua">Semua Kategori</option>
              <option value="orang_tua_murid">Orang Tua Murid</option>
              <option value="santri">Santri</option>
              <option value="mahasiswa_umum">Mahasiswa/Umum</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('semua');
                setCategoryFilter('semua');
              }}
              className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={fetchCustomers}
              title="Muat ulang data dari Supabase"
              className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2 ml-auto"
            >
              <Plus className="w-4 h-4" />
              Tambah Pelanggan
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-[#F5F6FA]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-[#7E84A3]" />
                      ID Pelanggan
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-[#7E84A3]" />
                      Nama
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-[#7E84A3]" />
                      No HP
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#7E84A3]" />
                      Alamat
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#7E84A3]" />
                      Tgl Lahir
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    Kategori
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    Preferensi Produk
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#7E84A3]" />
                      Level
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#7E84A3]" />
                      Transaksi Terakhir
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4 text-[#7E84A3]" />
                      Total Transaksi
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[#131523] text-sm whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-[#131523] text-sm whitespace-nowrap">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-10 text-center text-[#7E84A3]">
                      Belum ada data pelanggan yang cocok.
                    </td>
                  </tr>
                ) : (
                paginatedCustomers.map((customer) => (
                  <tr key={customer.id_pelanggan} className="hover:bg-[#F8F9FC] transition-colors border-t border-[#E1E5F0]">
                    <td className="px-4 py-3 font-medium text-[#1A5CFF] text-sm whitespace-nowrap">
                      {customer.id_pelanggan}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-[#131523] text-sm">{customer.nama_pelanggan}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm whitespace-nowrap">
                      {formatPhoneNumber(customer.no_handphone)}
                    </td>
                    <td className="px-4 py-3 text-sm max-w-[150px] truncate">
                      {customer.alamat || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {formatDate(customer.tgl_lahir)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`${getCategoryColor(customer.kategori_pelanggan)} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>
                        {getCategoryLabel(customer.kategori_pelanggan)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm max-w-[150px] truncate">
                      {customer.preferensi_produk || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`${getMemberLevelBadge(customer.level_member).color} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>
                        {getMemberLevelBadge(customer.level_member).label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {formatDate(customer.tgl_transaksi_terakhir)}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-semibold">
                      {customer.total_transaksi || 0}x
                    </td>
                    <td className="px-4 py-3">
                      <span className={`${getStatusBadge(customer.status_pelanggan).color} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>
                        {getStatusBadge(customer.status_pelanggan).label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsDetailOpen(true);
                          }}
                          title="Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors"
                          onClick={() => handleEditClick(customer)}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                          onClick={() => {
                            setCustomerToDelete(customer);
                            setDeleteDialogOpen(true);
                          }}
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E1E5F0]">
            <p className="text-sm text-[#7E84A3]">
              Menampilkan {filteredCustomers.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length} pelanggan
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === pageNum
                        ? 'bg-[#1A5CFF] text-white'
                        : 'border border-[#E1E5F0] hover:bg-[#F5F6FA]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        </>
        )}
      </div>

      {/* Detail Modal */}
      {isDetailOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523]">Detail Pelanggan</h2>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-2 hover:bg-[#F5F6FA] rounded-lg text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-[#1A5CFF]/5 to-[#1A5CFF]/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#1A5CFF] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedCustomer.nama_pelanggan?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#131523]">{selectedCustomer.nama_pelanggan}</h3>
                    <p className="text-[#7E84A3]">{selectedCustomer.id_pelanggan}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">ID Pelanggan</p>
                  <p className="font-semibold text-[#1A5CFF] mt-1">{selectedCustomer.id_pelanggan}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Nama Pelanggan</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedCustomer.nama_pelanggan}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">No Handphone</p>
                  <p className="font-semibold text-[#131523] mt-1 font-mono">{formatPhoneNumber(selectedCustomer.no_handphone)}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4 col-span-2">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Alamat</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedCustomer.alamat || '-'}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Tanggal Lahir</p>
                  <p className="font-semibold text-[#131523] mt-1">{formatDate(selectedCustomer.tgl_lahir)}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Kategori</p>
                  <p className="font-semibold text-[#131523] mt-1">{getCategoryLabel(selectedCustomer.kategori_pelanggan)}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Preferensi Produk</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedCustomer.preferensi_produk || '-'}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Level Member</p>
                  <p className={`${getMemberLevelBadge(selectedCustomer.level_member).color} inline-block px-3 py-1 rounded-full text-sm font-medium mt-1`}>
                    {getMemberLevelBadge(selectedCustomer.level_member).label}
                  </p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Transaksi Terakhir</p>
                  <p className="font-semibold text-[#131523] mt-1">{formatDate(selectedCustomer.tgl_transaksi_terakhir)}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Total Transaksi</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedCustomer.total_transaksi || 0}x</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Status</p>
                  <p className={`${getStatusBadge(selectedCustomer.status_pelanggan).color} inline-block px-3 py-1 rounded-full text-sm font-medium mt-1`}>
                    {getStatusBadge(selectedCustomer.status_pelanggan).label}
                  </p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Poin Loyalitas</p>
                  <p className="font-semibold text-[#F59E0B] mt-1">{selectedCustomer.poin_loyalitas || 0} poin</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4 col-span-2">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Status Pre-Order</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedCustomer.status_preorder || '-'}</p>
                </div>
                <div className="bg-[#F5F6FA] rounded-lg p-4 col-span-2">
                  <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Aksi Terakhir</p>
                  <p className="font-semibold text-[#131523] mt-1">{selectedCustomer.aksi || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddOpen && addData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                <Plus className="w-6 h-6 text-[#1A5CFF]" />
                Tambah Pelanggan Baru
              </h2>
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setAddData(null);
                }}
                className="p-2 hover:bg-[#F5F6FA] rounded-lg text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              {addFormError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {addFormError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Pelanggan *</label>
                  <input
                    type="text"
                    name="nama_pelanggan"
                    value={addData.nama_pelanggan}
                    onChange={handleAddChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">No Handphone *</label>
                  <input
                    type="text"
                    name="no_handphone"
                    value={addData.no_handphone}
                    onChange={handleAddChange}
                    placeholder="6281234567890"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tgl_lahir"
                    value={addData.tgl_lahir}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Alamat</label>
                  <input
                    type="text"
                    name="alamat"
                    value={addData.alamat}
                    onChange={handleAddChange}
                    placeholder="Jl. Contoh No. 1, Kota"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Kategori Pelanggan *</label>
                  <select
                    name="kategori_pelanggan"
                    value={addData.kategori_pelanggan}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="orang_tua_murid">Orang Tua Murid</option>
                    <option value="santri">Santri</option>
                    <option value="mahasiswa_umum">Mahasiswa/Umum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Preferensi Produk</label>
                  <input
                    type="text"
                    name="preferensi_produk"
                    value={addData.preferensi_produk}
                    onChange={handleAddChange}
                    placeholder="Buku Pendidikan, Novel"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Level Member *</label>
                  <select
                    name="level_member"
                    value={addData.level_member}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="pembaca_baru">Pembaca Baru</option>
                    <option value="pembaca_setia">Pembaca Setia</option>
                    <option value="mitra_cendekia">Mitra Cendekia</option>
                    <option value="loyal">Loyal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Status Pelanggan *</label>
                  <select
                    name="status_pelanggan"
                    value={addData.status_pelanggan}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="tidak_aktif">Tidak Aktif</option>
                    <option value="loyal">Loyal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Tanggal Transaksi Terakhir</label>
                  <input
                    type="date"
                    name="tgl_transaksi_terakhir"
                    value={addData.tgl_transaksi_terakhir}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Total Transaksi</label>
                  <input
                    type="number"
                    name="total_transaksi"
                    value={addData.total_transaksi}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Poin Loyalitas</label>
                  <input
                    type="number"
                    name="poin_loyalitas"
                    value={addData.poin_loyalitas}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Status Pre-Order</label>
                  <input
                    type="text"
                    name="status_preorder"
                    value={addData.status_preorder}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Aksi Terakhir</label>
                  <input
                    type="text"
                    name="aksi"
                    value={addData.aksi}
                    onChange={handleAddChange}
                    placeholder="Membeli 3 buku"
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E1E5F0]">
                <button
                  onClick={() => {
                    setIsAddOpen(false);
                    setAddData(null);
                  }}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleAddSubmit}
                  disabled={saving}
                  className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Menyimpan...' : 'Simpan Pelanggan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && editData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E1E5F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#131523] flex items-center gap-2">
                <Edit className="w-6 h-6 text-yellow-600" />
                Edit Pelanggan
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
                  <label className="block text-sm font-medium text-[#131523] mb-1">ID Pelanggan</label>
                  <input
                    type="text"
                    name="id_pelanggan"
                    value={editData.id_pelanggan}
                    disabled
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Nama Pelanggan *</label>
                  <input
                    type="text"
                    name="nama_pelanggan"
                    value={editData.nama_pelanggan}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">No Handphone *</label>
                  <input
                    type="text"
                    name="no_handphone"
                    value={editData.no_handphone}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tgl_lahir"
                    value={formatDateInput(editData.tgl_lahir)}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Alamat</label>
                  <input
                    type="text"
                    name="alamat"
                    value={editData.alamat || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Kategori Pelanggan *</label>
                  <select
                    name="kategori_pelanggan"
                    value={editData.kategori_pelanggan}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="orang_tua_murid">Orang Tua Murid</option>
                    <option value="santri">Santri</option>
                    <option value="mahasiswa_umum">Mahasiswa/Umum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Preferensi Produk</label>
                  <input
                    type="text"
                    name="preferensi_produk"
                    value={editData.preferensi_produk || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Level Member *</label>
                  <select
                    name="level_member"
                    value={editData.level_member}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="pembaca_baru">Pembaca Baru</option>
                    <option value="pembaca_setia">Pembaca Setia</option>
                    <option value="mitra_cendekia">Mitra Cendekia</option>
                    <option value="loyal">Loyal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Status Pelanggan *</label>
                  <select
                    name="status_pelanggan"
                    value={editData.status_pelanggan}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="tidak_aktif">Tidak Aktif</option>
                    <option value="loyal">Loyal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Total Transaksi</label>
                  <input
                    type="number"
                    name="total_transaksi"
                    value={editData.total_transaksi || 0}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1">Poin Loyalitas</label>
                  <input
                    type="number"
                    name="poin_loyalitas"
                    value={editData.poin_loyalitas || 0}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Status Pre-Order</label>
                  <input
                    type="text"
                    name="status_preorder"
                    value={editData.status_preorder || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#131523] mb-1">Aksi Terakhir</label>
                  <input
                    type="text"
                    name="aksi"
                    value={editData.aksi || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-[#E1E5F0] rounded-lg focus:border-[#1A5CFF] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E1E5F0]">
                <button
                  onClick={() => {
                    setIsEditOpen(false);
                    setEditData(null);
                  }}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA] flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleEditSubmit}
                  disabled={saving}
                  className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Alert Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-lg font-bold">Yakin ingin menghapus?</h3>
              </div>
              <p className="text-[#7E84A3]">
                Pelanggan "{customerToDelete?.nama_pelanggan || 'Tidak Diketahui'}" akan dihapus secara permanen.
              </p>
              <p className="text-[#7E84A3] mt-2">
                Data pelanggan ini akan hilang dan tidak bisa dikembalikan.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="px-4 py-2 border border-[#E1E5F0] rounded-lg hover:bg-[#F5F6FA]"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
                >
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

export default CustomersPage;