// src/pages/OmnichannelPage.jsx
import { useState, useEffect } from 'react';
import {
  FaWhatsapp,
  FaStore,
  FaShopify,
  FaBullhorn
} from 'react-icons/fa';

import LoadingSpinner from '../components/LoadingSpinner';
import { getTransactionStats } from '../data/transactions';

// IMPORT KOMPONEN YANG ADA (Card TIDAK diimport)
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import Badge from '../components/Badge';

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
    <Container>
      <PageHeader 
        title="Omnichannel" 
        description="Integrasi multi-channel untuk retensi pelanggan"
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Channel Cards - PAKAI DIV BIASA (CARD BAWAAN) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6 text-center hover:shadow-md transition"
              >
                <div
                  className={`w-16 h-16 ${ch.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <ch.icon className="text-2xl" />
                </div>
                <h3 className="font-bold text-lg text-[#131523]">
                  {ch.name}
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#1E5EFF]">
                  {ch.count}
                </p>
                <p className="text-sm text-[#7E84A3] mt-1">
                  Total Transaksi
                </p>
              </div>
            ))}
          </div>

          {/* Campaign Aktif */}
          <div className="bg-white rounded-xl shadow-sm border border-[#D7DBEC] p-6">
            <SectionTitle 
              title={
                <div className="flex items-center">
                  <FaBullhorn className="mr-2 text-[#F99600]" />
                  Campaign Aktif
                </div>
              } 
              className="border-0 p-0 m-0 mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns
                .filter((c) => c.status === 'active')
                .map((c) => (
                  <div
                    key={c.id}
                    className="border border-[#D7DBEC] rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-[#131523]">
                        {c.name}
                      </h4>
                      <Badge type="success">Aktif</Badge>
                    </div>
                    <p className="text-sm text-[#5A607F] mt-2">
                      {c.description}
                    </p>
                    <p className="text-xs text-[#7E84A3] mt-3">
                      Target: {c.target}
                    </p>
                    <p className="text-xs text-[#7E84A3]">
                      Diskon: {c.discount}%
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-[#A1A7C4] py-4">
            <p>Jl. Paus No.73, Pekanbaru</p>
            <p>© 2025 Toko Buku Cendekia</p>
          </div>
        </>
      )}
    </Container>
  );
}