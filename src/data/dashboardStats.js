import { getCustomers } from './customers';
import { getTransactions } from './transactions';
import { getProducts } from './products';
import { getFeedbacks } from './feedbacks';

export const getDashboardStats = () => {
  const customers = getCustomers();
  const transactions = getTransactions();
  const products = getProducts();
  const feedbacks = getFeedbacks();

  // Total revenue
  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
  
  // Total orders
  const totalOrders = transactions.length;
  
  // Total customers
  const totalCustomers = customers.length;
  
  // Total products
  const totalProducts = products.length;

  // Feedback stats
  const feedbackStats = {
    total: feedbacks.length,
    averageRating: (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length || 0).toFixed(1),
    resolved: feedbacks.filter(f => f.status === 'resolved').length
  };

  // Stok menipis (stock < minStock)
  const lowStockProducts = products.filter(p => p.stock < p.minStock).map(p => ({
    id: p.id,
    name: p.name,
    stock: p.stock,
    minStock: p.minStock
  }));

  // Feedback terbaru (5 terbaru)
  const recentFeedbacks = [...feedbacks]
    .reverse()
    .slice(0, 5)
    .map(f => ({
      id: f.id,
      customerName: f.customerName,
      rating: f.rating,
      message: f.message,
      status: f.status
    }));

  // Top 5 Pelanggan (berdasarkan total spent)
  const topCustomers = [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)
    .map(c => ({
      id: c.id,
      name: c.name,
      totalSpent: c.totalSpent,
      memberLevel: c.memberLevel
    }));

  // Recent Transactions (5 terbaru)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(t => ({
      id: t.id,
      name: `Customer ${t.customerId}`,
      date: new Date(t.date).toLocaleDateString('id-ID'),
      amount: t.total,
      status: t.status === 'completed' ? 'Paid' : 'Pending'
    }));

  // Top Products by units sold
  const productSales = {};
  transactions.forEach(t => {
    t.items.forEach(item => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = {
          name: item.productName,
          unitsSold: 0,
          price: item.price
        };
      }
      productSales[item.productId].unitsSold += item.quantity;
    });
  });
  
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5);

  // Data untuk chart (tampilan grafik)
  const chartData = {
    may21: [12, 19, 15, 25, 34, 42, 38, 45, 52, 48, 56, 62],
    may22: [8, 14, 12, 20, 28, 35, 32, 38, 44, 42, 48, 54],
    labels: ['4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm']
  };

  // Persentase perubahan (simulasi)
  const revenueChange = 22.45;
  const ordersChange = 15.34;
  const sessionsChange = -18.25;
  const totalSessionsChange = -10.24;

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    feedbackStats,
    lowStockProducts,
    recentFeedbacks,
    topCustomers,
    recentTransactions,
    topProducts,
    chartData,
    revenueChange,
    ordersChange,
    sessionsChange,
    totalSessionsChange
  };
};