import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, Calendar } from 'lucide-react';
import gambarKiri from './assets/kiri butuh.png';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State untuk form data
  const [formData, setFormData] = useState({
    nama: '',
    role: '',
    // gender: '',
    // tanggalLahir: '',
    // keahlian: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk mengirim data ke API register
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (formData.password !== formData.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registrasi berhasil!');
        window.location.href = '/'; // Redirect ke halaman login
      } else {
        alert(data.message || 'Terjadi kesalahan saat registrasi');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan, silakan coba lagi');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form Section */}
      <div className="md:w-1/2 flex flex-col justify-center p-8 bg-white">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-900">Mendaftar</h2>
            <p className="mt-2 text-sm text-gray-500">Daftar untuk menikmati fitur TravelAble</p>
          </div>

          {/* Register Form */}
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Nama Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  <option value="">Pilih Role</option>
                  <option value="pengguna">Pengguna</option>
                  <option value="pemandu">Pemandu</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Conditional Fields for Pemandu */}
            {formData.role === 'pemandu' && (
              <>
                {/* Gender Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                  >
                    <option value="">Pilih Gender</option>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>

                {/* Tanggal Lahir Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Keahlian Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keahlian</label>
                  <textarea
                    name="keahlian"
                    value={formData.keahlian}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Anda"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Mendaftar
            </button>

            {/* Login Link */}
            <div className="text-sm text-center">
              <span className="text-gray-500">Sudah punya akun? </span>
              <a href="/" className="text-indigo-600 hover:text-indigo-500">
                Masuk
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="bg-[#242277] flex-1 flex items-center justify-center min-h-screen relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-300 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center w-[500px] h-[500px]">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg p-6">
            <h2 className="text-white text-2xl font-bold mt-4">Mulailah perjalanan Anda dengan TravelAble!</h2>
            <img src={gambarKiri} alt="Gambar Orang" className="w-96 h-96 object-cover object-center" />
          </div>
        </div>
      </div>
    </div>
  );
}