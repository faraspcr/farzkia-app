// src/pages/StockPage.jsx
import { useState, useEffect } from 'react';
import { FaEdit, FaExclamationTriangle, FaChevronLeft, FaChevronRight, FaBox } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts, updateProductStock, getLowStockProducts } from '../data/products';
import { formatRupiah } from '../data/formatters';

// IMPORT KOMPONEN YANG SUDAH ADA
import Button from '../components/Button';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';
import PriceDisplay from '../components/PriceDisplay';
import StockBadge from '../components/StockBadge';

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
    <Container>
      {/* PAKAI PAGEHEADER */}
      <PageHeader 
        title="Manajemen Stok" 
        description="Kelola stok produk toko buku"
      />

      {/* Alert Stok Menipis - PAKAI BADGE */}
      {lowStock.length > 0 && (
        <div className="bg-[#FFF9E1] border border-[#FFE582] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-[#F99600]" />
            <h3 className="font-semibold text-[#131523]">Stok Menipis</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(p => (
              <Badge key={p.id} type="warning">
                {p.name}: {p.stock}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filter Kategori + Search - PAKAI SEARCHBAR */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 mb-6">
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

          <div className="flex-1">
            <SearchBar 
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={setSearchTerm}
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
                  <td className="py-3 px-4">
                    {/* PAKAI PRICEDISPLAY */}
                    <PriceDisplay amount={p.price} className="font-semibold text-[#1E5EFF]" />
                  </td>
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
                    {/* PAKAI STOCKBADGE */}
                    <StockBadge stock={p.stock} minStock={p.minStock} />
                  </td>
                  <td className="py-3 px-4">
                    {editingId === p.id ? (
                      <div className="flex gap-2">
                        <Button type="success" onClick={() => handleUpdate(p.id)} size="sm">
                          Simpan
                        </Button>
                        <Button type="secondary" onClick={() => setEditingId(null)} size="sm">
                          Batal
                        </Button>
                      </div>
                    ) : (
                      <Button type="outline" onClick={() => { setEditingId(p.id); setNewStock(p.stock.toString()); }}>
                        <FaEdit className="text-lg" />
                      </Button>
                    )}
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
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)} dari {filteredProducts.length} produk
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#7E84A3]">Tidak ada produk yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#A1A7C4] py-4 mt-6">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </Container>
  );
}