import { useState, useEffect } from 'react';
import { FaFileExport, FaChartLine } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardStats } from '../data/dashboardStats';
import { formatRupiah } from '../data/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setStats(getDashboardStats()); setLoading(false); }, []);

  if (loading) return <LoadingSpinner />;
  const categoryData = stats?.salesByCategory ? Object.entries(stats.salesByCategory).map(([k, v]) => ({ name: k, value: v.revenue })) : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Laporan </h2><button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"><FaFileExport /> Export PDF</button></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div className="bg-white rounded-xl p-4"><p className="text-gray-500 text-sm">Total Pendapatan</p><p className="text-2xl font-bold text-blue-600">{formatRupiah(stats?.totalRevenue || 0)}</p></div><div className="bg-white rounded-xl p-4"><p className="text-gray-500 text-sm">Total Transaksi</p><p className="text-2xl font-bold">{stats?.totalTransactions || 0}</p></div><div className="bg-white rounded-xl p-4"><p className="text-gray-500 text-sm">Total Pelanggan</p><p className="text-2xl font-bold">{stats?.totalCustomers || 0}</p></div><div className="bg-white rounded-xl p-4"><p className="text-gray-500 text-sm">Gold Member</p><p className="text-2xl font-bold text-yellow-600">{stats?.goldMembers || 0}</p></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="bg-white rounded-xl shadow-md p-6"><h3 className="font-bold mb-4">📈 Penjualan per Kategori</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} dataKey="value"><Cell fill="#3B82F6" /><Cell fill="#10B981" /><Cell fill="#F59E0B" /><Cell fill="#8B5CF6" /><Cell fill="#EF4444" /></Pie><Tooltip formatter={(v) => formatRupiah(v)} /></PieChart></ResponsiveContainer></div>
        <div className="bg-white rounded-xl shadow-md p-6"><h3 className="font-bold mb-4">🏆 Top 5 Produk Terlaris</h3><div className="space-y-3">{stats?.topProducts?.map((p, idx) => (<div key={idx} className="flex items-center justify-between"><div><span className="text-gray-400 mr-2">{idx + 1}.</span>{p.name}</div><div className="flex items-center gap-3"><div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${(p.quantity / (stats.topProducts?.[0]?.quantity || 1)) * 100}%` }}></div></div><span className="text-sm font-semibold">{p.quantity} pcs</span></div></div>))}</div></div>
      </div>
    </div>
  );
}