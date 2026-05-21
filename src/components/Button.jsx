// src/components/Button.jsx
export default function Button({ 
  children, 
  type = "primary", 
  onClick, 
  disabled = false,
  className = ""
}) {
  const types = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${types[type]} px-4 py-2 rounded-lg text-sm font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}