import { useState } from 'react';
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
  Gift,
  ShoppingBag,
  Star,
  User,
  X,
  Save
} from 'lucide-react';

// Helper untuk generate data dummy
const generateCustomers = (count = 50) => {
  const firstNames = ['Budi', 'Aisyah', 'Rama', 'Siti', 'Ahmad', 'Maya', 'Hasan', 'Linda', 'Dewi', 'Rina', 'Andi', 'Rudi', 'Sari', 'Tono', 'Wati', 'Joko', 'Susi', 'Agus', 'Dian', 'Eko'];
  const lastNames = ['Santoso', 'Putri', 'Wijaya', 'Aminah', 'Fauzan', 'Sari', 'Hasan', 'Wati', 'Lestari', 'Surya', 'Pratama', 'Gunawan', 'Setiawan', 'Nugroho', 'Kusuma', 'Rahayu', 'Utami', 'Saputra', 'Hidayat', 'Permadi'];
  const categories = ['orang_tua_murid', 'santri', 'mahasiswa_umum'];
  const levels = ['pembaca_baru', 'pembaca_setia', 'mitra_cendekia', 'loyal'];
  const statuses = ['aktif', 'tidak_aktif', 'loyal'];
  const products = [
    'Buku Pendidikan, Novel',
    'Buku Agama, Motivasi',
    'Buku Teknologi, Fiksi',
    'Buku Anak, Pendidikan',
    'Buku Hadits, Fiqih',
    'Buku Psikologi, Novel',
    'Buku Tafsir, Doa',
    'Buku Cerita, Aktivitas',
    'Buku Sejarah, Biografi',
    'Buku Sains, Matematika'
  ];
  const preorders = ['Tidak ada pre-order', 'Menunggu konfirmasi', 'Sedang diproses', 'Selesai', 'Menunggu pembayaran'];
  const actions = ['Membeli 3 buku', 'Pre-order buku tafsir', 'Membeli novel terbaru', 'Membeli paket buku anak', 'Memesan kitab kuning', 'Pre-order mushaf', 'Membeli buku pelajaran', 'Membeli komik', 'Membeli majalah', 'Membeli buku resep'];

  const customers = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const year = Math.floor(Math.random() * 20) + 1970; // 1970-1990
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    
    const transYear = 2026;
    const transMonth = String(Math.floor(Math.random() * 6) + 1).padStart(2, '0');
    const transDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    
    customers.push({
      id_pelanggan: `CEND-${String(i).padStart(3, '0')}`,
      nama_pelanggan: `${firstName} ${lastName}`,
      no_handphone: `6281${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
      alamat: `Jl. ${['Merdeka', 'Sudirman', 'Thamrin', 'Gajah Mada', 'Hayam Wuruk', 'Diponegoro', 'Ahmad Yani', 'Pahlawan', 'Kartini', 'Imam Bonjol'][Math.floor(Math.random() * 10)]} No. ${Math.floor(Math.random() * 200) + 1}, ${['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Malang', 'Bekasi', 'Tangerang', 'Depok', 'Bogor'][Math.floor(Math.random() * 10)]}`,
      tgl_lahir: `${year}-${month}-${day}`,
      kategori_pelanggan: category,
      preferensi_produk: products[Math.floor(Math.random() * products.length)],
      level_member: level,
      tgl_transaksi_terakhir: `${transYear}-${transMonth}-${transDay}`,
      total_transaksi: Math.floor(Math.random() * 50) + 1,
      status_pelanggan: status,
      poin_loyalitas: Math.floor(Math.random() * 1500) + 10,
      status_preorder: preorders[Math.floor(Math.random() * preorders.length)],
      aksi: actions[Math.floor(Math.random() * actions.length)]
    });
  }
  
  return customers;
};

const CustomersPage = () => {
  // Generate 50 data dummy
  const [customers, setCustomers] = useState(generateCustomers(50));
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

  const itemsPerPage = 10;

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
    const matchesSearch = customer.nama_pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id_pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.no_handphone.includes(searchTerm);
    const matchesStatus = statusFilter === 'semua' || customer.status_pelanggan === statusFilter;
    const matchesCategory = categoryFilter === 'semua' || customer.kategori_pelanggan === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const stats = {
    total: customers.length,
    aktif: customers.filter(c => c.status_pelanggan === 'aktif').length,
    loyal: customers.filter(c => c.status_pelanggan === 'loyal').length,
    tidakAktif: customers.filter(c => c.status_pelanggan === 'tidak_aktif').length,
    mitraCendekia: customers.filter(c => c.level_member === 'mitra_cendekia').length,
    totalPoin: customers.reduce((sum, c) => sum + (c.poin_loyalitas || 0), 0)
  };

  // Handle Edit
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

  const handleEditSubmit = () => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id_pelanggan === editData.id_pelanggan ? editData : customer
      )
    );
    setIsEditOpen(false);
    setEditData(null);
  };

  // Handle Delete
  const handleDelete = () => {
    setCustomers(prev =>
      prev.filter(customer => customer.id_pelanggan !== customerToDelete.id_pelanggan)
    );
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  // Handle Tambah Data
  const handleAddCustomer = () => {
    const newCustomer = {
      id_pelanggan: `CEND-${String(customers.length + 1).padStart(3, '0')}`,
      nama_pelanggan: 'Pelanggan Baru',
      no_handphone: '6281000000000',
      alamat: 'Jl. Baru No. 1, Jakarta',
      tgl_lahir: '2000-01-01',
      kategori_pelanggan: 'mahasiswa_umum',
      preferensi_produk: 'Buku Umum',
      level_member: 'pembaca_baru',
      tgl_transaksi_terakhir: new Date().toISOString().split('T')[0],
      total_transaksi: 0,
      status_pelanggan: 'aktif',
      poin_loyalitas: 0,
      status_preorder: 'Tidak ada pre-order',
      aksi: '-'
    };
    setCustomers(prev => [...prev, newCustomer]);
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-[#7E84A3]">Total Pelanggan</p>
            <p className="text-2xl font-bold text-[#131523]">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg p-4">
            <p className="text-sm text-[#7E84A3]">Aktif</p>
            <p className="text-2xl font-bold text-green-600">{stats.aktif}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-[#7E84A3]">Loyal</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.loyal}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-lg p-4">
            <p className="text-sm text-[#7E84A3]">Tidak Aktif</p>
            <p className="text-2xl font-bold text-red-600">{stats.tidakAktif}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-[#7E84A3]">Mitra Cendekia</p>
            <p className="text-2xl font-bold text-purple-600">{stats.mitraCendekia}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-[#7E84A3]">Total Poin</p>
            <p className="text-2xl font-bold text-orange-600">{stats.totalPoin}</p>
          </div>
        </div>

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
              onClick={handleAddCustomer}
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
                {paginatedCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-[#F8F9FC] transition-colors border-t border-[#E1E5F0]">
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E1E5F0]">
            <p className="text-sm text-[#7E84A3]">
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length} pelanggan
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
              {/* Profile Header */}
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

              {/* Detail Grid - All Attributes */}
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
                  className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Hapus
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