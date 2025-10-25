export interface Santri {
  namaLengkap: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  tempatLahir: string;
  tanggalLahir: string;
  alamatLengkap: string;
  namaAyah: string;
  namaIbu: string;
  noHpOrtu: string;
  asalSekolah: string;
  fotoSantri: string;
  createdAt?: string;
}
