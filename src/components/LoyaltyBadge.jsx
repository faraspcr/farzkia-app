export default function LoyaltyBadge({ level, points }) {
  const levels = {
    reguler: { name: 'Reguler', icon: '🥉', color: 'bg-gray-200 text-gray-800', minPoints: 0, maxPoints: 99 },
    silver: { name: 'Silver', icon: '🥈', color: 'bg-gray-300 text-gray-800', minPoints: 100, maxPoints: 299 },
    gold: { name: 'Gold', icon: '🥇', color: 'bg-yellow-500 text-white', minPoints: 300, maxPoints: 999 }
  };
  const currentLevel = levels[level] || levels.reguler;
  const nextLevel = level === 'reguler' ? levels.silver : level === 'silver' ? levels.gold : null;
  const progressToNext = nextLevel ? ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100;

  return (
    <div className="flex items-center space-x-3">
      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${currentLevel.color}`}>
        <span className="mr-1">{currentLevel.icon}</span>{currentLevel.name}
      </div>
      <div className="flex-1">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-yellow-500 rounded-full h-2 transition-all" style={{ width: `${Math.min(progressToNext, 100)}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{points} poin</p>
      </div>
    </div>
  );
}