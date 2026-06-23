import axios from 'axios'

// ============================================
// KONFIGURASI SUPABASE (PROJECT BARU)
// ============================================
const API_URL = "https://ajzhvqiottyeodhhtyqb.supabase.co/rest/v1/users"
const API_KEY = "sb_publishable_g_qv9oZdohhB98Z33_AWuw_9cT4MS-E"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

export const usersAPI = {
  // GET - Ambil semua user
  async fetchUsers() {
    const response = await axios.get(API_URL, { headers })
    return response.data
  },

  // POST - Tambah user baru
  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers })
    return response.data
  },

  // PATCH - Update user
  async updateUser(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
    return response.data
  },

  // DELETE - Hapus user
  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    return response.data
  },

  // GET - Login (cari user berdasarkan email dan password)
  async loginUser(email, password) {
    const response = await axios.get(
      `${API_URL}?email=ilike.${email}&password=eq.${password}`,
      { headers }
    )
    return response.data
  },

  // GET - Cek email sudah terdaftar atau belum
  async checkEmail(email) {
    const response = await axios.get(
      `${API_URL}?email=ilike.${email}`,
      { headers }
    )
    return response.data
  }
}