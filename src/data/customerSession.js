// src/data/customerSession.js
//
// Login sementara pakai "No Handphone + Tanggal Lahir" sebagai verifikasi,
// karena tabel `pelanggan` di Supabase belum ada kolom password/email.
// Kalau nanti mau upgrade ke Supabase Auth beneran (OTP WA / email+password),
// tinggal ganti isi loginCustomer() saja — bagian lain aplikasi tidak perlu berubah.
import axios from 'axios';

const API_URL = "https://ajzhvqiottyeodhhtyqb.supabase.co/rest/v1/pelanggan";
const API_KEY = "sb_publishable_g_qv9oZdohhB98Z33_AWuw_9cT4MS-E";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const SESSION_KEY = "cendekia_customer_session";

/**
 * Login pelanggan pakai No Handphone + Tanggal Lahir.
 * Mengembalikan { success, message, customer }
 */
export const loginCustomer = async (noHandphone, tglLahir) => {
  try {
    const phone = noHandphone.trim();
    const response = await axios.get(
      `${API_URL}?no_handphone=eq.${phone}&select=*`,
      { headers }
    );

    const found = response.data?.[0];
    if (!found) {
      return { success: false, message: "Nomor HP tidak terdaftar. Silakan daftar dulu." };
    }

    const inputDate = new Date(tglLahir).toISOString().split('T')[0];
    const storedDate = found.tgl_lahir ? new Date(found.tgl_lahir).toISOString().split('T')[0] : null;

    if (!storedDate || storedDate !== inputDate) {
      return { success: false, message: "Tanggal lahir tidak cocok dengan data kami." };
    }

    const session = { ...found, role: 'pelanggan', loggedInAt: new Date().toISOString() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem('user', JSON.stringify({ role: 'pelanggan', id: found.id_pelanggan, name: found.nama_pelanggan }));

    return { success: true, customer: session };
  } catch (err) {
    console.error("Gagal login pelanggan:", err);
    return { success: false, message: "Gagal menghubungi server. Coba lagi." };
  }
};

/**
 * Daftar pelanggan baru (self-registration).
 */
export const registerCustomer = async (formData) => {
  try {
    const existing = await axios.get(
      `${API_URL}?no_handphone=eq.${formData.no_handphone.trim()}&select=id_pelanggan`,
      { headers }
    );
    if (existing.data?.length > 0) {
      return { success: false, message: "Nomor HP ini sudah terdaftar. Silakan login." };
    }

    const countRes = await axios.get(`${API_URL}?select=id_pelanggan&order=id_pelanggan.desc&limit=1`, { headers });
    const last = countRes.data?.[0]?.id_pelanggan;
    const lastNum = last ? parseInt(last.replace('CEND-', ''), 10) : 0;
    const newId = `CEND-${String(lastNum + 1).padStart(3, '0')}`;

    const newCustomer = {
      id_pelanggan: newId,
      nama_pelanggan: formData.nama_pelanggan.trim(),
      no_handphone: formData.no_handphone.trim(),
      alamat: formData.alamat || null,
      tgl_lahir: formData.tgl_lahir || null,
      kategori_pelanggan: formData.kategori_pelanggan || 'mahasiswa_umum',
      preferensi_produk: formData.preferensi_produk || null,
      level_member: 'pembaca_baru',
      total_transaksi: 0,
      status_pelanggan: 'aktif',
      poin_loyalitas: 0,
      status_preorder: 'Tidak ada pre-order',
    };

    const res = await axios.post(API_URL, newCustomer, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    const created = res.data[0];

    const session = { ...created, role: 'pelanggan', loggedInAt: new Date().toISOString() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem('user', JSON.stringify({ role: 'pelanggan', id: created.id_pelanggan, name: created.nama_pelanggan }));

    return { success: true, customer: session };
  } catch (err) {
    console.error("Gagal daftar pelanggan:", err);
    return { success: false, message: "Gagal mendaftar. Coba lagi." };
  }
};

export const getCurrentCustomer = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const updateCurrentCustomer = async (updates) => {
  const current = getCurrentCustomer();
  if (!current) return { success: false, message: "Sesi tidak ditemukan, silakan login ulang." };

  try {
    const res = await axios.patch(
      `${API_URL}?id_pelanggan=eq.${current.id_pelanggan}`,
      updates,
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    const updated = res.data[0];
    const session = { ...updated, role: 'pelanggan', loggedInAt: current.loggedInAt };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, customer: session };
  } catch (err) {
    console.error("Gagal update profil:", err);
    return { success: false, message: "Gagal menyimpan perubahan profil." };
  }
};

export const logoutCustomer = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('user');
};

export const isCustomerLoggedIn = () => !!getCurrentCustomer();
