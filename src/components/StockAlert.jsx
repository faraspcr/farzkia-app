import { FaExclamationTriangle } from 'react-icons/fa';

export default function StockAlert({ products }) {
  const lowStockProducts = products.filter(p => p.stock < p.minStock);
  if (lowStockProducts.length === 0) {
    return <div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-700 text-sm">✅ Semua stok aman</p></div>;
  }

  return (
    <div className="space-y-2">
      {lowStockProducts.map(product => (
        <div key={product.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FaExclamationTriangle className="text-yellow-600" />
            <div>
              <p className="font-medium text-sm">{product.name}</p>
              <p className="text-xs text-gray-500">Sisa: {product.stock}</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm hover:underline">Pesan Ulang</button>
        </div>
      ))}
    </div>
  );
}