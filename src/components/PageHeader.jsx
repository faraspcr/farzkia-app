// src/components/PageHeader.jsx
export default function PageHeader({ title, description, children }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}