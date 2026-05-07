import { FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';

export default function OrderTimeline({ trackingHistory, currentStatus }) {
  const steps = [
    { key: 'pesanan_diterima', label: 'Diterima', icon: FaClock },
    { key: 'sedang_diproses', label: 'Diproses', icon: FaSpinner },
    { key: 'siap_diambil', label: 'Siap Diambil', icon: FaCheckCircle },
    { key: 'selesai', label: 'Selesai', icon: FaCheckCircle }
  ];

  const getStepStatus = (stepKey) => {
    if (trackingHistory?.find(h => h.status === stepKey)) return 'completed';
    if (currentStatus === stepKey) return 'current';
    return 'pending';
  };

  return (
    <div className="relative">
      <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200"></div>
      <div className="relative flex justify-between">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.key);
          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${status === 'completed' ? 'bg-green-500 text-white' : status === 'current' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                <step.icon />
              </div>
              <p className="text-xs mt-2 text-center">{step.label}</p>
              {trackingHistory?.find(h => h.status === step.key) && (
                <p className="text-xs text-gray-400 mt-1">{new Date(trackingHistory.find(h => h.status === step.key).timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}