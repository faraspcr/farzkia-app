import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderTimeline from '../components/OrderTimeline';
import { getTransactionById } from '../data/transactions';
import { formatRupiah, formatDate } from '../data/formatters';

export default function TrackingPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTransaction(getTransactionById(parseInt(id))); setLoading(false); }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!transaction) return <div className="text-center py-10">Transaksi tidak ditemukan</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📦 Tracking Pesanan #{transaction.id}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><div className="bg-white rounded-xl shadow-md p-6"><OrderTimeline trackingHistory={transaction.trackingHistory} currentStatus={transaction.status} /></div><div className="bg-white rounded-xl shadow-md p-6 mt-6"><h3 className="font-bold mb-3">Detail Pesanan</h3><table className="w-full"><tbody>{transaction.items.map((item, idx) => (<tr key={idx} className="border-b"><td className="py-2">{item.productName}</td><td className="text-center">{item.quantity}x</td><td className="text-right">{formatRupiah(item.subtotal)}</td></tr>))}<tr className="font-bold"><td colSpan="2" className="py-2">Total</td><td className="text-right">{formatRupiah(transaction.total)}</td></tr></tbody></table></div></div>
        <div className="bg-white rounded-xl shadow-md p-6"><h3 className="font-bold mb-3">Informasi</h3><div className="space-y-2 text-sm"><p><span className="text-gray-500">Status:</span> <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'selesai' ? 'bg-green-100 text-green-800' : transaction.status === 'diproses' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{transaction.status}</span></p><p><span className="text-gray-500">Tanggal Order:</span> {formatDate(transaction.orderDate)}</p><p><span className="text-gray-500">Metode:</span> {transaction.paymentMethod === 'qris' ? 'QRIS' : 'Tunai'}</p><p><span className="text-gray-500">Sumber:</span> {transaction.source === 'offline' ? 'Offline' : transaction.source === 'whatsapp' ? 'WhatsApp' : 'Shopee'}</p>{transaction.pickupDate && <p><span className="text-gray-500">Diambil:</span> {formatDate(transaction.pickupDate)}</p>}</div></div>
      </div>
    </div>
  );
}