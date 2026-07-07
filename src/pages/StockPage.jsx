// src/pages/StockPage.jsx
import { useState, useEffect, useRef } from 'react';
import { 
  FaEdit, 
  FaExclamationTriangle, 
  FaChevronLeft, 
  FaChevronRight, 
  FaBox,
  FaSearch,
  FaFilter,
  FaPlus,
  FaShoppingBag,
  FaBoxes,
  FaWarehouse,
  FaPercent,
  FaSave,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';
import { FiPackage, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts, updateProductStock, getLowStockProducts } from '../data/products';
import { formatRupiah } from '../data/formatters';

const StockPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openItemId, setOpenItemId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [tempStock, setTempStock] = useState('');

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const itemsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filterCategory, searchTerm]);

  const loadProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = [...products];
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setTempStock(product.stock.toString());
    setEditDialogOpen(true);
  };

  const confirmEdit = () => {
    if (productToEdit && tempStock !== '' && parseInt(tempStock) >= 0) {
      updateProductStock(productToEdit.id, parseInt(tempStock));
      loadProducts();
      setEditDialogOpen(false);
      setProductToEdit(null);
      setTempStock('');
    }
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
          searchRef.current.select();
        }
      }
      if (e.key === 'Escape' && searchRef.current === document.activeElement) {
        setSearchTerm('');
        searchRef.current.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus ke input dialog
  useEffect(() => {
    if (editDialogOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 100);
    }
  }, [editDialogOpen]);

  const lowStock = getLowStockProducts();

  // Statistics
  const stats = {
    total: products.length,
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    lowStock: lowStock.length,
    categories: new Set(products.map(p => p.category)).size
  };

  const categories = [
    { value: 'all', label: 'Semua Produk', icon: FaBoxes },
    { value: 'buku_paket_sd', label: '📚 Buku Paket SD' },
    { value: 'buku_paket_smp', label: '📚 Buku Paket SMP' },
    { value: 'kitab', label: '🕌 Kitab Islam' },
    { value: 'alquran', label: '📖 Al-Qur\'an' },
    { value: 'kamus', label: '📕 Kamus' },
    { value: 'alat_tulis', label: '✏️ Alat Tulis' }
  ];

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: 'Habis', color: 'bg-red-100 text-red-700' };
    if (stock <= minStock) return { label: 'Menipis', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Aman', color: 'bg-green-100 text-green-700' };
  };

  const getCategoryLabel = (category) => {
    const map = {
      buku_paket_sd: '📚 Buku Paket SD',
      buku_paket_smp: '📚 Buku Paket SMP',
      kitab: '🕌 Kitab Islam',
      alquran: '📖 Al-Qur\'an',
      kamus: '📕 Kamus',
      alat_tulis: '✏️ Alat Tulis'
    };
    return map[category] || category;
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#F0F2F8] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#131523] flex items-center gap-3">
                <FaWarehouse className="w-7 h-7 text-[#1A5CFF]" />
                Manajemen Stok
              </h1>
              <p className="text-[#7E84A3] mt-1">Kelola stok produk toko buku Cendekia</p>
            </div>
            <button className="px-5 py-2.5 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
              <FaPlus size={16} />
              Tambah Produk
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Total Produk</p>
                <p className="text-2xl font-bold text-[#131523] mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <FiPackage className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Total Stok</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.totalStock}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <FaBoxes className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Stok Menipis</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.lowStock}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                <FiTrendingDown className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7E84A3]">Kategori</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{stats.categories}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <FaFilter className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStock.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-5 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-yellow-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-[#131523] flex items-center gap-2">
                  Stok Menipis!
                  <span className="text-sm font-normal text-[#7E84A3]">({lowStock.length} produk)</span>
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {lowStock.map(p => (
                    <span key={p.id} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
                      <FaBox size={10} />
                      {p.name}: <strong>{p.stock}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-5 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3] text-sm" />
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)} 
                className="pl-9 pr-4 py-2.5 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] bg-white text-[#131523] appearance-none cursor-pointer hover:bg-[#F5F6FA] transition-colors"
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px] relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3]" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Cari nama produk... (Ctrl+F)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3] hover:text-[#131523]"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            {searchTerm && (
              <div className="text-sm text-[#7E84A3] whitespace-nowrap bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                <span className="font-semibold text-[#131523]">{filteredProducts.length}</span> produk ditemukan
              </div>
            )}
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {paginatedProducts.map((product) => {
            const status = getStockStatus(product.stock, product.minStock);
            const isExpanded = openItemId === product.id;

            return (
              <div
                key={product.id}
                className={`bg-white rounded-xl shadow-sm border transition-all ${
                  product.stock <= product.minStock 
                    ? 'border-yellow-200 hover:border-yellow-300' 
                    : 'border-[#D7DBEC] hover:border-[#B8BED8]'
                } hover:shadow-md`}
              >
                {/* Header - selalu terlihat */}
                <div
                  className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-[#F8F9FC] transition-colors"
                  onClick={() => setOpenItemId(isExpanded ? null : product.id)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      product.stock === 0 ? 'bg-red-100 text-red-600' :
                      product.stock <= product.minStock ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <FaBox className="text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#131523] truncate">{product.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-[#7E84A3]">{getCategoryLabel(product.category)}</span>
                        <span className="text-xs text-[#7E84A3]">•</span>
                        <span className="text-xs font-medium text-[#1A5CFF]">{formatRupiah(product.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className={`font-bold text-sm ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock <= product.minStock ? 'text-yellow-600' :
                        'text-[#131523]'
                      }`}>
                        {product.stock}
                      </p>
                      <p className="text-[10px] text-[#7E84A3]">stok</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(product);
                      }}
                      className="p-2 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <div className={`text-[#7E84A3] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <FaChevronRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Detail - expandable */}
                {isExpanded && (
                  <div className="px-5 py-4 bg-[#F8F9FC] border-t border-[#D7DBEC]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Harga</p>
                        <p className="font-semibold text-[#131523] mt-1">{formatRupiah(product.price)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Stok Saat Ini</p>
                        <p className={`font-bold text-lg mt-1 ${
                          product.stock === 0 ? 'text-red-600' :
                          product.stock <= product.minStock ? 'text-yellow-600' :
                          'text-[#131523]'
                        }`}>
                          {product.stock}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Minimal Stok</p>
                        <p className="font-semibold text-[#131523] mt-1">{product.minStock}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Status</p>
                        <div className="mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center gap-2 text-sm transition-all shadow-sm"
                      >
                        <FaEdit size={12} />
                        Ubah Stok
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBox className="text-[#A1A7C4] text-4xl" />
              </div>
              <p className="text-[#7E84A3] font-medium">Tidak ada produk yang ditemukan</p>
              <p className="text-sm text-[#A1A7C4] mt-1">Coba ubah filter atau cari dengan kata kunci lain</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                className="mt-4 px-4 py-2 text-sm text-[#1A5CFF] hover:bg-blue-50 rounded-lg transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#D7DBEC] mt-6">
            <p className="text-sm text-[#7E84A3]">
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)} dari {filteredProducts.length} produk
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

        {/* Edit Dialog */}
        {editDialogOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaEdit className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#131523]">Ubah Stok Produk</h3>
                </div>
                <p className="text-[#7E84A3]">
                  Ubah stok produk <span className="font-semibold text-[#131523]">"{productToEdit?.name}"</span>
                </p>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#131523] mb-1">
                    Stok Saat Ini: <span className="font-bold">{productToEdit?.stock}</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="number"
                      value={tempStock}
                      onChange={(e) => setTempStock(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      min="0"
                      placeholder="Masukkan jumlah stok baru"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          confirmEdit();
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-[#7E84A3] mt-1.5">💡 Tekan Enter untuk menyimpan</p>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setEditDialogOpen(false);
                      setProductToEdit(null);
                      setTempStock('');
                    }}
                    className="px-4 py-2 border border-[#D7DBEC] rounded-lg hover:bg-[#F5F6FA] transition-all flex items-center gap-2"
                  >
                    <FaTimes size={12} />
                    Batal
                  </button>
                  <button
                    onClick={confirmEdit}
                    className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg transition-all shadow-md shadow-blue-500/30 flex items-center gap-2"
                  >
                    <FaSave size={12} />
                    Simpan Perubahan
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

export default StockPage;