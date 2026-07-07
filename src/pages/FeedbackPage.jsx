// src/pages/FeedbackPage.jsx
import { useState, useEffect } from 'react';
import { 
  FaStar, 
  FaCheckCircle, 
  FaClock, 
  FaSearch,
  FaReply,
  FaUser,
  FaCalendarAlt,
  FaRegStar,
  FaStarHalfAlt,
  FaSpinner,
  FaTimes,
  FaChartPie,
  FaChevronLeft,
  FaChevronRight,
  FaPaperPlane,
  FaBullhorn,
  FaSmile,
  FaMeh,
  FaFrown,
  FaComment,
  FaHistory,
  FaUsers,
  FaTrophy
} from 'react-icons/fa';
import { FiMessageCircle, FiStar } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFeedbacks, updateFeedbackStatus, getFeedbackStats } from '../data/feedbacks';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Broadcast State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastLogs, setBroadcastLogs] = useState([
    {
      id: 1,
      title: 'Promo Bundling Sekolah',
      message: 'Dapatkan diskon 15% untuk paket Kurikulum Merdeka.',
      date: '2026-07-01 10:00',
      sent: true
    },
    {
      id: 2,
      title: 'Restock Kitab Kuning',
      message: 'Kitab Kuning Fathul Qorib tersedia 100 pcs baru.',
      date: '2026-07-03 14:30',
      sent: true
    }
  ]);

  const itemsPerPage = 5;

  useEffect(() => {
    loadFeedbacks();
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks, filter, searchTerm]);

  const loadFeedbacks = () => {
    setLoading(true);
    const data = getFeedbacks();
    setStats(getFeedbackStats());
    setFeedbacks([...data].reverse());
    setLoading(false);
  };

  const filterFeedbacks = () => {
    let filtered = [...feedbacks];
    
    if (filter !== 'all') {
      filtered = filtered.filter(f => f.status === filter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(f => 
        f.customerName.toLowerCase().includes(term) ||
        f.comment.toLowerCase().includes(term)
      );
    }
    
    setFilteredFeedbacks(filtered);
    setCurrentPage(1);
  };

  const handleResolve = (id) => {
    const feedback = feedbacks.find(f => f.id === id);
    setSelectedFeedback(feedback);
    setReplyText('');
    setReplyDialogOpen(true);
  };

  const handleReplySubmit = () => {
    if (selectedFeedback && replyText.trim()) {
      updateFeedbackStatus(selectedFeedback.id, 'resolved', replyText);
      setReplyDialogOpen(false);
      setSelectedFeedback(null);
      setReplyText('');
      loadFeedbacks();
    }
  };

  const handleBroadcastSend = () => {
    if (broadcastTitle.trim() && broadcastMessage.trim()) {
      const newLog = {
        id: broadcastLogs.length + 1,
        title: broadcastTitle,
        message: broadcastMessage,
        date: new Date().toLocaleString('id-ID', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        sent: true
      };
      setBroadcastLogs([newLog, ...broadcastLogs]);
      setBroadcastTitle('');
      setBroadcastMessage('');
      alert('✅ Broadcast berhasil dikirim ke semua pelanggan!');
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Menunggu',
        icon: FaClock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        border: 'border-yellow-200'
      },
      in_progress: {
        label: 'Diproses',
        icon: FaSpinner,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        border: 'border-blue-200'
      },
      resolved: {
        label: 'Selesai',
        icon: FaCheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-100',
        border: 'border-green-200'
      }
    };
    return configs[status] || configs.pending;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filters = [
    { value: 'all', label: 'Semua', icon: FaChartPie, count: stats?.total || 0 },
    { value: 'pending', label: 'Menunggu', icon: FaClock, count: stats?.pending || 0 },
    { value: 'in_progress', label: 'Diproses', icon: FaSpinner, count: stats?.inProgress || 0 },
    { value: 'resolved', label: 'Selesai', icon: FaCheckCircle, count: stats?.resolved || 0 }
  ];

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);

  // Rating distribution
  const ratingDistribution = {
    5: feedbacks.filter(f => f.rating === 5).length,
    4: feedbacks.filter(f => f.rating === 4).length,
    3: feedbacks.filter(f => f.rating === 3).length,
    2: feedbacks.filter(f => f.rating === 2).length,
    1: feedbacks.filter(f => f.rating === 1).length
  };
  const totalFeedbacks = feedbacks.length || 1;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#F0F2F8] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#131523] flex items-center gap-3">
            <FiMessageCircle className="w-7 h-7 text-[#1A5CFF]" />
            Feedback & Broadcast Center
          </h1>
          <p className="text-[#7E84A3] mt-1">
            Ukur tingkat kepuasan pelanggan secara real-time dan kirim pesan promosi.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - CSAT & Rating Distribution */}
          <div className="lg:col-span-1 space-y-6">
            {/* CSAT Score Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6 text-center">
              <h3 className="text-sm font-medium text-[#7E84A3] uppercase tracking-wider mb-2">
                Skor CSAT Toko
              </h3>
              <div className="text-5xl font-bold text-[#1A5CFF]">4.8</div>
              <div className="flex justify-center text-yellow-400 text-lg mt-2">
                {renderStars(4.8)}
              </div>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Luar Biasa
              </span>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6">
              <h3 className="text-sm font-medium text-[#7E84A3] uppercase tracking-wider mb-4">
                Detail Peringkat Kepuasan
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingDistribution[rating] || 0;
                  const percentage = Math.round((count / totalFeedbacks) * 100);
                  const labels = {
                    5: { label: 'Sangat Puas', icon: FaTrophy, color: 'text-green-600' },
                    4: { label: 'Puas', icon: FaSmile, color: 'text-blue-600' },
                    3: { label: 'Cukup', icon: FaMeh, color: 'text-yellow-600' },
                    2: { label: 'Kurang Puas', icon: FaFrown, color: 'text-orange-600' },
                    1: { label: 'Tidak Puas', icon: FaFrown, color: 'text-red-600' }
                  };
                  const LabelIcon = labels[rating].icon;
                  
                  return (
                    <div key={rating}>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <LabelIcon className={labels[rating].color} size={14} />
                          <span className="text-[#131523]">{labels[rating].label}</span>
                          <span className="text-[#7E84A3] text-xs">({rating} Bintang)</span>
                        </div>
                        <span className="font-semibold text-[#131523]">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F0F2F8] rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${
                            rating === 5 ? 'bg-green-500' :
                            rating === 4 ? 'bg-blue-500' :
                            rating === 3 ? 'bg-yellow-500' :
                            rating === 2 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Broadcast */}
          <div className="lg:col-span-2 space-y-6">
            {/* Broadcast Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6">
              <h3 className="text-lg font-bold text-[#131523] flex items-center gap-2 mb-4">
                <FaBullhorn className="text-[#1A5CFF]" />
                Kirim Broadcast Promo / Restock
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1.5">
                    Judul Notifikasi
                  </label>
                  <input
                    type="text"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="Contoh: Diskon Novel Fiksi 20%"
                    className="w-full px-4 py-2.5 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1.5">
                    Pesan Promo
                  </label>
                  <textarea
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Masukkan isi pesan notifikasi promosi atau ketersediaan stok buku secara mendalam..."
                    className="w-full px-4 py-2.5 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none min-h-[100px] text-sm"
                  />
                </div>
                <button
                  onClick={handleBroadcastSend}
                  disabled={!broadcastTitle.trim() || !broadcastMessage.trim()}
                  className="w-full py-3 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/30"
                >
                  <FaPaperPlane size={16} />
                  Siarkan Notifikasi Ke Semua Pelanggan
                </button>
              </div>
            </div>

            {/* Broadcast Logs */}
            <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6">
              <h3 className="text-sm font-medium text-[#7E84A3] uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaHistory />
                Log Broadcast Terkirim
              </h3>
              <div className="space-y-3">
                {broadcastLogs.map((log) => (
                  <div key={log.id} className="bg-[#F8F9FC] rounded-lg p-4 border border-[#D7DBEC]">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-[#131523]">{log.title}</h4>
                        <p className="text-sm text-[#7E84A3] mt-1">{log.message}</p>
                      </div>
                      <span className="text-xs text-[#7E84A3] whitespace-nowrap ml-4">{log.date}</span>
                    </div>
                  </div>
                ))}
                {broadcastLogs.length === 0 && (
                  <p className="text-center text-[#7E84A3] py-4">Belum ada broadcast terkirim</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback List Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#131523] flex items-center gap-2">
              <FaComment className="text-[#1A5CFF]" />
              Daftar Feedback Pelanggan
              <span className="text-sm font-normal text-[#7E84A3]">({filteredFeedbacks.length})</span>
            </h2>
          </div>

          {/* Filter & Search */}
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                {filters.map((f) => {
                  const Icon = f.icon;
                  const isActive = filter === f.value;
                  return (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        isActive
                          ? 'bg-[#1A5CFF] text-white shadow-md shadow-blue-500/30'
                          : 'bg-[#F5F6FA] text-[#7E84A3] hover:bg-[#E6E9F4]'
                      }`}
                    >
                      <Icon size={14} />
                      {f.label}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-[#7E84A3]'
                      }`}>
                        {f.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 min-w-[150px] relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E84A3] text-sm" />
                <input
                  type="text"
                  placeholder="Cari nama atau komentar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5CFF]"
                />
              </div>
            </div>
          </div>

          {/* Feedback Cards */}
          <div className="space-y-3">
            {paginatedFeedbacks.map((feedback) => {
              const statusConfig = getStatusConfig(feedback.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={feedback.id}
                  className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#F5F6FA] rounded-full flex items-center justify-center text-[#131523] font-bold text-xs">
                          {feedback.customerName?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-medium text-[#131523] text-sm">{feedback.customerName}</p>
                          <div className="flex items-center gap-2 text-xs text-[#7E84A3]">
                            <span>{formatDate(feedback.createdAt)}</span>
                            <span>•</span>
                            <div className="flex text-yellow-400 text-xs">
                              {renderStars(feedback.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#131523] text-sm leading-relaxed ml-11">"{feedback.comment}"</p>
                      
                      {feedback.status === 'resolved' && feedback.reply && (
                        <div className="ml-11 mt-2 pl-3 border-l-2 border-green-300 bg-green-50 rounded-r-lg p-2">
                          <p className="text-xs text-[#7E84A3] font-medium flex items-center gap-1.5">
                            <FaReply size={10} />
                            Balasan Admin:
                          </p>
                          <p className="text-sm text-[#131523] mt-0.5">{feedback.reply}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 ml-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.bg} ${statusConfig.color}`}>
                        <StatusIcon size={10} />
                        {statusConfig.label}
                      </span>
                      {feedback.status !== 'resolved' && (
                        <button
                          onClick={() => handleResolve(feedback.id)}
                          className="p-1.5 text-[#1A5CFF] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Balas"
                        >
                          <FaReply size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredFeedbacks.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-8 text-center">
                <FiMessageCircle className="text-[#A1A7C4] text-4xl mx-auto mb-3" />
                <p className="text-[#7E84A3] font-medium">Tidak ada feedback</p>
                <p className="text-sm text-[#A1A7C4] mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#D7DBEC] mt-4">
              <p className="text-sm text-[#7E84A3]">
                Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredFeedbacks.length)} dari {filteredFeedbacks.length} feedback
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[#D7DBEC] hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronLeft size={14} />
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = currentPage - 2 + idx;
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#1A5CFF] text-white shadow-md shadow-blue-500/30'
                          : 'border border-[#D7DBEC] hover:bg-[#F5F6FA]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[#D7DBEC] hover:bg-[#F5F6FA] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reply Dialog */}
        {replyDialogOpen && selectedFeedback && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl">
              <div className="px-6 py-4 border-b border-[#D7DBEC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5F6FA] rounded-full flex items-center justify-center text-[#131523] font-bold text-sm">
                    {selectedFeedback.customerName?.charAt(0) || '?'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#131523]">Balas Feedback</h3>
                    <p className="text-xs text-[#7E84A3]">{selectedFeedback.customerName}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setReplyDialogOpen(false);
                    setSelectedFeedback(null);
                    setReplyText('');
                  }}
                  className="p-1.5 hover:bg-[#F5F6FA] rounded-lg transition-colors"
                >
                  <FaTimes className="text-[#7E84A3]" />
                </button>
              </div>
              <div className="p-6">
                <div className="bg-[#F8F9FC] rounded-lg p-4 mb-4">
                  <div className="flex text-yellow-400 text-sm mb-1">
                    {renderStars(selectedFeedback.rating)}
                  </div>
                  <p className="text-sm text-[#131523]">{selectedFeedback.comment}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#131523] mb-1.5">
                    Balasan Anda
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tulis balasan untuk pelanggan..."
                    className="w-full px-4 py-2.5 border border-[#D7DBEC] rounded-lg focus:border-[#1A5CFF] focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none min-h-[100px] text-sm"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#D7DBEC]">
                  <button
                    onClick={() => {
                      setReplyDialogOpen(false);
                      setSelectedFeedback(null);
                      setReplyText('');
                    }}
                    className="px-4 py-2 border border-[#D7DBEC] rounded-lg hover:bg-[#F5F6FA] transition-colors text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleReplySubmit}
                    disabled={!replyText.trim()}
                    className="px-4 py-2 bg-[#1A5CFF] hover:bg-[#1A5CFF]/90 text-white rounded-lg transition-colors text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaReply size={12} />
                    Kirim Balasan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-[#A1A7C4] py-6 mt-6">
          <p className="font-medium">Jl. Paus No.73, Pekanbaru</p>
          <p className="mt-1">© 2025 Toko Buku Cendekia</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;