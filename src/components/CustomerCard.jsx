import { FaUser, FaPhone, FaWallet, FaStar } from 'react-icons/fa';
import LoyaltyBadge from './LoyaltyBadge';
import { formatRupiah } from '../utils/formatters';

export default function CustomerCard({ customer }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-lg font-bold">{customer.name.charAt(0)}</div>
          <div><h3 className="font-bold text-gray-800">{customer.name}</h3><p className="text-xs text-gray-500">ID: #{customer.id}</p></div>
        </div>
        <LoyaltyBadge level={customer.memberLevel} points={customer.points} />
      </div>
      <div className="mt-3 space-y-1 text-sm">
        <p className="flex items-center gap-2 text-gray-600"><FaPhone className="text-gray-400" /> {customer.phone}</p>
        <p className="flex items-center gap-2 text-gray-600"><FaWallet className="text-gray-400" /> Total: {formatRupiah(customer.totalSpent)}</p>
        <p className="flex items-center gap-2 text-gray-600"><FaStar className="text-yellow-400" /> Bergabung: {customer.joinDate}</p>
      </div>
    </div>
  );
}