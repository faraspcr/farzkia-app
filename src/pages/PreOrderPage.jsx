import { useState, useEffect } from 'react';
import { FaBell, FaCheckCircle, FaClock } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import WhatsAppButton from '../components/WhatsAppButton';
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

  const getStatusColor = (status) => {
    if (status === 'waiting_stock') return 'bg-yellow-100 text-yellow-800';
    if (status === 'notified') return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div>
      <div className="mb-6">
        {/* Judul - SUDAH DIPERBAIKI */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pre-Order & Notifikasi Stok</h2>
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {preorders.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
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
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(p.status)}`}>
                        {getStatusLabel(p.status)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Kanan: Aksi */}
                <div className="flex gap-2">
                  {p.status === 'waiting_stock' && (
                    <button 
                      onClick={() => handleNotify(p)} 
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaBell /> Notifikasi
                    </button>
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
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500">Belum ada permintaan pre-order</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}