// ========== FORMATTERS & UTILS ==========

// Format Rupiah
export const formatRupiah = (amount) => {
  if (!amount && amount !== 0) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Format tanggal lengkap (contoh: 20 Maret 2025)
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Format tanggal pendek (contoh: 20 Mar 2025)
export const formatShortDate = (dateString) => {
  if (!dateString) return '-';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Format jam (contoh: 14:30)
export const formatTime = (timestamp) => {
  if (!timestamp) return '-';
  return new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

// Waktu relatif (contoh: "2 hari yang lalu", "Baru saja")
export const timeAgo = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return 'Baru saja';
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffWeeks < 4) return `${diffWeeks} minggu lalu`;
  if (diffMonths < 12) return `${diffMonths} bulan lalu`;
  return `${diffYears} tahun lalu`;
};

// Get status badge color
export const getStatusColor = (status) => {
  const colors = {
    // Customer status
    aktif: 'bg-green-100 text-green-800',
    tidak_aktif: 'bg-red-100 text-red-800',
    dormant: 'bg-yellow-100 text-yellow-800',
    // Transaction status
    pesanan_diterima: 'bg-blue-100 text-blue-800',
    diproses: 'bg-yellow-100 text-yellow-800',
    siap_diambil: 'bg-purple-100 text-purple-800',
    selesai: 'bg-green-100 text-green-800',
    // Feedback status
    pending: 'bg-orange-100 text-orange-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    // Default
    waiting_stock: 'bg-yellow-100 text-yellow-800',
    notified: 'bg-blue-100 text-blue-800',
    fulfilled: 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Get status label in Indonesian
export const getStatusLabel = (status) => {
  const labels = {
    // Customer status
    aktif: 'Aktif',
    tidak_aktif: 'Tidak Aktif',
    dormant: 'Tidak Aktif 3+ Bulan',
    // Transaction status
    pesanan_diterima: 'Pesanan Diterima',
    diproses: 'Sedang Diproses',
    siap_diambil: 'Siap Diambil',
    selesai: 'Selesai',
    // Feedback status
    pending: 'Menunggu',
    in_progress: 'Diproses',
    resolved: 'Selesai',
    // Pre-order status
    waiting_stock: 'Menunggu Stok',
    notified: 'Sudah Diberitahu',
    fulfilled: 'Sudah Terpenuhi'
  };
  return labels[status] || status;
};

// Member level badge
export const getLevelBadge = (level) => {
  const badges = {
    reguler: 'bg-gray-200 text-gray-800',
    silver: 'bg-gray-400 text-white',
    gold: 'bg-yellow-500 text-white'
  };
  return badges[level] || badges.reguler;
};

// Get category label for customer
export const getCategoryLabel = (category) => {
  const labels = {
    ortu_murid: { label: 'Orang Tua Murid', icon: '👨‍👩‍👧', color: 'blue' },
    santri: { label: 'Santri', icon: '🕌', color: 'green' },
    mahasiswa_umum: { label: 'Mahasiswa/Umum', icon: '🎓', color: 'yellow' }
  };
  return labels[category] || { label: category, icon: '📚', color: 'gray' };
};

// Get product category label
export const getProductCategoryLabel = (category) => {
  const labels = {
    buku_paket_sd: 'Buku Paket SD',
    buku_paket_smp: 'Buku Paket SMP',
    alquran: 'Al-Qur\'an',
    kitab: 'Kitab Islam',
    kamus: 'Kamus',
    alat_tulis: 'Alat Tulis'
  };
  return labels[category] || category;
};

// Format number with thousand separator
export const formatNumber = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') || '0';
};

// Get payment method label
export const getPaymentMethodLabel = (method) => {
  const labels = {
    cash: 'Tunai',
    qris: 'QRIS',
    transfer: 'Transfer Bank'
  };
  return labels[method] || method;
};

// Get source label
export const getSourceLabel = (source) => {
  const labels = {
    offline: 'Offline (Toko)',
    whatsapp: 'WhatsApp',
    shopee: 'Shopee'
  };
  return labels[source] || source;
};