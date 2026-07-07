// src/data/customers.js
// Data Pelanggan Toko Buku Cendekia - 30 data

const customersData = [
  { 
    id: 1, 
    id_pelanggan: "CEND-001",
    nama_pelanggan: "Budi Santoso", 
    no_handphone: "6281234567890", 
    alamat: "Jl. Paus No.73, Tangkerang Tengah, Pekanbaru",
    tgl_lahir: "1990-05-15",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket, Alat Tulis",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-03-20", 
    total_transaksi: 12,
    status_pelanggan: "aktif", 
    poin_loyalitas: 250,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 20/03/2025"
  },
  { 
    id: 2, 
    id_pelanggan: "CEND-002",
    nama_pelanggan: "Aisyah Putri", 
    no_handphone: "6281298765432", 
    alamat: "Jl. Nangka No.45, Marpoyan Damai, Pekanbaru",
    tgl_lahir: "1995-08-22",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Kitab, Al-Quran",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-05", 
    total_transaksi: 18,
    status_pelanggan: "aktif", 
    poin_loyalitas: 450,
    status_preorder: "Menunggu - Kitab Fathul Qorib",
    aksi: "Pre-order dikonfirmasi 05/04/2025"
  },
  { 
    id: 3, 
    id_pelanggan: "CEND-003",
    nama_pelanggan: "Rama Wijaya", 
    no_handphone: "6281377889900", 
    alamat: "Jl. Riau No.78, Pekanbaru",
    tgl_lahir: "1988-12-01",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Kamus, Buku Umum",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2024-11-10", 
    total_transaksi: 3,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 50,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 15/11/2024"
  },
  { 
    id: 4, 
    id_pelanggan: "CEND-004",
    nama_pelanggan: "Siti Aminah", 
    no_handphone: "6281345678901", 
    alamat: "Jl. Garuda Sakti No.23, Pekanbaru",
    tgl_lahir: "1985-03-10",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SD, Alat Tulis",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-03-28", 
    total_transaksi: 8,
    status_pelanggan: "aktif", 
    poin_loyalitas: 120,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 28/03/2025"
  },
  { 
    id: 5, 
    id_pelanggan: "CEND-005",
    nama_pelanggan: "Ahmad Fauzan", 
    no_handphone: "6281356789012", 
    alamat: "Jl. HR Subrantas No.7, Pekanbaru",
    tgl_lahir: "1992-07-18",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Kitab, Al-Quran",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-03", 
    total_transaksi: 14,
    status_pelanggan: "aktif", 
    poin_loyalitas: 380,
    status_preorder: "Selesai - Al-Quran Tajwid",
    aksi: "Pre-order dikonfirmasi 03/04/2025"
  },
  { 
    id: 6, 
    id_pelanggan: "CEND-006",
    nama_pelanggan: "Maya Sari", 
    no_handphone: "6281467890123", 
    alamat: "Jl. Tuanku Tambusai No.45, Pekanbaru",
    tgl_lahir: "1997-11-25",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Buku Umum, Alat Tulis",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-03-15", 
    total_transaksi: 4,
    status_pelanggan: "aktif", 
    poin_loyalitas: 75,
    status_preorder: "-",
    aksi: "Notifikasi promo dikirim 15/03/2025"
  },
  { 
    id: 7, 
    id_pelanggan: "CEND-007",
    nama_pelanggan: "Ustadz Hasan", 
    no_handphone: "6281578901234", 
    alamat: "Jl. Kaharuddin Nasution No.12, Pekanbaru",
    tgl_lahir: "1975-01-05",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Kitab, Al-Quran, Buku Islam",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-02", 
    total_transaksi: 25,
    status_pelanggan: "loyal", 
    poin_loyalitas: 600,
    status_preorder: "Menunggu - Kitab Riyadhus Shalihin",
    aksi: "Notifikasi stok terkirim 02/04/2025"
  },
  { 
    id: 8, 
    id_pelanggan: "CEND-008",
    nama_pelanggan: "Linda Wati", 
    no_handphone: "6281689012345", 
    alamat: "Jl. Soekarno Hatta No.88, Pekanbaru",
    tgl_lahir: "1991-09-30",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SMP",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2024-12-10", 
    total_transaksi: 2,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 30,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 20/12/2024"
  },
  { 
    id: 9, 
    id_pelanggan: "CEND-009",
    nama_pelanggan: "Rizki Ramadhan", 
    no_handphone: "6281712345678", 
    alamat: "Jl. Kartini No.5, Pekanbaru",
    tgl_lahir: "1994-06-12",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Buku Umum, Alat Tulis",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-04-01", 
    total_transaksi: 5,
    status_pelanggan: "aktif", 
    poin_loyalitas: 90,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 01/04/2025"
  },
  { 
    id: 10, 
    id_pelanggan: "CEND-010",
    nama_pelanggan: "Dewi Lestari", 
    no_handphone: "6281823456789", 
    alamat: "Jl. Diponegoro No.15, Pekanbaru",
    tgl_lahir: "1987-04-20",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Kitab, Al-Quran",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-04", 
    total_transaksi: 20,
    status_pelanggan: "loyal", 
    poin_loyalitas: 520,
    status_preorder: "Selesai - Al-Quran Terjemah",
    aksi: "Pre-order dikonfirmasi 04/04/2025"
  },
  { 
    id: 11, 
    id_pelanggan: "CEND-011",
    nama_pelanggan: "Eko Prasetyo", 
    no_handphone: "6281934567890", 
    alamat: "Jl. Ahmad Yani No.32, Pekanbaru",
    tgl_lahir: "1983-08-15",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SD",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-01-15", 
    total_transaksi: 1,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 15,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 25/01/2025"
  },
  { 
    id: 12, 
    id_pelanggan: "CEND-012",
    nama_pelanggan: "Fitri Handayani", 
    no_handphone: "6281545678901", 
    alamat: "Jl. Sudirman No.56, Pekanbaru",
    tgl_lahir: "1996-02-28",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Kamus, Buku Umum",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-03-30", 
    total_transaksi: 9,
    status_pelanggan: "aktif", 
    poin_loyalitas: 180,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 30/03/2025"
  },
  { 
    id: 13, 
    id_pelanggan: "CEND-013",
    nama_pelanggan: "Gunawan Wijaya", 
    no_handphone: "6281656789012", 
    alamat: "Jl. Thamrin No.42, Pekanbaru",
    tgl_lahir: "1990-10-10",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Kitab",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-01", 
    total_transaksi: 16,
    status_pelanggan: "loyal", 
    poin_loyalitas: 310,
    status_preorder: "Menunggu - Kitab Fathul Bari",
    aksi: "Pre-order dikonfirmasi 01/04/2025"
  },
  { 
    id: 14, 
    id_pelanggan: "CEND-014",
    nama_pelanggan: "Hani Pratiwi", 
    no_handphone: "6281767890123", 
    alamat: "Jl. Imam Bonjol No.8, Pekanbaru",
    tgl_lahir: "1993-12-05",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SMP, Alat Tulis",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-03-25", 
    total_transaksi: 3,
    status_pelanggan: "aktif", 
    poin_loyalitas: 85,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 25/03/2025"
  },
  { 
    id: 15, 
    id_pelanggan: "CEND-015",
    nama_pelanggan: "Irfan Hakim", 
    no_handphone: "6281878901234", 
    alamat: "Jl. Sisingamangaraja No.21, Pekanbaru",
    tgl_lahir: "1992-07-07",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Buku Umum",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2024-12-20", 
    total_transaksi: 2,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 25,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 30/12/2024"
  },
  { 
    id: 16, 
    id_pelanggan: "CEND-016",
    nama_pelanggan: "Julia Rahmawati", 
    no_handphone: "6281989012345", 
    alamat: "Jl. Pangeran Diponegoro No.67, Pekanbaru",
    tgl_lahir: "1989-06-25",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Al-Quran, Kitab",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-06", 
    total_transaksi: 19,
    status_pelanggan: "loyal", 
    poin_loyalitas: 420,
    status_preorder: "Selesai - Al-Quran Hafalan",
    aksi: "Pre-order dikonfirmasi 06/04/2025"
  },
  { 
    id: 17, 
    id_pelanggan: "CEND-017",
    nama_pelanggan: "Kevin Tan", 
    no_handphone: "6281090123456", 
    alamat: "Jl. Durian No.3, Pekanbaru",
    tgl_lahir: "1994-11-15",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SD, Alat Tulis",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-03-18", 
    total_transaksi: 7,
    status_pelanggan: "aktif", 
    poin_loyalitas: 200,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 18/03/2025"
  },
  { 
    id: 18, 
    id_pelanggan: "CEND-018",
    nama_pelanggan: "Lina Marlina", 
    no_handphone: "6281112345678", 
    alamat: "Jl. Rambutan No.12, Pekanbaru",
    tgl_lahir: "1995-09-20",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Buku Umum",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-01-05", 
    total_transaksi: 1,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 10,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 15/01/2025"
  },
  { 
    id: 19, 
    id_pelanggan: "CEND-019",
    nama_pelanggan: "M. Ridwan", 
    no_handphone: "6281223456789", 
    alamat: "Jl. Mangga No.8, Pekanbaru",
    tgl_lahir: "1986-03-12",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Kitab",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-04-02", 
    total_transaksi: 10,
    status_pelanggan: "aktif", 
    poin_loyalitas: 350,
    status_preorder: "Menunggu - Kitab Al-Arbain",
    aksi: "Notifikasi stok terkirim 02/04/2025"
  },
  { 
    id: 20, 
    id_pelanggan: "CEND-020",
    nama_pelanggan: "Nadia Kirana", 
    no_handphone: "6281334567890", 
    alamat: "Jl. Jeruk No.45, Pekanbaru",
    tgl_lahir: "1991-07-08",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SMP, Alat Tulis",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-03-29", 
    total_transaksi: 6,
    status_pelanggan: "aktif", 
    poin_loyalitas: 150,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 29/03/2025"
  },
  { 
    id: 21, 
    id_pelanggan: "CEND-021",
    nama_pelanggan: "Oscar Pratama", 
    no_handphone: "6281445678901", 
    alamat: "Jl. Apel No.22, Pekanbaru",
    tgl_lahir: "1997-10-30",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Alat Tulis",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2024-12-28", 
    total_transaksi: 1,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 5,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 05/01/2025"
  },
  { 
    id: 22, 
    id_pelanggan: "CEND-022",
    nama_pelanggan: "Putri Amelia", 
    no_handphone: "6281556789012", 
    alamat: "Jl. Pisang No.56, Pekanbaru",
    tgl_lahir: "1993-04-12",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Al-Quran, Kitab",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-05", 
    total_transaksi: 17,
    status_pelanggan: "loyal", 
    poin_loyalitas: 480,
    status_preorder: "Selesai - Al-Quran Terjemah",
    aksi: "Pre-order dikonfirmasi 05/04/2025"
  },
  { 
    id: 23, 
    id_pelanggan: "CEND-023",
    nama_pelanggan: "Qori Azizah", 
    no_handphone: "6281667890123", 
    alamat: "Jl. Salak No.34, Pekanbaru",
    tgl_lahir: "1992-08-18",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SD",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-03-22", 
    total_transaksi: 5,
    status_pelanggan: "aktif", 
    poin_loyalitas: 110,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 22/03/2025"
  },
  { 
    id: 24, 
    id_pelanggan: "CEND-024",
    nama_pelanggan: "Rendi Saputra", 
    no_handphone: "6281778901234", 
    alamat: "Jl. Melon No.78, Pekanbaru",
    tgl_lahir: "1996-06-25",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Kamus, Buku Umum",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-03-30", 
    total_transaksi: 3,
    status_pelanggan: "aktif", 
    poin_loyalitas: 65,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 30/03/2025"
  },
  { 
    id: 25, 
    id_pelanggan: "CEND-025",
    nama_pelanggan: "Siska Dewi", 
    no_handphone: "6281889012345", 
    alamat: "Jl. Semangka No.90, Pekanbaru",
    tgl_lahir: "1994-12-01",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Kitab",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-04-01", 
    total_transaksi: 8,
    status_pelanggan: "aktif", 
    poin_loyalitas: 290,
    status_preorder: "Menunggu - Kitab Bulughul Maram",
    aksi: "Notifikasi stok terkirim 01/04/2025"
  },
  { 
    id: 26, 
    id_pelanggan: "CEND-026",
    nama_pelanggan: "Taufik Hidayat", 
    no_handphone: "6281990123456", 
    alamat: "Jl. Nenas No.11, Pekanbaru",
    tgl_lahir: "1989-02-14",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SMP",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-01-20", 
    total_transaksi: 2,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 20,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 30/01/2025"
  },
  { 
    id: 27, 
    id_pelanggan: "CEND-027",
    nama_pelanggan: "Ulfah Khairani", 
    no_handphone: "6281012345678", 
    alamat: "Jl. Anggur No.6, Pekanbaru",
    tgl_lahir: "1995-05-22",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Buku Umum, Alat Tulis",
    level_member: "Pembaca Setia", 
    tgl_transaksi_terakhir: "2025-03-27", 
    total_transaksi: 7,
    status_pelanggan: "aktif", 
    poin_loyalitas: 130,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 27/03/2025"
  },
  { 
    id: 28, 
    id_pelanggan: "CEND-028",
    nama_pelanggan: "Vino Bastian", 
    no_handphone: "6281123456789", 
    alamat: "Jl. Strawberry No.19, Pekanbaru",
    tgl_lahir: "1991-11-08",
    kategori_pelanggan: "santri", 
    preferensi_produk: "Al-Quran, Kitab",
    level_member: "Mitra Cendekia", 
    tgl_transaksi_terakhir: "2025-04-04", 
    total_transaksi: 22,
    status_pelanggan: "loyal", 
    poin_loyalitas: 550,
    status_preorder: "Selesai - Kitab Fathul Bari",
    aksi: "Pre-order dikonfirmasi 04/04/2025"
  },
  { 
    id: 29, 
    id_pelanggan: "CEND-029",
    nama_pelanggan: "Winda Sari", 
    no_handphone: "6281234567899", 
    alamat: "Jl. Blueberry No.27, Pekanbaru",
    tgl_lahir: "1993-09-15",
    kategori_pelanggan: "ortu_murid", 
    preferensi_produk: "Buku Paket SD, Alat Tulis",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-03-26", 
    total_transaksi: 4,
    status_pelanggan: "aktif", 
    poin_loyalitas: 95,
    status_preorder: "-",
    aksi: "Notifikasi stok terkirim 26/03/2025"
  },
  { 
    id: 30, 
    id_pelanggan: "CEND-030",
    nama_pelanggan: "Xavier Purnama", 
    no_handphone: "6281345678900", 
    alamat: "Jl. Blackberry No.33, Pekanbaru",
    tgl_lahir: "1996-04-10",
    kategori_pelanggan: "mahasiswa_umum", 
    preferensi_produk: "Alat Tulis",
    level_member: "Pembaca Baru", 
    tgl_transaksi_terakhir: "2025-01-30", 
    total_transaksi: 1,
    status_pelanggan: "tidak_aktif", 
    poin_loyalitas: 8,
    status_preorder: "-",
    aksi: "Promo win-back dikirim 10/02/2025"
  }
];

// ========== SERVICE (CRUD) ==========
let customers = [...customersData];

export const getCustomers = () => {
  const stored = localStorage.getItem('cendekia_customers');
  if (stored) return JSON.parse(stored);
  return customers;
};

export const saveCustomers = (data) => {
  localStorage.setItem('cendekia_customers', JSON.stringify(data));
};

export const getCustomerById = (id) => {
  return getCustomers().find(c => c.id === id);
};

export const getCustomerByIdPelanggan = (idPelanggan) => {
  return getCustomers().find(c => c.id_pelanggan === idPelanggan);
};

export const addCustomer = (customer) => {
  const all = getCustomers();
  const lastId = all.length > 0 ? Math.max(...all.map(c => c.id)) : 0;
  const newId = lastId + 1;
  const idPelanggan = `CEND-${String(newId).padStart(3, '0')}`;
  
  const newCustomer = {
    id: newId,
    id_pelanggan: idPelanggan,
    nama_pelanggan: customer.nama_pelanggan || customer.name || '',
    no_handphone: customer.no_handphone || customer.phone || '',
    alamat: customer.alamat || customer.address || '',
    tgl_lahir: customer.tgl_lahir || '',
    kategori_pelanggan: customer.kategori_pelanggan || customer.category || 'mahasiswa_umum',
    preferensi_produk: customer.preferensi_produk || '',
    level_member: customer.level_member || 'Pembaca Baru',
    tgl_transaksi_terakhir: new Date().toISOString().split('T')[0],
    total_transaksi: 0,
    status_pelanggan: customer.status_pelanggan || customer.status || 'aktif',
    poin_loyalitas: 0,
    status_preorder: '-',
    aksi: 'Pelanggan baru terdaftar'
  };
  all.push(newCustomer);
  saveCustomers(all);
  return newCustomer;
};

export const updateCustomer = (id, data) => {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...data };
    saveCustomers(customers);
    return customers[index];
  }
  return null;
};

export const deleteCustomer = (id) => {
  const customers = getCustomers();
  const filtered = customers.filter(c => c.id !== id);
  saveCustomers(filtered);
};

export const getCustomersByCategory = (category) => {
  const customers = getCustomers();
  if (category === 'all') return customers;
  return customers.filter(c => c.kategori_pelanggan === category);
};

export const getCustomersByStatus = (status) => {
  const customers = getCustomers();
  if (status === 'all') return customers;
  return customers.filter(c => c.status_pelanggan === status);
};

export const getDormantCustomers = () => {
  const customers = getCustomers();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return customers.filter(c => {
    if (!c.tgl_transaksi_terakhir) return true;
    return new Date(c.tgl_transaksi_terakhir) < threeMonthsAgo && c.status_pelanggan === 'aktif';
  });
};

export const updateCustomerPoints = (customerId, pointsToAdd) => {
  const customer = getCustomerById(customerId);
  if (customer) {
    const newPoints = customer.poin_loyalitas + pointsToAdd;
    let newLevel = customer.level_member;
    if (newPoints >= 500) newLevel = 'Mitra Cendekia';
    else if (newPoints >= 200) newLevel = 'Pembaca Setia';
    else newLevel = 'Pembaca Baru';
    return updateCustomer(customerId, { poin_loyalitas: newPoints, level_member: newLevel });
  }
  return null;
};

export const getCustomerStats = () => {
  const customers = getCustomers();
  return {
    total: customers.length,
    aktif: customers.filter(c => c.status_pelanggan === 'aktif').length,
    loyal: customers.filter(c => c.status_pelanggan === 'loyal').length,
    tidakAktif: customers.filter(c => c.status_pelanggan === 'tidak_aktif').length,
    ortuMurid: customers.filter(c => c.kategori_pelanggan === 'ortu_murid').length,
    santri: customers.filter(c => c.kategori_pelanggan === 'santri').length,
    mahasiswaUmum: customers.filter(c => c.kategori_pelanggan === 'mahasiswa_umum').length,
    institusi: customers.filter(c => c.kategori_pelanggan === 'institusi').length,
    mitraCendekia: customers.filter(c => c.level_member === 'Mitra Cendekia').length,
    pembacaSetia: customers.filter(c => c.level_member === 'Pembaca Setia').length,
    pembacaBaru: customers.filter(c => c.level_member === 'Pembaca Baru').length,
    totalPoints: customers.reduce((sum, c) => sum + (c.poin_loyalitas || 0), 0),
    totalTransactions: customers.reduce((sum, c) => sum + (c.total_transaksi || 0), 0)
  };
};

export default customers;