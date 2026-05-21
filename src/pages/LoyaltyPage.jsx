// src/pages/LoyaltyPage.jsx
import { useState, useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import LoyaltyBadge from '../components/LoyaltyBadge';
import { getCustomers } from '../data/customers';

// IMPORT KOMPONEN YANG ADA (Card TIDAK diimport)
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';

export default function LoyaltyPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setLoading(true); 
    setCustomers([...getCustomers()].sort((a, b) => b.points - a.points)); 
    setLoading(false); 
  }, []);

  const levels = [
    { level: 'Reguler', icon: '🥉', min: 0, max: 99, benefits: 'Poin standar', color: 'bg-gray-100' },
    { level: 'Silver', icon: '🥈', min: 100, max: 299, benefits: 'Diskon 5% + Poin 1.5x', color: 'bg-gray-200' },
    { level: 'Gold', icon: '🥇', min: 300, max: 999, benefits: 'Diskon 10% + Poin 2x + Pre-order Prioritas', color: 'bg-yellow-50' }
  ];

  return (
    <Container>
      <PageHeader 
        title="Program Loyalitas" 
        description="Tingkatkan level untuk mendapatkan lebih banyak keuntungan"
      />
      
      {/* Level Cards - PAKAI DIV BIASA (bukan import Card) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {levels.map(l => (
          <div key={l.level} className={`${l.color} rounded-xl shadow-md p-6 text-center border border-gray-100`}>
            <div className="text-5xl mb-3">{l.icon}</div>
            <h3 className="font-bold text-xl mb-1">{l.level}</h3>
            <p className="text-sm text-gray-500">{l.min} - {l.max} poin</p>
            <p className="text-sm text-green-600 mt-3 font-medium">{l.benefits}</p>
          </div>
        ))}
      </div>
      
      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <SectionTitle 
          title={
            <div className="flex items-center">
              <FaTrophy className="text-yellow-500 mr-2" /> 
              Leaderboard Pelanggan
            </div>
          } 
          className="border-0 p-0 m-0 mb-4"
        />
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-3">
            {customers.slice(0, 10).map((c, idx) => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 text-center">
                    {idx === 0 && <span className="text-2xl">🥇</span>}
                    {idx === 1 && <span className="text-2xl">🥈</span>}
                    {idx === 2 && <span className="text-2xl">🥉</span>}
                    {idx > 2 && <span className="text-gray-400 font-bold">#{idx + 1}</span>}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{c.name}</p>
                    <LoyaltyBadge level={c.memberLevel} points={c.points} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{c.points.toLocaleString()} poin</p>
                  <p className="text-xs text-gray-500">Rp {c.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            ))}
            
            {customers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada data pelanggan</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}