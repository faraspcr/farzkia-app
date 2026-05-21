// src/pages/FeedbackPage.jsx
import { useState, useEffect } from 'react';
import { FaStar, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import FeedbackCard from '../components/FeedbackCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFeedbacks, updateFeedbackStatus, getFeedbackStats } from '../data/feedbacks';

// IMPORT KOMPONEN BARU YANG ADA
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => { loadFeedbacks(); }, [filter]);

  const loadFeedbacks = () => {
    let data = getFeedbacks();
    if (filter !== 'all') data = data.filter(f => f.status === filter);
    setFeedbacks([...data].reverse());
    setStats(getFeedbackStats());
    setLoading(false);
  };

  const handleResolve = (id) => { 
    const response = prompt('Balasan untuk pelanggan:'); 
    if (response) { 
      updateFeedbackStatus(id, 'resolved', response); 
      loadFeedbacks(); 
    } 
  };

  const filters = [
    { value: 'all', label: 'Semua', icon: '📋' },
    { value: 'pending', label: 'Menunggu', icon: '⏳' },
    { value: 'in_progress', label: 'Diproses', icon: '⚙️' },
    { value: 'resolved', label: 'Selesai', icon: '✅' }
  ];

  return (
    <Container>
      {/* PAKAI PAGEHEADER */}
      <PageHeader 
        title="Feedback & Rating" 
        description="Kelola dan pantau feedback dari pelanggan"
      />

      {/* Stat Cards - PAKAI STATCARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Feedback" 
          value={stats?.total || 0} 
          icon="⭐"
        />
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaStar className="text-xl" />
          </div>
          <p className="text-2xl font-bold">{stats?.averageRating || 0}</p>
          <p className="text-sm text-gray-600">Rata-rata Rating</p>
          <div className="text-yellow-500 text-sm mt-1">
            {'★'.repeat(Math.round(stats?.averageRating || 0))}
            {'☆'.repeat(5 - Math.round(stats?.averageRating || 0))}
          </div>
        </div>
        <StatCard 
          title="Selesai" 
          value={stats?.resolved || 0} 
          icon="✅"
        />
        <StatCard 
          title="Menunggu" 
          value={stats?.pending || 0} 
          icon="⏳"
        />
      </div>
      
      {/* Filter Buttons - TETAP MANUAL karena tidak ada komponen filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button 
              key={f.value} 
              onClick={() => setFilter(f.value)} 
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
                filter === f.value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Feedback List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-3">
          {feedbacks.map(f => <FeedbackCard key={f.id} feedback={f} onResolve={handleResolve} />)}
          {feedbacks.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <p className="text-gray-500">Tidak ada feedback dengan status ini</p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}