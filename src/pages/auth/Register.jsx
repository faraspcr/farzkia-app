import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
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
    title: "Bergabung dengan Cendekia",
    description: "Daftar sekarang dan kelola toko buku Anda dengan lebih mudah"
  },
  {
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
    title: "Manajemen Pelanggan",
    description: "Catat dan kelola data pelanggan dengan sistem terintegrasi"
  },
  {
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=600&fit=crop",
    title: "Analisis Penjualan",
    description: "Pantau performa penjualan dan buat keputusan bisnis yang tepat"
  },
  {
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",
    title: "Toko Buku Cendekia",
    description: "Solusi lengkap untuk manajemen toko buku modern"
  }
];

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirm: '' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    const err = {};
    if (!form.name) err.name = 'Nama wajib diisi';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Email tidak valid';
    if (!form.password || form.password.length < 6) err.password = 'Password minimal 6 karakter';
    if (form.password !== form.confirm) err.confirm = 'Password tidak cocok';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccess('');
    
    const errs = validate();
    if (Object.keys(errs).length > 0) { 
      setErrors(errs); 
      return; 
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const checkResponse = await axios.get(
        `${API_URL}?email=ilike.${form.email}`,
        { headers }
      );
      
      if (checkResponse.data.length > 0) {
        setApiError('Email sudah terdaftar! Gunakan email lain.');
        setLoading(false);
        return;
      }
      
      const userData = {
        email: form.email,
        password: form.password,
        full_name: form.name,
        role: "user"
      };
      
      await axios.post(API_URL, userData, { headers });
      
      setSuccess('Pendaftaran berhasil! Silakan login.');
      setForm({ name: '', email: '', password: '', confirm: '' });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Register error:', err);
      if (err.response) {
        setApiError(err.response.data.message || 'Terjadi kesalahan saat pendaftaran');
      } else if (err.request) {
        setApiError('Tidak dapat terhubung ke server. Cek koneksi internet Anda.');
      } else {
        setApiError(err.message || 'Terjadi kesalahan');
      }
    } finally {
      setLoading(false);
    }
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColor = ['#E5E7EB', '#EF4444', '#F59E0B', '#16A34A'][strength];
  const strengthLabel = ['', 'Lemah', 'Cukup', 'Kuat'][strength];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Container utama */}
      <div className="w-full max-w-7xl h-[95vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
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

        {/* RIGHT SIDE - REGISTER FORM (50%) - DIPERBESAR */}
        <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-12 bg-gradient-to-br from-white to-gray-50/80 flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-lg mx-auto">
            {/* Header - Lebih besar */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-800">
                  Buat Akun Baru
                </h2>
              </div>
              <p className="text-gray-500 text-sm ml-5">
                Daftar ke CRM Toko Buku Cendekia
              </p>
            </div>

            {/* Error & Success */}
            {apiError && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 mb-4 p-4 text-sm text-red-700 rounded-xl flex items-center gap-2">
                <BsFillExclamationDiamondFill className="text-red-500 flex-shrink-0 text-lg" />
                <span>{apiError}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 mb-4 p-4 text-sm text-green-700 rounded-xl flex items-center gap-2">
                <FaCheckCircle className="text-green-500 flex-shrink-0 text-lg" />
                <span>{success}</span>
              </div>
            )}

            {loading && (
              <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 mb-4 p-4 text-sm text-blue-700 rounded-xl flex items-center gap-2">
                <ImSpinner2 className="animate-spin text-lg" />
                <span>Memproses...</span>
              </div>
            )}

            {/* Form - Spacing lebih besar */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nama Lengkap
                </label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors text-base" />
                  <input 
                    type="text" 
                    placeholder="Nama Anda" 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white hover:border-gray-300 disabled:bg-gray-100 text-base"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors text-base" />
                  <input 
                    type="email" 
                    placeholder="email@example.com" 
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white hover:border-gray-300 disabled:bg-gray-100 text-base"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors text-base" />
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    placeholder="Min. 6 karakter" 
                    value={form.password} 
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    disabled={loading}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white hover:border-gray-300 disabled:bg-gray-100 text-base"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPass(!showPass)}
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                {form.password.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(strength / 3) * 100}%`, backgroundColor: strengthColor }}></div>
                    </div>
                    <span className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Konfirmasi Password
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors text-base" />
                  <input 
                    type={showConfirm ? 'text' : 'password'} 
                    placeholder="Ulangi password" 
                    value={form.confirm} 
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    disabled={loading}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white hover:border-gray-300 disabled:bg-gray-100 text-base"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirm(!showConfirm)}
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {form.confirm && form.confirm === form.password ? 
                      <FaCheckCircle className="text-green-500 text-lg" /> : 
                      showConfirm ? <FaEyeSlash /> : <FaEye />
                    }
                  </button>
                </div>
                {errors.confirm && <p className="text-red-500 text-xs mt-1.5">{errors.confirm}</p>}
              </div>

              {/* Submit - Lebih besar */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Sudah punya akun?{" "}
                <Link 
                  to="/login" 
                  className="text-blue-600 font-semibold hover:text-blue-800 transition hover:underline"
                >
                  Masuk
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-gray-400">Keuntungan Bergabung</span>
              </div>
            </div>

            {/* Benefits - Lebih besar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl p-3 text-center border border-blue-100/50 hover:shadow-md transition">
                <div className="text-blue-600 text-xl mb-1">📚</div>
                <p className="text-sm font-semibold text-gray-700">Kelola Buku</p>
              </div>
              <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl p-3 text-center border border-green-100/50 hover:shadow-md transition">
                <div className="text-green-600 text-xl mb-1">👥</div>
                <p className="text-sm font-semibold text-gray-700">Manajemen Customer</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-xl p-3 text-center border border-purple-100/50 hover:shadow-md transition">
                <div className="text-purple-600 text-xl mb-1">📊</div>
                <p className="text-sm font-semibold text-gray-700">Analisis Penjualan</p>
              </div>
              <div className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 rounded-xl p-3 text-center border border-orange-100/50 hover:shadow-md transition">
                <div className="text-orange-600 text-xl mb-1">🛡️</div>
                <p className="text-sm font-semibold text-gray-700">Aman & Terpercaya</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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