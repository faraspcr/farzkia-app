// src/pages/ReportsPage.jsx
import { useState, useEffect } from 'react';
import { FaFileExport } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardStats } from '../data/dashboardStats';
import { formatRupiah } from '../data/formatters';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import Button from '../components/Button';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import PriceDisplay from '../components/PriceDisplay';

// ✅ IMPORT ACCORDION
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState(null);

  useEffect(() => { 
    setStats(getDashboardStats()); 
    setLoading(false); 
  }, []);

  if (loading) return <LoadingSpinner />;
  
  const categoryData = stats?.salesByCategory ? Object.entries(stats.salesByCategory).map(([k, v]) => ({ 
    name: k, 
    value: v.revenue,
    quantity: v.quantity,
    percentage: (v.revenue / stats.totalRevenue) * 100
  })) : [];

  const statCards = [
    { title: "Total Pendapatan", value: stats?.totalRevenue || 0, color: "text-blue-600", isPrice: true },
    { title: "Total Transaksi", value: stats?.totalTransactions || 0, color: "text-gray-800", isPrice: false },
    { title: "Total Pelanggan", value: stats?.totalCustomers || 0, color: "text-gray-800", isPrice: false },
    { title: "Gold Member", value: stats?.goldMembers || 0, color: "text-yellow-600", isPrice: false }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'];

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <PageHeader title="Laporan" description="Analisis penjualan dan performa toko" />
        <Button type="primary">
          <FaFileExport className="mr-2" /> Export PDF
        </Button>
      </div>
      
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatRupiah(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
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

      {/* ✅ ACCORDION DETAIL PER KATEGORI */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <SectionTitle title="📂 Detail Penjualan per Kategori" className="border-0 p-0 m-0 mb-4" />
        <div className="space-y-2">
          {categoryData.map((category, idx) => (
            <Accordion 
              key={idx} 
              type="single" 
              collapsible 
              className="border border-gray-200 rounded-lg overflow-hidden"
              value={openCategoryId}
              onValueChange={setOpenCategoryId}
            >
              <AccordionItem value={category.name} className="border-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <PriceDisplay amount={category.value} className="font-semibold text-blue-600" />
                      <span className="text-gray-500">{category.quantity} item</span>
                      <span className="text-gray-400">{category.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Total Pendapatan</p>
                      <PriceDisplay amount={category.value} className="font-bold text-lg text-blue-600 mt-1" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Jumlah Terjual</p>
                      <p className="font-bold text-lg text-gray-800 mt-1">{category.quantity} pcs</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Persentase</p>
                      <p className="font-bold text-lg text-gray-800 mt-1">{category.percentage.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Rata-rata per Item</p>
                      <PriceDisplay amount={category.value / category.quantity} className="font-semibold mt-1" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </Container>
  );
}