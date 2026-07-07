// src/pages/ReportsPage.jsx
import { useState, useEffect } from 'react';
import { 
  FaFileExport, 
  FaChartLine, 
  FaChartPie, 
  FaChartBar,
  FaDownload,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaPrint,
  FaFilePdf,
  FaFileExcel,
  FaEye,
  FaTag,
  FaShoppingBag,
  FaUsers,
  FaTrophy,
  FaBox,
  FaStar,
  FaMedal,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiPackage,
  FiUsers
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardStats } from '../data/dashboardStats';
import { formatRupiah } from '../data/formatters';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const ReportsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [openCategoryId, setOpenCategoryId] = useState(null);

  useEffect(() => { 
    const data = getDashboardStats();
    // Tambahkan data kategori jika tidak ada
    if (!data.salesByCategory || Object.keys(data.salesByCategory).length === 0) {
      data.salesByCategory = {
        'Buku Paket SD': { revenue: 8500000, quantity: 42 },
        'Buku Paket SMP': { revenue: 6200000, quantity: 28 },
        'Kitab Islam': { revenue: 4300000, quantity: 15 },
        'Al-Quran': { revenue: 3900000, quantity: 12 },
        'Kamus': { revenue: 2800000, quantity: 18 },
        'Alat Tulis': { revenue: 1900000, quantity: 55 }
      };
      data.totalRevenue = Object.values(data.salesByCategory).reduce((sum, v) => sum + v.revenue, 0);
    }
    setStats(data); 
    setLoading(false); 
  }, []);

  if (loading) return <LoadingSpinner />;
  
  // Pastikan categoryData selalu ada
  const categoryData = stats?.salesByCategory ? Object.entries(stats.salesByCategory).map(([k, v]) => ({ 
    name: k, 
    value: v.revenue || 0,
    quantity: v.quantity || 0,
    percentage: stats?.totalRevenue > 0 ? (v.revenue / stats.totalRevenue) * 100 : 0
  })) : [];

  // Monthly data for chart
  const monthlyData = [
    { month: 'Jan', revenue: 12000000, orders: 45 },
    { month: 'Feb', revenue: 15000000, orders: 52 },
    { month: 'Mar', revenue: 18000000, orders: 58 },
    { month: 'Apr', revenue: 14000000, orders: 48 },
    { month: 'May', revenue: 22000000, orders: 65 },
    { month: 'Jun', revenue: 19000000, orders: 60 },
  ];

  const statCards = [
    { title: "Total Pendapatan", value: stats?.totalRevenue || 0, icon: FiDollarSign, color: "text-blue-600", bg: "bg-blue-50", isPrice: true },
    { title: "Total Transaksi", value: stats?.totalTransactions || 0, icon: FiPackage, color: "text-green-600", bg: "bg-green-50", isPrice: false },
    { title: "Total Pelanggan", value: stats?.totalCustomers || 0, icon: FiUsers, color: "text-purple-600", bg: "bg-purple-50", isPrice: false },
    { title: "Gold Member", value: stats?.goldMembers || 0, icon: FaStar, color: "text-yellow-600", bg: "bg-yellow-50", isPrice: false }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#F97316', '#EC4899'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (name) => {
    const icons = {
      'Buku Paket SD': '📚',
      'Buku Paket SMP': '📖',
      'Kitab Islam': '🕌',
      'Al-Quran': '📕',
      'Kamus': '📗',
      'Alat Tulis': '✏️'
    };
    return icons[name] || '📦';
  };

  // Top Products dummy jika tidak ada
  const topProducts = stats?.topProducts && stats.topProducts.length > 0 ? stats.topProducts : [
    { name: 'Buku Paket Matematika Kelas 6', quantity: 25 },
    { name: 'Al-Quran Terjemah Per Kata', quantity: 18 },
    { name: 'Buku Paket IPA Kelas 9', quantity: 15 },
    { name: 'Riyadhus Shalihin', quantity: 12 },
    { name: 'Kamus Inggris-Indonesia', quantity: 10 }
  ];

  return (
    <div className="bg-[#F0F2F8] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#131523] flex items-center gap-3">
                <FaChartLine className="w-7 h-7 text-[#1A5CFF]" />
                Laporan & Analisis
              </h1>
              <p className="text-[#7E84A3] mt-1">Analisis penjualan dan performa toko secara real-time</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2.5 bg-white border border-[#D7DBEC] rounded-xl flex items-center gap-2 hover:bg-[#F5F6FA] transition-all text-sm shadow-sm">
                <FaCalendarAlt size={14} />
                {selectedPeriod === 'month' ? 'Bulan Ini' : selectedPeriod === 'week' ? 'Minggu Ini' : 'Tahun Ini'}
              </button>
              <button className="px-4 py-2.5 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-500/30 text-sm">
                <FaFileExport size={14} />
                Export Laporan
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-[#D7DBEC] hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#7E84A3]">{card.title}</p>
                    {card.isPrice ? (
                      <p className={`text-2xl font-bold ${card.color} mt-1`}>{formatCurrency(card.value)}</p>
                    ) : (
                      <p className={`text-2xl font-bold ${card.color} mt-1`}>{card.value.toLocaleString()}</p>
                    )}
                  </div>
                  <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#131523] flex items-center gap-2">
                <FaChartBar className="text-[#1A5CFF]" />
                Tren Pendapatan
              </h3>
              <div className="flex gap-1">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 text-xs rounded-lg transition-all ${
                      selectedPeriod === period
                        ? 'bg-[#1A5CFF] text-white'
                        : 'bg-[#F5F6FA] text-[#7E84A3] hover:bg-[#E6E9F4]'
                    }`}
                  >
                    {period === 'week' ? 'Minggu' : period === 'month' ? 'Bulan' : 'Tahun'}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v) => `Rp${(v/1000000).toFixed(0)}jt`} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#131523] flex items-center gap-2">
                <FaChartPie className="text-[#1A5CFF]" />
                Penjualan per Kategori
              </h3>
              <span className="text-xs text-[#7E84A3]">Total: {formatCurrency(stats?.totalRevenue || 0)}</span>
            </div>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie 
                    data={categoryData} 
                    cx="50%" 
                    cy="50%" 
                    labelLine={false} 
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} 
                    outerRadius={90} 
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-[#7E84A3]">
                Belum ada data penjualan
              </div>
            )}
          </div>
        </div>

        {/* Top Products & Category Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6 lg:col-span-1">
            <h3 className="font-bold text-[#131523] flex items-center gap-2 mb-4">
              <FaTrophy className="text-yellow-500" />
              Top 5 Produk Terlaris
            </h3>
            <div className="space-y-4">
              {topProducts.map((p, idx) => {
                const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-lg">{medals[idx] || '⭐'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#131523] truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1.5 bg-[#F0F2F8] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700" 
                            style={{ width: `${(p.quantity / (topProducts[0]?.quantity || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[#131523]">{p.quantity} pcs</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Detail Accordion */}
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6 lg:col-span-2">
            <h3 className="font-bold text-[#131523] flex items-center gap-2 mb-4">
              <FaTag className="text-[#1A5CFF]" />
              Detail Penjualan per Kategori
              <span className="text-sm font-normal text-[#7E84A3]">({categoryData.length} kategori)</span>
            </h3>
            {categoryData.length > 0 ? (
              <div className="space-y-2">
                {categoryData.map((category, idx) => (
                  <div
                    key={idx}
                    className="border border-[#D7DBEC] rounded-lg overflow-hidden transition-all hover:border-blue-200"
                  >
                    <button
                      onClick={() => setOpenCategoryId(openCategoryId === category.name ? null : category.name)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#F8F9FC] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        <span className="font-medium text-[#131523]">{getCategoryIcon(category.name)} {category.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold text-[#1A5CFF]">{formatCurrency(category.value)}</span>
                        <span className="text-[#7E84A3] hidden sm:inline">{category.quantity} item</span>
                        <span className="text-[#7E84A3] hidden md:inline">{category.percentage.toFixed(1)}%</span>
                        <FaChevronLeft className={`text-[#7E84A3] transition-transform ${openCategoryId === category.name ? 'rotate-180' : '-rotate-90'}`} size={12} />
                      </div>
                    </button>
                    
                    {openCategoryId === category.name && (
                      <div className="px-4 py-4 bg-[#F8F9FC] border-t border-[#D7DBEC]">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Total Pendapatan</p>
                            <p className="font-bold text-lg text-[#1A5CFF] mt-1">{formatCurrency(category.value)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Jumlah Terjual</p>
                            <p className="font-bold text-lg text-[#131523] mt-1">{category.quantity} pcs</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Persentase</p>
                            <p className="font-bold text-lg text-[#131523] mt-1">{category.percentage.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Rata-rata per Item</p>
                            <p className="font-semibold text-[#131523] mt-1">{formatCurrency(category.value / (category.quantity || 1))}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#7E84A3]">
                <FaTag className="text-4xl mx-auto mb-3 text-[#D7DBEC]" />
                <p>Belum ada data penjualan per kategori</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 text-center">
            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Rata-rata Transaksi</p>
            <p className="text-lg font-bold text-[#131523] mt-1">
              {stats?.totalTransactions > 0 ? formatCurrency(stats.totalRevenue / stats.totalTransactions) : 'Rp 0'}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 text-center">
            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Total Item Terjual</p>
            <p className="text-lg font-bold text-[#131523] mt-1">
              {categoryData.reduce((sum, c) => sum + c.quantity, 0).toLocaleString()} pcs
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 text-center">
            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Kategori Produk</p>
            <p className="text-lg font-bold text-[#131523] mt-1">{categoryData.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 text-center">
            <p className="text-xs text-[#7E84A3] uppercase tracking-wider">Member Aktif</p>
            <p className="text-lg font-bold text-[#131523] mt-1">{stats?.activeMembers || 0}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#A1A7C4] py-6 mt-6">
          <p className="font-medium">Jl. Paus No.73, Pekanbaru</p>
          <p className="mt-1">© 2025 Toko Buku Cendekia</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;