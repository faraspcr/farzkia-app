// src/data/preorders.js

// Data awal
let preordersData = [
  {
    id: 'PO-001',
    productName: 'Mukjizat Al-Qur\'an',
    customerName: 'Rama Wijaya',
    customerPhone: '6281234567890',
    requestDate: '2025-03-15',
    estimatedArrival: '2025-03-30',
    status: 'notified'
  },
  {
    id: 'PO-002',
    productName: 'Buku Paket Matematika Kelas 6 SD',
    customerName: 'Siti Aminah',
    customerPhone: '6289876543210',
    requestDate: '2025-03-28',
    estimatedArrival: '2025-04-15',
    status: 'waiting_stock'
  },
  {
    id: 'PO-003',
    productName: 'Buku Paket IPA Kelas 9 SMP',
    customerName: 'Budi Santoso',
    customerPhone: '6285555555555',
    requestDate: '2025-03-10',
    estimatedArrival: '2025-03-25',
    status: 'notified'
  },
  {
    id: 'PO-004',
    productName: 'Kamus Arab-Indonesia',
    customerName: 'Maya Sari',
    customerPhone: '6287777777777',
    requestDate: '2025-02-20',
    estimatedArrival: '2025-03-10',
    status: 'waiting_stock'
  },
  {
    id: 'PO-005',
    productName: 'Buku Paket IPS Kelas 7 SMP',
    customerName: 'Linda Wati',
    customerPhone: '6289999999999',
    requestDate: '2025-04-01',
    estimatedArrival: '2025-04-20',
    status: 'notified'
  },
  {
    id: 'PO-006',
    productName: 'Al-Qur\'an Hafalan',
    customerName: 'Dewi Lestari',
    customerPhone: '6281111111111',
    requestDate: '2025-04-02',
    estimatedArrival: '2025-04-25',
    status: 'waiting_stock'
  },
  {
    id: 'PO-007',
    productName: 'Al-Qur\'an Hafalan',
    customerName: 'Dewi Lestari',
    customerPhone: '6281111111111',
    requestDate: '2025-04-02',
    estimatedArrival: '2025-04-25',
    status: 'waiting_stock'
  }
];

// ============================================
// CRUD FUNCTIONS
// ============================================

// GET - Ambil semua pre-order
export const getPreorders = () => {
  return [...preordersData];
};

// GET by ID - Ambil satu pre-order
export const getPreorderById = (id) => {
  return preordersData.find(p => p.id === id);
};

// POST - Tambah pre-order baru
export const addPreorder = (newPreorder) => {
  preordersData.push(newPreorder);
  return newPreorder;
};

// PUT - Update pre-order
export const updatePreorder = (id, updatedData) => {
  const index = preordersData.findIndex(p => p.id === id);
  if (index !== -1) {
    preordersData[index] = { ...updatedData };
    return preordersData[index];
  }
  throw new Error('Pre-order tidak ditemukan');
};

// PATCH - Update status pre-order
export const updatePreorderStatus = (id, newStatus) => {
  const preorder = preordersData.find(p => p.id === id);
  if (preorder) {
    preorder.status = newStatus;
    if (newStatus === 'notified') {
      // Simulasi kirim notifikasi
      console.log(`Notifikasi dikirim ke ${preorder.customerName} untuk produk ${preorder.productName}`);
    }
    return preorder;
  }
  throw new Error('Pre-order tidak ditemukan');
};

// DELETE - Hapus pre-order
export const deletePreorder = (id) => {
  const index = preordersData.findIndex(p => p.id === id);
  if (index !== -1) {
    preordersData.splice(index, 1);
    return true;
  }
  throw new Error('Pre-order tidak ditemukan');
};

// Reset data (untuk testing)
export const resetPreorders = () => {
  preordersData = [
    {
      id: 'PO-001',
      productName: 'Mukjizat Al-Qur\'an',
      customerName: 'Rama Wijaya',
      customerPhone: '6281234567890',
      requestDate: '2025-03-15',
      estimatedArrival: '2025-03-30',
      status: 'notified'
    },
    {
      id: 'PO-002',
      productName: 'Buku Paket Matematika Kelas 6 SD',
      customerName: 'Siti Aminah',
      customerPhone: '6289876543210',
      requestDate: '2025-03-28',
      estimatedArrival: '2025-04-15',
      status: 'waiting_stock'
    },
    {
      id: 'PO-003',
      productName: 'Buku Paket IPA Kelas 9 SMP',
      customerName: 'Budi Santoso',
      customerPhone: '6285555555555',
      requestDate: '2025-03-10',
      estimatedArrival: '2025-03-25',
      status: 'notified'
    },
    {
      id: 'PO-004',
      productName: 'Kamus Arab-Indonesia',
      customerName: 'Maya Sari',
      customerPhone: '6287777777777',
      requestDate: '2025-02-20',
      estimatedArrival: '2025-03-10',
      status: 'waiting_stock'
    },
    {
      id: 'PO-005',
      productName: 'Buku Paket IPS Kelas 7 SMP',
      customerName: 'Linda Wati',
      customerPhone: '6289999999999',
      requestDate: '2025-04-01',
      estimatedArrival: '2025-04-20',
      status: 'notified'
    },
    {
      id: 'PO-006',
      productName: 'Al-Qur\'an Hafalan',
      customerName: 'Dewi Lestari',
      customerPhone: '6281111111111',
      requestDate: '2025-04-02',
      estimatedArrival: '2025-04-25',
      status: 'waiting_stock'
    },
    {
      id: 'PO-007',
      productName: 'Al-Qur\'an Hafalan',
      customerName: 'Dewi Lestari',
      customerPhone: '6281111111111',
      requestDate: '2025-04-02',
      estimatedArrival: '2025-04-25',
      status: 'waiting_stock'
    }
  ];
};