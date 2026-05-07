import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

export default function NotificationBell({ notifications, onMarkAsRead }) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-gray-500 hover:text-blue-600">
        <FaBell size={18} />
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20">
          <div className="p-3 border-b font-semibold text-gray-700">Notifikasi</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? <p className="p-3 text-center text-gray-500 text-sm">Tidak ada notifikasi</p> :
              notifications.map(n => (<div key={n.id} className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`} onClick={() => onMarkAsRead(n.id)}><p className="text-sm font-medium">{n.title}</p><p className="text-xs text-gray-500">{n.message}</p></div>))}
          </div>
        </div>
      )}
    </div>
  );
}