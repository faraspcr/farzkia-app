import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaExclamationTriangle, FaStar, FaTrophy } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardStats } from '../data/dashboardStats';
import { formatRupiah } from '../data/formatters';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = () => {
      const data = getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Judul Dashboard */}
      <h1 className="text-4xl font-bold text-[#131523]">Dashboard</h1>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
          <p className="text-[#7E84A3] text-sm mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-[#131523]">{formatRupiah(stats?.totalRevenue || 0)}</p>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowUp className="text-green-500 text-xs" />
            <span className="text-green-500 text-sm font-medium">{stats?.revenueChange}%</span>
            <span className="text-[#A1A7C4] text-xs ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
          <p className="text-[#7E84A3] text-sm mb-1">Orders</p>
          <p className="text-2xl font-bold text-[#131523]">{stats?.totalOrders || 0}</p>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowUp className="text-green-500 text-xs" />
            <span className="text-green-500 text-sm font-medium">{stats?.ordersChange}%</span>
            <span className="text-[#A1A7C4] text-xs ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
          <p className="text-[#7E84A3] text-sm mb-1">Active Sessions</p>
          <p className="text-2xl font-bold text-[#131523]">48</p>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowDown className="text-red-500 text-xs" />
            <span className="text-red-500 text-sm font-medium">18.25%</span>
            <span className="text-[#A1A7C4] text-xs ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
          <p className="text-[#7E84A3] text-sm mb-1">Total Sessions</p>
          <p className="text-2xl font-bold text-[#131523]">5,420</p>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowDown className="text-red-500 text-xs" />
            <span className="text-red-500 text-sm font-medium">10.24%</span>
            <span className="text-[#A1A7C4] text-xs ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* ORDERS OVER TIME + STOCK & RATING (2 kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Over Time Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#131523]">Orders Over Time</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#1E5EFF] rounded-full"></div>
                <span className="text-[#7E84A3]">May 21</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#D7DBEC] rounded-full"></div>
                <span className="text-[#7E84A3]">May 22</span>
              </div>
            </div>
          </div>

          <div className="flex gap-8 mb-6">
            <div>
              <p className="text-2xl font-bold text-[#131523]">645</p>
              <p className="text-xs text-[#7E84A3]">Orders on May 22</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#131523]">472</p>
              <p className="text-xs text-[#7E84A3]">Orders on May 21</p>
            </div>
          </div>

          <div className="relative h-48 mt-4">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-[#A1A7C4] py-2">
              <span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
            </div>
            <div className="ml-8 h-full flex items-end gap-1">
              {stats?.chartData?.labels.map((label, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="relative w-full flex justify-center gap-0.5">
                    <div className="w-3 bg-[#1E5EFF] rounded-t" style={{ height: `${(stats.chartData.may21[idx] / 62) * 120}px` }}></div>
                    <div className="w-3 bg-[#D7DBEC] rounded-t" style={{ height: `${(stats.chartData.may22[idx] / 62) * 120}px` }}></div>
                  </div>
                  <span className="text-xs text-[#A1A7C4] rotate-45 origin-left translate-y-3">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom kanan: Stok Menipis + Rating & Feedback */}
        <div className="space-y-6">
          {/* Stok Menipis */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
            <h3 className="font-semibold text-[#131523] mb-4 flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-500" />
              Stok Menipis
            </h3>
            <div className="space-y-3">
              {stats?.lowStockProducts?.map((product, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-[#D7DBEC] last:border-0">
                  <div>
                    <p className="text-[#131523] font-medium">{product.name}</p>
                    <p className="text-xs text-[#7E84A3]">Sisa: {product.stock}</p>
                  </div>
                  <button className="text-xs bg-[#1E5EFF] text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition">
                    Pesan Ulang
                  </button>
                </div>
              ))}
              {stats?.lowStockProducts?.length === 0 && (
                <p className="text-[#7E84A3] text-sm text-center py-4">Semua stok aman ✅</p>
              )}
            </div>
          </div>

          {/* Rating & Feedback */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
            <h3 className="font-semibold text-[#131523] mb-4 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Rating & Feedback
            </h3>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{stats?.feedbackStats?.averageRating || 0}</p>
                <p className="text-xs text-[#7E84A3]">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#131523]">{stats?.feedbackStats?.total || 0}</p>
                <p className="text-xs text-[#7E84A3]">Feedback</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{stats?.feedbackStats?.resolved || 0}</p>
                <p className="text-xs text-[#7E84A3]">Selesai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT TRANSACTIONS + TOP 5 PELANGGAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
          <h3 className="font-semibold text-[#131523] mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#D7DBEC]">
                  <th className="text-left py-3 text-[#7E84A3] font-medium">Name</th>
                  <th className="text-left py-3 text-[#7E84A3] font-medium">Date</th>
                  <th className="text-left py-3 text-[#7E84A3] font-medium">Amount</th>
                  <th className="text-left py-3 text-[#7E84A3] font-medium">Status</th>
                 </tr>
              </thead>
              <tbody>
                {stats?.recentTransactions?.map((t, idx) => (
                  <tr key={idx} className="border-b border-[#D7DBEC] last:border-0">
                    <td className="py-3 text-[#131523]">{t.name}</td>
                    <td className="py-3 text-[#5A607F]">{t.date}</td>
                    <td className="py-3 font-medium text-[#131523]">{formatRupiah(t.amount)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        t.status === 'Paid' ? 'bg-[#DAF9EC] text-[#06A561]' : 'bg-[#FFF9E1] text-[#F99600]'
                      }`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 5 Pelanggan */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
          <h3 className="font-semibold text-[#131523] mb-4 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" />
            Top 5 Pelanggan
          </h3>
          <div className="space-y-2">
            {stats?.topCustomers?.map((c, idx) => (
              <div key={c.id} className="flex justify-between items-center p-3 bg-[#F5F6FA] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#A1A7C4] w-6">{idx + 1}.</span>
                  <div>
                    <p className="font-medium text-[#131523]">{c.name}</p>
                    <p className="text-xs text-[#7E84A3]">{c.memberLevel}</p>
                  </div>
                </div>
                <p className="font-semibold text-[#1E5EFF]">{formatRupiah(c.totalSpent)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEEDBACK TERBARU */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-[#D7DBEC]">
        <h3 className="font-semibold text-[#131523] mb-4">📝 Feedback Terbaru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats?.recentFeedbacks?.map((f, idx) => (
            <div key={f.id} className="p-3 bg-[#F5F6FA] rounded-lg">
              <div className="flex justify-between items-start">
                <p className="font-medium text-[#131523]">{f.customerName}</p>
                <div className="text-yellow-500 text-sm">
                  {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}
                </div>
              </div>
              <p className="text-sm text-[#5A607F] mt-1">{f.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}