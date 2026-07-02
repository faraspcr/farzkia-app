# 📦 DOKUMENTASI LENGKAP SEMUA KOMPONEN PROJECT

Terdapat **28 Custom Components** dan **5 UI Components** (dari shadcn/ui) dalam project Toko Buku Cendekia CRM.

---

## 🎨 CUSTOM COMPONENTS (28)

### 📋 Utility & Layout Components

#### 1. **Container**
**File**: `src/components/Container.jsx`  
**Fungsi**: Wrapper untuk memberi max-width dan padding konsisten pada halaman.  
**Props**: `children`, `className`  
**Contoh Penggunaan**:
```jsx
<Container>
  <PageHeader title="Dashboard" />
  {/* konten halaman */}
</Container>
```

---

#### 2. **PageHeader**
**File**: `src/components/PageHeader.jsx`  
**Fungsi**: Menampilkan title dan description untuk setiap halaman dengan styling konsisten.  
**Props**: `title` (string), `description` (string), `children` (optional)  
**Contoh Penggunaan**:
```jsx
<PageHeader 
  title="Pelanggan" 
  description="Kelola data pelanggan toko"
/>
```

---

#### 3. **SectionTitle**
**File**: `src/components/SectionTitle.jsx`  
**Fungsi**: Judul section dalam halaman dengan border bawah.  
**Props**: `title` (string), `className` (optional)  
**Contoh Penggunaan**:
```jsx
<SectionTitle title="📊 Penjualan per Kategori" />
```

---

#### 4. **SearchBar**
**File**: `src/components/SearchBar.jsx`  
**Fungsi**: Input field untuk search/filter dengan icon FaSearch dan ref support.  
**Props**: `placeholder`, `value`, `onChange`, `onKeyDown`, `className`, `ref` (forwardRef)  
**Features**:
- Auto-focus support via ref
- Keyboard event handling
- Consistent styling
**Contoh Penggunaan**:
```jsx
const searchRef = useRef(null);
<SearchBar 
  ref={searchRef}
  placeholder="Cari nama pelanggan..."
  value={searchTerm}
  onChange={(val) => setSearchTerm(val)}
/>
```

---

### 🎯 Interactive Components

#### 5. **Button**
**File**: `src/components/Button.jsx`  
**Fungsi**: Reusable button component dengan multiple style variants.  
**Props**: `children`, `type` (primary|secondary|success|danger|warning|outline), `onClick`, `disabled`, `className`  
**Variants**:
- `primary`: Blue background (default)
- `secondary`: Gray background
- `success`: Green background
- `danger`: Red background
- `warning`: Yellow background
- `outline`: Border only
**Contoh Penggunaan**:
```jsx
<Button type="primary" onClick={handleSave}>
  Simpan
</Button>
<Button type="danger" onClick={handleDelete}>
  Hapus
</Button>
```

---

#### 6. **InputField**
**File**: `src/components/InputField.jsx`  
**Fungsi**: Input field dengan label, error handling, dan required indicator.  
**Props**: `label`, `name`, `type` (text|email|password|number), `value`, `onChange`, `placeholder`, `required`, `error`  
**Contoh Penggunaan**:
```jsx
<InputField
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

---

#### 7. **Modal**
**File**: `src/components/Modal.jsx`  
**Fungsi**: Dialog modal dengan backdrop, title, dan action buttons.  
**Props**: `isOpen` (boolean), `onClose`, `title` (string), `children`, `onConfirm` (optional), `confirmText`, `cancelText`  
**Contoh Penggunaan**:
```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Edit Pelanggan"
  onConfirm={handleSave}
  confirmText="Simpan"
>
  <InputField label="Nama" value={name} onChange={...} />
</Modal>
```

---

### 🏷️ Badge & Status Components

#### 8. **Badge**
**File**: `src/components/Badge.jsx`  
**Fungsi**: Small label component untuk status, kategori, atau tag.  
**Props**: `children` (string), `type` (primary|success|danger|warning|gray)  
**Variants**:
- `primary`: Blue background
- `success`: Green background
- `danger`: Red background
- `warning`: Yellow background
- `gray`: Gray background (default)
**Contoh Penggunaan**:
```jsx
<Badge type="success">Aktif</Badge>
<Badge type="danger">Tidak Aktif</Badge>
```

---

#### 9. **StockBadge**
**File**: `src/components/StockBadge.jsx`  
**Fungsi**: Badge khusus untuk menampilkan status stok produk (Habis, Menipis, Aman).  
**Props**: `stock` (number), `minStock` (number, default: 5)  
**Logic**:
- Stock ≤ 0: Badge merah "Habis"
- Stock ≤ minStock: Badge kuning "Menipis"
- Stock > minStock: Badge hijau "Aman"
**Contoh Penggunaan**:
```jsx
<StockBadge stock={product.stock} minStock={10} />
```

---

#### 10. **TransactionBadge**
**File**: `src/components/TransactionBadge.jsx`  
**Fungsi**: Badge untuk status transaksi (Diterima, Diproses, Siap Diambil, Selesai).  
**Props**: `status` (string)  
**Status Mapping**:
- `diterima`: Badge biru "Diterima"
- `diproses`: Badge kuning "Diproses"
- `siap_diambil`: Badge hijau "Siap Diambil"
- `selesai`: Badge abu "Selesai"
**Contoh Penggunaan**:
```jsx
<TransactionBadge status={transaction.status} />
```

---

#### 11. **LoyaltyBadge**
**File**: `src/components/LoyaltyBadge.jsx`  
**Fungsi**: Badge untuk membership level dengan progress bar ke level berikutnya.  
**Props**: `level` (reguler|silver|gold), `points` (number)  
**Features**:
- Tampilkan tier badge dengan emoji (🥉 Reguler, 🥈 Silver, 🥇 Gold)
- Progress bar untuk menunjukkan progress ke tier berikutnya
- Display poin pelanggan
**Contoh Penggunaan**:
```jsx
<LoyaltyBadge level={customer.memberLevel} points={customer.points} />
```

---

### 👤 Display Components

#### 12. **Avatar**
**File**: `src/components/Avatar.jsx`  
**Fungsi**: Avatar circular component untuk menampilkan inisial atau gambar user.  
**Props**: `name` (string), `size` (sm|md|lg, default: md), `imageUrl` (optional)  
**Features**:
- Tampilkan inisial nama jika no image
- Support multiple size: sm (8x8), md (10x10), lg (12x12)
- Auto-crop image dengan object-cover
**Contoh Penggunaan**:
```jsx
<Avatar name="Budi Santoso" size="md" />
<Avatar name="Aisyah" size="lg" imageUrl={imageUrl} />
```

---

#### 13. **PriceDisplay**
**File**: `src/components/PriceDisplay.jsx`  
**Fungsi**: Format dan display harga dalam format Rupiah IDR.  
**Props**: `amount` (number), `className` (optional)  
**Features**:
- Format otomatis ke Rupiah (Rp X.XXX.XXX)
- Support custom className untuk styling
- No decimal places
**Contoh Penggunaan**:
```jsx
<PriceDisplay amount={250000} className="text-xl font-bold text-blue-600" />
// Menampilkan: Rp 250.000
```

---

#### 14. **LoadingSpinner**
**File**: `src/components/LoadingSpinner.jsx`  
**Fungsi**: Animated loading spinner untuk menampilkan loading state.  
**Props**: None  
**Contoh Penggunaan**:
```jsx
{loading ? <LoadingSpinner /> : <Content />}
```

---

### 📊 Data Display Components

#### 15. **StatCard**
**File**: `src/components/StatCard.jsx`  
**Fungsi**: Card untuk menampilkan KPI dengan title, value, icon, dan trend.  
**Props**: `title`, `value`, `icon` (React component), `color` (blue|green|yellow|red|purple), `trend` (up|down), `trendValue`  
**Contoh Penggunaan**:
```jsx
<StatCard 
  title="Total Revenue" 
  value="Rp 125.000.000" 
  icon={FaDollarSign}
  color="blue"
  trend="up"
  trendValue="12.5%"
/>
```

---

#### 16. **TransactionCard**
**File**: `src/components/TransactionCard.jsx`  
**Fungsi**: Card untuk menampilkan satu transaksi dengan channel icon, total, dan action button.  
**Props**: `transaction` (object), `onViewDetail` (function)  
**Features**:
- Display channel source dengan icon (WhatsApp, Offline, Shopee)
- Show customer name dan total harga
- Status badge
- "Lihat Detail" button
**Contoh Penggunaan**:
```jsx
<TransactionCard 
  transaction={transaction}
  onViewDetail={(tx) => navigate(`/tracking/${tx.id}`)}
/>
```

---

#### 17. **FeedbackCard**
**File**: `src/components/FeedbackCard.jsx`  
**Fungsi**: Card untuk menampilkan feedback dari pelanggan.  
**Props**: `feedback` (object), `onResolve` (function)  
**Features**:
- Display customer name, rating (star), dan message
- Show admin response jika ada
- Status badge (Menunggu, Diproses, Selesai)
- "Tindak Lanjuti" button jika belum resolved
**Contoh Penggunaan**:
```jsx
<FeedbackCard 
  feedback={feedback}
  onResolve={(id) => handleResolve(id)}
/>
```

---

#### 18. **CustomerCard**
**File**: `src/components/CustomerCard.jsx`  
**Fungsi**: Card untuk menampilkan ringkasan data customer.  
**Props**: `customer` (object)  
**Features**:
- Avatar dengan inisial
- Customer name dan ID
- Contact info (phone, WhatsApp)
- LoyaltyBadge dengan poin
- Total spending
**Contoh Penggunaan**:
```jsx
<CustomerCard customer={customer} />
```

---

#### 19. **PreOrderCard**
**File**: `src/components/PreOrderCard.jsx`  
**Fungsi**: Card untuk menampilkan pre-order dengan status dan action.  
**Props**: `preOrder` (object), `onNotify` (function)  
**Features**:
- Status icon dan badge
- Product name, customer, phone, request date
- Estimate date
- Notify button jika status waiting_stock
**Contoh Penggunaan**:
```jsx
<PreOrderCard 
  preOrder={preOrder}
  onNotify={(po) => sendNotification(po.id)}
/>
```

---

### 📋 Table & List Components

#### 20. **CustomerTable**
**File**: `src/components/CustomerTable.jsx`  
**Fungsi**: Table untuk menampilkan list customers dengan action buttons.  
**Props**: `customers` (array), `onDelete` (function)  
**Columns**: Nama, WhatsApp, Kategori, Level, Status, Total Belanja, Aksi  
**Actions**: WhatsApp button, View, Edit, Delete  
**Contoh Penggunaan**:
```jsx
<CustomerTable 
  customers={customers}
  onDelete={(id) => deleteCustomer(id)}
/>
```

---

#### 21. **ProductRow**
**File**: `src/components/ProductRow.jsx`  
**Fungsi**: Single table row untuk product dalam product list/table.  
**Props**: `product` (object), `onEdit` (function), `onDelete` (function)  
**Columns**: Name, Price, Stock, Min Stock, Status, Actions  
**Contoh Penggunaan**:
```jsx
<table>
  <tbody>
    {products.map(p => (
      <ProductRow key={p.id} product={p} onEdit={...} onDelete={...} />
    ))}
  </tbody>
</table>
```

---

#### 22. **StockAlert**
**File**: `src/components/StockAlert.jsx`  
**Fungsi**: Alert section untuk menampilkan daftar produk dengan stok rendah.  
**Props**: `products` (array)  
**Features**:
- Filter produk dengan stock < minStock
- Show "Semua stok aman" jika tidak ada low stock
- Display untuk setiap produk low stock dengan "Pesan Ulang" button
**Contoh Penggunaan**:
```jsx
<StockAlert products={products} />
```

---

#### 23. **SegmentFilter**
**File**: `src/components/SegmentFilter.jsx`  
**Fungsi**: Button group filter untuk memilih customer segment/kategori.  
**Props**: `selected` (string), `onChange` (function), `segments` (array, optional)  
**Default Segments**: Semua, Orang Tua Murid, Santri, Mahasiswa/Umum  
**Contoh Penggunaan**:
```jsx
<SegmentFilter 
  selected={selectedSegment}
  onChange={(seg) => setSelectedSegment(seg)}
/>
```

---

### 🎨 Layout Components

#### 24. **Header**
**File**: `src/components/Header.jsx`  
**Fungsi**: Top navigation bar dengan search, notifications, dan user profile.  
**Props**: `toggleSidebar` (function)  
**Features**:
- Sidebar toggle button
- Search input
- Message & notification icons
- User profile avatar
- Logout button
**Contoh Penggunaan**:
```jsx
<Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
```

---

#### 25. **Sidebar**
**File**: `src/components/Sidebar.jsx`  
**Fungsi**: Left navigation menu dengan logo dan menu items.  
**Props**: `isAdmin` (boolean)  
**Features**:
- Brand logo (Cendekia)
- Main menu items (Dashboard, Customers, Transactions, Stock, etc.)
- Admin-only menu (Users) jika isAdmin=true
- Active link highlighting
**Contoh Penggunaan**:
```jsx
<Sidebar isAdmin={isAdmin} />
```

---

### 🔔 Specialized Components

#### 26. **NotificationBell**
**File**: `src/components/NotificationBell.jsx`  
**Fungsi**: Bell icon dengan dropdown list notifikasi.  
**Props**: `notifications` (array), `onMarkAsRead` (function)  
**Features**:
- Unread count badge
- Dropdown list dengan max-height scroll
- Click to mark as read
**Contoh Penggunaan**:
```jsx
<NotificationBell 
  notifications={notifications}
  onMarkAsRead={(id) => markRead(id)}
/>
```

---

#### 27. **WhatsAppButton**
**File**: `src/components/WhatsAppButton.jsx`  
**Fungsi**: Button untuk direct chat via WhatsApp dengan pre-filled message.  
**Props**: `phoneNumber` (string), `customerName` (string), `message` (optional)  
**Features**:
- Auto-format phone number (0xxx → 62xxx)
- Pre-filled message default: "Halo {name}, ada info menarik nih dari Toko Buku Cendekia! 📚"
- Open wa.me URL in new tab
**Contoh Penggunaan**:
```jsx
<WhatsAppButton 
  phoneNumber="081234567890" 
  customerName="Budi"
  message="Produk yang kamu pre-order sudah tersedia!"
/>
```

---

#### 28. **OrderTimeline**
**File**: `src/components/OrderTimeline.jsx`  
**Fungsi**: Visual timeline untuk tracking status pengiriman pesanan.  
**Props**: `trackingHistory` (array of objects), `currentStatus` (string)  
**Features**:
- Display 4 steps: Diterima → Diproses → Siap Diambil → Selesai
- Color-coded steps: completed (green), current (blue), pending (gray)
- Show timestamp untuk setiap step yang completed
- Icon untuk setiap step
**Contoh Penggunaan**:
```jsx
<OrderTimeline 
  trackingHistory={transaction.trackingHistory}
  currentStatus={transaction.status}
/>
```

---

---

## 🎁 SHADCN/UI COMPONENTS (5)

Komponen UI dari shadcn/ui library yang sudah diinstall dan dikonfigurasi dalam project.

---

#### 1. **Accordion**
**File**: `src/components/ui/accordion.jsx`  
**Fungsi**: Expandable/collapsible section component.  
**Import**: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";`  
**Contoh Penggunaan**:
```jsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Apakah ada diskon?</AccordionTrigger>
    <AccordionContent>
      Iya, ada berbagai promo menarik setiap bulannya.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```
**Used In**: PreOrderPage, ReportsPage, StockPage

---

#### 2. **Tabs**
**File**: `src/components/ui/tabs.jsx`  
**Fungsi**: Tab navigation component.  
**Import**: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";`  
**Contoh Penggunaan**:
```jsx
<Tabs value={selectedTab} onValueChange={setSelectedTab}>
  <TabsList>
    <TabsTrigger value="all">Semua</TabsTrigger>
    <TabsTrigger value="pending">Menunggu</TabsTrigger>
    <TabsTrigger value="completed">Selesai</TabsTrigger>
  </TabsList>
  <TabsContent value="all">
    {/* Content untuk tab all */}
  </TabsContent>
</Tabs>
```
**Used In**: TransactionsPage, SegmentationPage

---

#### 3. **AlertDialog**
**File**: `src/components/ui/alert-dialog.jsx`  
**Fungsi**: Modal dialog untuk confirmation dengan backdrop.  
**Import**: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";`  
**Contoh Penggunaan**:
```jsx
<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Yakin hapus?</AlertDialogTitle>
      <AlertDialogDescription>
        Tindakan ini tidak bisa dibatalkan.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirm}>
        Hapus
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
**Used In**: CustomersPage, TransactionsPage, StockPage

---

#### 4. **Button (shadcn)**
**File**: `src/components/ui/button.jsx`  
**Fungsi**: Base button component dari shadcn/ui (alternative to custom Button).  
**Note**: Project ini punya custom Button component sendiri, shadcn button ini bisa untuk future use.

---

#### 5. **Input (shadcn)**
**File**: `src/components/ui/input.jsx`  
**Fungsi**: Base input component dari shadcn/ui (alternative to custom InputField).  
**Note**: Project ini punya custom InputField component sendiri, shadcn input ini bisa untuk future use.

---

---

## 📊 COMPONENT HIERARCHY & USAGE

```
App
├── AuthLayout
│   ├── Login
│   ├── Register
│   └── Forgot
│
├── MainLayout
│   ├── Header
│   │   └── NotificationBell
│   ├── Sidebar
│   └── Main Content
│       ├── Container
│       ├── PageHeader
│       ├── SectionTitle
│       ├── StatCard
│       ├── SearchBar
│       ├── Button (multiple variants)
│       ├── Badge (StockBadge, TransactionBadge, LoyaltyBadge)
│       ├── Modal / AlertDialog
│       ├── InputField
│       ├── TransactionCard / FeedbackCard / CustomerCard
│       ├── CustomerTable / ProductRow / StockAlert
│       ├── Tabs / Accordion
│       ├── OrderTimeline
│       ├── PriceDisplay
│       ├── Avatar
│       └── WhatsAppButton
│
└── LandingPage (No Layout)
```

---

## 🎯 COMPONENT USAGE CHEAT SHEET

| Fungsi | Component | File |
|--------|-----------|------|
| Wrapper Halaman | Container | components/Container.jsx |
| Judul Halaman | PageHeader | components/PageHeader.jsx |
| Judul Section | SectionTitle | components/SectionTitle.jsx |
| Search/Filter | SearchBar | components/SearchBar.jsx |
| Button | Button | components/Button.jsx |
| Form Input | InputField | components/InputField.jsx |
| Dialog/Form Modal | Modal | components/Modal.jsx |
| Confirmation Dialog | AlertDialog (shadcn) | components/ui/alert-dialog.jsx |
| Status Label | Badge, StockBadge, TransactionBadge, LoyaltyBadge | components/Badge*.jsx |
| Avatar User | Avatar | components/Avatar.jsx |
| Harga Format | PriceDisplay | components/PriceDisplay.jsx |
| Loading | LoadingSpinner | components/LoadingSpinner.jsx |
| KPI Card | StatCard | components/StatCard.jsx |
| Transaction Info | TransactionCard | components/TransactionCard.jsx |
| Feedback Info | FeedbackCard | components/FeedbackCard.jsx |
| Customer Info | CustomerCard | components/CustomerCard.jsx |
| Pre-order Info | PreOrderCard | components/PreOrderCard.jsx |
| Customer List | CustomerTable | components/CustomerTable.jsx |
| Product Row | ProductRow | components/ProductRow.jsx |
| Low Stock Warning | StockAlert | components/StockAlert.jsx |
| Segment Filter | SegmentFilter | components/SegmentFilter.jsx |
| Top Navigation | Header | components/Header.jsx |
| Left Navigation | Sidebar | components/Sidebar.jsx |
| Notifications | NotificationBell | components/NotificationBell.jsx |
| WhatsApp Chat | WhatsAppButton | components/WhatsAppButton.jsx |
| Order Tracking | OrderTimeline | components/OrderTimeline.jsx |
| Tab Navigation | Tabs (shadcn) | components/ui/tabs.jsx |
| Collapsible Sections | Accordion (shadcn) | components/ui/accordion.jsx |

---

## 💡 DESIGN SYSTEM & PATTERNS

### Styling Approach
- **Tailwind CSS**: Semua component menggunakan Tailwind utility classes
- **Color System**: Blue (#1E5EFF) sebagai primary, gray/red/yellow/green sebagai secondary
- **Spacing**: Consistent padding (p-3, p-4, p-6) dan margin (mb-2, mb-4, mb-6)
- **Shadows**: shadow-sm untuk subtle, shadow-md untuk card elevation

### Component Props Pattern
- **Optional Props**: Kebanyakan component punya default values (size="md", type="primary")
- **Callbacks**: onClick, onChange, onDelete, onViewDetail untuk interactivity
- **Styling**: className prop untuk customization jika diperlukan
- **Ref Support**: SearchBar punya forwardRef support untuk auto-focus

### Reusability
- **Composable**: Komponen dirancang bisa combine (misalnya TransactionCard + Badge + PriceDisplay)
- **Flexible**: Support multiple variants, sizes, colors
- **Consistent**: Styling dan behavior konsisten across project

---

**Total Components: 33** (28 custom + 5 shadcn/ui)
