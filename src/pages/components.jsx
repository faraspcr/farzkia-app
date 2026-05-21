// src/pages/components.jsx
import { useState } from 'react';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import PriceDisplay from '../components/PriceDisplay';
import StockBadge from '../components/StockBadge';
import TransactionBadge from '../components/TransactionBadge';
import InputField from '../components/InputField';
import Modal from '../components/Modal';
import ProductRow from '../components/ProductRow';
import PreOrderCard from '../components/PreOrderCard';
import TransactionCard from '../components/TransactionCard';

export default function ComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  // Sample data
  const sampleProduct = {
    id: 1,
    name: "Kamus Inggris-Indonesia",
    price: 120000,
    stock: 4,
    minStock: 5
  };

  const samplePreOrder = {
    id: 1,
    productName: "Mukjizat Al-Qur'an",
    customerName: "Rama Wijaya",
    customerPhone: "6281377889900",
    requestDate: "15 Maret 2025",
    estimateDate: "20 April 2025",
    status: "waiting_stock"
  };

  const sampleTransaction = {
    id: 1,
    customerName: "Linda Wati",
    amount: 95000,
    source: "whatsapp",
    status: "diproses",
    items: 1
  };

  return (
    <Container>
      <PageHeader 
        title="🎨 Components Library" 
        description="Kumpulan semua komponen reusable Toko Buku Cendekia (15 Komponen)"
      />

      {/* ==================== 1. AVATAR ==================== */}
      <SectionTitle title="1. Avatar" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Menampilkan inisial nama atau foto profil</h3>
        <div className="flex gap-4 items-center">
          <Avatar name="Budi Santoso" />
          <Avatar name="Aisyah Putri" size="lg" />
          <Avatar name="Rama" size="sm" />
        </div>
      </div>

      {/* ==================== 2. BADGE ==================== */}
      <SectionTitle title="2. Badge" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Label status dengan berbagai varian warna</h3>
        <div className="flex flex-wrap gap-2">
          <Badge type="primary">Primary</Badge>
          <Badge type="success">Success</Badge>
          <Badge type="danger">Danger</Badge>
          <Badge type="warning">Warning</Badge>
          <Badge type="gray">Gray</Badge>
          <Badge type="gold">Gold</Badge>
          <Badge type="silver">Silver</Badge>
        </div>
      </div>

      {/* ==================== 3. BUTTON ==================== */}
      <SectionTitle title="3. Button" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Tombol reusable dengan berbagai varian</h3>
        <div className="flex flex-wrap gap-2">
          <Button type="primary">Primary</Button>
          <Button type="success">Success</Button>
          <Button type="danger">Danger</Button>
          <Button type="warning">Warning</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="outline">Outline</Button>
        </div>
      </div>

      {/* ==================== 4. CONTAINER ==================== */}
      <SectionTitle title="4. Container" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Pembungkus utama halaman (sedang dipakai untuk halaman ini)</h3>
        <div className="bg-blue-100 p-3 rounded-lg text-center text-blue-800">
          ✅ Container sedang aktif membungkus seluruh halaman ini
        </div>
      </div>

      {/* ==================== 5. INPUT FIELD ==================== */}
      <SectionTitle title="5. InputField" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Input form dengan label dan validasi</h3>
        <InputField 
          label="Nama Lengkap"
          name="name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Masukkan nama lengkap"
        />
        <InputField 
          label="Email"
          name="email"
          type="email"
          placeholder="contoh@email.com"
          required
        />
      </div>

      {/* ==================== 6. MODAL ==================== */}
      <SectionTitle title="6. Modal" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Dialog popup untuk konfirmasi atau form</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Buka Modal Demo
        </Button>
        <p className="text-xs text-gray-500 mt-2">Klik tombol untuk melihat modal</p>
      </div>

      {/* ==================== 7. PAGE HEADER ==================== */}
      <SectionTitle title="7. PageHeader" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Header halaman dengan judul dan deskripsi</h3>
        <PageHeader 
          title="Contoh Page Header" 
          description="Ini adalah contoh penggunaan PageHeader component"
        />
      </div>

      {/* ==================== 8. PRE ORDER CARD ==================== */}
      <SectionTitle title="8. PreOrderCard" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Card untuk daftar pre-order</h3>
        <PreOrderCard 
          preOrder={samplePreOrder} 
          onNotify={() => alert('Notifikasi dikirim!')} 
        />
      </div>

      {/* ==================== 9. PRICE DISPLAY ==================== */}
      <SectionTitle title="9. PriceDisplay" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Format harga ke mata uang Rupiah</h3>
        <PriceDisplay amount={4150000} className="text-xl font-bold text-blue-600" />
        <PriceDisplay amount={850000} className="text-lg mt-2" />
        <PriceDisplay amount={95000} className="mt-2" />
      </div>

      {/* ==================== 10. PRODUCT ROW ==================== */}
      <SectionTitle title="10. ProductRow" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Baris tabel untuk manajemen stok</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Produk</th>
                <th className="p-2 text-left">Harga</th>
                <th className="p-2 text-left">Stok</th>
                <th className="p-2 text-left">Min Stok</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <ProductRow 
                product={sampleProduct} 
                onEdit={() => alert('Edit produk')} 
                onDelete={() => alert('Hapus produk')} 
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== 11. SEARCH BAR ==================== */}
      <SectionTitle title="11. SearchBar" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Input pencarian dengan ikon search</h3>
        <SearchBar 
          placeholder="Cari sesuatu..."
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

      {/* ==================== 12. SECTION TITLE ==================== */}
      <SectionTitle title="12. SectionTitle" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Judul section dengan garis bawah (sedang dipakai di halaman ini)</h3>
        <p className="text-gray-500">Semua judul "1. Avatar", "2. Badge", dll di atas menggunakan SectionTitle</p>
      </div>

      {/* ==================== 13. STOCK BADGE ==================== */}
      <SectionTitle title="13. StockBadge" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Status stok (Aman, Menipis, Habis)</h3>
        <div className="space-y-2">
          <div><StockBadge stock={45} minStock={5} /> <span className="text-sm ml-2">Stok 45 (Aman)</span></div>
          <div><StockBadge stock={4} minStock={5} /> <span className="text-sm ml-2">Stok 4 (Menipis)</span></div>
          <div><StockBadge stock={0} minStock={5} /> <span className="text-sm ml-2">Stok 0 (Habis)</span></div>
        </div>
      </div>

      {/* ==================== 14. TRANSACTION BADGE ==================== */}
      <SectionTitle title="14. TransactionBadge" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Status transaksi (Diterima, Diproses, Siap Diambil, Selesai)</h3>
        <div className="flex flex-wrap gap-2">
          <TransactionBadge status="diterima" />
          <TransactionBadge status="diproses" />
          <TransactionBadge status="siap_diambil" />
          <TransactionBadge status="selesai" />
        </div>
      </div>

      {/* ==================== 15. TRANSACTION CARD ==================== */}
      <SectionTitle title="15. TransactionCard" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Card untuk riwayat transaksi</h3>
        <TransactionCard 
          transaction={sampleTransaction} 
          onViewDetail={() => alert('Lihat detail transaksi')} 
        />
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo Modal"
        onConfirm={() => {
          alert('Konfirmasi!');
          setIsModalOpen(false);
        }}
        confirmText="Konfirmasi"
        cancelText="Batal"
      >
        <p className="text-gray-600">Ini adalah contoh modal dari komponen Modal.</p>
        <p className="text-gray-600 mt-2">Modal ini bisa digunakan untuk konfirmasi atau form.</p>
      </Modal>
    </Container>
  );
}