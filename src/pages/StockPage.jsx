import { useState, useEffect } from 'react';
import { FaEdit, FaExclamationTriangle, FaSearch, FaChevronLeft, FaChevronRight, FaBox } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts, updateProductStock, getLowStockProducts } from '../data/products';
import { formatRupiah } from '../data/formatters';

export default function StockPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleUpdate = (id) => {
    if (newStock !== '' && parseInt(newStock) >= 0) {
      updateProductStock(id, parseInt(newStock));
      loadProducts();
      setEditingId(null);
      setNewStock('');
    }
  };

  const lowStock = getLowStockProducts();

  const categories = [
    { value: 'all', label: 'Semua Produk' },
    { value: 'buku_paket_sd', label: 'Buku Paket SD' },
    { value: 'buku_paket_smp', label: 'Buku Paket SMP' },
    { value: 'kitab', label: 'Kitab Islam' },
    { value: 'alquran', label: 'Al-Qur\'an' },
    { value: 'kamus', label: 'Kamus' },
    { value: 'alat_tulis', label: 'Alat Tulis' }
  ];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#131523]">Manajemen Stok</h1>
        <p className="text-[#7E84A3]">Kelola stok produk toko buku</p>
      </div>

      {/* Alert Stok Menipis */}
      {lowStock.length > 0 && (
        <div className="bg-[#FFF9E1] border border-[#FFE582] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-[#F99600]" />
            <h3 className="font-semibold text-[#131523]">Stok Menipis</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(p => (
              <span key={p.id} className="bg-[#FFECA3] text-[#F99600] px-3 py-1 rounded-full text-sm">
                {p.name}: {p.stock}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter Kategori + Search */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4">
        <div className="flex flex-wrap items-center gap-4">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)} 
            className="px-3 py-2 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] bg-white text-[#131523]"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A7C4] text-sm" />
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] text-[#131523] placeholder:text-[#A1A7C4] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Tabel Stok */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D7DBEC] bg-[#F5F6FA]">
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Produk</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Harga</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Stok</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Min Stok</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Status</th>
                <th className="text-left py-3 px-4 text-[#7E84A3] font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id} className="border-b border-[#D7DBEC] hover:bg-[#F5F6FA] transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FaBox className="text-[#A1A7C4] text-sm" />
                      <span className="text-[#131523] font-medium">{p.name}</span>
                    </div>
                   </td>
                  <td className="py-3 px-4 font-semibold text-[#1E5EFF]">{formatRupiah(p.price)}</td>
                  <td className="py-3 px-4">
                    {editingId === p.id ? (
                      <input 
                        type="number" 
                        value={newStock} 
                        onChange={(e) => setNewStock(e.target.value)} 
                        className="w-24 px-2 py-1 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] text-[#131523]"
                        autoFocus 
                      />
                    ) : (
                      <span className={p.stock < p.minStock ? 'text-[#F0142F] font-bold' : 'text-[#131523]'}>
                        {p.stock}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#5A607F]">{p.minStock}</td>
                  <td className="py-3 px-4">
                    {p.stock < p.minStock ? (
                      <span className="px-2 py-1 rounded-full text-xs bg-[#FDE7EA] text-[#F0142F]">Menipis</span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs bg-[#DAF9EC] text-[#06A561]">Aman</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === p.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdate(p.id)} className="text-[#06A561] hover:text-green-700 text-sm font-medium">
                          Simpan
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-[#A1A7C4] hover:text-gray-600 text-sm font-medium">
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditingId(p.id); setNewStock(p.stock.toString()); }} className="text-[#1E5EFF] hover:text-blue-700 transition">
                        <FaEdit className="text-lg" />
                      </button>
                    )}
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
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)} dari {filteredProducts.length} produk
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#7E84A3]">Tidak ada produk yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#A1A7C4] py-4">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </div>
  );
}