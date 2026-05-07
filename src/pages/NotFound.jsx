import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 mt-2">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}