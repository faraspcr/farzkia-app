import { useState } from "react";
import collectionsData from "./collections.json";
import LunarLoomGuest from "./LunarLoomGuest";
import LunarLoomAdmin from "./LunarLoomAdmin";

export default function LunarLoomApp() {
    const [view, setView] = useState("guest");
    // Best Practice: menggunakan satu state object untuk filter
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        fabricType: ""
    });

    // Handle change untuk semua input (general)
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    // Logic Filter & Search
    const filteredData = collectionsData.filter((item) => {
        const matchesSearch = 
            item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            item.designer.name.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesCategory = filters.category ? item.category === filters.category : true;

        const matchesFabric = filters.fabricType ? item.material.fabric_type === filters.fabricType : true;
        
        return matchesSearch && matchesCategory && matchesFabric;
    });

    // Get unique values untuk filter options
    const uniqueCategories = [...new Set(collectionsData.map(item => item.category))];
    const uniqueFabrics = [...new Set(collectionsData.map(item => item.material.fabric_type))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 md:p-12 font-sans">
            {/* Container */}
            <div className="max-w-7xl mx-auto">
                
                {/* Header - Responsive */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            LUNAR<span className="text-gray-800">LOOM</span>
                        </h1>
                        <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mt-3">
                            Indonesian Local Boutique
                        </p>
                    </div>
                    
                    {/* Toggle Guest/Admin - Responsive */}
                    <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-purple-100">
                        <button 
                            onClick={() => setView("guest")} 
                            className={`px-8 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                                view === 'guest' 
                                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' 
                                    : 'text-gray-500 hover:bg-purple-50'
                            }`}
                        >
                            Guest View
                        </button>
                        <button 
                            onClick={() => setView("admin")} 
                            className={`px-8 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                                view === 'admin' 
                                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' 
                                    : 'text-gray-500 hover:bg-purple-50'
                            }`}
                        >
                            Admin View
                        </button>
                    </div>
                </div>

                {/* Filter Tools - Responsive Grid */}
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-lg mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                                name="search" 
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search product or designer..." 
                                className="w-full p-4 pl-11 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 border border-transparent bg-white shadow-sm"
                            />
                        </div>
                        
                        {/* Filter Category */}
                        <select 
                            name="category" 
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="bg-white p-4 rounded-2xl outline-none border border-transparent shadow-sm focus:ring-2 focus:ring-purple-200 text-gray-600"
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        
                        {/* Filter Fabric Type */}
                        <select 
                            name="fabricType" 
                            value={filters.fabricType}
                            onChange={handleFilterChange}
                            className="bg-white p-4 rounded-2xl outline-none border border-transparent shadow-sm focus:ring-2 focus:ring-purple-200 text-gray-600"
                        >
                            <option value="">All Fabrics</option>
                            {uniqueFabrics.map(fabric => (
                                <option key={fabric} value={fabric}>{fabric}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Result Count */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-500">
                            Found <span className="font-bold text-purple-600">{filteredData.length}</span> collections
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                {filteredData.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-gray-400 text-lg">No collections found</p>
                        <p className="text-sm text-gray-300">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    view === "guest" 
                        ? <LunarLoomGuest data={filteredData} /> 
                        : <LunarLoomAdmin data={filteredData} />
                )}
            </div>
        </div>
    );
}