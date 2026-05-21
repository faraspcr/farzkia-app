// src/components/ProductRow.jsx
import PriceDisplay from "./PriceDisplay";
import StockBadge from "./StockBadge";
import Button from "./Button";
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 font-medium">{product.name}</td>
      <td className="p-3"><PriceDisplay amount={product.price} /></td>
      <td className="p-3">{product.stock}</td>
      <td className="p-3">{product.minStock}</td>
      <td className="p-3"><StockBadge stock={product.stock} minStock={product.minStock} /></td>
      <td className="p-3">
        <div className="flex space-x-2">
          <Button type="outline" onClick={() => onEdit(product)} className="p-2">
            <FaEdit className="text-blue-600" />
          </Button>
          <Button type="danger" onClick={() => onDelete(product)} className="p-2">
            <FaTrash />
          </Button>
        </div>
      </td>
    </tr>
  );
}