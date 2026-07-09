// src/data/feedbacks.js

// Data awal feedback
let feedbacksData = [
  {
    id: 'FB-001',
    customerName: 'Xavier Purnama',
    rating: 5,
    comment: 'Pelayanan sangat baik, buku yang saya cari tersedia lengkap. Sangat puas dengan pelayanannya!',
    status: 'pending',
    createdAt: '2025-04-05T08:30:00.000Z',
    reply: null
  },
  {
    id: 'FB-002',
    customerName: 'Vino Bastian',
    rating: 5,
    comment: 'Toko buku favorit saya. Koleksi bukunya lengkap dan harganya terjangkau.',
    status: 'pending',
    createdAt: '2025-04-03T10:15:00.000Z',
    reply: null
  },
  {
    id: 'FB-003',
    customerName: 'Rendi Saputra',
    rating: 4,
    comment: 'Buku bagus, pengiriman cepat. Recommended buat yang suka baca.',
    status: 'in_progress',
    createdAt: '2025-03-27T14:20:00.000Z',
    reply: null
  },
  {
    id: 'FB-004',
    customerName: 'Putri Amelia',
    rating: 5,
    comment: 'Sangat suka dengan pelayanan di Cendekia. Staff ramah dan membantu.',
    status: 'pending',
    createdAt: '2025-04-02T09:45:00.000Z',
    reply: null
  },
  {
    id: 'FB-005',
    customerName: 'Kevin Tan',
    rating: 4,
    comment: 'Buku original, kualitas bagus. Akan kembali lagi belanja di sini.',
    status: 'pending',
    createdAt: '2025-04-05T11:00:00.000Z',
    reply: null
  },
  {
    id: 'FB-006',
    customerName: 'Maya Sari',
    rating: 5,
    comment: 'Terima kasih Cendekia, buku yang saya pesan sampai dengan selamat.',
    status: 'resolved',
    createdAt: '2025-03-20T13:30:00.000Z',
    reply: 'Terima kasih kembali, Maya! Senang mendengar pesanan Anda sampai dengan selamat. Semoga bermanfaat!'
  },
  {
    id: 'FB-007',
    customerName: 'Budi Santoso',
    rating: 3,
    comment: 'Buku cukup bagus, tapi pengiriman agak lama.',
    status: 'resolved',
    createdAt: '2025-03-15T07:00:00.000Z',
    reply: 'Maaf atas keterlambatan pengiriman. Kami akan perbaiki sistem pengiriman kami. Terima kasih atas masukannya!'
  }
];

// ============================================
// CRUD FUNCTIONS
// ============================================

// GET - Ambil semua feedback
export const getFeedbacks = () => {
  return [...feedbacksData];
};

// GET by ID - Ambil satu feedback
export const getFeedbackById = (id) => {
  return feedbacksData.find(f => f.id === id);
};

// GET - Ambil statistik feedback
export const getFeedbackStats = () => {
  const total = feedbacksData.length;
  const pending = feedbacksData.filter(f => f.status === 'pending').length;
  const inProgress = feedbacksData.filter(f => f.status === 'in_progress').length;
  const resolved = feedbacksData.filter(f => f.status === 'resolved').length;
  
  const totalRating = feedbacksData.reduce((sum, f) => sum + f.rating, 0);
  const avgRating = total > 0 ? (totalRating / total) : 0;
  
  return {
    total,
    pending,
    inProgress,
    resolved,
    avgRating: Math.round(avgRating * 10) / 10
  };
};

// POST - Tambah feedback baru
export const addFeedback = (newFeedback) => {
  feedbacksData.push(newFeedback);
  return newFeedback;
};

// PUT - Update feedback
export const updateFeedback = (id, updatedData) => {
  const index = feedbacksData.findIndex(f => f.id === id);
  if (index !== -1) {
    feedbacksData[index] = { ...updatedData };
    return feedbacksData[index];
  }
  throw new Error('Feedback tidak ditemukan');
};

// PATCH - Update status feedback dengan balasan
export const updateFeedbackStatus = (id, newStatus, reply = null) => {
  const feedback = feedbacksData.find(f => f.id === id);
  if (feedback) {
    feedback.status = newStatus;
    if (reply) {
      feedback.reply = reply;
    }
    feedback.updatedAt = new Date().toISOString();
    return feedback;
  }
  throw new Error('Feedback tidak ditemukan');
};

// DELETE - Hapus feedback
export const deleteFeedback = (id) => {
  const index = feedbacksData.findIndex(f => f.id === id);
  if (index !== -1) {
    feedbacksData.splice(index, 1);
    return true;
  }
  throw new Error('Feedback tidak ditemukan');
};

// Reset data (untuk testing)
export const resetFeedbacks = () => {
  feedbacksData = [
    {
      id: 'FB-001',
      customerName: 'Xavier Purnama',
      rating: 5,
      comment: 'Pelayanan sangat baik, buku yang saya cari tersedia lengkap. Sangat puas dengan pelayanannya!',
      status: 'pending',
      createdAt: '2025-04-05T08:30:00.000Z',
      reply: null
    },
    {
      id: 'FB-002',
      customerName: 'Vino Bastian',
      rating: 5,
      comment: 'Toko buku favorit saya. Koleksi bukunya lengkap dan harganya terjangkau.',
      status: 'pending',
      createdAt: '2025-04-03T10:15:00.000Z',
      reply: null
    },
    {
      id: 'FB-003',
      customerName: 'Rendi Saputra',
      rating: 4,
      comment: 'Buku bagus, pengiriman cepat. Recommended buat yang suka baca.',
      status: 'in_progress',
      createdAt: '2025-03-27T14:20:00.000Z',
      reply: null
    },
    {
      id: 'FB-004',
      customerName: 'Putri Amelia',
      rating: 5,
      comment: 'Sangat suka dengan pelayanan di Cendekia. Staff ramah dan membantu.',
      status: 'pending',
      createdAt: '2025-04-02T09:45:00.000Z',
      reply: null
    },
    {
      id: 'FB-005',
      customerName: 'Kevin Tan',
      rating: 4,
      comment: 'Buku original, kualitas bagus. Akan kembali lagi belanja di sini.',
      status: 'pending',
      createdAt: '2025-04-05T11:00:00.000Z',
      reply: null
    },
    {
      id: 'FB-006',
      customerName: 'Maya Sari',
      rating: 5,
      comment: 'Terima kasih Cendekia, buku yang saya pesan sampai dengan selamat.',
      status: 'resolved',
      createdAt: '2025-03-20T13:30:00.000Z',
      reply: 'Terima kasih kembali, Maya! Senang mendengar pesanan Anda sampai dengan selamat. Semoga bermanfaat!'
    },
    {
      id: 'FB-007',
      customerName: 'Budi Santoso',
      rating: 3,
      comment: 'Buku cukup bagus, tapi pengiriman agak lama.',
      status: 'resolved',
      createdAt: '2025-03-15T07:00:00.000Z',
      reply: 'Maaf atas keterlambatan pengiriman. Kami akan perbaiki sistem pengiriman kami. Terima kasih atas masukannya!'
    }
  ];
};