// Data Pelanggan Toko Buku Cendekia - 30 data
const customersData = [
  { id: 1, name: "Budi Santoso", phone: "6281234567890", address: "Jl. Paus No.73, Tangkerang Tengah, Pekanbaru", category: "ortu_murid", status: "aktif", points: 250, memberLevel: "silver", joinDate: "2024-01-15", lastTransaction: "2025-03-20", totalSpent: 850000, preferences: ["buku_paket", "alat_tulis"], registeredVia: "offline" },
  { id: 2, name: "Aisyah Putri", phone: "6281298765432", address: "Jl. Nangka No.45, Marpoyan Damai, Pekanbaru", category: "santri", status: "aktif", points: 450, memberLevel: "gold", joinDate: "2024-02-10", lastTransaction: "2025-04-05", totalSpent: 1250000, preferences: ["kitab", "alquran"], registeredVia: "whatsapp" },
  { id: 3, name: "Rama Wijaya", phone: "6281377889900", address: "Jl. Riau No.78, Pekanbaru", category: "mahasiswa_umum", status: "tidak_aktif", points: 50, memberLevel: "reguler", joinDate: "2024-05-20", lastTransaction: "2024-11-10", totalSpent: 150000, preferences: ["kamus", "buku_umum"], registeredVia: "shopee" },
  { id: 4, name: "Siti Aminah", phone: "6281345678901", address: "Jl. Garuda Sakti No.23, Pekanbaru", category: "ortu_murid", status: "aktif", points: 120, memberLevel: "silver", joinDate: "2024-08-15", lastTransaction: "2025-03-28", totalSpent: 450000, preferences: ["buku_paket_sd", "alat_tulis"], registeredVia: "offline" },
  { id: 5, name: "Ahmad Fauzan", phone: "6281356789012", address: "Jl. HR Subrantas No.7, Pekanbaru", category: "santri", status: "aktif", points: 380, memberLevel: "gold", joinDate: "2024-03-10", lastTransaction: "2025-04-03", totalSpent: 980000, preferences: ["kitab", "alquran"], registeredVia: "shopee" },
  { id: 6, name: "Maya Sari", phone: "6281467890123", address: "Jl. Tuanku Tambusai No.45, Pekanbaru", category: "mahasiswa_umum", status: "aktif", points: 75, memberLevel: "reguler", joinDate: "2024-10-01", lastTransaction: "2025-03-15", totalSpent: 280000, preferences: ["buku_umum", "alat_tulis"], registeredVia: "whatsapp" },
  { id: 7, name: "Ustadz Hasan", phone: "6281578901234", address: "Jl. Kaharuddin Nasution No.12, Pekanbaru", category: "santri", status: "aktif", points: 600, memberLevel: "gold", joinDate: "2023-11-05", lastTransaction: "2025-04-02", totalSpent: 2100000, preferences: ["kitab", "alquran", "buku_islam"], registeredVia: "offline" },
  { id: 8, name: "Linda Wati", phone: "6281689012345", address: "Jl. Soekarno Hatta No.88, Pekanbaru", category: "ortu_murid", status: "dormant", points: 30, memberLevel: "reguler", joinDate: "2024-06-20", lastTransaction: "2024-12-10", totalSpent: 120000, preferences: ["buku_paket_smp"], registeredVia: "shopee" },
  { id: 9, name: "Rizki Ramadhan", phone: "6281712345678", address: "Jl. Kartini No.5, Pekanbaru", category: "mahasiswa_umum", status: "aktif", points: 90, memberLevel: "reguler", joinDate: "2024-11-10", lastTransaction: "2025-04-01", totalSpent: 310000, preferences: ["buku_umum", "alat_tulis"], registeredVia: "whatsapp" },
  { id: 10, name: "Dewi Lestari", phone: "6281823456789", address: "Jl. Diponegoro No.15, Pekanbaru", category: "santri", status: "aktif", points: 520, memberLevel: "gold", joinDate: "2024-04-18", lastTransaction: "2025-04-04", totalSpent: 1750000, preferences: ["kitab", "alquran"], registeredVia: "offline" },
  { id: 11, name: "Eko Prasetyo", phone: "6281934567890", address: "Jl. Ahmad Yani No.32, Pekanbaru", category: "ortu_murid", status: "tidak_aktif", points: 15, memberLevel: "reguler", joinDate: "2024-09-25", lastTransaction: "2025-01-15", totalSpent: 95000, preferences: ["buku_paket_sd"], registeredVia: "shopee" },
  { id: 12, name: "Fitri Handayani", phone: "6281545678901", address: "Jl. Sudirman No.56, Pekanbaru", category: "mahasiswa_umum", status: "aktif", points: 180, memberLevel: "silver", joinDate: "2024-07-12", lastTransaction: "2025-03-30", totalSpent: 560000, preferences: ["kamus", "buku_umum"], registeredVia: "whatsapp" },
  { id: 13, name: "Gunawan Wijaya", phone: "6281656789012", address: "Jl. Thamrin No.42, Pekanbaru", category: "santri", status: "aktif", points: 310, memberLevel: "gold", joinDate: "2024-01-28", lastTransaction: "2025-04-01", totalSpent: 1450000, preferences: ["kitab"], registeredVia: "offline" },
  { id: 14, name: "Hani Pratiwi", phone: "6281767890123", address: "Jl. Imam Bonjol No.8, Pekanbaru", category: "ortu_murid", status: "aktif", points: 85, memberLevel: "reguler", joinDate: "2024-12-05", lastTransaction: "2025-03-25", totalSpent: 210000, preferences: ["buku_paket_smp", "alat_tulis"], registeredVia: "shopee" },
  { id: 15, name: "Irfan Hakim", phone: "6281878901234", address: "Jl. Sisingamangaraja No.21, Pekanbaru", category: "mahasiswa_umum", status: "dormant", points: 25, memberLevel: "reguler", joinDate: "2024-08-14", lastTransaction: "2024-12-20", totalSpent: 175000, preferences: ["buku_umum"], registeredVia: "whatsapp" },
  { id: 16, name: "Julia Rahmawati", phone: "6281989012345", address: "Jl. Pangeran Diponegoro No.67, Pekanbaru", category: "santri", status: "aktif", points: 420, memberLevel: "gold", joinDate: "2024-02-20", lastTransaction: "2025-04-06", totalSpent: 1650000, preferences: ["alquran", "kitab"], registeredVia: "offline" },
  { id: 17, name: "Kevin Tan", phone: "6281090123456", address: "Jl. Durian No.3, Pekanbaru", category: "ortu_murid", status: "aktif", points: 200, memberLevel: "silver", joinDate: "2024-05-25", lastTransaction: "2025-03-18", totalSpent: 680000, preferences: ["buku_paket_sd", "alat_tulis"], registeredVia: "whatsapp" },
  { id: 18, name: "Lina Marlina", phone: "6281112345678", address: "Jl. Rambutan No.12, Pekanbaru", category: "mahasiswa_umum", status: "tidak_aktif", points: 10, memberLevel: "reguler", joinDate: "2024-10-30", lastTransaction: "2025-01-05", totalSpent: 70000, preferences: ["buku_umum"], registeredVia: "shopee" },
  { id: 19, name: "M. Ridwan", phone: "6281223456789", address: "Jl. Mangga No.8, Pekanbaru", category: "santri", status: "aktif", points: 350, memberLevel: "silver", joinDate: "2024-06-15", lastTransaction: "2025-04-02", totalSpent: 890000, preferences: ["kitab"], registeredVia: "offline" },
  { id: 20, name: "Nadia Kirana", phone: "6281334567890", address: "Jl. Jeruk No.45, Pekanbaru", category: "ortu_murid", status: "aktif", points: 150, memberLevel: "silver", joinDate: "2024-09-01", lastTransaction: "2025-03-29", totalSpent: 540000, preferences: ["buku_paket_smp", "alat_tulis"], registeredVia: "whatsapp" },
  { id: 21, name: "Oscar Pratama", phone: "6281445678901", address: "Jl. Apel No.22, Pekanbaru", category: "mahasiswa_umum", status: "dormant", points: 5, memberLevel: "reguler", joinDate: "2024-11-20", lastTransaction: "2024-12-28", totalSpent: 45000, preferences: ["alat_tulis"], registeredVia: "shopee" },
  { id: 22, name: "Putri Amelia", phone: "6281556789012", address: "Jl. Pisang No.56, Pekanbaru", category: "santri", status: "aktif", points: 480, memberLevel: "gold", joinDate: "2024-03-25", lastTransaction: "2025-04-05", totalSpent: 1550000, preferences: ["alquran", "kitab"], registeredVia: "whatsapp" },
  { id: 23, name: "Qori Azizah", phone: "6281667890123", address: "Jl. Salak No.34, Pekanbaru", category: "ortu_murid", status: "aktif", points: 110, memberLevel: "silver", joinDate: "2024-07-18", lastTransaction: "2025-03-22", totalSpent: 420000, preferences: ["buku_paket_sd"], registeredVia: "offline" },
  { id: 24, name: "Rendi Saputra", phone: "6281778901234", address: "Jl. Melon No.78, Pekanbaru", category: "mahasiswa_umum", status: "aktif", points: 65, memberLevel: "reguler", joinDate: "2024-12-10", lastTransaction: "2025-03-30", totalSpent: 195000, preferences: ["kamus", "buku_umum"], registeredVia: "shopee" },
  { id: 25, name: "Siska Dewi", phone: "6281889012345", address: "Jl. Semangka No.90, Pekanbaru", category: "santri", status: "aktif", points: 290, memberLevel: "silver", joinDate: "2024-08-22", lastTransaction: "2025-04-01", totalSpent: 780000, preferences: ["kitab"], registeredVia: "whatsapp" },
  { id: 26, name: "Taufik Hidayat", phone: "6281990123456", address: "Jl. Nenas No.11, Pekanbaru", category: "ortu_murid", status: "tidak_aktif", points: 20, memberLevel: "reguler", joinDate: "2024-10-05", lastTransaction: "2025-01-20", totalSpent: 110000, preferences: ["buku_paket_smp"], registeredVia: "offline" },
  { id: 27, name: "Ulfah Khairani", phone: "6281012345678", address: "Jl. Anggur No.6, Pekanbaru", category: "mahasiswa_umum", status: "aktif", points: 130, memberLevel: "silver", joinDate: "2024-09-15", lastTransaction: "2025-03-27", totalSpent: 490000, preferences: ["buku_umum", "alat_tulis"], registeredVia: "shopee" },
  { id: 28, name: "Vino Bastian", phone: "6281123456789", address: "Jl. Strawberry No.19, Pekanbaru", category: "santri", status: "aktif", points: 550, memberLevel: "gold", joinDate: "2024-01-08", lastTransaction: "2025-04-04", totalSpent: 1900000, preferences: ["alquran", "kitab"], registeredVia: "offline" },
  { id: 29, name: "Winda Sari", phone: "6281234567899", address: "Jl. Blueberry No.27, Pekanbaru", category: "ortu_murid", status: "aktif", points: 95, memberLevel: "reguler", joinDate: "2024-11-28", lastTransaction: "2025-03-26", totalSpent: 340000, preferences: ["buku_paket_sd", "alat_tulis"], registeredVia: "whatsapp" },
  { id: 30, name: "Xavier Purnama", phone: "6281345678900", address: "Jl. Blackberry No.33, Pekanbaru", category: "mahasiswa_umum", status: "dormant", points: 8, memberLevel: "reguler", joinDate: "2024-12-18", lastTransaction: "2025-01-30", totalSpent: 60000, preferences: ["alat_tulis"], registeredVia: "shopee" }
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

export const addCustomer = (customer) => {
  const all = getCustomers();
  const newCustomer = {
    ...customer,
    id: Date.now(),
    points: 0,
    memberLevel: 'reguler',
    status: 'aktif',
    joinDate: new Date().toISOString().split('T')[0],
    totalSpent: 0,
    lastTransaction: null,
    registeredVia: 'offline'
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
  return customers.filter(c => c.category === category);
};

export const getCustomersByStatus = (status) => {
  const customers = getCustomers();
  if (status === 'all') return customers;
  return customers.filter(c => c.status === status);
};

export const getDormantCustomers = () => {
  const customers = getCustomers();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return customers.filter(c => {
    if (!c.lastTransaction) return true;
    return new Date(c.lastTransaction) < threeMonthsAgo && c.status === 'aktif';
  });
};

export const updateCustomerPoints = (customerId, pointsToAdd) => {
  const customer = getCustomerById(customerId);
  if (customer) {
    const newPoints = customer.points + pointsToAdd;
    let newLevel = customer.memberLevel;
    if (newPoints >= 300) newLevel = 'gold';
    else if (newPoints >= 100) newLevel = 'silver';
    else newLevel = 'reguler';
    return updateCustomer(customerId, { points: newPoints, memberLevel: newLevel });
  }
  return null;
};

export const getCustomerStats = () => {
  const customers = getCustomers();
  return {
    total: customers.length,
    aktif: customers.filter(c => c.status === 'aktif').length,
    tidakAktif: customers.filter(c => c.status === 'tidak_aktif').length,
    dormant: customers.filter(c => c.status === 'dormant').length,
    ortuMurid: customers.filter(c => c.category === 'ortu_murid').length,
    santri: customers.filter(c => c.category === 'santri').length,
    mahasiswaUmum: customers.filter(c => c.category === 'mahasiswa_umum').length,
    goldMember: customers.filter(c => c.memberLevel === 'gold').length,
    silverMember: customers.filter(c => c.memberLevel === 'silver').length,
    totalPoints: customers.reduce((sum, c) => sum + c.points, 0),
    totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  };
};

export default customers;