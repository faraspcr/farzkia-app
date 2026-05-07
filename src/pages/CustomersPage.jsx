import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch } from 'react-icons/fa';
import CustomerTable from '../components/CustomerTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCustomers, deleteCustomer, getCustomersByCategory } from '../data/customers';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { loadCustomers(); }, [filterCategory, searchTerm]);

  const loadCustomers = () => {
    let data = filterCategory === 'all' ? getCustomers() : getCustomersByCategory(filterCategory);
    if (searchTerm) data = data.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm));
    setCustomers(data);
    setLoading(false);
  };

  const handleDelete = (id) => { 
    if (window.confirm('Yakin ingin menghapus pelanggan ini?')) { 
      deleteCustomer(id); 
      loadCustomers(); 
    } 
  };

  return (
    <div>
      {/* Header with Title and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Pelanggan
        </h2>
        <Link 
          to="/customers/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Tambah Pelanggan
        </Link>
      </div>
      
      {/* Filter and Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)} 
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">📋 Semua Kategori</option>
            <option value="ortu_murid">👨‍👩‍👧 Orang Tua Murid</option>
            <option value="santri">🕌 Santri</option>
            <option value="mahasiswa_umum">🎓 Mahasiswa/Umum</option>
          </select>
          
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari nama atau nomor telepon..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
      </div>
      
      {/* Customer Table */}
      {loading ? <LoadingSpinner /> : <CustomerTable customers={customers} onDelete={handleDelete} />}
      
      {/* Empty State */}
      {!loading && customers.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Belum ada data pelanggan</p>
          <Link to="/customers/add" className="text-blue-600 hover:underline mt-2 inline-block">
            Tambah pelanggan sekarang
          </Link>
        </div>
      )}
    </div>
  );
}