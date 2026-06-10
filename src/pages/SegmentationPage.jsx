// src/pages/SegmentationPage.jsx
import { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getCustomers, getCustomerStats } from '../data/customers';
import CustomerTable from '../components/CustomerTable';
import LoadingSpinner from '../components/LoadingSpinner';

// IMPORT KOMPONEN YANG SUDAH ADA
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';

// ✅ IMPORT TABS
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SegmentationPage() {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState('all');

  useEffect(() => { loadData(); }, [selectedSegment]);

  const loadData = () => {
    setLoading(true);
    let data = getCustomers();
    if (selectedSegment !== 'all') data = data.filter(c => c.category === selectedSegment);
    setCustomers(data);
    setStats(getCustomerStats());
    setLoading(false);
  };

  const categoryData = stats ? [
    { name: 'Orang Tua', value: stats.ortuMurid, color: '#3B82F6' },
    { name: 'Santri', value: stats.santri, color: '#10B981' },
    { name: 'Mahasiswa/Umum', value: stats.mahasiswaUmum, color: '#F59E0B' }
  ] : [];

  const levelData = stats ? [
    { name: 'Reguler', value: stats.total - stats.silverMember - stats.goldMember, color: '#9CA3AF' },
    { name: 'Silver', value: stats.silverMember, color: '#6B7280' },
    { name: 'Gold', value: stats.goldMember, color: '#FBBF24' }
  ] : [];

  return (
    <Container>
      <PageHeader 
        title="Segmentasi Pelanggan" 
        description="Analisis dan filter pelanggan berdasarkan kategori"
      />
      
      {/* ✅ FILTER SEGMENTASI PAKAI TABS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <span className="text-sm text-gray-500 block mb-3">Filter Kategori Pelanggan:</span>
        <Tabs value={selectedSegment} onValueChange={setSelectedSegment} className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
              <span>👥</span> Semua
            </TabsTrigger>
            <TabsTrigger value="ortu_murid" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
              <span>👨‍👩‍👧</span> Orang Tua
            </TabsTrigger>
            <TabsTrigger value="santri" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
              <span>🕌</span> Santri
            </TabsTrigger>
            <TabsTrigger value="mahasiswa_umum" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
              <span>🎓</span> Mahasiswa/Umum
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <SectionTitle title="📊 Distribusi Kategori" className="border-0 p-0 m-0 mb-4" />
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie 
                data={categoryData} 
                cx="50%" 
                cy="50%" 
                labelLine={true} 
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} 
                outerRadius={90} 
                dataKey="value"
              >
                {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <SectionTitle title="📊 Distribusi Member Level" className="border-0 p-0 m-0 mb-4" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={levelData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {levelData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Customer Table by Segment */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <SectionTitle 
          title={
            <div className="flex items-center">
              <FaUsers className="mr-2 text-blue-600" /> 
              Daftar Pelanggan - {
                selectedSegment === 'all' ? 'Semua' :
                selectedSegment === 'ortu_murid' ? 'Orang Tua' :
                selectedSegment === 'santri' ? 'Santri' : 'Mahasiswa/Umum'
              }
            </div>
          } 
          className="border-0 p-0 m-0 mb-4"
        />
        {loading ? <LoadingSpinner /> : <CustomerTable customers={customers} onDelete={() => {}} />}
      </div>
    </Container>
  );
}