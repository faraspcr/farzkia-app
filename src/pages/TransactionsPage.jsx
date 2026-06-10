// src/pages/TransactionsPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaChevronLeft, FaChevronRight, FaShoppingBag, FaStore, FaWhatsapp, FaShopify } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTransactions } from '../data/transactions';
import { formatRupiah, formatShortDate } from '../data/formatters';

import Button from '../components/Button';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';
import PriceDisplay from '../components/PriceDisplay';
import TransactionBadge from '../components/TransactionBadge';
import TransactionCard from '../components/TransactionCard';

// ✅ IMPORT TABS
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ✅ IMPORT ALERT DIALOG
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ STATE UNTUK ALERT DIALOG BATAL TRANSAKSI
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [transactionToCancel, setTransactionToCancel] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, statusFilter, sourceFilter]);

  const loadTransactions = () => {
    const data = getTransactions();
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

  // ✅ FUNGSI BATAL TRANSAKSI DENGAN ALERT DIALOG
  const handleCancelClick = (transaction) => {
    setTransactionToCancel(transaction);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (transactionToCancel) {
      alert(`Transaksi #${transactionToCancel.id} dibatalkan`);
      loadTransactions();
      setCancelDialogOpen(false);
      setTransactionToCancel(null);
    }
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

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
    <Container>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Riwayat Transaksi" 
          description="Kelola dan pantau semua transaksi toko"
        />
        <Button type="primary">
          <FaPlus size={14} className="mr-2" /> Tambah Transaksi
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-4 mb-6">
        {/* ✅ FILTER STATUS PAKAI TABS */}
        <div className="mb-4">
          <span className="text-sm text-[#7E84A3] block mb-2">Status Transaksi:</span>
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-[#F5F6FA] p-1 rounded-lg">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#1E5EFF] data-[state=active]:text-white px-3 py-1.5 rounded-md text-sm">
                Semua
              </TabsTrigger>
              <TabsTrigger value="pesanan_diterima" className="data-[state=active]:bg-[#1E5EFF] data-[state=active]:text-white px-3 py-1.5 rounded-md text-sm">
                Diterima
              </TabsTrigger>
              <TabsTrigger value="diproses" className="data-[state=active]:bg-[#1E5EFF] data-[state=active]:text-white px-3 py-1.5 rounded-md text-sm">
                Diproses
              </TabsTrigger>
              <TabsTrigger value="siap_diambil" className="data-[state=active]:bg-[#1E5EFF] data-[state=active]:text-white px-3 py-1.5 rounded-md text-sm">
                Siap Diambil
              </TabsTrigger>
              <TabsTrigger value="selesai" className="data-[state=active]:bg-[#1E5EFF] data-[state=active]:text-white px-3 py-1.5 rounded-md text-sm">
                Selesai
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#D7DBEC]">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#7E84A3]">Sumber:</span>
            <div className="flex gap-2">
              {['all', 'offline', 'whatsapp', 'shopee'].map((source) => (
                <button
                  key={source}
                  onClick={() => setSourceFilter(source)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition flex items-center gap-1 ${
                    sourceFilter === source 
                      ? 'bg-[#1E5EFF] text-white' 
                      : 'bg-[#F5F6FA] text-[#5A607F] hover:bg-[#E6E9F4]'
                  }`}
                >
                  {source === 'all' ? 'Semua' :
                   source === 'offline' ? <FaStore size={10} /> :
                   source === 'whatsapp' ? <FaWhatsapp size={10} /> :
                   <FaShopify size={10} />}
                  {source !== 'all' && (source === 'offline' ? ' Offline' : 
                    source === 'whatsapp' ? ' WhatsApp' : ' Shopee')}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-80">
            <SearchBar 
              placeholder="Cari nama pelanggan atau ID transaksi..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {paginatedTransactions.map((transaction) => (
          <TransactionCard 
            key={transaction.id}
            transaction={transaction} 
            onViewDetail={() => window.location.href = `/tracking/${transaction.id}`} 
          />
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-8 text-center">
          <FaShoppingBag className="text-[#A1A7C4] text-4xl mx-auto mb-3" />
          <p className="text-[#7E84A3]">Tidak ada transaksi yang ditemukan</p>
          <Link to="/transactions/add" className="text-[#1E5EFF] hover:underline mt-2 inline-block">
            Tambah transaksi sekarang
          </Link>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-[#D7DBEC] mt-6">
          <div className="text-sm text-[#7E84A3]">
            Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} dari {filteredTransactions.length} transaksi
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="secondary"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2"
            >
              <FaChevronLeft size={14} />
            </Button>
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
                <Button
                  key={idx}
                  type={currentPage === pageNum ? "primary" : "secondary"}
                  onClick={() => setCurrentPage(pageNum)}
                  className="px-3 py-1"
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              type="secondary"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2"
            >
              <FaChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* ALERT DIALOG KONFIRMASI BATAL TRANSAKSI */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Batalkan Transaksi?</AlertDialogTitle>
            <AlertDialogDescription>
              Transaksi #{transactionToCancel?.id} - {transactionToCancel?.customerName} akan dibatalkan.
              Aksi ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700">
              Ya, Batalkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="text-center text-xs text-[#A1A7C4] py-4">
        <p>Jl. Paus No.73, Pekanbaru</p>
        <p>© 2025 Toko Buku Cendekia</p>
      </div>
    </Container>
  );
}