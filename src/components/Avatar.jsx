// src/components/Avatar.jsx
export default function Avatar({ name, size = "md", imageUrl = null }) {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  const getInitials = () => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 overflow-hidden`}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        getInitials()
      )}
    </div>
  );
}