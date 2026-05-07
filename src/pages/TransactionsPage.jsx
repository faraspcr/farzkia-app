import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTransactions } from '../data/transactions';
import { formatRupiah, formatShortDate, getStatusColor, getStatusLabel } from '../data/formatters';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { 
    setLoading(true); 
    setTransactions(getTransactions()); 
    setLoading(false); 
  }, []);

  const filtered = transactions.filter(t => 
    (filterStatus === 'all' || t.status === filterStatus) && 
    (t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.id.toString().includes(searchTerm))
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h2>
        <Link 
          to="/transactions/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Tambah
        </Link>
      </div>
      
      {/* Filter & Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)} 
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">📋 Semua Status</option>
            <option value="pesanan_diterima">📝 Diterima</option>
            <option value="diproses">⚙️ Diproses</option>
            <option value="siap_diambil">✅ Siap Diambil</option>
            <option value="selesai">🎉 Selesai</option>
          </select>
          
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari nama pelanggan atau ID transaksi..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
      </div>
      
      {/* Transactions Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Total</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Sumber</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-sm">#{t.id}</td>
                  <td className="p-3">{formatShortDate(t.orderDate)}</td>
                  <td className="p-3 font-medium">{t.customerName}</td>
                  <td className="p-3 font-semibold text-blue-600">{formatRupiah(t.total)}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      t.source === 'offline' ? 'bg-blue-100 text-blue-700' : 
                      t.source === 'whatsapp' ? 'bg-green-100 text-green-700' : 
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {t.source === 'offline' ? '🏪 Offline' : 
                       t.source === 'whatsapp' ? '📱 WhatsApp' : '🛍️ Shopee'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(t.status)}`}>
                      {getStatusLabel(t.status)}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link to={`/tracking/${t.id}`} className="text-blue-600 hover:text-blue-800" title="Lihat Tracking">
                      <FaEye className="text-lg" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}