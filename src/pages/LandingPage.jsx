import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const navItems = ['Beranda', 'Produk', 'Loyalitas', 'Promo'];

const featuredProducts = [
  {
    name: 'Buku Paket SD',
    price: 'Rp 45.000',
    description: 'Lengkap untuk kurikulum terbaru dengan kualitas cetak terbaik.',
    accent: 'from-blue-500 to-cyan-500',
    emoji: '📘',
  },
  {
    name: 'Alat Tulis Premium',
    price: 'Rp 18.000',
    description: 'Pensil, bolpoin, dan stationery favorit anak sekolah dan mahasiswa.',
    accent: 'from-amber-400 to-orange-500',
    emoji: '✏️',
  },
  {
    name: 'Kamus Bahasa',
    price: 'Rp 95.000',
    description: 'Referensi lengkap untuk belajar dan kebutuhan akademik.',
    accent: 'from-emerald-500 to-teal-500',
    emoji: '📖',
  },
  {
    name: 'Kitab dan Referensi',
    price: 'Rp 120.000',
    description: 'Koleksi pilihan untuk pembelajaran dan kegiatan keagamaan.',
    accent: 'from-violet-500 to-indigo-500',
    emoji: '🕯️',
  },
];

const loyaltyTiers = [
  {
    name: 'Reguler',
    points: '0–99 poin',
    perks: ['Diskon rutin mingguan', 'Akses promo member', 'Notifikasi produk terbaru'],
    accent: 'from-slate-100 to-slate-200',
    text: 'text-slate-700',
  },
  {
    name: 'Silver',
    points: '100–299 poin',
    perks: ['Bonus cashback 3%', 'Prioritas stok favorit', 'Undangan event eksklusif'],
    accent: 'from-slate-200 to-blue-100',
    text: 'text-blue-700',
  },
  {
    name: 'Gold',
    points: '300+ poin',
    perks: ['Diskon khusus 10%', 'Pre-order prioritas', 'Hadiah ulang tahun member'],
    accent: 'from-amber-100 to-orange-200',
    text: 'text-amber-700',
  },
];

const promos = [
  {
    title: 'Promo Awal Tahun Ajaran Baru',
    description: 'Diskon khusus buku paket, alat tulis, dan perlengkapan sekolah.',
    badge: 'Diskon 25%',
  },
  {
    title: 'Ramadhan Berkah',
    description: 'Program bundling hadiah dan promo khusus untuk pelanggan setia.',
    badge: 'Bundle hemat',
  },
];

const testimonials = [
  {
    name: 'Aisyah Putri',
    role: 'Orang Tua Murid',
    quote: 'Sangat nyaman belanja di Cendekia, stok selalu terjamin dan promo-nya selalu relevan.',
  },
  {
    name: 'Rama Wijaya',
    role: 'Mahasiswa',
    quote: 'Paket produk lengkap dan pelayanan terasa personal. Saya jadi lebih sering kembali.',
  },
  {
    name: 'Dewi Lestari',
    role: 'Pengusaha Kecil',
    quote: 'Saya suka sistem loyalitasnya, terasa jelas dan memberi manfaat nyata untuk pelanggan.',
  },
];

const whyChoose = [
  {
    title: 'Katalog lengkap',
    description: 'Dapatkan buku, alat tulis, dan referensi berkualitas dalam satu tempat.',
    icon: '📚',
  },
  {
    title: 'Layanan personal',
    description: 'Kebutuhan pelanggan lebih mudah dipantau dengan sistem yang terorganisir.',
    icon: '💬',
  },
  {
    title: 'Promo yang relevan',
    description: 'Program loyalitas dan campaign aktif disusun agar pelanggan selalu merasa dihargai.',
    icon: '🎁',
  },
];

export default function LandingPage() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_30%),linear-gradient(135deg,_#fefefe_0%,_#f7faff_45%,_#fef8f8_100%)] text-gray-800">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
          animation: none;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="animate-fade-in-up">
            <a href="#beranda" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-blue-600 text-lg font-black text-white shadow-lg shadow-blue-200">
                C
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-blue-700">Cendekia</h1>
                <p className="text-xs text-gray-500">Toko Buku & Alat Tulis</p>
              </div>
            </a>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="animate-fade-in-up text-sm font-semibold text-gray-600 transition duration-300 hover:text-blue-600"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </a>
            ))}
          </nav>

          <Link
            to="/login"
            className="animate-fade-in-up rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white hover:shadow-lg"
          >
            Masuk
          </Link>
        </div>
      </header>

      <main id="beranda">
        <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_24%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-in-up reveal-on-scroll">
              <div className="mb-5 inline-flex items-center rounded-full border border-red-100 bg-white/80 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm backdrop-blur">
                CRM untuk toko buku modern
              </div>
              <h2 className="max-w-2xl text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Solusi cerdas untuk toko buku yang ingin tumbuh lebih cepat.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Cendekia membantu Anda mengelola pelanggan, stok, loyalitas, dan promo dengan pengalaman yang lebih modern, cepat, dan terorganisir.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Belanja Sekarang
                </Link>
                <a
                  href="#produk"
                  className="rounded-full border border-gray-300 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 transition duration-300 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600 hover:shadow-md"
                >
                  Lihat Produk
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm">
                  <p className="text-xl font-bold text-blue-700">500+</p>
                  <p className="text-sm text-gray-500">Pelanggan loyal</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm">
                  <p className="text-xl font-bold text-red-500">98%</p>
                  <p className="text-sm text-gray-500">Kepuasan pelanggan</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up reveal-on-scroll rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-[0_30px_70px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
              <div className="rounded-[24px] bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 p-6 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                  Promo minggu ini
                </p>
                <h3 className="mt-3 text-2xl font-bold">Promo Awal Tahun Ajaran Baru</h3>
                <p className="mt-3 text-sm leading-7 text-blue-50">
                  Dapatkan diskon spesial untuk alat tulis, buku paket, dan kebutuhan sekolah.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                    Diskon hingga 25%
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                    Gratis packing
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="text-sm font-semibold text-blue-700">Loyalitas</p>
                  <p className="mt-2 text-xl font-bold text-gray-900">Tier Reguler, Silver, Gold</p>
                </div>
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="text-sm font-semibold text-red-600">Omnichannel</p>
                  <p className="mt-2 text-xl font-bold text-gray-900">Promo aktif dan campaign</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="produk" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="animate-fade-in-up reveal-on-scroll">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Produk unggulan</p>
                <h3 className="mt-2 text-3xl font-black text-gray-900">Pilihan favorit pelanggan</h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-gray-600">
                Koleksi terbaik untuk kebutuhan sekolah, belajar, dan aktivitas harian.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="group rounded-[24px] border border-gray-200 bg-white p-5 shadow-[0_16px_35px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-20px_rgba(37,99,235,0.28)]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${product.accent} text-2xl shadow-lg`}>
                    {product.emoji}
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-gray-900">{product.name}</h4>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-base font-semibold text-blue-700">{product.price}</span>
                    <span className="text-sm font-semibold text-gray-500 transition duration-300 group-hover:text-blue-600">
                      Lihat detail →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="loyalitas" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="animate-fade-in-up reveal-on-scroll rounded-[32px] border border-gray-200 bg-white/85 p-8 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] lg:p-10">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Program loyalitas</p>
                <h3 className="mt-2 text-3xl font-black text-gray-900">Nikmati manfaat sesuai tier Anda</h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-gray-600">
                Setiap transaksi membantu Anda naik level dan menikmati keuntungan yang semakin menarik.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {loyaltyTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`rounded-[24px] border border-gray-200 bg-gradient-to-br ${tier.accent} p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-gray-900">{tier.name}</h4>
                    <span className={`rounded-full bg-white/70 px-3 py-1 text-xs font-semibold ${tier.text}`}>
                      {tier.points}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-gray-700">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="promo" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="animate-fade-in-up reveal-on-scroll">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">Promo aktif</p>
                <h3 className="mt-2 text-3xl font-black text-gray-900">Campaign yang sedang berjalan</h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-gray-600">
                Promo yang menarik untuk mendukung kebutuhan belajar, aktivitas sekolah, dan belanja hemat.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {promos.map((promo, index) => (
                <div
                  key={promo.title}
                  className="rounded-[24px] border border-gray-200 bg-white p-7 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(239,68,68,0.2)]"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-xl font-bold text-gray-900">{promo.title}</h4>
                    <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                      {promo.badge}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-gray-600">{promo.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="animate-fade-in-up reveal-on-scroll rounded-[32px] border border-gray-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-[0_24px_50px_-22px_rgba(37,99,235,0.45)] lg:p-10">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Testimoni pelanggan</p>
                <h3 className="mt-2 text-3xl font-black">Apa yang mereka katakan</h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-blue-100">
                Pengalaman nyata pelanggan yang merasa lebih mudah dan nyaman berbelanja bersama Cendekia.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <div
                  key={item.name}
                  className="rounded-[24px] border border-white/20 bg-white/10 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-blue-100">{item.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-blue-50">“{item.quote}”</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="animate-fade-in-up reveal-on-scroll rounded-[32px] border border-gray-200 bg-white/90 p-8 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] lg:p-10">
            <div className="grid gap-6 md:grid-cols-3">
              {whyChoose.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="animate-fade-in-up reveal-on-scroll rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Gabung sekarang</p>
                <h3 className="mt-2 text-3xl font-black text-gray-900">Jadi bagian dari komunitas Cendekia</h3>
                <p className="mt-4 text-base leading-8 text-gray-600">
                  Daftar sekarang dan nikmati akses promo, loyalitas, serta penawaran terbaik untuk kebutuhan belajar Anda.
                </p>
              </div>
              <Link
                to="/login"
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Gabung Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm text-gray-600 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-blue-600 text-sm font-black text-white shadow-md">
                C
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900">Cendekia</h4>
                <p className="text-xs text-gray-500">Toko Buku & Alat Tulis</p>
              </div>
            </div>
            <p className="mt-3 leading-7">Toko buku dan alat tulis yang hadir untuk memudahkan kebutuhan belajar, kerja, dan aktivitas harian.</p>
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">Alamat</h4>
            <p className="mt-3 leading-7">Jl. Paus No.73, Pekanbaru</p>
            <p className="leading-7">Telp. 0812-3456-7890</p>
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">Jam Operasional</h4>
            <p className="mt-3 leading-7">Senin – Sabtu: 08.00 – 20.00</p>
            <p className="leading-7">Minggu: 09.00 – 17.00</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500 lg:px-8">
          © 2025 Toko Buku Cendekia. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
