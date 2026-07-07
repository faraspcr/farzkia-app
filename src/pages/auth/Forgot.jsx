import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaArrowLeft, 
  FaCheckCircle,
  FaBookOpen,
} from 'react-icons/fa';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import axios from 'axios';

// ============================================
// KONFIGURASI SUPABASE
// ============================================
const API_URL = "https://ajzhvqiottyeodhhtyqb.supabase.co/rest/v1/users"
const API_KEY = "sb_publishable_g_qv9oZdohhB98Z33_AWuw_9cT4MS-E"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

// SLIDESHOW DATA DENGAN GAMBAR
const slides = [
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
    title: "Lupa Password?",
    description: "Tenang, kami akan membantu Anda mereset password"
  },
  {
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
    title: "Keamanan Akun",
    description: "Kami prioritaskan keamanan data Anda dengan sistem terenkripsi"
  },
  {
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=600&fit=crop",
    title: "Dukungan 24/7",
    description: "Tim support kami siap membantu Anda kapan pun dibutuhkan"
  },
  {
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",
    title: "Toko Buku Cendekia",
    description: "Solusi lengkap untuk manajemen toko buku modern"
  }
];

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email wajib diisi');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email tidak valid');
      return;
    }

    setLoading(true);

    try {
      // Cek apakah email terdaftar di Supabase
      const checkResponse = await axios.get(
        `${API_URL}?email=ilike.${email}`,
        { headers }
      );
      
      if (checkResponse.data.length === 0) {
        setError('Email tidak terdaftar! Silakan daftar terlebih dahulu.');
        setLoading(false);
        return;
      }

      // SIMULASI KIRIM EMAIL RESET (karena Supabase tidak punya fitur email bawaan)
      // Di production, Anda perlu mengintegrasikan dengan email service seperti SendGrid, Nodemailer, dll.
      
      // Simpan data user untuk proses reset
      const userData = checkResponse.data[0];
      localStorage.setItem('reset_user', JSON.stringify(userData));
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSent(true);
      
    } catch (err) {
      console.error('Forgot password error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Terjadi kesalahan');
      } else if (err.request) {
        setError('Tidak dapat terhubung ke server. Cek koneksi internet Anda.');
      } else {
        setError(err.message || 'Terjadi kesalahan');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle reset password
  const handleResetPassword = () => {
    // Navigate ke halaman reset password dengan email
    window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-7xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* LEFT SIDE - SLIDESHOW (50%) */}
          <div className="w-full md:w-1/2 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
              style={{ 
                backgroundImage: `url(${slides[currentSlide].image})`,
                transform: 'scale(1.05)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-12">
              <div className="absolute top-8 left-8 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <FaBookOpen className="text-2xl text-blue-300" />
                <span className="text-lg font-bold tracking-wide">Cendekia</span>
              </div>

              <div className="text-center max-w-lg">
                <div className="transition-all duration-500">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-blue-100 text-base md:text-lg drop-shadow-md">
                    {slides[currentSlide].description}
                  </p>
                </div>
                <div className="mt-8 text-sm text-white/60">
                  {currentSlide + 1} / {slides.length}
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? "w-10 bg-white shadow-lg" 
                          : "w-2 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - SUCCESS (50%) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-white to-gray-50/80 flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaCheckCircle className="text-white text-4xl" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Email Terkirim!
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Link reset password telah dikirim ke
              </p>
              <p className="text-blue-600 font-semibold text-base mb-6 bg-blue-50 px-4 py-2 rounded-xl inline-block">
                {email}
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setSent(false);
                    setEmail('');
                  }} 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Kirim Ulang
                </button>
                
                <Link 
                  to="/login" 
                  className="block text-center text-gray-400 text-sm hover:text-blue-600 transition"
                >
                  ← Kembali ke login
                </Link>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-yellow-50/80 border border-yellow-200 rounded-xl">
                <p className="text-xs text-yellow-700">
                  💡 <span className="font-semibold">Simulasi:</span> Link reset akan mengarah ke halaman reset password. 
                  Untuk demo, silakan gunakan akun demo yang tersedia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Container utama */}
      <div className="w-full max-w-7xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE - SLIDESHOW (50%) */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
              transform: 'scale(1.05)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -ml-48 -mb-48" />

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-12">
            <div className="absolute top-8 left-8 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <FaBookOpen className="text-2xl text-blue-300" />
              <span className="text-lg font-bold tracking-wide">Cendekia</span>
            </div>

            <div className="text-center max-w-lg">
              <div className="transition-all duration-500">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-blue-100 text-base md:text-lg drop-shadow-md">
                  {slides[currentSlide].description}
                </p>
              </div>
              <div className="mt-8 text-sm text-white/60">
                {currentSlide + 1} / {slides.length}
              </div>
              <div className="flex justify-center gap-3 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? "w-10 bg-white shadow-lg" 
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORGOT FORM (50%) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-white to-gray-50/80 flex items-center justify-center">
          <div className="w-full max-w-lg mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <FaEnvelope className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Lupa Password?
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Masukkan email Anda untuk reset password
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 mb-4 p-4 text-sm text-red-700 rounded-xl flex items-center gap-2">
                <BsFillExclamationDiamondFill className="text-red-500 flex-shrink-0 text-lg" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Alamat Email
                </label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="email@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white hover:border-gray-300"
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                    Mengirim...
                  </span>
                ) : (
                  'Kirim Link Reset'
                )}
              </button>
            </form>

            {/* Back to Login */}
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-5 hover:text-blue-600 transition"
            >
              <FaArrowLeft size={12} /> 
              Kembali ke login
            </Link>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50/80 border border-blue-100 rounded-xl">
              <p className="text-xs text-blue-700">
                💡 Masukkan email yang terdaftar untuk mendapatkan link reset password.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}