// src/data/cart.js
// Keranjang disimpan di localStorage per id_pelanggan, jadi tiap akun punya keranjang sendiri.
import { getCurrentCustomer } from './customerSession';

const cartKey = () => {
  const customer = getCurrentCustomer();
  return `cendekia_cart_${customer?.id_pelanggan || 'guest'}`;
};

export const getCart = () => {
  try {
    const raw = localStorage.getItem(cartKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(cartKey(), JSON.stringify(items));
  return items;
};

export const addToCart = (product, qty = 1) => {
  const items = getCart();
  const existing = items.find((i) => i.productId === product.id);
  let updated;
  if (existing) {
    updated = items.map((i) =>
      i.productId === product.id ? { ...i, qty: i.qty + qty } : i
    );
  } else {
    updated = [
      ...items,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        imageUrl: product.imageUrl || '',
      },
    ];
  }
  return saveCart(updated);
};

export const updateCartQty = (productId, qty) => {
  const items = getCart();
  if (qty <= 0) {
    return saveCart(items.filter((i) => i.productId !== productId));
  }
  return saveCart(items.map((i) => (i.productId === productId ? { ...i, qty } : i)));
};

export const removeFromCart = (productId) => {
  const items = getCart().filter((i) => i.productId !== productId);
  return saveCart(items);
};

export const clearCart = () => saveCart([]);

export const getCartTotal = (items = getCart()) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0);

export const getCartCount = (items = getCart()) =>
  items.reduce((sum, i) => sum + i.qty, 0);

// Diskon otomatis sesuai tier loyalty pelanggan (aturan sama seperti LoyaltyPage admin)
export const getTierDiscount = (levelMember) => {
  const map = {
    loyal: 0.15,        // setara "Platinum" di tampilan Loyalty
    mitra_cendekia: 0.15,
    pembaca_setia: 0.10, // setara "Gold"
    pembaca_baru: 0,     // setara "Silver"
  };
  return map[levelMember] ?? 0;
};
