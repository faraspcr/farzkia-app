import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaWhatsapp } from 'react-icons/fa';
import LoyaltyBadge from './LoyaltyBadge';
import WhatsAppButton from './WhatsAppButton';
import { formatRupiah } from '../data/formatters';

export default function CustomerTable({ customers, onDelete }) {
  const getCategoryLabel = (cat) => {
    const labels = { ortu_murid: { label: 'Orang Tua', icon: '👨‍👩‍👧' }, santri: { label: 'Santri', icon: '🕌' }, mahasiswa_umum: { label: 'Mahasiswa/Umum', icon: '🎓' } };
    return labels[cat] || { label: cat, icon: '📚' };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr><th className="p-3 text-left text-sm font-semibold">Nama</th><th>No WhatsApp</th><th>Kategori</th><th>Level</th><th>Status</th><th>Total Belanja</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {customers.map(customer => {
            const cat = getCategoryLabel(customer.category);
            return (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold">{customer.name.charAt(0)}</div><span className="font-medium">{customer.name}</span></div></td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3"><span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">{cat.icon} {cat.label}</span></td>
                <td className="p-3"><LoyaltyBadge level={customer.memberLevel} points={customer.points} /></td>
                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${customer.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{customer.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}</span></td>
                <td className="p-3">{formatRupiah(customer.totalSpent)}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <WhatsAppButton phoneNumber={customer.phone} customerName={customer.name} />
                    <Link to={`/customers/${customer.id}`} className="text-blue-600"><FaEye /></Link>
                    <Link to={`/customers/${customer.id}/edit`} className="text-yellow-600"><FaEdit /></Link>
                    <button onClick={() => onDelete(customer.id)} className="text-red-600"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}