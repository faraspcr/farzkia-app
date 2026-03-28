export default function BiodataDiri() {
    return (
        <div>
            <h1>Pemrograman Framework Lanjutan</h1>
            <p className="slogan-1">Selamat Belajar ReactJS</p>
            <Greating />
            
            {/* Garis pemisah */}
            <hr className="section-divider" />
            
            <h2>📋 BIODATA SAYA</h2>
            
            {/* Layout 2 kolom: Foto persegi di kiri, Biodata di kanan */}
            <div className="biodata-container">
                <FotoProfile />
                <InfoBiodata />
            </div>
            
            {/* Quote */}
            <QuoteText />
        </div>
    );
}

function Greating() {
    return (
        <div>
            <p className="slogan-2"><strong>Semoga Belajar ReactJS Menyenangkan</strong></p>
        </div>
    );
}

function FotoProfile() {
    return (
        <div className="foto-profile">
            <div className="foto-persegi">
                <img 
                    src="/fotofaras.png" 
                    alt="Foto Profil Faras Zakia Indrani"
                />
            </div>
        </div>
    );
}

function InfoBiodata() {
    return (
        <div className="info-biodata">
            <p><strong>Nama</strong> : Faras Zakia Indrani</p>
            <p><strong>NIM</strong> : 2457301048</p>
            <p><strong>Tanggal Lahir</strong> : 18 May 2006</p>
            <p><strong>Alamat</strong> : Pekanbaru, Riau</p>
            <p><strong>Hobi</strong> : Baking</p>
            <p><strong>Program Studi</strong> : Sistem Informasi</p>
            <p><strong>Kampus</strong> : Politeknik Caltex Riau</p>
            <p><strong>Email</strong> : faras24si@mahasiswa.pcr.ac.id</p>
        </div>
    );
}

function QuoteText() {
    const text = "Baking is like coding - both need patience, precision, and creativity to create something beautiful and functional.";
    const text2 = "- Faras Zakia -";

    return (
        <div className="quote">
            <p className="quote-text">"{text}"</p>
            <p className="quote-author">{text2}</p>
        </div>
    );
}