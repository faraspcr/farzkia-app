import { useState, useEffect } from 'react';
import { FaUsers, FaUserCheck, FaBox, FaShoppingCart, FaStar, FaTrophy, FaExclamationTriangle } from 'react-icons/fa';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StockAlert from '../components/StockAlert';
import { getCustomers } from '../data/customers';
import { getProducts } from '../data/products';
import { getTransactions } from '../data/transactions';
import { getFeedbacks } from '../data/feedbacks';
import { formatRupiah } from '../data/formatters';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = () => {
    const customers = getCustomers();
    const products = getProducts();
    const transactions = getTransactions();
    const feedbacks = getFeedbacks();
    setStats({
      customers: { total: customers.length, aktif: customers.filter(c => c.status === 'aktif').length },
      products: { total: products.length, lowStock: products.filter(p => p.stock < p.minStock).length },
      transactions: { total: transactions.length, thisMonthRevenue: transactions.reduce((s, t) => s + t.total, 0) },
      feedbacks: { total: feedbacks.length, averageRating: (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length || 0).toFixed(1), resolved: feedbacks.filter(f => f.status === 'resolved').length }
    });
    setLowStockProducts(products.filter(p => p.stock < p.minStock));
    setRecentFeedbacks([...feedbacks].reverse().slice(0, 5));
    setTopCustomers([...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5));
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Judul Dashboard */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard </h2>
      
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Pelanggan" value={stats?.customers.total || 0} icon={FaUsers} color="blue" trend="up" trendValue="12%" />
        <StatCard title="Pelanggan Aktif" value={stats?.customers.aktif || 0} icon={FaUserCheck} color="green" />
        <StatCard title="Total Transaksi" value={stats?.transactions.total || 0} icon={FaShoppingCart} color="purple" />
        <StatCard title="Pendapatan" value={formatRupiah(stats?.transactions.thisMonthRevenue || 0)} icon={FaBox} color="yellow" />
      </div>
      
      {/* Stock & Feedback Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Alert Card */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold mb-4 flex items-center text-gray-700">
            <FaExclamationTriangle className="text-yellow-500 mr-2" /> 
            Stok Menipis
          </h3>
          <StockAlert products={lowStockProducts} />
        </div>
        
        {/* Rating & Feedback Card */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold mb-4 flex items-center text-gray-700">
            <FaStar className="text-yellow-500 mr-2" /> 
            Rating & Feedback
          </h3>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-500">{stats?.feedbacks.averageRating || 0}</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">{stats?.feedbacks.total || 0}</p>
              <p className="text-sm text-gray-500">Feedback</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats?.feedbacks.resolved || 0}</p>
              <p className="text-sm text-gray-500">Selesai</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Customers & Recent Feedback Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers Card */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold mb-4 flex items-center text-gray-700">
            <FaTrophy className="text-yellow-500 mr-2" /> 
            Top 5 Pelanggan
          </h3>
          <div className="space-y-2">
            {topCustomers.map((c, idx) => (
              <div key={c.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-500 w-6">{idx + 1}.</span>
                  <div>
                    <p className="font-medium text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.memberLevel}</p>
                  </div>
                </div>
                <p className="font-semibold text-blue-600">{formatRupiah(c.totalSpent)}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Feedback Card */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold mb-4 text-gray-700">📝 Feedback Terbaru</h3>
          <div className="space-y-2">
            {recentFeedbacks.map(f => (
              <div key={f.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-800">{f.customerName}</p>
                  <div className="text-yellow-500 text-sm">
                    {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{f.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}