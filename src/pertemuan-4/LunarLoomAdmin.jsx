export default function LunarLoomAdmin({ data }) {
    // Function to render stars
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<span key={i} className="text-yellow-400 text-xs">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300 text-xs">★</span>);
            }
        }
        return stars;
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                        <tr className="text-purple-600 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold">Product</th>
                            <th className="p-4 font-semibold">Designer (Nested)</th>
                            <th className="p-4 font-semibold">Material (Nested)</th>
                            <th className="p-4 font-semibold">Size Availability</th>
                            <th className="p-4 font-semibold">Rating</th>
                            <th className="p-4 font-semibold">Stock</th>
                            <th className="p-4 font-semibold">Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={new URL(`../assets/${item.image}`, import.meta.url).href}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-xl object-cover border border-purple-100"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/100x100/7c3aed/ffffff?text=LL";
                                            }}
                                        />
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm leading-none mb-1">{item.name}</p>
                                            <p className="text-[10px] text-purple-500 font-medium">{item.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="text-sm font-medium text-gray-700">{item.designer.name}</p>
                                    <p className="text-[10px] text-gray-400">{item.designer.city}</p>
                                    <p className="text-[9px] text-purple-400">{item.designer.experience_years} years exp</p>
                                </td>
                                <td className="p-4">
                                    <div>
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            item.material.fabric_type === 'Brokat' ? 'bg-amber-100 text-amber-700' :
                                            item.material.fabric_type === 'Silk' ? 'bg-pink-100 text-pink-700' :
                                            item.material.fabric_type === 'Satin' ? 'bg-blue-100 text-blue-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {item.material.fabric_type}
                                        </span>
                                        <p className="text-[10px] text-gray-500 mt-1">
                                            {item.material.is_premium ? '⭐ Premium' : 'Standard'} | {item.material.comfort_level}
                                        </p>
                                    </div>
                                 </td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-1">
                                        {item.size.s && <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">S</span>}
                                        {item.size.m && <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">M</span>}
                                        {item.size.l && <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">L</span>}
                                        {item.size.xl && <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">XL</span>}
                                    </div>
                                 </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-semibold">{item.rating}</span>
                                        <div className="flex">{renderStars(item.rating)}</div>
                                    </div>
                                 </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        item.stock < 5 ? 'bg-orange-100 text-orange-600' : 
                                        item.stock < 10 ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-green-100 text-green-600'
                                    }`}>
                                        {item.stock} pcs
                                    </span>
                                 </td>
                                <td className="p-4 font-bold text-purple-700 whitespace-nowrap">
                                    Rp {item.price.toLocaleString()}
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}