import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import gambarKiri from './assets/kiri butuh.png';

export default function LoginPage({ onLogin }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data); // Tambahkan ini untuk melihat response
  
      if (response.ok) {
        // alert('Login berhasil');
        if (onLogin) {
          onLogin(); // Panggil fungsi dari prop
        }
  
        // Perulangan untuk memastikan redirect berhasil
        let loginSuccess = true; // Flag untuk status login
        let redirectCount = 0; // Hitungan percobaan redirect
  
        while (loginSuccess && redirectCount < 3) { // Batasi perulangan maksimal 3 kali
          try {
            window.location.href = '/DashboardUser'; // Halaman dashboard
            break; // Hentikan perulangan jika redirect berhasil
          } catch (err) {
            console.error('Redirect gagal, mencoba lagi...', err);
            redirectCount++;
          }
        }
      } else {
        alert(data.message || 'Login gagal, silakan coba lagi');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan, silakan coba lagi');
    }
  };
  return (
    <div className="flex h-screen">
      {/* Bagian Kiri */}
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
            {/* <img src="./assets/kiri butuh.png" alt="Gambar Orang" className="w-400 h-400 object-cover object-center " /> */}
          </div>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="flex-1 flex items-center justify-center">
        {showForgotPassword ? (
          <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Lupa Password</h2>
            <p className="mb-4">
              Masukkan email Anda, kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
            </p>
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mb-4 border border-[#242277]"
            />
            <button
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              onClick={() => setShowForgotPassword(false)}
            >
              Kirim Tautan Reset
            </button>
          </div>
        ) : (
          <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-[#242277]">Selamat Datang</h2>
            <p className="mb-4 text-[#242277]">Selamat datang mohon masukkan identitas anda</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242277] mb-4 border border-[#242277]"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242277] mb-4 border border-[#242277]"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#242277]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              className="w-full py-2 px-4 bg-[#242277] hover:bg-indigo-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242277] mb-4"
              onClick={handleLogin}
            >
              Masuk
            </button>
            <a
              href="#"
              className="text-[#242277] hover:text-indigo-500 block text-center"
              onClick={() => setShowForgotPassword(true)}
            >
              Lupa Password?
            </a>
            <p className="text-center mt-4 text-[#242277]">
              Belum punya akun?{' '}
              <a href="/register" className="text-[#242277] hover:text-indigo-500">
                Daftar
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
