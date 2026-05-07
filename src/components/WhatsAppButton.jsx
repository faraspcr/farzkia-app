import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton({ phoneNumber, customerName, message }) {
  const handleClick = () => {
    const msg = message || `Halo ${customerName}, ada info menarik nih dari Toko Buku Cendekia! 📚`;
    let cleanNumber = phoneNumber.toString();
    if (cleanNumber.startsWith('0')) cleanNumber = '62' + cleanNumber.substring(1);
    if (!cleanNumber.startsWith('62')) cleanNumber = '62' + cleanNumber;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <button onClick={handleClick} className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition text-sm">
      <FaWhatsapp /> <span>WhatsApp</span>
    </button>
  );
}