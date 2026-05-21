// src/pages/SegmentationPage.jsx
import { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getCustomers, getCustomerStats } from '../data/customers';
import CustomerTable from '../components/CustomerTable';
import LoadingSpinner from '../components/LoadingSpinner';

// IMPORT KOMPONEN YANG SUDAH ADA (Card TIDAK diimport)
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';

export default function SegmentationPage() {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState('all');

  useEffect(() => { loadData(); }, [selectedSegment]);

  const loadData = () => {
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

  const segments = [
    { value: 'all', label: 'Semua', icon: '👥' },
    { value: 'ortu_murid', label: 'Orang Tua', icon: '👨‍👩‍👧' },
    { value: 'santri', label: 'Santri', icon: '🕌' },
    { value: 'mahasiswa_umum', label: 'Mahasiswa/Umum', icon: '🎓' }
  ];

  return (
    <Container>
      {/* PAKAI PAGEHEADER */}
      <PageHeader 
        title="Segmentasi Pelanggan" 
        description="Analisis dan filter pelanggan berdasarkan kategori"
      />
      
      {/* Filter Segmentasi - TETAP MANUAL */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {segments.map(seg => (
            <button 
              key={seg.value} 
              onClick={() => setSelectedSegment(seg.value)} 
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                selectedSegment === seg.value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{seg.icon}</span>
              <span>{seg.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Charts - PAKAI DIV BIASA (bukan Card) */}
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
              Daftar Pelanggan - {segments.find(s => s.value === selectedSegment)?.label}
            </div>
          } 
          className="border-0 p-0 m-0 mb-4"
        />
        {loading ? <LoadingSpinner /> : <CustomerTable customers={customers} onDelete={() => {}} />}
      </div>
    </Container>
  );
}