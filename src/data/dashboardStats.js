import { getCustomers } from './customers';
import { getTransactions } from './transactions';
import { getProducts } from './products';

export const getDashboardStats = () => {
  const customers = getCustomers();
  const transactions = getTransactions();
  const products = getProducts();
  
  // Total revenue
  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
  
  // Penjualan per kategori
  const salesByCategory = {};
  transactions.forEach(t => {
    t.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const category = product.category;
        if (!salesByCategory[category]) {
          salesByCategory[category] = { revenue: 0, quantity: 0 };
        }
        salesByCategory[category].revenue += item.subtotal;
        salesByCategory[category].quantity += item.quantity;
      }
    });
  });
  
  // Top 5 produk terlaris
  const productSales = {};
  transactions.forEach(t => {
    t.items.forEach(item => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = { name: item.productName, quantity: 0, revenue: 0 };
      }
      productSales[item.productId].quantity += item.quantity;
      productSales[item.productId].revenue += item.subtotal;
    });
  });
  
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
  
  // Gold member
  const goldMembers = customers.filter(c => c.memberLevel === 'gold').length;
  
  return {
    totalRevenue,
    totalTransactions: transactions.length,
    totalCustomers: customers.length,
    goldMembers,
    salesByCategory,
    topProducts
  };
};