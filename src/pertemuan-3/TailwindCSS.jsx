import React from "react";

export default function TailwindCSS() {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-teal-950 text-slate-200 font-['Poppins',sans-serif] selection:bg-teal-500/40 min-h-screen overflow-hidden">
            <div className="relative overflow-hidden pt-24 pb-20 px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-teal-500/10 rounded-[50%] blur-[150px] pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-7xl md:text-9xl font-black tracking-[0.1em] uppercase bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(20,184,166,0.6)] mb-6 leading-none">
                        Master Mobile Dev
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-transparent mx-auto mb-8"></div>
                    <p className="text-teal-300/90 max-w-3xl font-bold uppercase tracking-[0.5em] text-sm md:text-base">
                        MOBILE DEVELOPMENT BOOTCAMP 2025
                    </p>
                   
                    <div className="mt-12 flex flex-wrap justify-center gap-6">
                        <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black px-12 py-6 rounded-3xl font-black shadow-[0_0_40px_rgba(20,184,166,0.5)] transition-all duration-300 active:scale-95 uppercase tracking-[0.3em] text-lg border-4 border-teal-400/50">
                            DAFTAR SEKARANG
                        </button>
                        <button className="border-4 border-teal-500/40 hover:bg-teal-500/10 backdrop-blur-xl text-teal-300 px-12 py-6 rounded-3xl font-black transition-all duration-300 uppercase tracking-[0.3em] text-lg hover:text-teal-200 hover:border-teal-400/80 shadow-xl">
                            LIHAT PROGRAM
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                    <FeatureCard
                        title="FLUTTER"
                        desc="Kuasai framework Google untuk membangun aplikasi Android & iOS dengan satu kode."
                        icon="📱"
                    />
                    <FeatureCard
                        title="REACT NATIVE"
                        desc="Framework Meta untuk mobile development dengan teknologi React yang powerfull."
                        icon="⚛️"
                    />
                    <FeatureCard
                        title="KOTLIN & SWIFT"
                        desc="Belajar native development untuk Android dan iOS secara profesional."
                        icon="🍎"
                    />
                </div>

                {/* QUOTE SECTION */}
                <div className="mt-32 text-center py-20 bg-gradient-to-b from-transparent via-teal-500/3 to-transparent border-y-4 border-teal-500/20 rounded-3xl backdrop-blur-xl">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl mb-6">
                        "CODE YOUR FUTURE"
                    </h2>
                    <p className="text-teal-300/70 text-xl md:text-2xl font-bold italic tracking-wide uppercase">
                        Jadi mobile developer handal dalam 3 bulan
                    </p>
                </div>

                {/* FOOTER */}
                <footer className="mt-24">
                    <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-slate-900/80 to-black/50 backdrop-blur-3xl p-12 rounded-3xl border-4 border-teal-500/30 shadow-2xl shadow-teal-500/20">
                        <div className="mb-8 lg:mb-0 text-center lg:text-left">
                            <h1 className="text-4xl font-black uppercase bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent tracking-wider mb-3">
                                MOBILE DEV
                            </h1>
                            <p className="text-teal-400/80 text-sm font-bold uppercase tracking-[0.4em]">
                                BOOTCAMP 2025
                            </p>
                        </div>
                        <ul className="flex flex-wrap justify-center lg:justify-end space-x-8 lg:space-x-12">
                            {['PROGRAM', 'MENTOR', 'GALLERY', 'KONTAK'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-teal-400 font-black text-lg uppercase tracking-[0.3em] transition-all duration-300 hover:scale-110 group">
                                        {item}
                                        <span className="block h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}

function FeatureCard({ title, desc, icon }) {
    return (
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-black/30 border-4 border-teal-500/30 p-12 rounded-3xl hover:border-teal-400/70 hover:bg-teal-500/5 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_40px_rgba(20,184,166,0.3)] backdrop-blur-xl hover:-translate-y-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <div className="text-5xl mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500">{icon}</div>
            
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                {title}
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-base md:text-lg font-medium">
                {desc}
            </p>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
}