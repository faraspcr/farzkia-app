# 📦 QUICK REFERENCE - SEMUA KOMPONEN

## **28 CUSTOM COMPONENTS + 5 SHADCN/UI = 33 TOTAL**

---

## 🎯 CUSTOM COMPONENTS (28)

### **Utility (4)**
1. **Container** - Wrapper dengan max-width & padding
2. **PageHeader** - Judul halaman dengan description
3. **SectionTitle** - Judul section dengan border
4. **SearchBar** - Input search dengan icon & ref support

### **Interactive (3)**
5. **Button** - 6 variants (primary, secondary, success, danger, warning, outline)
6. **InputField** - Form input dengan label, error, required indicator
7. **Modal** - Dialog dengan backdrop & action buttons

### **Badges (4)**
8. **Badge** - Generic badge (5 types: primary, success, danger, warning, gray)
9. **StockBadge** - Stock status (Habis, Menipis, Aman)
10. **TransactionBadge** - Transaction status (Diterima, Diproses, Siap Diambil, Selesai)
11. **LoyaltyBadge** - Member level dengan progress bar (Reguler/Silver/Gold)

### **Display (3)**
12. **Avatar** - User avatar dengan inisial/image (sizes: sm, md, lg)
13. **PriceDisplay** - Format Rupiah otomatis
14. **LoadingSpinner** - Animated loading indicator

### **Cards & Lists (6)**
15. **StatCard** - KPI card dengan trend & icon
16. **TransactionCard** - Card transaksi dengan channel icon
17. **FeedbackCard** - Card feedback dengan rating & response
18. **CustomerCard** - Card customer ringkas
19. **PreOrderCard** - Card pre-order dengan status & notify button
20. **CustomerTable** - Table list customers dengan actions
21. **ProductRow** - Single product row dalam table
22. **StockAlert** - Alert section produk low stock

### **Layout (2)**
24. **Header** - Top navigation bar
25. **Sidebar** - Left navigation menu dengan admin-only items

### **Specialized (4)**
26. **SegmentFilter** - Button group untuk filter kategori
27. **NotificationBell** - Bell icon dengan dropdown notifikasi
28. **WhatsAppButton** - Direct chat button ke WhatsApp
29. **OrderTimeline** - Visual timeline tracking pesanan

---

## 🎁 SHADCN/UI COMPONENTS (5)

| No | Component | Fungsi |
|----|-----------|--------|
| 1 | **Accordion** | Expandable/collapsible sections |
| 2 | **Tabs** | Tab navigation |
| 3 | **AlertDialog** | Confirmation modal |
| 4 | Button (shadcn) | Base button (alternative) |
| 5 | Input (shadcn) | Base input (alternative) |

---

## 📍 MANA COMPONENT INI DIGUNAKAN?

### Landing Page
- Container, SectionTitle, Button, Badge, Avatar

### Dashboard
- Container, PageHeader, StatCard, SectionTitle, Button, LoadingSpinner

### Customers Page
- Container, PageHeader, SearchBar, CustomerTable, Badge, Modal, InputField, AlertDialog, Avatar

### Customer Detail
- Container, PageHeader, Button, Badge, Avatar, PriceDisplay, Modal, InputField

### Transactions
- Container, PageHeader, SearchBar, Tabs, Badge, PriceDisplay, TransactionCard, TransactionBadge, AlertDialog, Button

### Stock
- Container, PageHeader, SearchBar, Accordion, Badge, StockBadge, AlertDialog, Button

### Pre-Order
- Container, PageHeader, Accordion, Button, Badge, WhatsAppButton, PreOrderCard

### Loyalty
- Container, PageHeader, SectionTitle, LoyaltyBadge

### Segmentation
- Container, PageHeader, Tabs, SectionTitle, CustomerTable, Charts

### Feedback
- Container, PageHeader, StatCard, FeedbackCard, Button

### Tracking
- Container, PageHeader, OrderTimeline, PriceDisplay, TransactionBadge

### Reports
- Container, PageHeader, SectionTitle, Button, Accordion, PriceDisplay, Charts

### Omnichannel
- Container, PageHeader, SectionTitle, Badge

### Users (Admin)
- Form inputs, Table, Button, Modal

### Auth Pages (Login/Register/Forgot)
- InputField, Button, Modal state management

---

## 💡 COMPONENT PROP QUICK LOOKUP

```jsx
// Button variants
<Button type="primary|secondary|success|danger|warning|outline" />

// Badge types
<Badge type="primary|success|danger|warning|gray" />

// Avatar sizes
<Avatar size="sm|md|lg" />

// StatCard color
<StatCard color="blue|green|yellow|red|purple" />

// LoyaltyBadge levels
<LoyaltyBadge level="reguler|silver|gold" />

// SearchBar (with ref)
const ref = useRef();
<SearchBar ref={ref} />
ref.current?.focus();

// Modal
<Modal isOpen={open} onClose={handleClose} onConfirm={handleConfirm} />

// Accordion (shadcn)
<Accordion type="single|multiple" collapsible={true|false} />

// Tabs (shadcn)
<Tabs value={selected} onValueChange={setSelected} />

// AlertDialog (shadcn)
<AlertDialog open={open} onOpenChange={setOpen} />
```

---

## 🎨 COLOR & VARIANT MAPPING

| Component | Variants |
|-----------|----------|
| Button | primary (blue), secondary (gray), success (green), danger (red), warning (yellow), outline |
| Badge | primary (blue), success (green), danger (red), warning (yellow), gray |
| StatCard | blue, green, yellow, red, purple |
| StockBadge | Habis (red), Menipis (yellow), Aman (green) |
| TransactionBadge | Diterima (blue), Diproses (yellow), Siap Diambil (green), Selesai (gray) |
| LoyaltyBadge | Reguler (🥉 gray), Silver (🥈 gray), Gold (🥇 yellow) |

---

## 📊 COMPONENT DEPENDENCY TREE

```
Container
├── PageHeader
├── SearchBar
├── Button
├── Badge (+ StockBadge, TransactionBadge, LoyaltyBadge)
├── InputField
├── Modal
│   └── Button + InputField
├── StatCard
├── Avatar
├── PriceDisplay
├── LoadingSpinner
├── Header
│   └── NotificationBell
├── Sidebar
├── TransactionCard
│   ├── PriceDisplay
│   ├── TransactionBadge
│   └── Button
├── FeedbackCard
├── CustomerCard
│   └── LoyaltyBadge
├── PreOrderCard
├── CustomerTable
├── ProductRow
├── StockAlert
├── SegmentFilter
├── OrderTimeline
├── WhatsAppButton
├── SectionTitle
│
└── Shadcn/ui
    ├── Accordion
    ├── Tabs
    ├── AlertDialog
    ├── Button (alternative)
    └── Input (alternative)
```

---

## ⚡ IMPORT QUICK COPY

```jsx
// Layout
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';

// Interactive
import Button from '../components/Button';
import InputField from '../components/InputField';
import Modal from '../components/Modal';

// Display
import Avatar from '../components/Avatar';
import PriceDisplay from '../components/PriceDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

// Cards
import StatCard from '../components/StatCard';
import TransactionCard from '../components/TransactionCard';
import FeedbackCard from '../components/FeedbackCard';
import CustomerCard from '../components/CustomerCard';

// Badges
import Badge from '../components/Badge';
import StockBadge from '../components/StockBadge';
import TransactionBadge from '../components/TransactionBadge';
import LoyaltyBadge from '../components/LoyaltyBadge';

// Tables & Lists
import CustomerTable from '../components/CustomerTable';
import StockAlert from '../components/StockAlert';

// Layout
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// Specialized
import WhatsAppButton from '../components/WhatsAppButton';
import OrderTimeline from '../components/OrderTimeline';
import SegmentFilter from '../components/SegmentFilter';
import NotificationBell from '../components/NotificationBell';

// Shadcn/ui
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
```

---

**Created**: 2 Juli 2026  
**Last Updated**: Analisis Lengkap Semua Komponen
