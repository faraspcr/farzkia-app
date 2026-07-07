import { useEffect, useMemo, useState } from 'react';
import {
  FaBell,
  FaBoxOpen,
  FaCalendarAlt,
  FaEdit,
  FaThLarge,
  FaThList,
  FaPlus,
  FaSearch,
  FaShoppingCart,
  FaTrash,
} from 'react-icons/fa';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { getProducts, saveProducts } from '../data/products';

const categoryOptions = [
  { value: 'all', label: 'Semua' },
  { value: 'buku_paket', label: 'Buku Paket' },
  { value: 'buku_umum', label: 'Buku Umum' },
  { value: 'buku_islami', label: 'Buku Islami' },
  { value: 'buku_tulis', label: 'Buku Tulis' },
  { value: 'alat_tulis', label: 'Alat Tulis' },
];

const defaultFormState = {
  name: '',
  category: 'buku_paket',
  type: 'reguler',
  price: '',
  stock: '',
  description: '',
  remainingSlots: '',
  estimatedRelease: '',
};

const currency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const normalizeCategory = (category) => {
  switch (category) {
    case 'buku_paket_sd':
    case 'buku_paket_smp':
    case 'buku_paket':
      return 'buku_paket';
    case 'alquran':
    case 'kitab':
    case 'buku_islami':
      return 'buku_islami';
    case 'kamus':
    case 'buku_umum':
      return 'buku_umum';
    case 'buku_tulis':
      return 'buku_tulis';
    case 'alat_tulis':
      return 'alat_tulis';
    default:
      return 'buku_umum';
  }
};

const normalizeProduct = (product) => ({
  ...product,
  category: normalizeCategory(product.category),
  type: product.type || 'reguler',
  description: product.description || '',
  imageUrl: product.imageUrl || '',
  remainingSlots: product.remainingSlots ?? 0,
  estimatedRelease: product.estimatedRelease || '',
});

const getCategoryLabel = (category) => {
  switch (category) {
    case 'buku_paket':
      return 'Buku Paket';
    case 'buku_umum':
      return 'Buku Umum';
    case 'buku_islami':
      return 'Buku Islami';
    case 'buku_tulis':
      return 'Buku Tulis';
    case 'alat_tulis':
      return 'Alat Tulis';
    default:
      return 'Lainnya';
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'bundle':
      return 'Bundle';
    case 'preorder':
      return 'Pre-Order';
    default:
      return 'Reguler';
  }
};

const getCurrentRole = () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return 'user';
    const parsed = JSON.parse(storedUser);
    return parsed.role === 'admin' ? 'admin' : 'user';
  } catch (error) {
    console.error('Gagal membaca role user:', error);
    return 'user';
  }
};

const buildImageUrl = (product) => {
  if (product.imageUrl) return product.imageUrl;
  const label = product.name?.slice(0, 2).toUpperCase() || 'PR';
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='100%25' height='100%25' rx='24' fill='%23e0f2fe'/%3E%3Ctext x='50%25' y='50%25' font-size='48' text-anchor='middle' dominant-baseline='middle' fill='%231d4ed8'%3E${label}%3C/text%3E%3C/svg%3E`;
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState(defaultFormState);
  const [feedback, setFeedback] = useState('');

  const isAdmin = getCurrentRole() === 'admin';

  useEffect(() => {
    const allProducts = getProducts().map(normalizeProduct);
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    const query = searchTerm.toLowerCase();
    const visibleProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || normalizeCategory(product.category) === selectedCategory;
      const matchesSearch =
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        getCategoryLabel(product.category).toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(visibleProducts);
  }, [products, searchTerm, selectedCategory]);

  const bundleProducts = useMemo(() => filteredProducts.filter((item) => item.type === 'bundle'), [filteredProducts]);
  const preorderProducts = useMemo(() => filteredProducts.filter((item) => item.type === 'preorder'), [filteredProducts]);
  const regularProducts = useMemo(
    () => filteredProducts.filter((item) => item.type !== 'bundle' && item.type !== 'preorder'),
    [filteredProducts],
  );

  const openCreateModal = () => {
    setProductToEdit(null);
    setFormData(defaultFormState);
    setIsFormOpen(true);
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setFormData({
      name: product.name || '',
      category: product.category || 'buku_paket',
      type: product.type || 'reguler',
      price: product.price || '',
      stock: product.stock || '',
      description: product.description || '',
      remainingSlots: product.remainingSlots || '',
      estimatedRelease: product.estimatedRelease || '',
    });
    setIsFormOpen(true);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmitProduct = () => {
    if (!formData.name.trim()) {
      setFeedback('Nama produk wajib diisi.');
      return;
    }

    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (Number.isNaN(price) || price < 0) {
      setFeedback('Harga tidak boleh negatif.');
      return;
    }

    if (Number.isNaN(stock) || stock < 0) {
      setFeedback('Stok tidak boleh negatif.');
      return;
    }

    const nextProduct = normalizeProduct({
      id: productToEdit?.id || Date.now().toString(),
      name: formData.name.trim(),
      category: formData.category,
      type: formData.type,
      price,
      stock,
      description: formData.description.trim(),
      imageUrl: productToEdit?.imageUrl || '',
      rating: productToEdit?.rating || 4.6,
      remainingSlots: formData.type === 'preorder' ? Number(formData.remainingSlots || 0) : undefined,
      estimatedRelease: formData.type === 'preorder' ? formData.estimatedRelease : undefined,
      bundleItems: formData.type === 'bundle' ? ['Isi bundle 1', 'Isi bundle 2'] : undefined,
      createdAt: productToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const updatedProducts = productToEdit
      ? products.map((item) => (item.id === productToEdit.id ? nextProduct : item))
      : [nextProduct, ...products];

    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setIsFormOpen(false);
    setProductToEdit(null);
    setFormData(defaultFormState);
    setFeedback(productToEdit ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.');
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    const updatedProducts = products.filter((item) => item.id !== productToDelete.id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setProductToDelete(null);
    setFeedback('Produk berhasil dihapus.');
  };

  const handleUserAction = (product, action) => {
    if (action === 'booking') {
      setFeedback(`Booking slot pre-order untuk ${product.name} berhasil dicatat.`);
      return;
    }

    setFeedback(`${product.name} berhasil ditambahkan ke keranjang.`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Catalog</p>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="mt-2 text-sm text-blue-50">
              Halaman produk yang menyesuaikan akses berdasarkan role login.
            </p>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-100">Role aktif</p>
            <p className="text-lg font-semibold capitalize">{isAdmin ? 'Admin' : 'User'}</p>
          </div>
        </div>
      </div>

      {feedback && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          {feedback}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Cari produk, kategori, atau tipe"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-full p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`rounded-full p-2 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
              >
                <FaThList />
              </button>
            </div>
            {isAdmin && (
              <Button onClick={openCreateModal} type="primary" className="flex items-center gap-2">
                <FaPlus />
                Tambah Produk
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Promo Banner</h2>
              <p className="text-sm text-gray-500">Tampilan utama untuk highlight katalog.</p>
            </div>
            {isAdmin && (
              <Button type="outline" className="flex items-center gap-2">
                <FaBell />
                Edit Promo
              </Button>
            )}
          </div>
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 p-5 text-white">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-100">
              <FaBoxOpen />
              Bundle Hemat Cendekia
            </div>
            <h3 className="mt-3 text-xl font-semibold">Dapatkan harga spesial untuk paket belajar favorit Anda.</h3>
            <p className="mt-2 text-sm text-orange-50">Admin dapat mengatur bundle, sementara customer hanya melihat dan memesan.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Ringkasan Katalog</h2>
              <p className="text-sm text-gray-500">Data yang tersedia untuk role saat ini.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-sm text-gray-500">Total terfilter</p>
              <p className="text-xl font-semibold text-gray-800">{filteredProducts.length}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-sm text-gray-500">Bundle</p>
              <p className="text-xl font-semibold text-gray-800">{bundleProducts.length}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-sm text-gray-500">Pre-Order</p>
              <p className="text-xl font-semibold text-gray-800">{preorderProducts.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Bundle Hemat Cendekia</h2>
              <p className="text-sm text-gray-500">Produk bundle yang bisa dipilih customer dengan tombol transaksi.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {bundleProducts.length > 0 ? (
              bundleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  viewMode={viewMode}
                  onEdit={openEditModal}
                  onDelete={setProductToDelete}
                  onAction={handleUserAction}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500 md:col-span-2 xl:col-span-3">
                Belum ada produk bundle yang sesuai filter saat ini.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Koleksi Eksklusif Pre-Order</h2>
              <p className="text-sm text-gray-500">Admin bisa mengatur slot dan estimasi rilis, customer dapat booking.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {preorderProducts.length > 0 ? (
              preorderProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  viewMode={viewMode}
                  onEdit={openEditModal}
                  onDelete={setProductToDelete}
                  onAction={handleUserAction}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500 md:col-span-2 xl:col-span-3">
                Tidak ada produk pre-order yang cocok dengan filter.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Daftar Produk</h2>
            <p className="text-sm text-gray-500">Filter, cari, dan kelola produk berdasarkan role aktif.</p>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {regularProducts.length > 0 ? (
              regularProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  viewMode={viewMode}
                  onEdit={openEditModal}
                  onDelete={setProductToDelete}
                  onAction={handleUserAction}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500 md:col-span-2 xl:col-span-3">
                Tidak ada produk yang ditemukan untuk filter saat ini.
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-3 py-2">Produk</th>
                  <th className="px-3 py-2">Kategori</th>
                  <th className="px-3 py-2">Harga</th>
                  <th className="px-3 py-2">Stok</th>
                  <th className="px-3 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {regularProducts.length > 0 ? (
                  regularProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100">
                      <td className="px-3 py-3">
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="text-xs text-gray-500">{getTypeLabel(product.type)}</div>
                      </td>
                      <td className="px-3 py-3">{getCategoryLabel(product.category)}</td>
                      <td className="px-3 py-3">{currency(product.price)}</td>
                      <td className="px-3 py-3">{product.stock}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          {isAdmin ? (
                            <>
                              <Button type="outline" onClick={() => openEditModal(product)} className="px-2 py-2">
                                <FaEdit />
                              </Button>
                              <Button type="danger" onClick={() => setProductToDelete(product)} className="px-2 py-2">
                                <FaTrash />
                              </Button>
                            </>
                          ) : (
                            <Button type="primary" onClick={() => handleUserAction(product, 'cart')} className="flex items-center gap-2">
                              <FaShoppingCart />
                              Beli
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-3 py-4 text-sm text-gray-500">
                      Tidak ada produk yang ditemukan untuk filter saat ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setProductToEdit(null);
          setFormData(defaultFormState);
        }}
        title={productToEdit ? 'Edit Produk' : 'Tambah Produk'}
        onConfirm={handleSubmitProduct}
        confirmText="Simpan"
      >
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Nama Produk
            <input
              name="name"
              value={formData.name}
              onChange={handleFormInputChange}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Contoh: Paket Belajar Intensif"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              Kategori
              <select
                name="category"
                value={formData.category}
                onChange={handleFormInputChange}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              >
                {categoryOptions.filter((item) => item.value !== 'all').map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Tipe
              <select
                name="type"
                value={formData.type}
                onChange={handleFormInputChange}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              >
                <option value="reguler">Reguler</option>
                <option value="bundle">Bundle</option>
                <option value="preorder">Pre-Order</option>
              </select>
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              Harga
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormInputChange}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                min="0"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Stok
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleFormInputChange}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                min="0"
              />
            </label>
          </div>

          {formData.type === 'preorder' && (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                Sisa Slot
                <input
                  type="number"
                  name="remainingSlots"
                  value={formData.remainingSlots}
                  onChange={handleFormInputChange}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                  min="0"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Estimasi Rilis
                <input
                  name="estimatedRelease"
                  value={formData.estimatedRelease}
                  onChange={handleFormInputChange}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="2-3 Minggu"
                />
              </label>
            </div>
          )}

          <label className="block text-sm font-medium text-gray-700">
            Deskripsi
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormInputChange}
              className="mt-1 min-h-24 w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Tulis deskripsi singkat produk"
            />
          </label>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        title="Hapus Produk"
        onConfirm={handleDeleteProduct}
        confirmText="Ya, Hapus"
      >
        <p className="text-sm text-gray-600">
          Apakah Anda yakin ingin menghapus <span className="font-semibold">{productToDelete?.name}</span>?
        </p>
      </Modal>
    </div>
  );
}

function ProductCard({ product, isAdmin, viewMode, onEdit, onDelete, onAction }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-36">
        <img src={buildImageUrl(product)} alt={product.name} className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
          {getTypeLabel(product.type)}
        </div>
        {isAdmin && (
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="rounded-full bg-white p-2 text-blue-600 shadow-sm"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="rounded-full bg-white p-2 text-red-600 shadow-sm"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
            {getCategoryLabel(product.category)}
          </div>
          <h3 className="mt-1 text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.description || 'Produk lengkap dengan kualitas terjaga.'}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{currency(product.price)}</span>
          <span className="font-medium">Stok: {product.stock}</span>
        </div>

        {product.type === 'preorder' && (
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              Slot tersisa: {product.remainingSlots ?? 0}
            </div>
            <div className="mt-1">Estimasi: {product.estimatedRelease || 'Segera'}</div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {isAdmin ? (
            <Button type="outline" onClick={() => onEdit(product)} className="flex-1">
              Edit Produk
            </Button>
          ) : (
            <>
              {product.type === 'preorder' ? (
                <Button type="primary" onClick={() => onAction(product, 'booking')} className="flex-1 flex items-center justify-center gap-2">
                  <FaCalendarAlt />
                  Booking Slot PO
                </Button>
              ) : (
                <Button type="primary" onClick={() => onAction(product, 'cart')} className="flex-1 flex items-center justify-center gap-2">
                  <FaShoppingCart />
                  Tambah ke Keranjang
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
