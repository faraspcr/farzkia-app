// Data Notifikasi Otomatis Toko Buku Cendekia
const notificationsData = [
  { id: 1, type: "stock_available", customerId: 1, customerName: "Budi Santoso", customerPhone: "6281234567890", title: "✅ Stok Tersedia! Buku Paket IPA Kelas 9 SMP", message: "Halo Kak Budi, buku yang Anda cari (Buku Paket IPA Kelas 9 SMP) sudah tersedia nih! Yuk langsung ke toko atau pesan via WhatsApp.", productId: 10, sentAt: "2025-04-01 08:00:00", read: true, via: "whatsapp" },
  { id: 2, type: "promo", customerId: 2, customerName: "Aisyah Putri", customerPhone: "6281298765432", title: "🎉 Promo Ramadhan Berkah!", message: "Halo Kak Aisyah! Dapatkan diskon 15% untuk semua Al-Qur'an dan kitab Islam. Periode 1-15 April 2025. Jangan dilewatkan!", productId: null, sentAt: "2025-03-30 10:00:00", read: true, via: "whatsapp" },
  { id: 3, type: "order_update", customerId: 5, customerName: "Ahmad Fauzan", customerPhone: "6281356789012", title: "📦 Pesanan Siap Diambil!", message: "Halo Kak Ahmad, pesanan Anda (2x Al-Qur'an Terjemah) sudah siap diambil di toko. Terima kasih sudah berbelanja di Toko Buku Cendekia 📚", productId: null, sentAt: "2025-04-03 11:00:00", read: false, via: "whatsapp" },
  { id: 4, type: "win_back", customerId: 8, customerName: "Linda Wati", customerPhone: "6281689012345", title: "💝 Kangen Belanja di Cendekia? Ada Promo Khusus!", message: "Halo Kak Linda! Kami merindukan Anda. Dapatkan diskon 5% untuk pembelian berikutnya. Gunakan kode WELCOMEBACK5. Berlaku sampai 10 Mei 2025.", productId: null, sentAt: "2025-04-05 09:00:00", read: false, via: "whatsapp" },
  { id: 5, type: "preorder_update", customerId: 3, customerName: "Rama Wijaya", customerPhone: "6281377889900", title: "📖 Update Pre-order: Mukjizat Al-Qur'an", message: "Halo Kak Rama, buku Mukjizat Al-Qur'an yang Anda pre-order akan tiba sekitar tanggal 20 April 2025. Kami akan notify lagi ya!", productId: 11, sentAt: "2025-04-04 14:00:00", read: false, via: "whatsapp" },
  { id: 6, type: "promo", customerId: 7, customerName: "Ustadz Hasan", customerPhone: "6281578901234", title: "🕌 Promo Kitab Islam", message: "Assalamu'alaikum Ustadz, dapatkan diskon 10% untuk pembelian kitab Islam minimal 3 item. Periode terbatas!", productId: null, sentAt: "2025-04-02 08:00:00", read: true, via: "whatsapp" },
  { id: 7, type: "order_update", customerId: 1, customerName: "Budi Santoso", customerPhone: "6281234567890", title: "✅ Pesanan Selesai", message: "Halo Kak Budi, pesanan Anda sudah selesai. Terima kasih sudah berbelanja!", productId: null, sentAt: "2025-03-20 14:00:00", read: true, via: "whatsapp" },
  { id: 8, type: "stock_available", customerId: 4, customerName: "Siti Aminah", customerPhone: "6281345678901", title: "✅ Stok Tersedia! Buku Paket Matematika", message: "Halo Ibu Siti, buku paket matematika yang dicari sudah tersedia!", productId: 2, sentAt: "2025-04-10 09:00:00", read: false, via: "whatsapp" },
  { id: 9, type: "promo", customerId: 6, customerName: "Maya Sari", customerPhone: "6281467890123", title: "📚 Diskon Akhir Pekan!", message: "Halo Kak Maya, diskon 20% untuk semua alat tulis! Periode Sabtu-Minggu ini.", productId: null, sentAt: "2025-04-05 07:00:00", read: false, via: "whatsapp" },
  { id: 10, type: "win_back", customerId: 11, customerName: "Eko Prasetyo", customerPhone: "6281934567890", title: "🎁 Promo Kembali ke Cendekia", message: "Halo Kak Eko, kami punya promo spesial untuk Anda! Diskon 10% untuk pembelian pertama setelah lama tidak berbelanja.", productId: null, sentAt: "2025-04-06 10:00:00", read: false, via: "whatsapp" },
  { id: 11, type: "preorder_update", customerId: 10, customerName: "Dewi Lestari", customerPhone: "6281823456789", title: "📖 Pre-order Al-Qur'an Hafalan", message: "Halo Kak Dewi, Al-Qur'an Hafalan yang Anda pre-order diperkirakan tiba 30 April 2025.", productId: 14, sentAt: "2025-04-03 11:00:00", read: false, via: "whatsapp" },
  { id: 12, type: "order_update", customerId: 2, customerName: "Aisyah Putri", customerPhone: "6281298765432", title: "🔄 Pesanan Diproses", message: "Halo Kak Aisyah, pesanan Anda sedang diproses oleh tim kami.", productId: null, sentAt: "2025-04-01 10:00:00", read: true, via: "whatsapp" },
  { id: 13, type: "promo", customerId: 13, customerName: "Gunawan Wijaya", customerPhone: "6281656789012", title: "🎉 Member Gold Exclusive", message: "Halo Kak Gunawan, sebagai member Gold, Anda mendapat prioritas pre-order untuk buku baru!", productId: null, sentAt: "2025-04-04 12:00:00", read: false, via: "whatsapp" },
  { id: 14, type: "stock_available", customerId: 12, customerName: "Fitri Handayani", customerPhone: "6281545678901", title: "✅ Stok Tersedia! Kamus Inggris", message: "Halo Kak Fitri, kamus Inggris-Indonesia yang Anda cari sudah tersedia!", productId: 4, sentAt: "2025-04-10 08:00:00", read: false, via: "whatsapp" },
  { id: 15, type: "promo", customerId: 15, customerName: "Irfan Hakim", customerPhone: "6281878901234", title: "📚 Promo Buku Bekas", message: "Halo Kak Irfan, kami sedang ada program tukar buku bekas dengan diskon 15%!", productId: null, sentAt: "2025-04-05 14:00:00", read: false, via: "whatsapp" }
];

// ========== SERVICE (CRUD) ==========
let notifications = [...notificationsData];

export const getNotifications = () => {
  const stored = localStorage.getItem('cendekia_notifications');
  if (stored) return JSON.parse(stored);
  return notifications;
};

export const saveNotifications = (data) => {
  localStorage.setItem('cendekia_notifications', JSON.stringify(data));
};

export const addNotification = (notification) => {
  const all = getNotifications();
  const newNotification = {
    ...notification,
    id: Date.now(),
    sentAt: new Date().toISOString(),
    read: false
  };
  all.push(newNotification);
  saveNotifications(all);
  return newNotification;
};

export const markAsRead = (id) => {
  const all = getNotifications();
  const index = all.findIndex(n => n.id === id);
  if (index !== -1) {
    all[index].read = true;
    saveNotifications(all);
  }
};

export const getUnreadCount = () => {
  return getNotifications().filter(n => !n.read).length;
};

export const getNotificationsByCustomer = (customerId) => {
  return getNotifications().filter(n => n.customerId === customerId);
};

export default notifications;