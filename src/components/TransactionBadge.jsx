// src/components/TransactionBadge.jsx
import Badge from './Badge';

export default function TransactionBadge({ status }) {
  const statusMap = {
    'diterima': { type: 'primary', label: 'Diterima' },
    'diproses': { type: 'warning', label: 'Diproses' },
    'siap_diambil': { type: 'success', label: 'Siap Diambil' },
    'selesai': { type: 'gray', label: 'Selesai' }
  };

  const config = statusMap[status] || statusMap['diterima'];

  return <Badge type={config.type}>{config.label}</Badge>;
}