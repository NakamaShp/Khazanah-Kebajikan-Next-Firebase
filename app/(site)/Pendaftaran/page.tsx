"use client";
import { useState } from "react";
import { Santri } from "@/types/Santri";

export default function PendaftaranForm() {
  const [form, setForm] = useState<Partial<Santri>>({});
  const [foto, setFoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFoto((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/pendaftaran", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, fotoSantriBase64: foto }),
    });

    const data = await res.json();
    alert(
      data.success ? "✅ Pendaftaran berhasil!" : `❌ Gagal: ${data.message}`
    );
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-3">
      <input
        name="namaLengkap"
        placeholder="Nama Lengkap"
        onChange={handleChange}
        required
      />
      <select name="jenisKelamin" onChange={handleChange} required>
        <option value="">Pilih Jenis Kelamin</option>
        <option value="Laki-laki">Santri</option>
        <option value="Perempuan">Santriwati</option>
      </select>
      <input
        name="tempatLahir"
        placeholder="Tempat Lahir"
        onChange={handleChange}
        required
      />
      <input type="date" name="tanggalLahir" onChange={handleChange} required />
      <input
        name="alamatLengkap"
        placeholder="Alamat Lengkap"
        onChange={handleChange}
        required
      />
      <input
        name="asalSekolah"
        placeholder="Asal Sekolah"
        onChange={handleChange}
        required
      />
      <input
        name="namaAyah"
        placeholder="Nama Ayah"
        onChange={handleChange}
        required
      />
      <input
        name="namaIbu"
        placeholder="Nama Ibu"
        onChange={handleChange}
        required
      />
      <input
        name="noHpOrtu"
        placeholder="Nomor HP Orang Tua"
        onChange={handleChange}
        required
      />
      <input type="file" accept="image/*" onChange={handleFile} required />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        {loading ? "Menyimpan..." : "Daftar"}
      </button>
    </form>
  );
}
