// src/components/TransactionCard.jsx
import PriceDisplay from "./PriceDisplay";
import TransactionBadge from "./TransactionBadge";
import Button from "./Button";
import { FaWhatsapp, FaStore, FaShopify } from 'react-icons/fa';

export default function TransactionCard({ transaction, onViewDetail }) {
  const getSourceIcon = (source) => {
    switch(source) {
      case 'whatsapp': return <FaWhatsapp className="text-green-500" />;
      case 'offline': return <FaStore className="text-blue-500" />;
      case 'shopee': return <FaShopify className="text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {getSourceIcon(transaction.source)}
          <span className="font-medium text-gray-800">{transaction.customerName}</span>
        </div>
        <TransactionBadge status={transaction.status} />
      </div>
      
      <PriceDisplay amount={transaction.amount} className="text-xl font-bold text-gray-800 mb-1" />
      
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-500">{transaction.items?.length || 0} item</span>  {/* ← PERBAIKAN DI SINI */}
        <Button type="outline" onClick={() => onViewDetail(transaction)}>
          Lihat Detail
        </Button>
      </div>
    </div>
  );
}