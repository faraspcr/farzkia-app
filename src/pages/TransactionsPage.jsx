import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaChevronLeft, FaChevronRight, FaShoppingBag, FaStore, FaWhatsapp, FaShopify } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTransactions } from '../data/transactions';
import { formatRupiah, formatShortDate } from '../data/formatters';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, statusFilter, sourceFilter]);

  const loadTransactions = () => {
    const data = getTransactions();
    // Urutkan dari yang terbaru
    const sorted = [...data].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    setTransactions(sorted);
    setLoading(false);
  };

  const filterTransactions = () => {
    let filtered = [...transactions];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(t => t.source === sourceFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.id.toString().includes(searchTerm)
      );
    }
    
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Status Badge dengan warna Figma
  const getStatusBadge = (status) => {
    switch(status) {
      case 'selesai':
        return <span className="px-2 py-1 rounded-full text-xs bg-[#DAF9EC] text-[#06A561]">Selesai</span>;
      case 'siap_diambil':
        return <span className="px-2 py-1 rounded-full text-xs bg-[#FFF9E1] text-[#F99600]">Siap Diambil</span>;
      case 'diproses':
        return <span className="px-2 py-1 rounded-full text-xs bg-[#ECF2FF] text-[#1E5EFF]">Sedang Diproses</span>;
      case 'pesanan_diterima':
        return <span className="px-2 py-1 rounded-full text-xs bg-[#E6E9F4] text-[#5A607F]">Pesanan Diterima</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-[#F5F6FA] text-[#7E84A3]">{status}</span>;
    }
  };

  // Source Badge
  const getSourceBadge = (source) => {
    switch(source) {
      case 'offline':
        return <span className="flex items-center gap-1 text-xs text-[#5A607F]"><FaStore size={10} /> Offline</span>;
      case 'whatsapp':
        return <span className="flex items-center gap-1 text-xs text-[#06A561]"><FaWhatsapp size={10} /> WhatsApp</span>;
      case 'shopee':
        return <span className="flex items-center gap-1 text-xs text-[#F99600]"><FaShopify size={10} /> Shopee</span>;
      default:
        return <span className="text-xs text-[#7E84A3]">{source}</span>;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#131523]">Riwayat Transaksi</h1>
          <p className="text-[#7E84A3] ">Kelola dan pantau semua transaksi toko</p>
        </div>
        <Link 
          to="/transactions/add" 
          className="bg-[#1E5EFF] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus size={14} /> Tambah Transaksi
        </Link>
      </div>

      {/* Filter dan Search - BEDA dengan Pelanggan (pakai 2 row) */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4">
        {/* Row 1: Status Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-sm text-[#7E84A3]">Status:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                statusFilter === 'all' 
                  ? 'bg-[#1E5EFF] text-white' 
                  : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('pesanan_diterima')}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                statusFilter === 'pesanan_diterima' 
                  ? 'bg-[#1E5EFF] text-white' 
                  : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
              }`}
            >
              Diterima
            </button>
            <button
              onClick={() => setStatusFilter('diproses')}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                statusFilter === 'diproses' 
                  ? 'bg-[#1E5EFF] text-white' 
                  : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
              }`}
            >
              Diproses
            </button>
            <button
              onClick={() => setStatusFilter('siap_diambil')}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                statusFilter === 'siap_diambil' 
                  ? 'bg-[#1E5EFF] text-white' 
                  : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
              }`}
            >
              Siap Diambil
            </button>
            <button
              onClick={() => setStatusFilter('selesai')}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                statusFilter === 'selesai' 
                  ? 'bg-[#1E5EFF] text-white' 
                  : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Row 2: Source Filter + Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#D7DBEC]">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#7E84A3]">Sumber:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSourceFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  sourceFilter === 'all' 
                    ? 'bg-[#1E5EFF] text-white' 
                    : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSourceFilter('offline')}
                className={`px-3 py-1.5 rounded-lg text-sm transition flex items-center gap-1 ${
                  sourceFilter === 'offline' 
                    ? 'bg-[#1E5EFF] text-white' 
                    : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
                }`}
              >
                <FaStore size={10} /> Offline
              </button>
              <button
                onClick={() => setSourceFilter('whatsapp')}
                className={`px-3 py-1.5 rounded-lg text-sm transition flex items-center gap-1 ${
                  sourceFilter === 'whatsapp' 
                    ? 'bg-[#1E5EFF] text-white' 
                    : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
                }`}
              >
                <FaWhatsapp size={10} /> WhatsApp
              </button>
              <button
                onClick={() => setSourceFilter('shopee')}
                className={`px-3 py-1.5 rounded-lg text-sm transition flex items-center gap-1 ${
                  sourceFilter === 'shopee' 
                    ? 'bg-[#1E5EFF] text-white' 
                    : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
                }`}
              >
                <FaShopify size={10} /> Shopee
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A7C4] text-sm" />
            <input
              type="text"
              placeholder="Cari nama pelanggan atau ID transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#D7DBEC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] text-[#131523] placeholder:text-[#A1A7C4] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Tabel Data - Desain Card/Grid berbeda dari Pelanggan */}
      <div className="grid grid-cols-1 gap-4">
        {paginatedTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 hover:shadow-md transition">
            {/* Header Card */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F5F6FA] rounded-xl flex items-center justify-center">
                  <FaShoppingBag className="text-[#1E5EFF] text-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#131523]">#{transaction.id}</span>
                    {getStatusBadge(transaction.status)}
                  </div>
                  <p className="text-xs text-[#7E84A3]">{formatShortDate(transaction.orderDate)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#1E5EFF]">{formatRupiah(transaction.total)}</p>
                {getSourceBadge(transaction.source)}
              </div>
            </div>

            {/* Detail Transaksi */}
            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#D7DBEC]">
              <div>
                <p className="text-sm font-medium text-[#131523]">{transaction.customerName}</p>
                <p className="text-xs text-[#A1A7C4]">{transaction.items?.length || 0} item</p>
              </div>
              <Link 
                to={`/tracking/${transaction.id}`}
                className="flex items-center gap-2 text-[#1E5EFF] hover:text-blue-700 text-sm font-medium"
              >
                <FaEye size={14} /> Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-8 text-center">
          <FaShoppingBag className="text-[#A1A7C4] text-4xl mx-auto mb-3" />
          <p className="text-[#7E84A3]">Tidak ada transaksi yang ditemukan</p>
          <Link to="/transactions/add" className="text-[#1E5EFF] hover:underline mt-2 inline-block">
            Tambah transaksi sekarang
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-[#D7DBEC]">
          <div className="text-sm text-[#7E84A3]">
            Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} dari {filteredTransactions.length} transaksi
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-[#D7DBEC] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F6FA] text-[#5A607F]"
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
                  className={`px-3 py-1 rounded-lg transition ${
                    currentPage === pageNum
                      ? 'bg-[#1E5EFF] text-white'
                      : 'text-[#7E84A3] hover:bg-[#F5F6FA]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-[#D7DBEC] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F6FA] text-[#5A607F]"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-[#A1A7C4] py-4">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </div>
  );
}