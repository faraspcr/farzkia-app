import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBookOpen,
} from "react-icons/fa";

import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

// ============================================
// KONFIGURASI SUPABASE
// ============================================
const API_URL = "https://ajzhvqiottyeodhhtyqb.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_g_qv9oZdohhB98Z33_AWuw_9cT4MS-E";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// SLIDESHOW DATA DENGAN GAMBAR
const slides = [
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
    title: "Kelola Buku dengan Mudah",
    description: "Atur stok, kategori, dan informasi buku secara efisien",
  },
  {
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
    title: "Manajemen Pelanggan",
    description: "Catat dan kelola data pelanggan dengan sistem terintegrasi",
  },
  {
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=600&fit=crop",
    title: "Analisis Penjualan",
    description: "Pantau performa penjualan dan buat keputusan bisnis yang tepat",
  },
  {
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",
    title: "Toko Buku Cendekia",
    description: "Solusi lengkap untuk manajemen toko buku modern",
  },
];

// ============================================
// AKUN DEMO - HANYA ADMIN
// ============================================
const demoAccounts = [
  {
    role: "admin",
    label: "User / Admin",
    badge: "Admin",
    email: "admincendekia@gmail.com",
    password: "admincendekia",
    icon: MdAdminPanelSettings,
    theme: {
      wrapper: "from-blue-50/80 to-indigo-50/80 border-blue-100/50",
      iconBg: "from-blue-600 to-indigo-600",
      badgeBg: "bg-blue-100 text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  },
];

// Tentukan tujuan redirect berdasarkan role.
// Kalau kolom role belum ada / kosong, default ke /dashboard.
const getRedirectPath = (role) => {
  if (role === "pelanggan") return "/pelanggan";
  return "/dashboard";
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // FUNGSI UNTUK AUTO FILL DEMO AKUN
  const fillDemoAccount = (email, password) => {
    setDataForm({ email, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.email || !dataForm.password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${API_URL}?email=ilike.${dataForm.email}&password=eq.${dataForm.password}`,
        { headers }
      );

      if (response.data.length > 0) {
        const userData = response.data[0];
        localStorage.setItem("user", JSON.stringify(userData));
        navigate(getRedirectPath(userData.role));
      } else {
        try {
          const emailCheck = await axios.get(
            `${API_URL}?email=ilike.${dataForm.email}`,
            { headers }
          );

          if (emailCheck.data.length > 0) {
            setError("❌ Password salah!");
          } else {
            setError("❌ Email tidak terdaftar!");
          }
        } catch (emailErr) {
          setError("❌ Email atau password salah");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data.message || "Email atau password salah");
      } else if (err.request) {
        setError("Tidak dapat terhubung ke server. Cek koneksi internet Anda.");
      } else {
        setError(err.message || "Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDE - SLIDESHOW */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              transform: "scale(1.05)",
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

        {/* RIGHT SIDE - LOGIN */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-white to-gray-50/80 flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-lg mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-800">Selamat Datang</h2>
              </div>
              <p className="text-gray-500 text-sm ml-4">
                Masuk ke dashboard CRM Toko Buku Cendekia
              </p>
            </div>

            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 mb-4 p-4 text-sm text-red-700 rounded-xl flex items-center gap-2">
                <BsFillExclamationDiamondFill className="text-red-500 flex-shrink-0 text-lg" />
                <span>{error}</span>
              </div>
            )}

            {loading && (
              <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 mb-4 p-4 text-sm text-blue-700 rounded-xl flex items-center gap-2">
                <ImSpinner2 className="animate-spin text-lg" />
                <span>Memproses...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white hover:border-gray-300"
                    placeholder="Masukkan email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={dataForm.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white hover:border-gray-300"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Ingat saya
                  </label>
                </div>
                <Link
                  to="/forgot"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition"
                >
                  Lupa password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  "Masuk ke Dashboard"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:text-blue-800 transition hover:underline"
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-gray-400">Akun Demo Instan</span>
              </div>
            </div>

            {/* DEMO ACCOUNTS - HANYA ADMIN */}
            <div className="space-y-3">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                return (
                  <div
                    key={acc.role}
                    className={`bg-gradient-to-r ${acc.theme.wrapper} backdrop-blur-sm rounded-xl p-4 border hover:shadow-md transition-all group cursor-pointer`}
                    onClick={() => fillDemoAccount(acc.email, acc.password)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${acc.theme.iconBg} rounded-lg flex items-center justify-center text-white shadow-md`}
                        >
                          <Icon className="text-xl" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            {acc.label}
                            <span className={`text-[10px] ${acc.theme.badgeBg} px-2 py-0.5 rounded-full font-normal`}>
                              {acc.badge}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 font-mono">{acc.email}</p>
                          <p className="text-xs text-gray-400 font-mono">pw: {acc.password}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fillDemoAccount(acc.email, acc.password);
                        }}
                        className={`text-xs ${acc.theme.button} text-white px-3 py-1.5 rounded-lg font-medium transition-all hover:shadow-md`}
                      >
                        Gunakan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}