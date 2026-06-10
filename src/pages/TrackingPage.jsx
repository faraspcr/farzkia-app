// src/pages/TrackingPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderTimeline from '../components/OrderTimeline';
import { getTransactionById } from '../data/transactions';
import { formatRupiah, formatDate } from '../data/formatters';

// IMPORT KOMPONEN YANG SUDAH ADA (Card TIDAK diimport)
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import PriceDisplay from '../components/PriceDisplay';
import TransactionBadge from '../components/TransactionBadge';

export default function TrackingPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setTransaction(getTransactionById(parseInt(id))); 
    setLoading(false); 
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!transaction) return (
    <Container>
      <div className="text-center py-10 text-gray-500">Transaksi tidak ditemukan</div>
    </Container>
  );

  return (
    <Container>
      {/* PAKAI PAGEHEADER */}
      <PageHeader 
        title={`📦 Tracking Pesanan #${transaction.id}`} 
        description="Lacak status pengiriman pesanan Anda"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri - Timeline & Detail Pesanan */}
        <div className="lg:col-span-2">
          {/* Timeline - PAKAI DIV BIASA */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <OrderTimeline 
              trackingHistory={transaction.trackingHistory} 
              currentStatus={transaction.status} 
            />
          </div>
          
          {/* Detail Pesanan - PAKAI DIV BIASA */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 border border-gray-100">
            <h3 className="font-bold mb-4 text-gray-800">Detail Pesanan</h3>
            <table className="w-full text-sm">
              <tbody>
                {transaction.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">{item.productName}</td>
                    <td className="text-center text-gray-500">{item.quantity}x</td>
                    <td className="text-right">
                      <PriceDisplay amount={item.subtotal} />
                    </td>
                  </tr>
                ))}
                <tr className="font-bold border-t border-gray-200">
                  <td colSpan="2" className="py-2 text-gray-800">Total</td>
                  <td className="text-right">
                    <PriceDisplay amount={transaction.total} className="text-blue-600" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Kolom Kanan - Informasi  */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="font-bold mb-4 text-gray-800">Informasi</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">Status:</span>
              <TransactionBadge status={transaction.status} />
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Tanggal Order:</span>
              <p className="text-gray-800">{formatDate(transaction.orderDate)}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Metode:</span>
              <p className="text-gray-800">{transaction.paymentMethod === 'qris' ? 'QRIS' : 'Tunai'}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Sumber:</span>
              <p className="text-gray-800">
                {transaction.source === 'offline' ? 'Offline' : 
                 transaction.source === 'whatsapp' ? 'WhatsApp' : 'Shopee'}
              </p>
            </div>
            {transaction.pickupDate && (
              <div>
                <span className="text-gray-500 block mb-1">Diambil:</span>
                <p className="text-gray-800">{formatDate(transaction.pickupDate)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}