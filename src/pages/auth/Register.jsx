import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.name) err.name = 'Nama wajib diisi';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Email tidak valid';
    if (!form.password || form.password.length < 6) err.password = 'Password minimal 6 karakter';
    if (form.password !== form.confirm) err.confirm = 'Password tidak cocok';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    alert('Pendaftaran berhasil! Silakan login.');
    navigate('/login');
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColor = ['#E5E7EB', '#EF4444', '#F59E0B', '#16A34A'][strength];
  const strengthLabel = ['', 'Lemah', 'Cukup', 'Kuat'][strength];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Buat Akun Baru</h2>
      <p className="text-center text-gray-500 text-sm mb-6">Daftar ke CRM Toko Buku Cendekia</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium mb-1">Nama Lengkap</label><div className="relative"><FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Nama Anda" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" /></div>{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}</div>
        <div><label className="block text-sm font-medium mb-1">Email</label><div className="relative"><FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="email" placeholder="email@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" /></div>{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}</div>
        <div><label className="block text-sm font-medium mb-1">Password</label><div className="relative"><FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type={showPass ? 'text' : 'password'} placeholder="Min. 6 karakter" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPass ? <FaEyeSlash /> : <FaEye />}</button></div>
          {form.password.length > 0 && <div className="flex items-center gap-2 mt-2"><div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${(strength / 3) * 100}%`, backgroundColor: strengthColor }}></div></div><span className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</span></div>}
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}</div>
        <div><label className="block text-sm font-medium mb-1">Konfirmasi Password</label><div className="relative"><FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type={showConfirm ? 'text' : 'password'} placeholder="Ulangi password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" /><button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{form.confirm && form.confirm === form.password ? <FaCheckCircle className="text-green-500" /> : showConfirm ? <FaEyeSlash /> : <FaEye />}</button></div>{errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}</div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">Daftar Sekarang</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">Sudah punya akun? <Link to="/login" className="text-blue-600 font-semibold">Masuk</Link></p>
    </div>
  );
}