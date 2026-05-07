export default function SegmentFilter({ selected, onChange, segments }) {
  const defaultSegments = [
    { value: 'all', label: 'Semua', icon: '👥' },
    { value: 'ortu_murid', label: 'Orang Tua Murid', icon: '👨‍👩‍👧' },
    { value: 'santri', label: 'Santri', icon: '🕌' },
    { value: 'mahasiswa_umum', label: 'Mahasiswa/Umum', icon: '🎓' }
  ];
  const items = segments || defaultSegments;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(seg => (
        <button key={seg.value} onClick={() => onChange(seg.value)} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${selected === seg.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          <span>{seg.icon}</span><span>{seg.label}</span>
        </button>
      ))}
    </div>
  );
}