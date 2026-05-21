// src/components/PreOrderCard.jsx
import Badge from "./Badge";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";
import { FaUser, FaCalendar, FaClock, FaBell } from 'react-icons/fa';

export default function PreOrderCard({ preOrder, onNotify }) {
  // Menyesuaikan status dengan data dari PreOrderPage (waiting_stock, notified)
  const getStatusBadge = (status) => {
    switch(status) {
      case 'waiting_stock':
        return <Badge type="warning">Menunggu Stok</Badge>;
      case 'notified':
        return <Badge type="success">Sudah Diberitahu</Badge>;
      default:
        return <Badge type="gray">Sudah Terpenuhi</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Kiri: Info Pre-order */}
        <div className="flex gap-4 flex-1">
          <div className="text-3xl">
            {preOrder.status === 'waiting_stock' && <FaClock className="text-yellow-500 text-2xl" />}
            {preOrder.status === 'notified' && <FaBell className="text-blue-500 text-2xl" />}
            {preOrder.status !== 'waiting_stock' && preOrder.status !== 'notified' && <FaCheckCircle className="text-green-500 text-2xl" />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 text-gray-800">{preOrder.productName}</h3>
            <p className="text-gray-600 text-sm">Pelanggan: {preOrder.customerName}</p>
            <p className="text-gray-500 text-sm">No WA: {preOrder.customerPhone}</p>
            <p className="text-gray-500 text-sm">Request: {preOrder.requestDate}</p>
            {preOrder.estimateDate && (
              <p className="text-blue-600 text-sm mt-1">Estimasi tiba: {preOrder.estimateDate}</p>
            )}
            <div className="mt-2">
              {getStatusBadge(preOrder.status)}
            </div>
          </div>
        </div>
        
        {/* Kanan: Aksi */}
        <div className="flex gap-2">
          {preOrder.status === 'waiting_stock' && (
            <Button type="primary" onClick={() => onNotify(preOrder)}>
              <FaBell className="mr-2" /> Notifikasi
            </Button>
          )}
          <WhatsAppButton 
            phoneNumber={preOrder.customerPhone} 
            customerName={preOrder.customerName} 
            message={`Halo ${preOrder.customerName}, buku "${preOrder.productName}" yang Anda pre-order sudah tersedia!`} 
          />
        </div>
      </div>
    </div>
  );
}