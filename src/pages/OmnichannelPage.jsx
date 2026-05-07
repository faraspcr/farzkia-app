import { useState, useEffect } from 'react';
import {
  FaWhatsapp,
  FaStore,
  FaShopify,
  FaBullhorn,
  FaChartBar
} from 'react-icons/fa';

import LoadingSpinner from '../components/LoadingSpinner';
import { getTransactionStats } from '../data/transactions';

export default function OmnichannelPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(getTransactionStats());
    setLoading(false);
  }, []);

  const channels = [
    {
      name: 'Offline',
      icon: FaStore,
      color: 'bg-blue-100 text-blue-600',
      count: stats?.bySource?.offline || 0
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'bg-green-100 text-green-600',
      count: stats?.bySource?.whatsapp || 0
    },
    {
      name: 'Shopee',
      icon: FaShopify,
      color: 'bg-purple-100 text-purple-600',
      count: stats?.bySource?.shopee || 0
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: "Promo Awal Tahun Ajaran Baru",
      description: "Diskon 10% buku paket & alat tulis",
      target: "Orang Tua Murid",
      discount: 10,
      status: "active"
    },
    {
      id: 2,
      name: "Ramadhan Berkah",
      description: "Diskon 15% Al-Qur'an & kitab Islam",
      target: "Santri",
      discount: 15,
      status: "active"
    },
    {
      id: 3,
      name: "Welcome Back!",
      description: "Diskon 5% untuk pelanggan dormant",
      target: "Pelanggan Tidak Aktif",
      discount: 5,
      status: "upcoming"
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Omnichannel
        </h2>
        <p className="text-gray-600 mt-1">
          Integrasi multi-channel untuk retensi pelanggan
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
              >
                <div
                  className={`w-16 h-16 ${ch.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <ch.icon className="text-2xl" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">
                  {ch.name}
                </h3>
                <p className="text-3xl font-bold mt-2 text-gray-900">
                  {ch.count}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Total Transaksi
                </p>
              </div>
            ))}
          </div>

          {/* Campaign */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <FaBullhorn className="mr-2 text-pink-500" />
              Campaign Aktif
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns
                .filter((c) => c.status === 'active')
                .map((c) => (
                  <div
                    key={c.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800">
                        {c.name}
                      </h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Aktif
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {c.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                      Target: {c.target}
                    </p>
                    <p className="text-xs text-gray-500">
                      Diskon: {c.discount}%
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Strategy */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl shadow-md p-6 text-white">
            <div className="flex items-center gap-4">
              <FaChartBar className="text-4xl" />
              <div>
                <h3 className="font-bold text-xl">
                  Strategi Omnichannel Retensi
                </h3>
                <p className="text-blue-200 text-sm mt-1">
                  Acquisition → Retention → Expansion
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold text-lg">📱 Acquisition</p>
                <p className="text-sm text-blue-100 mt-2">
                  Pelanggan baru melalui WhatsApp dan Shopee
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold text-lg">💬 Retention</p>
                <p className="text-sm text-blue-100 mt-2">
                  Broadcast promo dan notifikasi berkala
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold text-lg">🚀 Expansion</p>
                <p className="text-sm text-blue-100 mt-2">
                  Win-back promo dan pre-order prioritas
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}