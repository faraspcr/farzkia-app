export default function InputField({ label, type, name, value, onChange, placeholder }) {
    return (
        <div className="mb-5 text-left">
            <label className="block text-teal-400 font-bold mb-2 text-sm uppercase tracking-wide">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-4 border-2 border-slate-700 rounded-2xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/30 transition-all bg-slate-900/60 text-white placeholder:text-slate-500 font-medium text-base"
            />
        </div>
    );
}