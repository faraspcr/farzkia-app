// src/components/Modal.jsx
import Button from './Button';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ isOpen, onClose, title, children, onConfirm, confirmText = "Konfirmasi", cancelText = "Batal" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        </div>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex justify-end space-x-3">
          <Button type="secondary" onClick={onClose}>{cancelText}</Button>
          {onConfirm && (
            <Button type="primary" onClick={onConfirm}>{confirmText}</Button>
          )}
        </div>
      </div>
    </div>
  );
}