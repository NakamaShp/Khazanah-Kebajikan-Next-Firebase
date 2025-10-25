import type { NextApiRequest, NextApiResponse } from "next";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Santri } from "@/types/Santri";

type ApiResponse = {
  success: boolean;
  id?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });

  try {
    const {
      namaLengkap,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamatLengkap,
      namaAyah,
      namaIbu,
      noHpOrtu,
      asalSekolah,
      fotoSantriBase64,
    } = req.body as Santri & { fotoSantriBase64: string };

    if (!namaLengkap || !fotoSantriBase64)
      return res
        .status(400)
        .json({ success: false, message: "Data tidak lengkap" });

    // Upload foto ke Firebase Storage
    const fileName = `${namaLengkap.replace(/\s+/g, "_")}_${Date.now()}.jpg`;
    const storageRef = ref(storage, `santri_foto/${fileName}`);
    const buffer = Buffer.from(fotoSantriBase64, "base64");
    await uploadBytes(storageRef, buffer, { contentType: "image/jpeg" });
    const downloadURL = await getDownloadURL(storageRef);

    // Simpan ke Firestore
    const docRef = await addDoc(collection(db, "pendaftaran_santri"), {
      namaLengkap,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamatLengkap,
      namaAyah,
      namaIbu,
      noHpOrtu,
      asalSekolah,
      fotoSantri: downloadURL,
      createdAt: serverTimestamp(),
    });

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (err: unknown) {
    console.error("🔥 Error pendaftaran santri:", err);

    const message =
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan yang tidak diketahui";

    return res.status(500).json({ success: false, message });
  }
}
