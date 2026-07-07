import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ============================================================
// 3D COVERFLOW CAROUSEL - APPLE STYLE
// ============================================================
const CoverflowCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && !isAnimating) {
        setActiveIndex(prev => (prev + 1) % items.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length, isDragging, isAnimating]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsAnimating(true);
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        setActiveIndex(prev => (prev - 1 + items.length) % items.length);
      } else {
        setActiveIndex(prev => (prev + 1) % items.length);
      }
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    setDragOffset(0);
  };

  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const isCenter = diff === 0;
    
    let translateX = diff * 220;
    let scale = 1;
    let rotateY = 0;
    let opacity = 1;
    let zIndex = 10;
    
    if (isCenter) {
      scale = 1.1;
      zIndex = 50;
      opacity = 1;
      rotateY = 0;
    } else if (Math.abs(diff) === 1) {
      scale = 0.85;
      zIndex = 30;
      opacity = 0.8;
      rotateY = diff > 0 ? -15 : 15;
      translateX = diff > 0 ? 180 : -180;
    } else if (Math.abs(diff) === 2) {
      scale = 0.65;
      zIndex = 20;
      opacity = 0.5;
      rotateY = diff > 0 ? -25 : 25;
      translateX = diff > 0 ? 330 : -330;
    } else {
      scale = 0.4;
      zIndex = 10;
      opacity = 0.2;
      rotateY = diff > 0 ? -35 : 35;
      translateX = diff > 0 ? 480 : -480;
    }

    if (isDragging && isCenter) {
      translateX += dragOffset * 0.5;
    } else if (isDragging && Math.abs(diff) === 1) {
      translateX += dragOffset * 0.3;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: opacity,
      zIndex: zIndex,
      transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      transformStyle: 'preserve-3d',
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[420px] overflow-hidden cursor-grab select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        setDragOffset(diff);
      }}
      onTouchEnd={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
        {items.map((item, index) => {
          const style = getCardStyle(index);
          return (
            <div
              key={index}
              className="absolute cursor-pointer"
              style={{
                ...style,
                width: '240px',
                left: '50%',
                marginLeft: '-120px',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
              onClick={() => {
                if (!isDragging && Math.abs(dragOffset) < 20) {
                  setActiveIndex(index);
                }
              }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white group">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="p-4 text-center bg-white">
                  <p className="font-bold text-gray-800 text-base">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 bg-blue-600' : 'w-3 bg-blue-200 hover:bg-blue-400'
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    </div>
  );
};

// ============================================================
// BANNER SLIDER
// ============================================================
const BannerSlider = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600&h=400",
      title: "Kelola Stok Buku dengan Mudah",
      desc: "Pantau stok buku, alat tulis, dan kitab dalam satu dashboard"
    },
    {
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600&h=400",
      title: "Program Loyalitas Pelanggan",
      desc: "Tingkatkan retensi dengan sistem poin dan reward"
    },
    {
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600&h=400",
      title: "Omnichannel Integration",
      desc: "Hubungkan WhatsApp, Toko, Shopee dalam satu sistem"
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl sm:text-2xl font-bold">{slide.title}</h3>
            <p className="text-sm sm:text-base text-white/80 mt-1">{slide.desc}</p>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MAIN
// ============================================================
export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const catalogItems = [
    { image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400", text: "Buku Novel" },
    { image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400", text: "Buku Anak" },
    { image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400", text: "Kitab Islam" },
    { image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400", text: "Alat Tulis" },
    { image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400", text: "Kamus Bahasa" },
    { image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400", text: "Buku Pelajaran" },
  ];

  const features = [
    { icon: '📊', title: 'Analitik Penjualan Real-Time', desc: 'Pantau total sales, total order, dan grafik metrik pertumbuhan bisnis Anda dalam satu dasbor terintegrasi.' },
    { icon: '👥', title: 'Manajemen Data Pelanggan', desc: 'Kelola data kontak, riwayat transaksi, dan tingkatkan loyalitas pelanggan dengan sistem tiering yang rapi.' },
    { icon: '🔔', title: 'Peringatan Stok Otomatis', desc: 'Sistem alert pintar yang otomatis mengingatkan Anda saat kuantitas stok produk atau komoditas toko mulai menipis.' },
  ];

  const faqs = [
    { q: 'Apakah CendekiaBook bisa diakses gratis?', a: 'Ya! Kami menyediakan paket dasar gratis selamanya untuk UMKM, serta paket premium untuk fitur analitik yang lebih mendalam.' },
    { q: 'Apakah data pelanggan saya aman di sini?', a: 'Tentu! Data pelanggan dienkripsi dengan standar keamanan tertinggi dan kami tidak pernah membagikan data ke pihak ketiga.' },
    { q: 'Bagaimana cara menghubungkan CRM ini dengan WhatsApp?', a: 'Anda dapat mengintegrasikannya dengan mudah melalui pengaturan integrasi API yang sudah disediakan di dalam dasbor.' },
    { q: 'Berapa lama setup aplikasi?', a: 'Hanya 5 menit! Anda sudah bisa langsung mengelola toko buku Anda.' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s ease;
        }
        .fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .btn-gradient {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .text-gradient {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.12);
        }
        .float-anim {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

      {/* ============================================================
      NAVBAR
      ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div onClick={() => scrollTo('home')} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-200 group-hover:scale-110 transition">C</div>
            <span className="font-bold text-xl text-gray-800">CendekiaBook</span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {['Fitur', 'FAQ', 'Tentang', 'Kontak'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-gray-500 hover:text-blue-600 transition">
                {item}
              </button>
            ))}
          </nav>
          
          <Link to="/login" className="px-5 py-1.5 rounded-full btn-gradient text-white text-sm font-medium shadow-lg shadow-blue-200 hover:scale-105 transition">
            Masuk ke Aplikasi
          </Link>
        </div>
      </header>

      {/* ============================================================
      MAIN
      ============================================================ */}
      <main className="pt-16">
        
        {/* ===== HERO ===== */}
        <section id="home" className="relative overflow-hidden scroll-mt-16 min-h-[90vh] flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              
              <div className="fade-up space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  🚀 Platform Manajemen Toko Buku
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-gray-900">
                  Kelola Toko Buku <br/>
                  <span className="text-gradient">Modern & Efisien</span>
                </h1>
                
                <p className="text-gray-500 text-base max-w-md leading-relaxed">
                  Sistem manajemen terintegrasi untuk toko buku, alat tulis, dan kebutuhan pendidikan. Pantau stok, kelola pelanggan, dan tingkatkan penjualan dengan mudah.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="px-8 py-3 rounded-full btn-gradient text-white font-medium shadow-lg shadow-blue-200 hover:shadow-xl transition text-sm">
                    🚀 Coba Gratis
                  </button>
                </div>

                <div className="flex gap-6 pt-2 text-sm">
                  <div><span className="font-bold text-gray-800">30+</span> <span className="text-gray-400">Toko Bergabung</span></div>
                  <div><span className="font-bold text-gray-800">4.8/5</span> <span className="text-gray-400">Kepuasan</span></div>
                  <div><span className="font-bold text-gray-800">150+</span> <span className="text-gray-400">Produk Terkelola</span></div>
                </div>
              </div>

              <div className="fade-up">
                <BannerSlider />
              </div>

            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="fitur" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="fade-up text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">Fitur Unggulan</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-gray-900">
              Solusi CRM Lengkap untuk <span className="text-gradient">Bisnis Anda</span>
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Kelola toko buku Anda dengan lebih efisien dan terukur</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="fade-up card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{f.title}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{f.desc}</p>
                <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl text-center text-sm font-medium text-gray-400 border border-dashed border-gray-200">
                  📱 Mockup Preview
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 3D COVERFLOW CATALOG ===== */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="fade-up text-center mb-12">
              <span className="text-sm font-extrabold uppercase tracking-widest text-blue-600">KATALOG POPULER 3D</span>
              <h2 className="text-3xl sm:text-5xl font-black mt-2 text-gray-900">
                Eksplorasi Koleksi <span className="text-gradient">Terbaik Kami</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500 text-sm">
                Drag/geser galeri melingkar di bawah ini untuk melihat koleksi kategori buku dan alat tulis unggulan CendekiaBook.
              </p>
            </div>
            <CoverflowCarousel items={catalogItems} />
          </div>
        </section>

        {/* ===== TENTANG ===== */}
        <section id="tentang" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="fade-up grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">Tentang Kami</span>
              <h2 className="text-3xl sm:text-4xl font-black mt-2 text-gray-900">Solusi <span className="text-gradient">Toko Buku Modern</span></h2>
              <p className="text-gray-500 mt-4 leading-relaxed">
                CendekiaBook hadir untuk membantu toko buku, alat tulis, dan bisnis pendidikan lainnya mengelola operasional dengan lebih efisien. Kami percaya bahwa teknologi dapat membantu UMKM berkembang lebih cepat.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-blue-600">50+</div>
                  <div className="text-xs text-gray-500">Toko Terpercaya</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600">4.8★</div>
                  <div className="text-xs text-gray-500">Rating Pelanggan</div>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600&h=400" 
                alt="Toko Buku" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="fade-up text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-gray-900">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-500 mt-2">Temukan jawaban cepat untuk pertanyaan umum tentang CendekiaBook</p>
          </div>
          
          <div className="fade-up bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {faqs.map((f, i) => (
              <details key={i} className="border-b border-gray-100 last:border-0 group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50/50 transition font-semibold text-gray-800">
                  {f.q}
                  <span className="text-blue-500 text-xl group-open:rotate-180 transition">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ===== KONTAK ===== */}
        <section id="kontak" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="fade-up grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">Hubungi Kami</span>
              <h2 className="text-3xl font-black mt-2 text-gray-900">Ada Pertanyaan? <span className="text-gradient">Kami Siap Membantu</span></h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4"><span className="text-2xl">📧</span><div><p className="font-semibold">Email</p><p className="text-sm text-gray-500">support@cendekiabook.com</p></div></div>
                <div className="flex items-center gap-4"><span className="text-2xl">📱</span><div><p className="font-semibold">WhatsApp</p><p className="text-sm text-gray-500">+62 (123) 456-7890</p></div></div>
                <div className="flex items-center gap-4"><span className="text-2xl">📍</span><div><p className="font-semibold">Alamat</p><p className="text-sm text-gray-500">Pekanbaru, Indonesia</p></div></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h4 className="font-bold text-gray-800">Kirim Pesan</h4>
              <input type="text" placeholder="Nama" className="w-full mt-3 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
              <input type="email" placeholder="Email" className="w-full mt-3 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
              <textarea placeholder="Pesan" rows="3" className="w-full mt-3 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
              <button className="w-full mt-4 py-3 rounded-full btn-gradient text-white font-medium shadow-lg shadow-blue-200 hover:shadow-xl transition">Kirim Pesan</button>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="fade-up relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-12 text-center text-white shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-black">Siap Mengelola Toko Buku Lebih Efisien?</h2>
              <p className="text-white/80 mt-3 max-w-xl mx-auto text-lg">
                Ratusan UMKM telah merasakan kemudahan mengelola bisnis dengan CendekiaBook.
              </p>
              <button onClick={() => navigate('/register')} className="mt-6 px-10 py-3.5 rounded-full bg-white text-blue-700 font-bold shadow-xl hover:scale-105 transition text-lg">
                🚀 Mulai Gratis Sekarang
              </button>
              <div className="flex flex-wrap justify-center gap-6 mt-5 text-sm text-white/70">
                <span>✓ Tidak perlu kartu kredit</span>
                <span>✓ Setup 5 menit</span>
                <span>✓ Akses penuh fitur dasar</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
      FOOTER
      ============================================================ */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">C</div>
                <span className="font-bold text-xl text-white">CendekiaBook</span>
              </div>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                Platform CRM modern untuk mengelola pelanggan dan bisnis toko buku Anda dengan lebih efisien.
              </p>
              <div className="flex gap-3 mt-4">
                <span className="text-gray-400 hover:text-white transition cursor-pointer text-xl">📘</span>
                <span className="text-gray-400 hover:text-white transition cursor-pointer text-xl">📸</span>
                <span className="text-gray-400 hover:text-white transition cursor-pointer text-xl">🐦</span>
                <span className="text-gray-400 hover:text-white transition cursor-pointer text-xl">💼</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white">Produk</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition cursor-pointer">Dashboard</li>
                <li className="hover:text-white transition cursor-pointer">Manajemen Pelanggan</li>
                <li className="hover:text-white transition cursor-pointer">Manajemen Produk</li>
                <li className="hover:text-white transition cursor-pointer">Program Loyalitas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">Perusahaan</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition cursor-pointer">Tentang Kami</li>
                <li className="hover:text-white transition cursor-pointer">Karir</li>
                <li className="hover:text-white transition cursor-pointer">Kebijakan Privasi</li>
                <li className="hover:text-white transition cursor-pointer">Syarat & Ketentuan</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">Kontak</h4>
              <div className="mt-3 space-y-2 text-sm text-gray-400">
                <p>📍 Pekanbaru, Indonesia</p>
                <p>📧 support@cendekiabook.com</p>
                <p>📱 +62 (123) 456-7890</p>
                <p className="text-xs text-gray-500">🕐 Senin - Sabtu: 08:00 - 20:00</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 rounded-full border border-gray-700 text-sm text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition">
                  💬 WhatsApp
                </button>
                <button className="px-4 py-2 rounded-full border border-gray-700 text-sm text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition">
                  📧 Email
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2026 CendekiaBook. All rights reserved. Made with ❤️ in Pekanbaru
          </div>
        </div>
      </footer>
    </div>
  );
}