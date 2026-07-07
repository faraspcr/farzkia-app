// src/data/transactions.js
// Data Transaksi Toko Buku Cendekia - 30 data

const transactionsData = [
  { id: 1, customerId: 1, customerName: "Budi Santoso", items: [{ productId: 2, productName: "Buku Paket Matematika Kelas 6 SD", quantity: 2, price: 85000, subtotal: 170000 }], total: 170000, status: "selesai", paymentMethod: "qris", source: "offline", orderDate: "2025-03-20", pickupDate: "2025-03-20", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-20 08:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-20 08:30:00" }, { status: "siap_diambil", timestamp: "2025-03-20 10:00:00" }, { status: "selesai", timestamp: "2025-03-20 14:00:00" }] },
  { id: 2, customerId: 2, customerName: "Aisyah Putri", items: [{ productId: 3, productName: "Al-Qur'an Terjemah Per Kata", quantity: 1, price: 150000, subtotal: 150000 }], total: 150000, status: "diproses", paymentMethod: "cash", source: "whatsapp", orderDate: "2025-04-01", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-01 09:15:00" }, { status: "sedang_diproses", timestamp: "2025-04-01 10:00:00" }] },
  { id: 3, customerId: 5, customerName: "Ahmad Fauzan", items: [{ productId: 3, productName: "Al-Qur'an Terjemah Per Kata", quantity: 2, price: 150000, subtotal: 300000 }], total: 300000, status: "siap_diambil", paymentMethod: "qris", source: "shopee", orderDate: "2025-04-03", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-03 07:30:00" }, { status: "sedang_diproses", timestamp: "2025-04-03 08:00:00" }, { status: "siap_diambil", timestamp: "2025-04-03 11:00:00" }] },
  { id: 4, customerId: 4, customerName: "Siti Aminah", items: [{ productId: 6, productName: "Pensil 2B (1 pack isi 12)", quantity: 3, price: 25000, subtotal: 75000 }, { productId: 9, productName: "Buku Tulis 38 Lembar (1 pak)", quantity: 2, price: 35000, subtotal: 70000 }], total: 145000, status: "pesanan_diterima", paymentMethod: "qris", source: "whatsapp", orderDate: "2025-04-04", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-04 14:00:00" }] },
  { id: 5, customerId: 7, customerName: "Ustadz Hasan", items: [{ productId: 3, productName: "Al-Qur'an Terjemah Per Kata", quantity: 1, price: 150000, subtotal: 150000 }, { productId: 7, productName: "Riyadhus Shalihin", quantity: 2, price: 95000, subtotal: 190000 }], total: 340000, status: "selesai", paymentMethod: "cash", source: "offline", orderDate: "2025-04-02", pickupDate: "2025-04-02", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-02 10:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-02 10:15:00" }, { status: "siap_diambil", timestamp: "2025-04-02 10:45:00" }, { status: "selesai", timestamp: "2025-04-02 11:30:00" }] },
  { id: 6, customerId: 2, customerName: "Aisyah Putri", items: [{ productId: 7, productName: "Riyadhus Shalihin", quantity: 1, price: 95000, subtotal: 95000 }], total: 95000, status: "selesai", paymentMethod: "cash", source: "offline", orderDate: "2025-03-25", pickupDate: "2025-03-25", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-25 13:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-25 13:20:00" }, { status: "siap_diambil", timestamp: "2025-03-25 14:00:00" }, { status: "selesai", timestamp: "2025-03-25 15:30:00" }] },
  { id: 7, customerId: 1, customerName: "Budi Santoso", items: [{ productId: 1, productName: "Buku Paket Matematika Kelas 1 SD", quantity: 1, price: 75000, subtotal: 75000 }], total: 75000, status: "selesai", paymentMethod: "qris", source: "whatsapp", orderDate: "2025-03-15", pickupDate: "2025-03-16", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-15 09:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-15 09:30:00" }, { status: "siap_diambil", timestamp: "2025-03-15 11:00:00" }, { status: "selesai", timestamp: "2025-03-16 08:00:00" }] },
  { id: 8, customerId: 3, customerName: "Rama Wijaya", items: [{ productId: 4, productName: "Kamus Inggris-Indonesia", quantity: 1, price: 120000, subtotal: 120000 }], total: 120000, status: "selesai", paymentMethod: "cash", source: "offline", orderDate: "2025-03-10", pickupDate: "2025-03-10", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-10 11:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-10 11:15:00" }, { status: "siap_diambil", timestamp: "2025-03-10 12:00:00" }, { status: "selesai", timestamp: "2025-03-10 14:00:00" }] },
  { id: 9, customerId: 6, customerName: "Maya Sari", items: [{ productId: 6, productName: "Pensil 2B (1 pack isi 12)", quantity: 2, price: 25000, subtotal: 50000 }, { productId: 12, productName: "Penghapus Putih", quantity: 5, price: 5000, subtotal: 25000 }], total: 75000, status: "selesai", paymentMethod: "qris", source: "shopee", orderDate: "2025-03-28", pickupDate: "2025-03-30", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-28 15:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-28 15:20:00" }, { status: "siap_diambil", timestamp: "2025-03-28 16:00:00" }, { status: "selesai", timestamp: "2025-03-30 10:00:00" }] },
  { id: 10, customerId: 8, customerName: "Linda Wati", items: [{ productId: 10, productName: "Buku Paket IPA Kelas 9 SMP", quantity: 1, price: 95000, subtotal: 95000 }], total: 95000, status: "diproses", paymentMethod: "cash", source: "whatsapp", orderDate: "2025-04-05", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-05 08:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-05 08:30:00" }] },
  { id: 11, customerId: 9, customerName: "Rizki Ramadhan", items: [{ productId: 5, productName: "Kamus Arab-Indonesia", quantity: 1, price: 135000, subtotal: 135000 }], total: 135000, status: "selesai", paymentMethod: "qris", source: "offline", orderDate: "2025-03-22", pickupDate: "2025-03-22", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-22 09:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-22 09:15:00" }, { status: "siap_diambil", timestamp: "2025-03-22 10:00:00" }, { status: "selesai", timestamp: "2025-03-22 11:30:00" }] },
  { id: 12, customerId: 10, customerName: "Dewi Lestari", items: [{ productId: 3, productName: "Al-Qur'an Terjemah Per Kata", quantity: 1, price: 150000, subtotal: 150000 }, { productId: 11, productName: "Mukjizat Al-Qur'an", quantity: 1, price: 180000, subtotal: 180000 }], total: 330000, status: "selesai", paymentMethod: "cash", source: "offline", orderDate: "2025-03-30", pickupDate: "2025-03-30", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-30 14:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-30 14:15:00" }, { status: "siap_diambil", timestamp: "2025-03-30 15:00:00" }, { status: "selesai", timestamp: "2025-03-30 16:00:00" }] },
  { id: 13, customerId: 12, customerName: "Fitri Handayani", items: [{ productId: 4, productName: "Kamus Inggris-Indonesia", quantity: 1, price: 120000, subtotal: 120000 }], total: 120000, status: "diproses", paymentMethod: "qris", source: "shopee", orderDate: "2025-04-04", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-04 12:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-04 12:30:00" }] },
  { id: 14, customerId: 13, customerName: "Gunawan Wijaya", items: [{ productId: 7, productName: "Riyadhus Shalihin", quantity: 3, price: 95000, subtotal: 285000 }], total: 285000, status: "selesai", paymentMethod: "cash", source: "offline", orderDate: "2025-03-18", pickupDate: "2025-03-18", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-18 10:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-18 10:15:00" }, { status: "siap_diambil", timestamp: "2025-03-18 11:00:00" }, { status: "selesai", timestamp: "2025-03-18 12:00:00" }] },
  { id: 15, customerId: 14, customerName: "Hani Pratiwi", items: [{ productId: 6, productName: "Pensil 2B (1 pack isi 12)", quantity: 2, price: 25000, subtotal: 50000 }], total: 50000, status: "selesai", paymentMethod: "qris", source: "whatsapp", orderDate: "2025-03-25", pickupDate: "2025-03-26", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-25 16:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-25 16:15:00" }, { status: "siap_diambil", timestamp: "2025-03-25 17:00:00" }, { status: "selesai", timestamp: "2025-03-26 09:00:00" }] },
  { id: 16, customerId: 16, customerName: "Julia Rahmawati", items: [{ productId: 3, productName: "Al-Qur'an Terjemah Per Kata", quantity: 1, price: 150000, subtotal: 150000 }], total: 150000, status: "selesai", paymentMethod: "cash", source: "offline", orderDate: "2025-04-01", pickupDate: "2025-04-01", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-01 13:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-01 13:15:00" }, { status: "siap_diambil", timestamp: "2025-04-01 14:00:00" }, { status: "selesai", timestamp: "2025-04-01 15:30:00" }] },
  { id: 17, customerId: 17, customerName: "Kevin Tan", items: [{ productId: 1, productName: "Buku Paket Matematika Kelas 1 SD", quantity: 2, price: 75000, subtotal: 150000 }], total: 150000, status: "selesai", paymentMethod: "qris", source: "whatsapp", orderDate: "2025-03-20", pickupDate: "2025-03-21", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-20 18:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-20 18:15:00" }, { status: "siap_diambil", timestamp: "2025-03-20 19:00:00" }, { status: "selesai", timestamp: "2025-03-21 10:00:00" }] },
  { id: 18, customerId: 19, customerName: "M. Ridwan", items: [{ productId: 7, productName: "Riyadhus Shalihin", quantity: 1, price: 95000, subtotal: 95000 }], total: 95000, status: "diproses", paymentMethod: "cash", source: "offline", orderDate: "2025-04-05", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-05 09:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-05 09:30:00" }] },
  { id: 19, customerId: 20, customerName: "Nadia Kirana", items: [{ productId: 9, productName: "Buku Tulis 38 Lembar (1 pak)", quantity: 3, price: 35000, subtotal: 105000 }], total: 105000, status: "selesai", paymentMethod: "qris", source: "shopee", orderDate: "2025-03-29", pickupDate: "2025-04-01", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-29 20:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-29 20:15:00" }, { status: "siap_diambil", timestamp: "2025-03-29 21:00:00" }, { status: "selesai", timestamp: "2025-04-01 08:00:00" }] },
  { id: 20, customerId: 22, customerName: "Putri Amelia", items: [{ productId: 3, productName: "Al-Qur'an Terjemah Per Kata", quantity: 1, price: 150000, subtotal: 150000 }], total: 150000, status: "selesai", paymentMethod: "cash", source: "whatsapp", orderDate: "2025-04-02", pickupDate: "2025-04-03", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-02 11:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-02 11:15:00" }, { status: "siap_diambil", timestamp: "2025-04-02 12:00:00" }, { status: "selesai", timestamp: "2025-04-03 09:00:00" }] },
  { id: 21, customerId: 23, customerName: "Qori Azizah", items: [{ productId: 2, productName: "Buku Paket Matematika Kelas 6 SD", quantity: 1, price: 85000, subtotal: 85000 }], total: 85000, status: "selesai", paymentMethod: "qris", source: "offline", orderDate: "2025-03-22", pickupDate: "2025-03-22", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-22 08:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-22 08:15:00" }, { status: "siap_diambil", timestamp: "2025-03-22 09:00:00" }, { status: "selesai", timestamp: "2025-03-22 10:00:00" }] },
  { id: 22, customerId: 24, customerName: "Rendi Saputra", items: [{ productId: 4, productName: "Kamus Inggris-Indonesia", quantity: 1, price: 120000, subtotal: 120000 }], total: 120000, status: "diproses", paymentMethod: "cash", source: "shopee", orderDate: "2025-04-03", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-03 14:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-03 14:30:00" }] },
  { id: 23, customerId: 25, customerName: "Siska Dewi", items: [{ productId: 7, productName: "Riyadhus Shalihin", quantity: 1, price: 95000, subtotal: 95000 }], total: 95000, status: "selesai", paymentMethod: "qris", source: "whatsapp", orderDate: "2025-03-31", pickupDate: "2025-04-01", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-31 15:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-31 15:15:00" }, { status: "siap_diambil", timestamp: "2025-03-31 16:00:00" }, { status: "selesai", timestamp: "2025-04-01 08:30:00" }] },
  { id: 24, customerId: 27, customerName: "Ulfah Khairani", items: [{ productId: 5, productName: "Kamus Arab-Indonesia", quantity: 1, price: 135000, subtotal: 135000 }], total: 135000, status: "selesai", paymentMethod: "cash", source: "offline", orderDate: "2025-03-27", pickupDate: "2025-03-27", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-27 10:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-27 10:15:00" }, { status: "siap_diambil", timestamp: "2025-03-27 11:00:00" }, { status: "selesai", timestamp: "2025-03-27 12:00:00" }] },
  { id: 25, customerId: 28, customerName: "Vino Bastian", items: [{ productId: 3, productName: "Al-Qur'an Terjemah Per Kata", quantity: 2, price: 150000, subtotal: 300000 }], total: 300000, status: "selesai", paymentMethod: "qris", source: "offline", orderDate: "2025-04-03", pickupDate: "2025-04-04", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-03 16:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-03 16:15:00" }, { status: "siap_diambil", timestamp: "2025-04-03 17:00:00" }, { status: "selesai", timestamp: "2025-04-04 09:00:00" }] },
  { id: 26, customerId: 29, customerName: "Winda Sari", items: [{ productId: 6, productName: "Pensil 2B (1 pack isi 12)", quantity: 1, price: 25000, subtotal: 25000 }], total: 25000, status: "selesai", paymentMethod: "cash", source: "whatsapp", orderDate: "2025-03-26", pickupDate: "2025-03-27", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-26 09:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-26 09:15:00" }, { status: "siap_diambil", timestamp: "2025-03-26 10:00:00" }, { status: "selesai", timestamp: "2025-03-27 08:00:00" }] },
  { id: 27, customerId: 11, customerName: "Eko Prasetyo", items: [{ productId: 10, productName: "Buku Paket IPA Kelas 9 SMP", quantity: 1, price: 95000, subtotal: 95000 }], total: 95000, status: "selesai", paymentMethod: "qris", source: "shopee", orderDate: "2025-03-15", pickupDate: "2025-03-18", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-15 12:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-15 12:15:00" }, { status: "siap_diambil", timestamp: "2025-03-15 13:00:00" }, { status: "selesai", timestamp: "2025-03-18 14:00:00" }] },
  { id: 28, customerId: 15, customerName: "Irfan Hakim", items: [{ productId: 8, productName: "Buku Paket Bahasa Inggris Kelas 3 SD", quantity: 1, price: 75000, subtotal: 75000 }], total: 75000, status: "diproses", paymentMethod: "cash", source: "whatsapp", orderDate: "2025-04-05", pickupDate: null, trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-04-05 07:00:00" }, { status: "sedang_diproses", timestamp: "2025-04-05 07:30:00" }] },
  { id: 29, customerId: 18, customerName: "Lina Marlina", items: [{ productId: 12, productName: "Penghapus Putih", quantity: 10, price: 5000, subtotal: 50000 }], total: 50000, status: "selesai", paymentMethod: "qris", source: "offline", orderDate: "2025-03-05", pickupDate: "2025-03-05", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-05 10:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-05 10:15:00" }, { status: "siap_diambil", timestamp: "2025-03-05 11:00:00" }, { status: "selesai", timestamp: "2025-03-05 12:00:00" }] },
  { id: 30, customerId: 21, customerName: "Oscar Pratama", items: [{ productId: 9, productName: "Buku Tulis 38 Lembar (1 pak)", quantity: 1, price: 35000, subtotal: 35000 }], total: 35000, status: "selesai", paymentMethod: "cash", source: "shopee", orderDate: "2025-03-12", pickupDate: "2025-03-15", trackingHistory: [{ status: "pesanan_diterima", timestamp: "2025-03-12 08:00:00" }, { status: "sedang_diproses", timestamp: "2025-03-12 08:15:00" }, { status: "siap_diambil", timestamp: "2025-03-12 09:00:00" }, { status: "selesai", timestamp: "2025-03-15 10:00:00" }] }
];

// ========== SERVICE (CRUD) ==========
let transactions = [...transactionsData];

export const getTransactions = () => {
  const stored = localStorage.getItem('cendekia_transactions');
  if (stored) return JSON.parse(stored);
  return transactions;
};

export const saveTransactions = (data) => {
  localStorage.setItem('cendekia_transactions', JSON.stringify(data));
};

export const getTransactionById = (id) => {
  return getTransactions().find(t => t.id === id);
};

export const getCustomerTransactions = (customerId) => {
  return getTransactions().filter(t => t.customerId === customerId);
};

export const addTransaction = (transaction) => {
  const all = getTransactions();
  const newTransaction = {
    ...transaction,
    id: Date.now(),
    status: 'pesanan_diterima',
    orderDate: new Date().toISOString().split('T')[0],
    pickupDate: null,
    trackingHistory: [{ status: 'pesanan_diterima', timestamp: new Date().toLocaleString() }]
  };
  all.push(newTransaction);
  saveTransactions(all);
  return newTransaction;
};

export const updateTransactionStatus = (id, status) => {
  const all = getTransactions();
  const index = all.findIndex(t => t.id === id);
  if (index !== -1) {
    all[index].status = status;
    all[index].trackingHistory.push({ status, timestamp: new Date().toLocaleString() });
    if (status === 'selesai') {
      all[index].pickupDate = new Date().toISOString().split('T')[0];
    }
    saveTransactions(all);
    return all[index];
  }
  return null;
};

// ========== UPDATE TRANSAKSI (EDIT) ==========
export const updateTransaction = (id, updatedData) => {
  const all = getTransactions();
  const index = all.findIndex(t => t.id === id);
  if (index !== -1) {
    all[index] = { 
      ...all[index], 
      ...updatedData,
      ...(updatedData.status === 'selesai' && !all[index].pickupDate ? { 
        pickupDate: new Date().toISOString().split('T')[0] 
      } : {})
    };
    saveTransactions(all);
    return all[index];
  }
  return null;
};

// ========== DELETE TRANSAKSI ==========
export const deleteTransaction = (id) => {
  const all = getTransactions();
  const filtered = all.filter(t => t.id !== id);
  if (filtered.length !== all.length) {
    saveTransactions(filtered);
    return true;
  }
  return false;
};

// ========== BATAL TRANSAKSI ==========
export const cancelTransaction = (id) => {
  const all = getTransactions();
  const index = all.findIndex(t => t.id === id);
  if (index !== -1) {
    all[index].status = 'dibatalkan';
    all[index].trackingHistory.push({ 
      status: 'dibatalkan', 
      timestamp: new Date().toLocaleString() 
    });
    saveTransactions(all);
    return all[index];
  }
  return null;
};

// ========== RESET DATA ==========
export const resetTransactions = () => {
  saveTransactions([...transactionsData]);
  return [...transactionsData];
};

export const getTransactionStats = () => {
  const all = getTransactions();
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  
  const thisMonthTransactions = all.filter(t => {
    const date = new Date(t.orderDate);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  });
  
  return {
    total: all.length,
    totalRevenue: all.reduce((sum, t) => sum + t.total, 0),
    thisMonthRevenue: thisMonthTransactions.reduce((sum, t) => sum + t.total, 0),
    thisMonthCount: thisMonthTransactions.length,
    byStatus: {
      pesanan_diterima: all.filter(t => t.status === 'pesanan_diterima').length,
      diproses: all.filter(t => t.status === 'diproses').length,
      siap_diambil: all.filter(t => t.status === 'siap_diambil').length,
      selesai: all.filter(t => t.status === 'selesai').length,
      dibatalkan: all.filter(t => t.status === 'dibatalkan').length
    },
    bySource: {
      offline: all.filter(t => t.source === 'offline').length,
      whatsapp: all.filter(t => t.source === 'whatsapp').length,
      shopee: all.filter(t => t.source === 'shopee').length
    }
  };
};

export default transactions;