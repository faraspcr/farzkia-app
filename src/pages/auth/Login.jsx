import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

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

export default function Login() {
  // NAVIGATE
  const navigate = useNavigate();

  // STATE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // FORM DATA
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  // HANDLE INPUT
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI
    if (!dataForm.email || !dataForm.password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Cari user dengan email dan password yang cocok di Supabase
      const response = await axios.get(
        `${API_URL}?email=ilike.${dataForm.email}&password=eq.${dataForm.password}`,
        { headers }
      );
      
      if (response.data.length > 0) {
        // Login berhasil
        const userData = response.data[0];
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        // Cek apakah email ada (tanpa password)
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

  // ERROR INFO
  const errorInfo = error ? (
    <div className="bg-red-100 border border-red-300 mb-5 p-4 text-sm text-red-700 rounded-lg flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  // LOADING INFO
  const loadingInfo = loading ? (
    <div className="bg-gray-100 mb-5 p-4 text-sm rounded-lg flex items-center text-gray-600">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div>
      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
        Selamat Datang Kembali
      </h2>

      <p className="text-center text-gray-500 text-sm mb-6">
        Masuk ke dashboard CRM Toko Buku Cendekia
      </p>

      {/* ERROR & LOADING */}
      {errorInfo}
      {loadingInfo}

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan email"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />

            {/* SHOW PASSWORD */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-right mb-5">
          <Link
            to="/forgot"
            className="text-sm text-blue-600 hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>

      {/* REGISTER */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold"
        >
          Daftar
        </Link>
      </p>
    </div>
  );
}