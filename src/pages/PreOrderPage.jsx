// src/pages/PreOrderPage.jsx
import { useState, useEffect } from 'react';
import { FaBell, FaCheckCircle, FaClock } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import WhatsAppButton from '../components/WhatsAppButton';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import { getPreorders, updatePreorderStatus } from '../data/preorders';
import { formatDate } from '../data/formatters';

// ✅ IMPORT ACCORDION
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PreOrderPage() {
  const [preorders, setPreorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openItemId, setOpenItemId] = useState(null);

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

  const getStatusBadge = (status) => {
    if (status === 'waiting_stock') return <Badge type="warning">Menunggu Stok</Badge>;
    if (status === 'notified') return <Badge type="success">Sudah Diberitahu</Badge>;
    return <Badge type="gray">Sudah Terpenuhi</Badge>;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <PageHeader 
        title="Pre-Order & Notifikasi Stok" 
        description="Kelola permintaan pre-order dan notifikasi stok kosong"
      />
      
      {/* ✅ ACCORDION LIST PRE-ORDER */}
      <div className="space-y-3">
        {preorders.map((preorder) => (
          <Accordion 
            key={preorder.id} 
            type="single" 
            collapsible 
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            value={openItemId}
            onValueChange={setOpenItemId}
          >
            <AccordionItem value={preorder.id} className="border-0">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-gray-50">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getStatusIcon(preorder.status)}</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg text-gray-800">{preorder.productName}</h3>
                      <p className="text-gray-500 text-sm">{preorder.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(preorder.status)}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Detail Pelanggan</p>
                    <p className="font-medium mt-1">Nama: {preorder.customerName}</p>
                    <p className="text-gray-600">No WA: {preorder.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Info Pre-Order</p>
                    <p className="font-medium mt-1">Tanggal Request: {formatDate(preorder.requestDate)}</p>
                    {preorder.estimatedArrival && (
                      <p className="text-blue-600">Estimasi Tiba: {formatDate(preorder.estimatedArrival)}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  {preorder.status === 'waiting_stock' && (
                    <Button type="primary" onClick={() => handleNotify(preorder)}>
                      <FaBell className="mr-2" /> Notifikasi
                    </Button>
                  )}
                  <WhatsAppButton 
                    phoneNumber={preorder.customerPhone} 
                    customerName={preorder.customerName} 
                    message={`Halo ${preorder.customerName}, buku "${preorder.productName}" yang Anda pre-order sudah tersedia!`} 
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        
        {preorders.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
            <p className="text-gray-500">Belum ada permintaan pre-order</p>
          </div>
        )}
      </div>
    </Container>
  );
}