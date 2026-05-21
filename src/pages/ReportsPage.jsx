// src/pages/ReportsPage.jsx
import { useState, useEffect } from 'react';
import { FaFileExport } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardStats } from '../data/dashboardStats';
import { formatRupiah } from '../data/formatters';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

// IMPORT KOMPONEN YANG SUDAH ADA
import Button from '../components/Button';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import PriceDisplay from '../components/PriceDisplay';

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setStats(getDashboardStats()); 
    setLoading(false); 
  }, []);

  if (loading) return <LoadingSpinner />;
  
  const categoryData = stats?.salesByCategory ? Object.entries(stats.salesByCategory).map(([k, v]) => ({ name: k, value: v.revenue })) : [];

  const statCards = [
    { title: "Total Pendapatan", value: stats?.totalRevenue || 0, color: "text-blue-600", isPrice: true },
    { title: "Total Transaksi", value: stats?.totalTransactions || 0, color: "text-gray-800", isPrice: false },
    { title: "Total Pelanggan", value: stats?.totalCustomers || 0, color: "text-gray-800", isPrice: false },
    { title: "Gold Member", value: stats?.goldMembers || 0, color: "text-yellow-600", isPrice: false }
  ];

  return (
    <Container>
      {/* Header dengan PageHeader dan Button */}
      <div className="flex justify-between items-center mb-6">
        <PageHeader title="Laporan" description="Analisis penjualan dan performa toko" />
        <Button type="primary">
          <FaFileExport className="mr-2" /> Export PDF
        </Button>
      </div>
      
      {/* Stat Cards dengan PriceDisplay */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-gray-500 text-sm">{card.title}</p>
            {card.isPrice ? (
              <PriceDisplay amount={card.value} className={`text-2xl font-bold ${card.color}`} />
            ) : (
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            )}
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <SectionTitle title="📈 Penjualan per Kategori" className="border-0 p-0 m-0 mb-4" />
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={categoryData} 
                cx="50%" 
                cy="50%" 
                labelLine={false} 
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} 
                outerRadius={100} 
                dataKey="value"
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
                <Cell fill="#8B5CF6" />
                <Cell fill="#EF4444" />
              </Pie>
              <Tooltip formatter={(v) => formatRupiah(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Top 5 Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <SectionTitle title="🏆 Top 5 Produk Terlaris" className="border-0 p-0 m-0 mb-4" />
          <div className="space-y-3">
            {stats?.topProducts?.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <span className="text-gray-400 mr-2">{idx + 1}.</span>
                  {p.name}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${(p.quantity / (stats.topProducts?.[0]?.quantity || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{p.quantity} pcs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}