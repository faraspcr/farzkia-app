// src/pages/PreOrderPage.jsx
import { useState, useEffect } from 'react';
import { FaBell, FaCheckCircle, FaClock } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import WhatsAppButton from '../components/WhatsAppButton';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import PreOrderCard from '../components/PreOrderCard';
import { getPreorders, updatePreorderStatus } from '../data/preorders';
import { formatDate } from '../data/formatters';

export default function PreOrderPage() {
  const [preorders, setPreorders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPreorders(); }, []);

  const loadPreorders = () => { 
    setLoading(true); 
    setPreorders(getPreorders()); 
    setLoading(false); 
  };
  
  const handleNotify = (preorder) => { 
    updatePreorderStatus(preorder.id, 'notified'); 
    loadPreorders(); 
    alert(`Notifikasi akan dikirim ke ${preorder.customerName}`); 
  };

  const getStatusIcon = (status) => {
    if (status === 'waiting_stock') return <FaClock className="text-yellow-500" />;
    if (status === 'notified') return <FaBell className="text-blue-500" />;
    return <FaCheckCircle className="text-green-500" />;
  };

  const getStatusLabel = (status) => {
    if (status === 'waiting_stock') return 'Menunggu Stok';
    if (status === 'notified') return 'Sudah Diberitahu';
    return 'Sudah Terpenuhi';
  };

  const getStatusBadge = (status) => {
    if (status === 'waiting_stock') return <Badge type="warning">Menunggu Stok</Badge>;
    if (status === 'notified') return <Badge type="success">Sudah Diberitahu</Badge>;
    return <Badge type="gray">Sudah Terpenuhi</Badge>;
  };

  return (
    <Container>
      <PageHeader 
        title="Pre-Order & Notifikasi Stok" 
        description="Kelola permintaan pre-order dan notifikasi stok kosong"
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {preorders.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                {/* Kiri: Info Pre-order */}
                <div className="flex gap-4 flex-1">
                  <div className="text-3xl">{getStatusIcon(p.status)}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-gray-800">{p.productName}</h3>
                    <p className="text-gray-600 text-sm">Pelanggan: {p.customerName}</p>
                    <p className="text-gray-500 text-sm">No WA: {p.customerPhone}</p>
                    <p className="text-gray-500 text-sm">Request: {formatDate(p.requestDate)}</p>
                    {p.estimatedArrival && (
                      <p className="text-blue-600 text-sm mt-1">Estimasi tiba: {formatDate(p.estimatedArrival)}</p>
                    )}
                    <div className="mt-2">
                      {/* PAKAI BADGE COMPONENT */}
                      {getStatusBadge(p.status)}
                    </div>
                  </div>
                </div>
                
                {/* Kanan: Aksi - WA & NOTIFIKASI TETAP ADA */}
                <div className="flex gap-2">
                  {p.status === 'waiting_stock' && (
                    <Button type="primary" onClick={() => handleNotify(p)}>
                      <FaBell className="mr-2" /> Notifikasi
                    </Button>
                  )}
                  <WhatsAppButton 
                    phoneNumber={p.customerPhone} 
                    customerName={p.customerName} 
                    message={`Halo ${p.customerName}, buku "${p.productName}" yang Anda pre-order sudah tersedia!`} 
                  />
                </div>
              </div>
            </div>
          ))}
          
          {preorders.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
              <p className="text-gray-500">Belum ada permintaan pre-order</p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}