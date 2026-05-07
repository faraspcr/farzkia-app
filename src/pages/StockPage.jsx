import { useState, useEffect } from 'react';
import { FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts, updateProductStock, getLowStockProducts } from '../data/products';
import { formatRupiah } from '../data/formatters';

export default function StockPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [newStock, setNewStock] = useState('');

  useEffect(() => { loadProducts(); }, [filterCategory]);

  const loadProducts = () => { 
    setLoading(true); 
    setProducts(getProducts().filter(p => filterCategory === 'all' || p.category === filterCategory)); 
    setLoading(false); 
  };
  
  const handleUpdate = (id) => { 
    if (newStock !== '' && parseInt(newStock) >= 0) { 
      updateProductStock(id, parseInt(newStock)); 
      loadProducts(); 
      setEditingId(null); 
    } 
  };
  
  const lowStock = getLowStockProducts();
  
  const categories = [
    { value: 'all', label: '📦 Semua Produk' },
    { value: 'buku_paket_sd', label: '📚 Buku Paket SD' },
    { value: 'buku_paket_smp', label: '📚 Buku Paket SMP' },
    { value: 'kitab', label: '🕌 Kitab Islam' },
    { value: 'alquran', label: '📖 Al-Qur\'an' },
    { value: 'kamus', label: '📖 Kamus' },
    { value: 'alat_tulis', label: '✏️ Alat Tulis' }
  ];

  return (
    <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Stok</h2>
      
      {/* Alert Stok Menipis */}
      {lowStock.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Stok Menipis</h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {lowStock.map(p => (
              <span key={p.id} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {p.name}: {p.stock}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Filter Kategori */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)} 
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      
      {/* Tabel Stok */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Produk</th>
                <th className="p-3 text-left text-sm font-semibold">Harga</th>
                <th className="p-3 text-left text-sm font-semibold">Stok</th>
                <th className="p-3 text-left text-sm font-semibold">Min Stok</th>
                <th className="p-3 text-left text-sm font-semibold">Status</th>
                <th className="p-3 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{formatRupiah(p.price)}</td>
                  <td className="p-3">
                    {editingId === p.id ? (
                      <input 
                        type="number" 
                        value={newStock} 
                        onChange={(e) => setNewStock(e.target.value)} 
                        className="w-24 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        autoFocus 
                      />
                    ) : (
                      <span className={p.stock < p.minStock ? 'text-red-600 font-bold' : ''}>
                        {p.stock}
                      </span>
                    )}
                  </td>
                  <td className="p-3">{p.minStock}</td>
                  <td className="p-3">
                    {p.stock < p.minStock ? (
                      <span className="text-red-600 text-sm font-medium">⚠️ Menipis</span>
                    ) : (
                      <span className="text-green-600 text-sm font-medium">✅ Aman</span>
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === p.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdate(p.id)} className="text-green-600 hover:text-green-800 text-sm font-medium">
                          Simpan
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setEditingId(p.id); setNewStock(p.stock.toString()); }} 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}