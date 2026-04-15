export default function LunarLoomGuest({ data }) {
    // Function to render stars based on rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const stars = [];
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<span key={i} className="text-yellow-400">½</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">★</span>);
            }
        }
        return stars;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((item) => (
                <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-purple-50 group">
                    {/* Image Container */}
                    <div className="h-64 overflow-hidden relative bg-gradient-to-br from-purple-50 to-pink-50">
                        <img
                            src={new URL(`../assets/${item.image}`, import.meta.url).href}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/400x500/7c3aed/ffffff?text=LUNAR+LOOM";
                            }}
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-purple-600 shadow-sm">
                            {item.category}
                        </div>
                        {/* Premium Badge */}
                        {item.material.is_premium && (
                            <div className="absolute top-4 right-4 bg-amber-400/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold text-white shadow-sm">
                                PREMIUM
                            </div>
                        )}
                    </div>
                    
                    <div className="p-6">
                        {/* Designer & City */}
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold">
                                    {item.designer.name}
                                </p>
                                <p className="text-[9px] text-gray-400">
                                    {item.designer.city}
                                </p>
                            </div>
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-gray-700">{item.rating}</span>
                                <div className="flex text-xs">
                                    {renderStars(item.rating)}
                                </div>
                            </div>
                        </div>

                        {/* Product Name */}
                        <h3 className="text-lg font-serif font-bold text-gray-800 mt-1 mb-2 line-clamp-1">
                            {item.name}
                        </h3>

                        {/* Material Info */}
                        <div className="mb-4">
                            <div className="flex flex-wrap justify-between items-center">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Fabric</span>
                                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                    item.material.fabric_type === 'Brokat' ? 'bg-amber-100 text-amber-700' :
                                    item.material.fabric_type === 'Silk' ? 'bg-pink-100 text-pink-700' :
                                    item.material.fabric_type === 'Satin' ? 'bg-blue-100 text-blue-700' :
                                    'bg-green-100 text-green-700'
                                }`}>
                                    {item.material.fabric_type}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Comfort</span>
                                <span className="text-[11px] text-gray-600">{item.material.comfort_level}</span>
                            </div>
                        </div>

                        {/* Available Sizes */}
                        <div className="mb-4">
                            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Available Sizes:</p>
                            <div className="flex flex-wrap gap-1">
                                {item.size.s && <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">S</span>}
                                {item.size.m && <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">M</span>}
                                {item.size.l && <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">L</span>}
                                {item.size.xl && <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">XL</span>}
                                {!item.size.s && !item.size.m && !item.size.l && !item.size.xl && (
                                    <span className="text-[10px] text-red-400">Sold Out</span>
                                )}
                            </div>
                        </div>

                        {/* Price & Action */}
                        <div className="border-t border-purple-50 pt-4 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] text-gray-400 uppercase tracking-tighter">Price</p>
                                <p className="text-lg font-bold text-purple-700">
                                    Rp {item.price.toLocaleString()}
                                </p>
                            </div>
                            <button className="bg-purple-500 hover:bg-purple-600 text-white w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}