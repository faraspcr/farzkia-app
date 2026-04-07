import { useState } from "react";
import InputField from "./components/InputField";

export default function UserForm() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        telepon: "",
        kursus: "",
        metode: ""
    });

    const [errors, setErrors] = useState({});
    const [hasil, setHasil] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ========== VALIDATION FUNCTIONS (TETAP SAMA PERSIS STRUKTURNYA) ==========
    const validateField = (name, value) => {
        let errorMsg = "";

        if (name === "nama") {
            if (!value) errorMsg = "Nama lengkap wajib diisi!";
            else if (value.length < 3) errorMsg = "Nama minimal 3 karakter!";
            else if (/[0-9]/.test(value)) errorMsg = "Nama tidak boleh mengandung angka!";
            else if (/[^a-zA-Z\s]/.test(value)) errorMsg = "Hanya huruf dan spasi yang diperbolehkan!";
        }

        if (name === "email") {
            if (!value) errorMsg = "Email wajib diisi!";
            else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Format email tidak valid!";
            else if (value.length > 50) errorMsg = "Email maksimal 50 karakter!";
            else if (!value.includes(".") || !value.includes("@")) errorMsg = "Email harus mengandung @ dan domain valid!";
        }

        if (name === "telepon") {
            if (!value) errorMsg = "Nomor telepon wajib diisi!";
            else if (!/^[0-9]+$/.test(value)) errorMsg = "Nomor telepon hanya boleh berisi angka!";
            else if (value.length < 10) errorMsg = "Nomor telepon minimal 10 digit!";
            else if (value.length > 13) errorMsg = "Nomor telepon maksimal 13 digit!";
        }

        if (name === "kursus" && !value) errorMsg = "Silakan pilih jenis kursus!";
        if (name === "metode" && !value) errorMsg = "Silakan pilih metode pembayaran!";

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const isReady =
        formData.nama && formData.email && formData.telepon && formData.kursus && formData.metode &&
        !Object.values(errors).some(msg => msg !== "");

    const hitungPesanan = (e) => {
        e.preventDefault();
        let hargaBase = 0;
        if (formData.kursus === "Flutter") hargaBase = 3500000;
        else if (formData.kursus === "React Native") hargaBase = 3800000;
        else if (formData.kursus === "Kotlin") hargaBase = 3200000;
        else if (formData.kursus === "Swift") hargaBase = 4000000;
        
        const total = hargaBase;
        setHasil({ ...formData, total });
        setIsSubmitted(true);
    };
    // ========== SAMPAI SINI FUNCTIONNYA SAMA PERSIS ==========

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-12 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER - BEDA TOTAL (VERTICAL CENTER, BUKAN SPLIT) */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 backdrop-blur border border-teal-500/30 rounded-full px-5 py-2 mb-4">
                        <span className="text-teal-400 text-sm">📱</span>
                        <span className="text-teal-300 text-xs font-bold uppercase tracking-wider">Mobile Development Bootcamp</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-3">
                        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Mobile Dev</span>
                    </h1>
                    <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                        Bangun karir sebagai mobile developer profesional. Kuasai framework terbaik industri!
                    </p>
                </div>

                {!isSubmitted ? (
                    <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
                        
                        {/* FORM SECTION - LAYOUT STACK (BUKAN SPLIT KAYAK LANY) */}
                        <div className="p-8 md:p-10">
                            <form onSubmit={hitungPesanan} className="space-y-6">
                                {/* Row 1: Nama + Email (Grid 2 kolom) */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <InputField 
                                            label="👤 Nama Lengkap" 
                                            name="nama" 
                                            value={formData.nama} 
                                            onChange={handleChange} 
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {errors.nama && (
                                            <p className="text-rose-400 text-xs mt-1 ml-2 flex items-center gap-1">
                                                <span>⚠️</span> {errors.nama}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <InputField 
                                            label="📧 Email" 
                                            type="email"
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            placeholder="email@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-rose-400 text-xs mt-1 ml-2 flex items-center gap-1">
                                                <span>⚠️</span> {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Row 2: Telepon */}
                                <div>
                                    <InputField 
                                        label="📞 Nomor Telepon" 
                                        type="tel"
                                        name="telepon" 
                                        value={formData.telepon} 
                                        onChange={handleChange} 
                                        placeholder="08123456789"
                                    />
                                    {errors.telepon && (
                                        <p className="text-rose-400 text-xs mt-1 ml-2 flex items-center gap-1">
                                            <span>⚠️</span> {errors.telepon}
                                        </p>
                                    )}
                                </div>

                                {/* Row 3: Pilih Kursus (Select 1) */}
                                <div>
                                    <label className="block text-teal-400 font-bold mb-2 text-sm uppercase tracking-wide">
                                        🎓 Pilih Program Kursus
                                    </label>
                                    <select 
                                        name="kursus" 
                                        value={formData.kursus} 
                                        onChange={handleChange}
                                        className="w-full p-4 bg-slate-900/80 border-2 border-slate-700 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/30 outline-none transition-all text-white text-base"
                                    >
                                        <option value="">Pilih program kursus</option>
                                        <option value="Flutter">📱 Flutter - Google (Rp 3.500.000)</option>
                                        <option value="React Native">⚛️ React Native - Meta (Rp 3.800.000)</option>
                                        <option value="Kotlin">🟢 Kotlin - Android Native (Rp 3.200.000)</option>
                                        <option value="Swift">🍎 Swift - iOS Native (Rp 4.000.000)</option>
                                    </select>
                                    {errors.kursus && (
                                        <p className="text-rose-400 text-xs mt-1 ml-2 flex items-center gap-1">
                                            <span>⚠️</span> {errors.kursus}
                                        </p>
                                    )}
                                </div>

                                {/* Row 4: Metode Pembayaran (Select 2) */}
                                <div>
                                    <label className="block text-teal-400 font-bold mb-2 text-sm uppercase tracking-wide">
                                        💳 Metode Pembayaran
                                    </label>
                                    <select 
                                        name="metode" 
                                        value={formData.metode} 
                                        onChange={handleChange}
                                        className="w-full p-4 bg-slate-900/80 border-2 border-slate-700 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/30 outline-none transition-all text-white text-base"
                                    >
                                        <option value="">Pilih metode pembayaran</option>
                                        <option value="Transfer Bank">🏦 Transfer Bank (BCA/Mandiri/BNI)</option>
                                        <option value="E-Wallet">📱 E-Wallet (OVO/DANA/GoPay)</option>
                                        <option value="Kartu Kredit">💳 Kartu Kredit (Visa/Mastercard)</option>
                                    </select>
                                    {errors.metode && (
                                        <p className="text-rose-400 text-xs mt-1 ml-2 flex items-center gap-1">
                                            <span>⚠️</span> {errors.metode}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Submit - Conditional */}
                                <div className="pt-4">
                                    {isReady ? (
                                        <button 
                                            type="submit" 
                                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold py-4 rounded-2xl uppercase tracking-wider text-base transition-all shadow-lg shadow-teal-500/30 hover:scale-[0.99] active:scale-95"
                                        >
                                            🚀 Daftar Sekarang & Hitung Biaya
                                        </button>
                                    ) : (
                                        <div className="w-full bg-slate-800/50 border-2 border-dashed border-teal-500/30 text-slate-400 font-bold py-4 rounded-2xl text-center text-sm uppercase tracking-wider">
                                            ⚡ Lengkapi semua data dengan benar ⚡
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* RESULT PREVIEW - LETAKNYA DI BAWAH FORM (BUKAN SAMPING) - BEDA TOTAL DARI LANY */}
                        {hasil && (
                            <div className="border-t border-teal-500/20 bg-teal-950/30 p-8 md:p-10">
                                <div className="text-center mb-6">
                                    <h3 className="text-teal-400 font-bold text-sm uppercase tracking-wider">✨ Preview Pendaftaran ✨</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-slate-900/60 rounded-2xl p-5 text-center border border-slate-700">
                                        <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Peserta</p>
                                        <p className="text-white font-bold text-lg">{hasil.nama}</p>
                                        <p className="text-slate-500 text-sm">{hasil.email}</p>
                                    </div>
                                    <div className="bg-slate-900/60 rounded-2xl p-5 text-center border border-slate-700">
                                        <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Program Kursus</p>
                                        <p className="text-teal-400 font-bold text-lg">{hasil.kursus}</p>
                                        <p className="text-slate-500 text-sm">{hasil.metode}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl p-5 text-center border border-teal-500/50">
                                        <p className="text-teal-300 text-xs uppercase tracking-wide mb-2">Total Biaya</p>
                                        <p className="text-3xl font-black text-white">Rp{hasil.total.toLocaleString()}</p>
                                        <p className="text-teal-400 text-xs mt-1">termasuk sertifikat & modul</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* SUCCESS SCREEN - BEDA TOTAL LAYOUT */
                    <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-teal-500/30 p-12 text-center shadow-2xl">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-6 shadow-2xl shadow-teal-500/40">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Pendaftaran Berhasil! 🎉</h2>
                        <p className="text-teal-400 text-base mb-8">Konfirmasi pendaftaran akan dikirim ke <span className="font-bold">{hasil?.email}</span></p>
                        
                        <div className="max-w-lg mx-auto bg-slate-800/60 rounded-2xl p-6 mb-8 border border-slate-700">
                            <div className="space-y-4 text-left">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                                    <span className="text-slate-400">Nama Lengkap</span>
                                    <span className="text-white font-semibold">{hasil?.nama}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                                    <span className="text-slate-400">Nomor Telepon</span>
                                    <span className="text-white font-semibold">{hasil?.telepon}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                                    <span className="text-slate-400">Program Kursus</span>
                                    <span className="text-teal-400 font-semibold">{hasil?.kursus}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                                    <span className="text-slate-400">Metode Pembayaran</span>
                                    <span className="text-white font-semibold">{hasil?.metode}</span>
                                </div>
                                <div className="flex justify-between items-center pt-3">
                                    <span className="text-teal-400 font-bold">TOTAL BIAYA</span>
                                    <span className="text-2xl font-black text-teal-400">Rp{hasil?.total?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => { 
                                setIsSubmitted(false); 
                                setHasil(null); 
                                setFormData({ nama: "", email: "", telepon: "", kursus: "", metode: "" }); 
                                setErrors({});
                            }}
                            className="text-slate-400 hover:text-teal-400 text-sm font-bold uppercase tracking-wider transition border-b-2 border-transparent hover:border-teal-400 pb-1"
                        >
                            ← Daftar Peserta Baru
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}