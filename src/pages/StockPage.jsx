// src/pages/StockPage.jsx
import { useState, useEffect, useRef } from 'react';
import { FaEdit, FaExclamationTriangle, FaChevronLeft, FaChevronRight, FaBox } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts, updateProductStock, getLowStockProducts } from '../data/products';
import { formatRupiah } from '../data/formatters';

import Button from '../components/Button';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';
import PriceDisplay from '../components/PriceDisplay';
import StockBadge from '../components/StockBadge';

// IMPORT ACCORDION
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function StockPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openItemId, setOpenItemId] = useState(null);

  // STATE UNTUK ALERT DIALOG EDIT STOK
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [tempStock, setTempStock] = useState('');

  // ✅ USEREF UNTUK AUTO-FOCUS
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null); // Untuk input di AlertDialog

  const itemsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ AUTO-FOCUS KE SEARCH BAR
  useEffect(() => {
    const focusSearch = () => {
      if (searchRef.current) {
        searchRef.current.focus();
        return true;
      }
      if (searchContainerRef.current) {
        const input = searchContainerRef.current.querySelector('input');
        if (input) {
          input.focus();
          return true;
        }
      }
      return false;
    };

    const timer = setTimeout(focusSearch, 150);
    return () => clearTimeout(timer);
  }, []);

  // ✅ AUTO-FOCUS ULANG SETELAH LOADING SELESAI
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 100);
    }
  }, [loading]);

  // ✅ AUTO-FOCUS KE INPUT ALERT DIALOG
  useEffect(() => {
    if (editDialogOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select(); // Select semua teks
      }, 100);
    }
  }, [editDialogOpen]);

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

  // ✅ SHORTCUT KEYBOARD
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
      <PageHeader 
        title="Manajemen Stok" 
        description="Kelola stok produk toko buku"
      />

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

          {/* ✅ SEARCHBAR DENGAN REF UNTUK AUTO-FOCUS */}
          <div className="flex-1 min-w-[200px]" ref={searchContainerRef}>
            <SearchBar 
              placeholder="Cari nama produk... (Ctrl+F)"
              value={searchTerm}
              onChange={setSearchTerm}
              ref={searchRef}
            />
          </div>

          {/* INDIKATOR JUMLAH HASIL */}
          {searchTerm && (
            <div className="text-sm text-[#7E84A3] whitespace-nowrap">
              Ditemukan: {filteredProducts.length} produk
            </div>
          )}
        </div>
      </div>

      {/* ACCORDION LIST PRODUK */}
      <div className="space-y-3">
        {paginatedProducts.map((product) => (
          <Accordion 
            key={product.id} 
            type="single" 
            collapsible 
            className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] overflow-hidden"
            value={openItemId}
            onValueChange={setOpenItemId}
          >
            <AccordionItem value={product.id} className="border-0">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[#F5F6FA]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <FaBox className="text-[#A1A7C4] text-sm" />
                    <span className="text-[#131523] font-medium">{product.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <PriceDisplay amount={product.price} className="font-semibold text-[#1E5EFF]" />
                    <span className={product.stock < product.minStock ? 'text-[#F0142F] font-bold' : 'text-[#131523]'}>
                      Stok: {product.stock}
                    </span>
                    <StockBadge stock={product.stock} minStock={product.minStock} />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-4 bg-[#F5F6FA] border-t border-[#D7DBEC]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[#7E84A3]">Harga</p>
                    <PriceDisplay amount={product.price} className="font-semibold text-[#131523]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7E84A3]">Stok Saat Ini</p>
                    <p className={`font-semibold ${product.stock < product.minStock ? 'text-[#F0142F]' : 'text-[#131523]'}`}>
                      {product.stock}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7E84A3]">Minimal Stok</p>
                    <p className="font-semibold text-[#131523]">{product.minStock}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7E84A3]">Status</p>
                    <StockBadge stock={product.stock} minStock={product.minStock} />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button type="outline" onClick={() => handleEditClick(product)}>
                    <FaEdit className="mr-2" /> Ubah Stok
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-8 text-center">
            <p className="text-[#7E84A3]">Tidak ada produk yang ditemukan</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-[#D7DBEC] mt-6">
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

      {/* ALERT DIALOG DENGAN AUTO-FOCUS PADA INPUT */}
      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ubah Stok Produk</AlertDialogTitle>
            <AlertDialogDescription>
              Ubah stok produk "{productToEdit?.name}" dari {productToEdit?.stock} menjadi:
              <input 
                ref={inputRef} // ✅ REF UNTUK AUTO-FOCUS
                type="number" 
                value={tempStock} 
                onChange={(e) => setTempStock(e.target.value)} 
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]"
                min="0"
                placeholder="Masukkan jumlah stok baru"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmEdit();
                  }
                }}
              />
              <p className="text-xs text-gray-400 mt-1">Tekan Enter untuk menyimpan</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEdit} className="bg-[#1E5EFF] hover:bg-blue-700">
              Simpan Perubahan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="text-center text-xs text-[#A1A7C4] py-4 mt-6">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </Container>
  );
}