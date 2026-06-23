import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
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

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

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
      // Cek apakah email sudah terdaftar
      const checkResponse = await axios.get(
        `${API_URL}?email=ilike.${form.email}`,
        { headers }
      );
      
      if (checkResponse.data.length > 0) {
        setApiError('Email sudah terdaftar! Gunakan email lain.');
        setLoading(false);
        return;
      }
      
      // Buat user baru di Supabase
      const userData = {
        email: form.email,
        password: form.password,
        full_name: form.name,
        role: "user"
      };
      
      await axios.post(API_URL, userData, { headers });
      
      setSuccess('Pendaftaran berhasil! Silakan login.');
      
      // Reset form
      setForm({ name: '', email: '', password: '', confirm: '' });
      
      // Redirect ke login setelah 2 detik
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
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Buat Akun Baru</h2>
      <p className="text-center text-gray-500 text-sm mb-6">Daftar ke CRM Toko Buku Cendekia</p>
      
      {/* Loading */}
      {loading && (
        <div className="bg-gray-100 text-blue-600 p-3 rounded-lg text-sm mb-4 text-center">
          ⏳ Memproses...
        </div>
      )}

      {/* Error dari API */}
      {apiError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-300">
          ⚠️ {apiError}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-4 border border-green-300">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Nama Anda" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100" 
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder="email@example.com" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100" 
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type={showPass ? 'text' : 'password'} 
              placeholder="Min. 6 karakter" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={loading}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100" 
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {form.password.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(strength / 3) * 100}%`, backgroundColor: strengthColor }}></div>
              </div>
              <span className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</span>
            </div>
          )}
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type={showConfirm ? 'text' : 'password'} 
              placeholder="Ulangi password" 
              value={form.confirm} 
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              disabled={loading}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100" 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirm(!showConfirm)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {form.confirm && form.confirm === form.password ? 
                <FaCheckCircle className="text-green-500" /> : 
                showConfirm ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
          {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Memproses...' : 'Daftar Sekarang'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Sudah punya akun? <Link to="/login" className="text-blue-600 font-semibold">Masuk</Link>
      </p>
    </div>
  );
}