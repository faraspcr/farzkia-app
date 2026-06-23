// src/components/SearchBar.jsx
import { forwardRef } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = forwardRef(({ 
  placeholder = "Cari nama atau nomor telepon...", 
  value, 
  onChange,
  className = "",
  onKeyDown,
  name = "search"
}, ref) => {
  return (
    <div className={`relative ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A7C4] text-sm" />
      <input
        ref={ref}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full pl-10 pr-4 py-2.5 border border-[#D7DBEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] focus:border-transparent text-[#131523] placeholder:text-[#A1A7C4] bg-white transition duration-200"
        autoComplete="off"
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;