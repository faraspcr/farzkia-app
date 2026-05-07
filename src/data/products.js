// Data Produk Toko Buku Cendekia
const productsData = [
  { id: 1, name: "Buku Paket Matematika Kelas 1 SD", category: "buku_paket_sd", stock: 45, minStock: 10, price: 75000, publisher: "Erlangga", isbn: "978-602-1234-01-5" },
  { id: 2, name: "Buku Paket Matematika Kelas 6 SD", category: "buku_paket_sd", stock: 12, minStock: 10, price: 85000, publisher: "Erlangga", isbn: "978-602-1234-06-0" },
  { id: 3, name: "Al-Qur'an Terjemah Per Kata", category: "alquran", stock: 8, minStock: 5, price: 150000, publisher: "Cordoba", isbn: "978-979-1234-50-1" },
  { id: 4, name: "Kamus Inggris-Indonesia", category: "kamus", stock: 4, minStock: 5, price: 120000, publisher: "Gramedia", isbn: "978-602-5678-12-3" },
  { id: 5, name: "Kamus Arab-Indonesia", category: "kamus", stock: 6, minStock: 5, price: 135000, publisher: "Pustaka Al-Haramain", isbn: "978-602-5678-15-4" },
  { id: 6, name: "Pensil 2B (1 pack isi 12)", category: "alat_tulis", stock: 120, minStock: 20, price: 25000, publisher: "Faber-Castell" },
  { id: 7, name: "Riyadhus Shalihin", category: "kitab", stock: 3, minStock: 5, price: 95000, publisher: "Pustaka Imam Syafi'i", isbn: "978-979-3456-22-1" },
  { id: 8, name: "Buku Paket Bahasa Inggris Kelas 3 SD", category: "buku_paket_sd", stock: 28, minStock: 10, price: 75000, publisher: "Erlangga", isbn: "978-602-1234-08-4" },
  { id: 9, name: "Buku Tulis 38 Lembar (1 pak)", category: "alat_tulis", stock: 200, minStock: 30, price: 35000, publisher: "SIDU" },
  { id: 10, name: "Buku Paket IPA Kelas 9 SMP", category: "buku_paket_smp", stock: 15, minStock: 10, price: 95000, publisher: "Kemendikbud", isbn: "978-602-1234-20-6" },
  { id: 11, name: "Mukjizat Al-Qur'an", category: "kitab", stock: 2, minStock: 5, price: 180000, publisher: "Qisthi Press", isbn: "978-602-9010-55-4" },
  { id: 12, name: "Penghapus Putih", category: "alat_tulis", stock: 85, minStock: 20, price: 5000, publisher: "Joyko" },
  { id: 13, name: "Buku Paket IPS Kelas 7 SMP", category: "buku_paket_smp", stock: 20, minStock: 10, price: 85000, publisher: "Erlangga", isbn: "978-602-1234-25-1" },
  { id: 14, name: "Al-Qur'an Hafalan", category: "alquran", stock: 10, minStock: 5, price: 200000, publisher: "Syamil Quran", isbn: "978-979-1248-30-8" },
  { id: 15, name: "Penggaris 30cm", category: "alat_tulis", stock: 60, minStock: 15, price: 8000, publisher: "Butterfly" }
];

// ========== SERVICE (CRUD) ==========
let products = [...productsData];

export const getProducts = () => {
  const stored = localStorage.getItem('cendekia_products');
  if (stored) return JSON.parse(stored);
  return products;
};

export const saveProducts = (data) => {
  localStorage.setItem('cendekia_products', JSON.stringify(data));
};

export const getProductById = (id) => {
  return getProducts().find(p => p.id === id);
};

export const updateProductStock = (productId, newStock) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index].stock = newStock;
    saveProducts(products);
    return products[index];
  }
  return null;
};

export const getLowStockProducts = () => {
  return getProducts().filter(p => p.stock < p.minStock);
};

export const getProductsByCategory = (category) => {
  const products = getProducts();
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getProductStats = () => {
  const products = getProducts();
  return {
    total: products.length,
    lowStock: products.filter(p => p.stock < p.minStock).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    byCategory: {
      buku_paket_sd: products.filter(p => p.category === 'buku_paket_sd').length,
      buku_paket_smp: products.filter(p => p.category === 'buku_paket_smp').length,
      alquran: products.filter(p => p.category === 'alquran').length,
      kitab: products.filter(p => p.category === 'kitab').length,
      kamus: products.filter(p => p.category === 'kamus').length,
      alat_tulis: products.filter(p => p.category === 'alat_tulis').length
    }
  };
};

export default products;