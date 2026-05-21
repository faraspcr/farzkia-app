// src/components/StockBadge.jsx
import Badge from './Badge';

export default function StockBadge({ stock, minStock = 5 }) {
  if (stock <= 0) {
    return <Badge type="danger">Habis</Badge>;
  }
  
  if (stock <= minStock) {
    return <Badge type="warning">Menipis</Badge>;
  }
  
  return <Badge type="success">Aman</Badge>;
}