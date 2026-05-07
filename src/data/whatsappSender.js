// ========== WHATSAPP SENDER ==========

// Kirim WhatsApp (buka WhatsApp Web dengan pesan terisi)
export const sendWhatsApp = (phoneNumber, message) => {
  if (!phoneNumber) return;
  // Clean phone number (remove leading 0, add 62)
  let cleanNumber = phoneNumber.toString();
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '62' + cleanNumber.substring(1);
  }
  if (!cleanNumber.startsWith('62')) {
    cleanNumber = '62' + cleanNumber;
  }
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

// Template notifikasi stok tersedia
export const stockAvailableTemplate = (customerName, productName) => {
  return `Halo ${customerName}!\n\n✅ Kabar baik! Buku "${productName}" yang Anda cari sudah tersedia nih di Toko Buku Cendekia.\n\nYuk langsung order via:\n• Datang ke toko: Jl. Paus No.73, Pekanbaru\n• WhatsApp: 0812-3456-7890\n• Shopee: Toko Buku Cendekia\n\nTerima kasih sudah menjadi pelanggan setia kami 📚`;
};

// Template notifikasi promo
export const promoNotificationTemplate = (customerName, promoName, discount) => {
  return `Halo ${customerName}!\n\n🎉 PROMO SPESIAL UNTUK ANDA! 🎉\n\n${promoName}\nDiskon ${discount}% untuk pembelian Anda!\n\nJangan sampai kelewatan! Periode terbatas.\n\nKunjungi Toko Buku Cendekia sekarang juga! 📚`;
};

// Template notifikasi update pesanan
export const orderUpdateTemplate = (customerName, orderId, status) => {
  const statusMessages = {
    diproses: `Pesanan Anda sedang diproses oleh tim kami.`,
    siap_diambil: `Pesanan Anda sudah siap diambil di toko!`,
    selesai: `Pesanan Anda sudah selesai. Terima kasih sudah berbelanja!`
  };
  return `Halo ${customerName}!\n\n📦 Update Pesanan #${orderId}\n\n${statusMessages[status] || 'Status pesanan Anda telah diperbarui.'}\n\nTerima kasih 🙏`;
};

// Template notifikasi pre-order
export const preorderTemplate = (customerName, productName, estimatedDate) => {
  return `Halo ${customerName}!\n\n📖 Update Pre-order\n\nBuku "${productName}" yang Anda pre-order diperkirakan akan tiba pada tanggal ${estimatedDate}.\n\nKami akan mengabari Anda lagi ketika barang sudah tersedia!\n\nTerima kasih sudah berbelanja di Toko Buku Cendekia 📚`;
};

// Template notifikasi win-back (pelanggan tidak aktif)
export const winBackTemplate = (customerName, discountCode = 'WELCOMEBACK5') => {
  return `Halo ${customerName}!\n\n💝 Kami merindukan Anda di Toko Buku Cendekia!\n\nSebagai bentuk apresiasi, kami memberikan diskon 5% untuk pembelian Anda berikutnya.\n\nGunakan kode: ${discountCode}\n\nBerlaku hingga 30 hari ke depan.\n\nTunggu apalagi? Yuk belanja kebutuhan buku dan alat tulis Anda! 📚`;
};

// Template notifikasi ulang tahun
export const birthdayTemplate = (customerName, discount = 10) => {
  return `Halo ${customerName}!\n\n🎂 Selamat Ulang Tahun! 🎂\n\nSebagai kado spesial, kami memberikan diskon ${discount}% untuk pembelian Anda hari ini.\n\nTunjukkan pesan ini saat berbelanja di Toko Buku Cendekia.\n\nSelamat ulang tahun, semoga sukses selalu! 🎉📚`;
};

// Template notifikasi member upgrade
export const memberUpgradeTemplate = (customerName, newLevel, pointsNeeded) => {
  return `Halo ${customerName}!\n\n🎉 SELAMAT! 🎉\n\nAnda sekarang telah menjadi member ${newLevel === 'gold' ? '🥇 GOLD' : newLevel === 'silver' ? '🥈 SILVER' : '🥉 REGULER'} di Toko Buku Cendekia!\n\nNikmati benefit eksklusif:\n${newLevel === 'gold' ? '• Diskon 10% untuk semua produk\n• Prioritas pre-order\n• Poin 2x lipat' : newLevel === 'silver' ? '• Diskon 5% untuk semua produk\n• Poin 1.5x lipat' : '• Dapatkan poin dari setiap pembelian'}\n\nTerima kasih sudah setia berbelanja di Toko Buku Cendekia! 📚`;
};

// Template notifikasi feedback response
export const feedbackResponseTemplate = (customerName, response) => {
  return `Halo ${customerName}!\n\nTerima kasih atas feedback Anda kepada Toko Buku Cendekia.\n\nRespon kami: ${response}\n\nKami akan terus berusaha memberikan pelayanan terbaik untuk Anda. 🙏\n\nTerima kasih! 📚`;
};