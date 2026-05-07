import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><FaCheckCircle className="text-green-600 text-2xl" /></div>
        <h2 className="text-xl font-bold mb-2">Email Terkirim!</h2>
        <p className="text-gray-500 text-sm mb-2">Link reset password telah dikirim ke</p>
        <p className="text-blue-600 font-semibold mb-6">{email}</p>
        <button onClick={() => setSent(false)} className="w-full bg-gray-100 text-blue-600 py-2 rounded-lg font-semibold mb-3">Kirim Ulang</button>
        <Link to="/login" className="block text-center text-gray-400 text-sm">← Kembali ke login</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3"><FaEnvelope className="text-blue-700 text-xl" /></div>
        <h2 className="text-xl font-bold">Lupa Password?</h2>
        <p className="text-gray-500 text-sm mt-1">Masukkan email Anda untuk reset password</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4"><label className="block text-sm font-medium mb-1">Alamat Email</label><input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required /></div>
        <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">{loading ? 'Mengirim...' : 'Kirim Link Reset'}</button>
      </form>
      <Link to="/login" className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-4 hover:text-blue-600"><FaArrowLeft size={12} /> Kembali ke login</Link>
    </div>
  );
}