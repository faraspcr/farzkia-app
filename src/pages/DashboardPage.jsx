// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { 
  FaExclamationTriangle, 
  FaStar, 
  FaArrowUp,
  FaClock,
  FaCheckCircle,
  FaWhatsapp
} from 'react-icons/fa';
import { 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardStats } from '../data/dashboardStats';
import { formatRupiah } from '../data/formatters';
import Button from '../components/Button';
import Badge from '../components/Badge';
import PriceDisplay from '../components/PriceDisplay';
import SectionTitle from '../components/SectionTitle';
import PageHeader from '../components/PageHeader';

// DATA SEGMENTASI PELANGGAN
const segmentData = [
  { name: 'Pelajar', value: 85, color: '#1E5EFF', icon: '🎒' },
  { name: 'Mahasiswa', value: 120, color: '#4A7FFF', icon: '🎓' },
  { name: 'Santri', value: 65, color: '#10B981', icon: '🕌' },
  { name: 'Umum', value: 180, color: '#F59E0B', icon: '👤' },
];

// DATA KATEGORI BUKU TERLARIS
const topCategories = [
  { name: 'Buku Umum', sold: 320 },
  { name: 'Buku Islami', sold: 245 },
  { name: 'Buku Paket', sold: 180 },
];

// DATA TREND PENJUALAN
const trendData = [
  { range: '5k', percentage: 25 },
  { range: '10k', percentage: 50 },
  { range: '15k', percentage: 35 },
  { range: '20k', percentage: 95 },
  { range: '25k', percentage: 45 },
  { range: '30k', percentage: 55 },
  { range: '35k', percentage: 25 },
  { range: '40k', percentage: 62 },
  { range: '45k', percentage: 60 },
  { range: '50k', percentage: 58 },
  { range: '55k', percentage: 40 },
  { range: '60k', percentage: 42 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = () => {
      const data = getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;

  const recentActivities = [
    { id: 1, customer: 'Budi Santoso', amount: 170000, status: 'pending', time: '2 jam lalu' },
    { id: 2, customer: 'Siti Rahayu', amount: 150000, status: 'pending', time: '3 jam lalu' },
    { id: 3, customer: 'Ahmad Fauzi', amount: 300000, status: 'pending', time: '4 jam lalu' },
    { id: 4, customer: 'Dewi Kartika', amount: 145000, status: 'pending', time: '5 jam lalu' },
    { id: 5, customer: 'Rizky Pratama', amount: 340000, status: 'pending', time: '6 jam lalu' },
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/6281234567890?text=Halo%20Admin%20Toko%20Buku%20Cendekia', '_blank');
  };

  return (
    <div className="w-full pb-8 relative">
      {/* PAGE HEADER */}
      <PageHeader 
        title="Dashboard" 
        description="Ringkasan performa toko dan aktivitas terbaru"
      />

      {/* ============================================================ */}
      {/* STAT CARDS - 4 kolom */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Card 1: Total Pendapatan */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#D7DBEC] hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-[#7E84A3]">Total Pendapatan</p>
            <span className="text-xl">💰</span>
          </div>
          <p className="text-2xl font-bold text-[#131523]">Rp 4.150.000</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">↑ 12.5%</span>
            <span className="text-xs text-[#A1A7C4]">dari bulan lalu</span>
          </div>
        </div>

        {/* Card 2: Total Pesanan */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#D7DBEC] hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-[#7E84A3]">Total Pesanan</p>
            <span className="text-xl">📦</span>
          </div>
          <p className="text-2xl font-bold text-[#131523]">30</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">↑ 8.2%</span>
            <span className="text-xs text-[#A1A7C4]">dari bulan lalu</span>
          </div>
        </div>

        {/* Card 3: Total Pelanggan */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#D7DBEC] hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-[#7E84A3]">Total Pelanggan</p>
            <span className="text-xl">👥</span>
          </div>
          <p className="text-2xl font-bold text-[#131523]">128</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">↑ 5.7%</span>
            <span className="text-xs text-[#A1A7C4]">dari bulan lalu</span>
          </div>
        </div>

        {/* Card 4: Buku Terjual */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#D7DBEC] hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-[#7E84A3]">Buku Terjual</p>
            <span className="text-xl">📚</span>
          </div>
          <p className="text-2xl font-bold text-[#131523]">745</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">↑ 15.3%</span>
            <span className="text-xs text-[#A1A7C4]">dari bulan lalu</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CHART 1: LINE CHART - TREND AKTIVITAS PENJUALAN */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-[#D7DBEC] hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <SectionTitle title="📈 Tren Aktivitas Penjualan" className="border-0 p-0 m-0" />
                <Badge type="info" size="xs" className="ml-2">Line Chart</Badge>
              </div>
              <p className="text-xs text-[#A1A7C4]">Menunjukkan persentase penjualan per rentang harga</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-[#1E5EFF] border-t-2 border-[#1E5EFF]"></div>
                <span className="text-[#5A607F] font-medium">Mei</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" vertical={false} />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 11, fill: '#A1A7C4' }} 
                axisLine={false} 
                tickLine={false}
                label={{ value: 'Harga (Rp)', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#A1A7C4' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#A1A7C4' }} 
                axisLine={false} 
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                label={{ value: 'Penjualan', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#A1A7C4' }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  padding: '12px 16px'
                }}
                formatter={(value) => `${value}%`}
                labelFormatter={(label) => `Harga: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                stroke="#1E5EFF" 
                strokeWidth={3} 
                dot={{ fill: '#1E5EFF', r: 5, strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 7, stroke: '#1E5EFF', strokeWidth: 2 }}
                name="Penjualan"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-between mt-3 text-xs text-[#A1A7C4] border-t border-[#F0F1F5] pt-3">
            <span>💡 <span className="font-medium text-[#5A607F]">Line Chart</span> = Tren penjualan per rentang harga</span>
            <span>📊 Tertinggi: <span className="text-[#1E5EFF] font-bold">20k (95%)</span></span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SEGMENTASI PELANGGAN - PIE CHART */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#D7DBEC] hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-1">
            <SectionTitle title="👥 Segmentasi Pelanggan" className="border-0 p-0 m-0" />
            <Badge type="info" size="xs">Pie Chart</Badge>
          </div>
          <p className="text-xs text-[#A1A7C4] mb-3">Berdasarkan kategori pelanggan</p>
          
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#fff" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  padding: '10px 14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {segmentData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F5F6FA] transition">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs text-[#5A607F] flex-1">{item.name}</span>
                <span className="text-xs font-bold text-[#131523]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CHART 2: BAR CHART - KATEGORI BUKU TERLARIS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-[#D7DBEC] hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <SectionTitle title="📚 Kategori Buku Terlaris" className="border-0 p-0 m-0" />
                <Badge type="warning" size="xs" className="ml-2">Bar Chart</Badge>
              </div>
              <p className="text-xs text-[#A1A7C4]">Membandingkan penjualan berdasarkan kategori buku</p>
            </div>
            <Badge type="success" className="text-xs">
              <FaArrowUp className="mr-1" /> +12.5%
            </Badge>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topCategories} layout="vertical" margin={{ top: 5, right: 10, left: 90, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" horizontal={true} vertical={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#A1A7C4' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#5A607F' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  padding: '10px 14px'
                }}
                formatter={(value) => `${value} pcs`}
              />
              <Bar dataKey="sold" fill="#1E5EFF" radius={[0, 4, 4, 0]} name="Terjual" />
            </BarChart>
          </ResponsiveContainer>

          {/* Info detail per kategori */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#F0F1F5]">
            {topCategories.map((item, idx) => (
              <div key={idx} className="text-center p-2 bg-[#F5F6FA] rounded-lg">
                <p className="text-xs text-[#7E84A3]">{item.name}</p>
                <p className="text-sm font-bold text-[#131523]">{item.sold} pcs</p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* STOK MENIPIS + RATING */}
        {/* ============================================================ */}
        <div className="space-y-6">
          {/* Stok Menipis */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#D7DBEC] hover:shadow-md transition">
            <h3 className="font-semibold text-[#131523] mb-3 flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-500 text-lg" />
              Stok Menipis
              <Badge type="warning" size="xs" className="ml-auto">Alert</Badge>
            </h3>
            <div className="space-y-2">
              {stats?.lowStockProducts?.slice(0, 2).map((product, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-[#FFF8F0] rounded-xl border border-yellow-100">
                  <div>
                    <p className="text-[#131523] font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-[#7E84A3]">Sisa: <span className="text-red-500 font-bold">{product.stock}</span></p>
                  </div>
                  <Button type="warning" size="xs">Pesan</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Rating & Feedback */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#D7DBEC] hover:shadow-md transition">
            <h3 className="font-semibold text-[#131523] mb-3 flex items-center gap-2">
              <FaStar className="text-yellow-500 text-lg" />
              Rating & Feedback
            </h3>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">4.2</p>
                <p className="text-xs text-[#7E84A3]">⭐ Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#131523]">15</p>
                <p className="text-xs text-[#7E84A3]">💬 Feedback</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <p className="text-xs text-[#7E84A3] mt-1">Selesai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TRANSACTIONS + TOP CUSTOMERS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#D7DBEC] hover:shadow-md transition">
          <SectionTitle title="Recent Transactions" className="border-0 p-0 m-0 mb-4" />
          <div className="space-y-3">
            {recentActivities.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[#F5F6FA] rounded-xl hover:bg-white hover:shadow-sm transition border border-transparent hover:border-[#D7DBEC]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1E5EFF]/10 rounded-full flex items-center justify-center text-[#1E5EFF] font-bold text-sm">
                    {item.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[#131523] text-sm">{item.customer}</p>
                    <p className="text-xs text-[#A1A7C4] flex items-center gap-1">
                      <FaClock className="text-[10px]" /> {item.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <PriceDisplay amount={item.amount} className="font-semibold text-sm" />
                  <Badge type="warning" size="xs">{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Pelanggan */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#D7DBEC] hover:shadow-md transition">
          <SectionTitle title="Top 5 Pelanggan" className="border-0 p-0 m-0 mb-4" />
          <div className="space-y-2">
            {[
              { name: 'Admin Toko Cendekia', spent: 2100000, level: 'Gold' },
              { name: 'Vino Bastian', spent: 1900000, level: 'Gold' },
              { name: 'Dewi Lestari', spent: 1750000, level: 'Gold' },
              { name: 'Julia Rahmawati', spent: 1650000, level: 'Silver' },
              { name: 'Putri Amelia', spent: 1550000, level: 'Silver' },
            ].map((c, idx) => {
              const ranks = ['👑', '🥇', '🥈', '🥉', '4️⃣'];
              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#F5F6FA] rounded-xl hover:bg-white hover:shadow-sm transition border border-transparent hover:border-[#D7DBEC]">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{ranks[idx]}</span>
                    <div>
                      <p className="font-medium text-[#131523] text-sm">{c.name}</p>
                      <Badge type="gold" size="xs">{c.level}</Badge>
                    </div>
                  </div>
                  <PriceDisplay amount={c.spent} className="font-bold text-[#1E5EFF] text-sm" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FEEDBACK TERBARU */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#D7DBEC] hover:shadow-md transition">
        <SectionTitle title="💬 Feedback Terbaru" className="border-0 p-0 m-0 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Xavier Purnama', message: 'Pelayanan oke, tapi antriannya agak lama pas jam sibuk', rating: 4, date: '2 hari lalu' },
            { name: 'Rendi Saputra', message: 'Pelayanan kasir cepat dan ramah', rating: 4, date: '3 hari lalu' },
            { name: 'Kevin Tan', message: 'Pengiriman agak lambat, tapi barang bagus', rating: 4, date: '4 hari lalu' },
            { name: 'Vino Bastian', message: 'Toko bersih dan rapi, buku tersusun rapi', rating: 4, date: '5 hari lalu' },
          ].map((f, idx) => (
            <div key={idx} className="p-4 bg-[#F5F6FA] rounded-xl hover:bg-white hover:shadow-sm transition border border-transparent hover:border-[#D7DBEC]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#1E5EFF] to-[#4A7FFF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {f.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#131523] text-sm">{f.name}</p>
                    <p className="text-xs text-[#A1A7C4]">{f.date}</p>
                  </div>
                </div>
                <div className="text-yellow-400 text-sm">
                  {'⭐'.repeat(f.rating)}
                </div>
              </div>
              <p className="text-sm text-[#5A607F] ml-11">{f.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TOMBOL WHATSAPP - FLOATING BUTTON */}
      {/* ============================================================ */}
      <button 
        onClick={handleWhatsApp}
        className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 flex items-center gap-3 group z-50"
      >
        <FaWhatsapp className="text-3xl" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium text-sm">
          Hubungi Admin
        </span>
      </button>

      <div className="fixed bottom-28 right-8 text-xs text-gray-400 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border border-gray-100 z-40">
        💬 Butuh bantuan?
      </div>
    </div>
  );
}