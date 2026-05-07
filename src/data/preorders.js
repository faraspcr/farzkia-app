// Data Pre-Order Toko Buku Cendekia - IDIC Model
const preordersData = [
  { id: 1, customerId: 3, customerName: "Rama Wijaya", customerPhone: "6281377889900", productId: 11, productName: "Mukjizat Al-Qur'an", quantity: 1, status: "waiting_stock", requestDate: "2025-03-15", notified: false, estimatedArrival: "2025-04-20" },
  { id: 2, customerId: 4, customerName: "Siti Aminah", customerPhone: "6281345678901", productId: 2, productName: "Buku Paket Matematika Kelas 6 SD", quantity: 1, status: "waiting_stock", requestDate: "2025-03-28", notified: false, estimatedArrival: "2025-04-15" },
  { id: 3, customerId: 1, customerName: "Budi Santoso", customerPhone: "6281234567890", productId: 10, productName: "Buku Paket IPA Kelas 9 SMP", quantity: 2, status: "notified", requestDate: "2025-03-10", notified: true, estimatedArrival: "2025-04-01", notificationDate: "2025-04-01" },
  { id: 4, customerId: 6, customerName: "Maya Sari", customerPhone: "6281467890123", productId: 5, productName: "Kamus Arab-Indonesia", quantity: 1, status: "fulfilled", requestDate: "2025-02-20", notified: true, estimatedArrival: "2025-03-10", fulfilledDate: "2025-03-12" },
  { id: 5, customerId: 8, customerName: "Linda Wati", customerPhone: "6281689012345", productId: 13, productName: "Buku Paket IPS Kelas 7 SMP", quantity: 1, status: "waiting_stock", requestDate: "2025-04-01", notified: false, estimatedArrival: "2025-04-25" },
  { id: 6, customerId: 10, customerName: "Dewi Lestari", customerPhone: "6281823456789", productId: 14, productName: "Al-Qur'an Hafalan", quantity: 2, status: "waiting_stock", requestDate: "2025-04-02", notified: false, estimatedArrival: "2025-04-30" },
  { id: 7, customerId: 12, customerName: "Fitri Handayani", customerPhone: "6281545678901", productId: 4, productName: "Kamus Inggris-Indonesia", quantity: 1, status: "notified", requestDate: "2025-03-20", notified: true, estimatedArrival: "2025-04-10", notificationDate: "2025-04-10" },
  { id: 8, customerId: 14, customerName: "Hani Pratiwi", customerPhone: "6281767890123", productId: 8, productName: "Buku Paket Bahasa Inggris Kelas 3 SD", quantity: 1, status: "waiting_stock", requestDate: "2025-04-03", notified: false, estimatedArrival: "2025-04-18" },
  { id: 9, customerId: 16, customerName: "Julia Rahmawati", customerPhone: "6281989012345", productId: 7, productName: "Riyadhus Shalihin", quantity: 2, status: "fulfilled", requestDate: "2025-03-05", notified: true, estimatedArrival: "2025-03-25", fulfilledDate: "2025-03-26" },
  { id: 10, customerId: 25, customerName: "Siska Dewi", customerPhone: "6281889012345", productId: 11, productName: "Mukjizat Al-Qur'an", quantity: 1, status: "waiting_stock", requestDate: "2025-04-04", notified: false, estimatedArrival: "2025-04-22" }
];

// ========== SERVICE (CRUD) ==========
let preorders = [...preordersData];

export const getPreorders = () => {
  const stored = localStorage.getItem('cendekia_preorders');
  if (stored) return JSON.parse(stored);
  return preorders;
};

export const savePreorders = (data) => {
  localStorage.setItem('cendekia_preorders', JSON.stringify(data));
};

export const addPreorder = (preorder) => {
  const all = getPreorders();
  const newPreorder = {
    ...preorder,
    id: Date.now(),
    status: 'waiting_stock',
    requestDate: new Date().toISOString().split('T')[0],
    notified: false
  };
  all.push(newPreorder);
  savePreorders(all);
  return newPreorder;
};

export const updatePreorderStatus = (id, status) => {
  const all = getPreorders();
  const index = all.findIndex(p => p.id === id);
  if (index !== -1) {
    all[index].status = status;
    if (status === 'notified') {
      all[index].notified = true;
      all[index].notificationDate = new Date().toISOString().split('T')[0];
    }
    if (status === 'fulfilled') {
      all[index].fulfilledDate = new Date().toISOString().split('T')[0];
    }
    savePreorders(all);
    return all[index];
  }
  return null;
};

export const getWaitingPreorders = () => {
  return getPreorders().filter(p => p.status === 'waiting_stock');
};

export default preorders;