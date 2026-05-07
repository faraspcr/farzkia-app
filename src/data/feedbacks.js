// Data Feedback & Rating Pelanggan
const feedbacksData = [
  { id: 1, customerId: 1, customerName: "Budi Santoso", phone: "6281234567890", rating: 5, category: "pelayanan", message: "Pelayanan ramah, buku lengkap, dan suasana tokonya nyaman!", status: "resolved", adminResponse: "Terima kasih atas feedback positifnya Kak Budi! 😊", createdAt: "2025-03-21", resolvedAt: "2025-03-21" },
  { id: 2, customerId: 3, customerName: "Rama Wijaya", phone: "6281377889900", rating: 3, category: "ketersediaan_stok", message: "Stok buku kitab sering kosong, perlu ditambah koleksinya", status: "pending", adminResponse: null, createdAt: "2025-04-02", resolvedAt: null },
  { id: 3, customerId: 5, customerName: "Ahmad Fauzan", phone: "6281356789012", rating: 4, category: "pengiriman", message: "Pengiriman cepat, tapi packing agak kurang rapi", status: "in_progress", adminResponse: "Maaf atas ketidaknyamanannya, akan kami tingkatkan kualitas packing!", createdAt: "2025-04-01", resolvedAt: null },
  { id: 4, customerId: 2, customerName: "Aisyah Putri", phone: "6281298765432", rating: 5, category: "pelayanan", message: "Best bookshop di Pekanbaru! Pelayanan WhatsApp sangat responsif", status: "resolved", adminResponse: "Terima kasih Kak Aisyah! Semangat terus belajarnya 💪", createdAt: "2025-03-30", resolvedAt: "2025-03-31" },
  { id: 5, customerId: 7, customerName: "Ustadz Hasan", phone: "6281578901234", rating: 5, category: "produk", message: "Alhamdulillah, koleksi kitab lengkap dan berkualitas", status: "resolved", adminResponse: "Terima kasih Ustadz, selalu kami usahakan terbaik 🙏", createdAt: "2025-04-02", resolvedAt: "2025-04-02" },
  { id: 6, customerId: 4, customerName: "Siti Aminah", phone: "6281345678901", rating: 4, category: "pelayanan", message: "Karyawannya ramah dan membantu mencari buku", status: "resolved", adminResponse: "Terima kasih Ibu Siti! Senang bisa membantu 😊", createdAt: "2025-03-28", resolvedAt: "2025-03-28" },
  { id: 7, customerId: 6, customerName: "Maya Sari", phone: "6281467890123", rating: 4, category: "fasilitas", message: "Tempatnya nyaman, AC dingin, sayang parkir agak sempit", status: "pending", adminResponse: null, createdAt: "2025-04-04", resolvedAt: null },
  { id: 8, customerId: 8, customerName: "Linda Wati", phone: "6281689012345", rating: 2, category: "ketersediaan_stok", message: "Buku yang saya cari selalu kosong, harus pre-order terus", status: "in_progress", adminResponse: "Kami akan menambah stok untuk buku favorit pelanggan", createdAt: "2025-04-01", resolvedAt: null },
  { id: 9, customerId: 9, customerName: "Rizki Ramadhan", phone: "6281712345678", rating: 5, category: "produk", message: "Kamusnya lengkap, harga bersaing", status: "resolved", adminResponse: "Terima kasih Kak Rizki!", createdAt: "2025-03-22", resolvedAt: "2025-03-22" },
  { id: 10, customerId: 13, customerName: "Gunawan Wijaya", phone: "6281656789012", rating: 5, category: "pelayanan", message: "Fast response via WhatsApp, recomended!", status: "resolved", adminResponse: "Terima kasih Pak Gunawan!", createdAt: "2025-03-18", resolvedAt: "2025-03-18" },
  { id: 11, customerId: 17, customerName: "Kevin Tan", phone: "6281090123456", rating: 3, category: "pengiriman", message: "Pengiriman agak lambat, tapi barang bagus", status: "pending", adminResponse: null, createdAt: "2025-04-05", resolvedAt: null },
  { id: 12, customerId: 22, customerName: "Putri Amelia", phone: "6281556789012", rating: 5, category: "produk", message: "Al-Qur'an terjemahannya bagus dan jelas", status: "resolved", adminResponse: "Terima kasih Putri!", createdAt: "2025-04-02", resolvedAt: "2025-04-02" },
  { id: 13, customerId: 24, customerName: "Rendi Saputra", phone: "6281778901234", rating: 4, category: "pelayanan", message: "Pelayanan kasir cepat dan ramah", status: "resolved", adminResponse: "Terima kasih Kak Rendi!", createdAt: "2025-03-27", resolvedAt: "2025-03-27" },
  { id: 14, customerId: 28, customerName: "Vino Bastian", phone: "6281123456789", rating: 5, category: "fasilitas", message: "Toko bersih dan rapi, buku tersusun rapi", status: "resolved", adminResponse: "Terima kasih Vino!", createdAt: "2025-04-03", resolvedAt: "2025-04-03" },
  { id: 15, customerId: 30, customerName: "Xavier Purnama", phone: "6281345678900", rating: 4, category: "pelayanan", message: "Pelayanan oke, tapi antriannya agak lama pas jam sibuk", status: "pending", adminResponse: null, createdAt: "2025-04-05", resolvedAt: null }
];

// ========== SERVICE (CRUD) ==========
let feedbacks = [...feedbacksData];

export const getFeedbacks = () => {
  const stored = localStorage.getItem('cendekia_feedbacks');
  if (stored) return JSON.parse(stored);
  return feedbacks;
};

export const saveFeedbacks = (data) => {
  localStorage.setItem('cendekia_feedbacks', JSON.stringify(data));
};

export const addFeedback = (feedback) => {
  const all = getFeedbacks();
  const newFeedback = {
    ...feedback,
    id: Date.now(),
    status: 'pending',
    adminResponse: null,
    createdAt: new Date().toISOString().split('T')[0],
    resolvedAt: null
  };
  all.push(newFeedback);
  saveFeedbacks(all);
  return newFeedback;
};

export const updateFeedbackStatus = (id, status, response) => {
  const all = getFeedbacks();
  const index = all.findIndex(f => f.id === id);
  if (index !== -1) {
    all[index].status = status;
    if (response) all[index].adminResponse = response;
    if (status === 'resolved') all[index].resolvedAt = new Date().toISOString().split('T')[0];
    saveFeedbacks(all);
    return all[index];
  }
  return null;
};

export const getFeedbackStats = () => {
  const all = getFeedbacks();
  const ratings = all.map(f => f.rating);
  const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length || 0;
  
  return {
    total: all.length,
    averageRating: avgRating.toFixed(1),
    resolved: all.filter(f => f.status === 'resolved').length,
    pending: all.filter(f => f.status === 'pending').length,
    inProgress: all.filter(f => f.status === 'in_progress').length,
    ratingDistribution: {
      1: all.filter(f => f.rating === 1).length,
      2: all.filter(f => f.rating === 2).length,
      3: all.filter(f => f.rating === 3).length,
      4: all.filter(f => f.rating === 4).length,
      5: all.filter(f => f.rating === 5).length
    },
    byCategory: {
      pelayanan: all.filter(f => f.category === 'pelayanan').length,
      produk: all.filter(f => f.category === 'produk').length,
      ketersediaan_stok: all.filter(f => f.category === 'ketersediaan_stok').length,
      pengiriman: all.filter(f => f.category === 'pengiriman').length,
      fasilitas: all.filter(f => f.category === 'fasilitas').length
    }
  };
};

export default feedbacks;