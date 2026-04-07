import React from "react";

export default function TailwindCSS() {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-black to-amber-900/20 text-slate-200 font-['Impact',sans-serif] selection:bg-amber-500/40 min-h-screen overflow-hidden">
            {/* OASIS HERO SECTION */}
            <div className="relative overflow-hidden pt-24 pb-20 px-6">
                {/* Oasis Background Ornaments */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-amber-500/10 rounded-[50%] blur-[150px] pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-7xl md:text-9xl font-black tracking-[0.1em] uppercase bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] mb-6 leading-none">
                        OASIS
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto mb-8"></div>
                    <p className="text-amber-300/90 max-w-3xl font-bold uppercase tracking-[0.5em] text-sm md:text-base letter-spacing-2">
                        DEFINITELY MAYBE | MANCHESTER REVIVAL TOUR 2025
                    </p>
                   
                    <div className="mt-12 flex flex-wrap justify-center gap-6">
                        <button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black px-12 py-6 rounded-3xl font-black shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300 active:scale-95 uppercase tracking-[0.3em] text-lg border-4 border-amber-400/50 hover:shadow-[0_0_50px_rgba(251,191,36,0.4)]">
                            GRAB TICKETS NOW
                        </button>
                        <button className="border-4 border-amber-500/40 hover:bg-amber-500/10 backdrop-blur-xl text-amber-300 px-12 py-6 rounded-3xl font-black transition-all duration-300 uppercase tracking-[0.3em] text-lg hover:text-amber-200 hover:border-amber-400/80 shadow-xl">
                            TOUR DATES
                        </button>
                    </div>
                </div>
            </div>

            {/* OASIS FEATURES GRID */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                    <FeatureCard
                        title="LEGENDARY VENUE"
                        desc="Heaton Park reborn with 80.000 capacity for the ultimate Oasis experience."
                        icon="🎸"
                    />
                    <FeatureCard
                        title="NOEL & LIAM"
                        desc="Brothers reunited on stage delivering Wonderwall, Don't Look Back in Anger live."
                        icon="🔥"
                    />
                    <FeatureCard
                        title="VIP SUPERCITY"
                        desc="Exclusive pit access, meet & greet, and premium sound experience."
                        icon="⭐"
                    />
                </div>

                {/* OASIS QUOTE SECTION */}
                <div className="mt-32 text-center py-20 bg-gradient-to-b from-transparent via-amber-500/3 to-transparent border-y-4 border-amber-500/20 rounded-3xl backdrop-blur-xl">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl mb-6">
                        "DON'T LOOK BACK IN ANGER"
                    </h2>
                    <p className="text-amber-300/70 text-xl md:text-2xl font-bold italic tracking-wide uppercase letter-spacing-1">
                        The greatest comeback in rock history
                    </p>
                </div>

                {/* OASIS FOOTER */}
                <footer className="mt-24">
                    <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-slate-900/80 to-black/50 backdrop-blur-3xl p-12 rounded-3xl border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                        <div className="mb-8 lg:mb-0 text-center lg:text-left">
                            <h1 className="text-4xl font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent tracking-wider mb-3">
                                OASIS.MCR
                            </h1>
                            <p className="text-amber-400/80 text-sm font-bold uppercase tracking-[0.4em] letter-spacing-1">
                                OFFICIAL TICKETING | 2025 REVIVAL
                            </p>
                        </div>
                        <ul className="flex flex-wrap justify-center lg:justify-end space-x-8 lg:space-x-12">
                            {['LIVE', 'TICKETS', 'MERCH', 'CONTACT'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-amber-400 font-black text-lg uppercase tracking-[0.3em] transition-all duration-300 hover:scale-110 hover:drop-shadow-lg letter-spacing-1 group">
                                        {item}
                                        <span className="block h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></span>
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

// OASIS FeatureCard dengan efek brutal
function FeatureCard({ title, desc, icon }) {
    return (
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-black/30 border-4 border-amber-500/30 p-12 rounded-3xl hover:border-amber-400/70 hover:bg-amber-500/5 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_40px_rgba(251,191,36,0.3)] backdrop-blur-xl hover:-translate-y-4">
            {/* Oasis Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-1/2"></div>
            
            <div className="text-5xl mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 filter drop-shadow-lg">{icon}</div>
            
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-6 group-hover:scale-105 transition-all duration-300 letter-spacing-1">
                {title}
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-base md:text-lg font-bold tracking-wide opacity-80 group-hover:text-slate-100 group-hover:opacity-100 transition-all duration-300">
                {desc}
            </p>
            
            {/* Bottom glow line */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-0 group-hover:scale-x-100"></div>
        </div>
    );
}