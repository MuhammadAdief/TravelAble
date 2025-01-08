import React, { useState } from 'react';

const DashboardPengguna = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const destinations = [
    "Trans Studio Bandung",
    "Farm House Lembang",
    "Dusun Bambu Leisure Park",
    "Orchid Forest Cikole",
    "Saung Angklung Udjo",
    "Tangkuban Perahu",
    "Kawah Putih",
    "Ranca Upas",
    "Museum Geologi Bandung",
    "Alun-Alun Kota Bandung",
    "Gedung Sate",
    "Cihampelas Walk"
  ];

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Content */}
      <main className="px-8 py-6">
        {/* Welcome Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-600">Selamat datang di website kami</h2>
              <p className="text-gray-600 mt-2">Kelola jadwal Anda, pantau pesanan, dan berikan pengalaman terbaik untuk para pengguna disabilitas.</p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="./src/assets/Group 12460.png"
                alt="Welcome Image"
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Eksplor</button>
            </div>
          </div>
        </section>

        {/* Pelayanan Section */}
      <section className="px-8 py-16 bg-white">
        <h2 className="text-2xl font-bold text-orange-600">PELAYANAN</h2>
        <p className="text-gray-700 mt-2">Top pelayanan terbaik kami untuk anda</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600">Pemandu Disabilitas</h3>
            <p className="text-gray-700 mt-2">
              Pemandu yang akan menjaga penyandang disabilitas
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600">Rekomendasi Wisata</h3>
            <p className="text-gray-700 mt-2">
              Pengguna dapat melihat destinasi ramah disabilitas
            </p>
          </div>
        </div>
      </section>

        {/* Top Destinations */}
        <section className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top Destinasi</h3>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
              onClick={handlePrev}
            >
              &#8592;
            </button>
            <div className="overflow-hidden">
              <div className="grid grid-cols-3 gap-4">
                {destinations
                  .slice(currentSlide * ITEMS_PER_PAGE, currentSlide * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
                  .map((destinasi, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <img
                        src={`/images/destinasi-${(currentSlide * ITEMS_PER_PAGE + index + 1)}.jpg`}
                        alt={destinasi}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-800">{destinasi}</h4>
                        <p className="text-gray-600 mt-2">Kota Bandung</p>
                        <p className="text-indigo-600 font-semibold mt-2">Rp 20.000 - Rp 50.000</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
              onClick={handleNext}
            >
              &#8594;
            </button>
          </div>
        </section>

        {/* Guide Opportunity Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Mencoba Petualangan Baru sebagai Pemandu</h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="md:w-1/2">
              <img src="/images/guide-opportunity.jpg" alt="Guide Opportunity" className="rounded-lg shadow-md w-full" />
            </div>
            <div className="md:w-1/2">
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Kesempatan dalam meningkatkan tugas sesuai kebutuhan pelanggan.</li>
                <li>Peluang penghasilan yang kompetitif.</li>
                <li>Kenyamanan dalam manajemen pesanan melalui platform ini.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default DashboardPengguna;
