// src/components/PriceDisplay.jsx
export default function PriceDisplay({ amount, className = "" }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(angka);
  };

  return (
    <span className={`font-medium ${className}`}>
      {formatRupiah(amount)}
    </span>
  );
}