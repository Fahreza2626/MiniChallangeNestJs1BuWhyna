import { Injectable } from '@nestjs/common';
import { KasirItemDto } from './dto/soal-5.dto.js';

@Injectable()
export class AppService {

  getAge(age: number): string {
    return `Umur Anda adalah ${age} tahun`;
  }

  getBMI(weight: number, height: number): string {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return `Nilai BMI Anda: ${bmi.toFixed(2)}`;
  }

  // =========================
  // SOAL 1 - CEK BILANGAN
  // =========================

  checkBilangan(angka: number) {
    const jenis = angka % 2 === 0 ? 'genap' : 'ganjil';
    const kuadrat = angka * angka;
    const kelipatanLima = angka % 5 === 0;

    return {
      angka: angka,
      jenis: jenis,
      kuadrat: kuadrat,
      kelipatanLima: kelipatanLima,
    };
  }

  // =========================
  // SOAL 2 - KONVERSI SUHU
  // =========================

  konversiSuhu(nilai: number, dari: string, ke: string) {
    let celsius: number;

    // Ubah ke Celsius terlebih dahulu
    if (dari === 'celsius') {
      celsius = nilai;
    } else if (dari === 'fahrenheit') {
      celsius = (nilai - 32) * 5 / 9;
    } else {
      celsius = nilai - 273.15;
    }

    let hasil: number;

    if (ke === 'celsius') {
      hasil = celsius;
    } else if (ke === 'fahrenheit') {
      hasil = celsius * 9 / 5 + 32;
    } else {
      hasil = celsius + 273.15;
    }

    hasil = Math.round(hasil * 100) / 100;

    return {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil: hasil,
      satuanHasil: ke,
    };
  }

  // =========================
  // SOAL 3 - GENERATOR DERET
  // =========================

  generatorDeret(jenis: string, jumlah: number) {
    const data: number[] = [];
    let total = 0;

    for (let i = 1; i <= jumlah; i++) {
      let nilai: number;

      if (jenis === 'ganjil') {
        nilai = 2 * i - 1;
      } else if (jenis === 'genap') {
        nilai = 2 * i;
      } else {
        nilai = i * i;
      }

      data.push(nilai);
      total += nilai;
    }

    return {
      jenis: jenis,
      jumlah: jumlah,
      data: data,
      total: total,
    };
  }

// =========================
// SOAL 4 - NILAI RAPOR
// =========================

hitungNilaiRapor( 
  nama: string, 
  tugas: number[], 
  uts: number, 
  uas: number, 
) {
  
  const rataTugas =
    tugas.reduce((total, nilai) => total + nilai, 0) / tugas.length;

  const nilaiAkhir =
    (0.3 * rataTugas) + 
    (0.3 * uts) + 
    (0.4 * uas); 

  let predikat: string;

  if (nilaiAkhir >= 90) {
    predikat = 'A';

  } else if (nilaiAkhir >= 80) {
    predikat = 'B';

  } else if (nilaiAkhir >= 70) {
    predikat = 'C';

  } else {
    predikat = 'D';
  }

  const status = nilaiAkhir >= 75
    ? 'Lulus' // jika nilai minimal 75
    : 'Remedial'; // jika nilai kurang dari 75

  return {
    nama: nama.trim(), 
    rataTugas: Math.round(rataTugas * 100) / 100, 
    nilaiAkhir: Math.round(nilaiAkhir * 100) / 100, 
    predikat: predikat, // mengembalikan predikat
    status: status, 
  };
}

// =========================
// SOAL 5 - KASIR TOKO
// =========================

hitungKasir(
  member: string, 
  metode: string, 
  items: KasirItemDto[], 
) {

  const rincian: {
    nama: string;
    harga: number;
    qty: number;
    subtotal: number;
  }[] = [];

  let subtotal = 0;

  let totalItem = 0;

  for (const item of items) {

    const itemSubtotal = item.harga * item.qty;

    rincian.push({
      nama: item.nama, 
      harga: item.harga, 
      qty: item.qty, 
      subtotal: itemSubtotal, 
    });

    subtotal += itemSubtotal;

    totalItem += item.qty;
  }

  // DISKON MEMBER

  let diskonPersen = 0;

  if (member === 'silver') {
    diskonPersen = 5;

  } else if (member === 'gold') {
    diskonPersen = 10;
  }

  const diskon = subtotal * diskonPersen / 100;

  // BIAYA ADMIN

  let biayaAdmin = 0;

  if (metode === 'qris') {

    // menghitung biaya admin sebesar 1% setelah diskon
    biayaAdmin = (subtotal - diskon) * 1 / 100;
  }

  // TOTAL BAYAR

  const total = subtotal - diskon + biayaAdmin;

  return {
    member: member, 
    metode: metode, 
    rincian: rincian, 
    totalItem: totalItem, 
    subtotal: subtotal, 
    diskon: diskon, 
    biayaAdmin: biayaAdmin, 
    total: total, 
  };
}
}