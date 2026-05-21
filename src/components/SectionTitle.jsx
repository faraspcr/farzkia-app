// src/components/SectionTitle.jsx
export default function SectionTitle({ title, className = "" }) {
  return (
    <h2 className={`text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 ${className}`}>
      {title}
    </h2>
  );
}