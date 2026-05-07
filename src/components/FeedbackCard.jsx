export default function FeedbackCard({ feedback, onResolve }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2"><span className="font-medium">{feedback.customerName}</span></div>
        <div className="text-yellow-500 text-sm">{'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}</div>
      </div>
      <p className="text-gray-700 text-sm mt-2">{feedback.message}</p>
      {feedback.adminResponse && <p className="text-blue-600 text-xs mt-2 bg-blue-50 p-2 rounded">📌 Respon: {feedback.adminResponse}</p>}
      <div className="flex justify-between items-center mt-3">
        <span className={`text-xs px-2 py-1 rounded-full ${feedback.status === 'resolved' ? 'bg-green-100 text-green-800' : feedback.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
          {feedback.status === 'resolved' ? 'Selesai' : feedback.status === 'in_progress' ? 'Diproses' : 'Menunggu'}
        </span>
        {feedback.status !== 'resolved' && <button onClick={() => onResolve(feedback.id)} className="text-blue-600 text-sm hover:underline">Tindak Lanjuti</button>}
      </div>
    </div>
  );
}