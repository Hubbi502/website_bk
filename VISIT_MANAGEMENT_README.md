# 📅 Sistem Manajemen Kunjungan Murid ke Guru BK

## 🎯 Deskripsi
Sistem manajemen kunjungan ini memungkinkan murid untuk mengajukan jadwal kunjungan ke Guru BK (Bimbingan dan Konseling), dan Guru BK dapat mengelola, menyetujui, dan memberikan catatan untuk setiap kunjungan.

## ✨ Fitur Utama

### Untuk Murid (Halaman Schedule)
1. **Form Pengajuan Kunjungan**
   - Mengisi nama lengkap
   - Memilih kelas
   - Menambahkan email dan nomor telepon (opsional)
   - Memilih tanggal dan waktu kunjungan
   - Menjelaskan keperluan/tujuan kunjungan

2. **Melihat Status Kunjungan**
   - Pending: Menunggu persetujuan
   - Approved: Telah disetujui
   - Completed: Kunjungan telah selesai
   - Cancelled: Ditolak/dibatalkan

3. **Informasi Guru BK**
   - Melihat daftar guru BK yang tersedia
   - Melihat spesialisasi masing-masing guru
   - Melihat jadwal ketersediaan guru

### Untuk Guru BK (Dashboard)
1. **Manajemen Kunjungan**
   - Melihat semua data kunjungan murid
   - Menyetujui atau menolak pengajuan kunjungan
   - Menandai kunjungan sebagai selesai
   - Melihat detail lengkap setiap kunjungan

2. **Detail Kunjungan**
   - Informasi lengkap murid (nama, kelas, kontak)
   - Tanggal dan waktu kunjungan
   - Keperluan kunjungan
   - Menambahkan catatan untuk setiap kunjungan

3. **Statistik Dashboard**
   - Total kunjungan pending
   - Kunjungan hari ini
   - Total murid terdaftar

## 🗂️ Struktur File

```
src/
├── lib/
│   └── visitStorage.ts          # Storage management untuk data kunjungan
├── pages/
│   ├── Schedule.tsx             # Halaman untuk murid mengajukan kunjungan
│   └── Dashboard.tsx            # Dashboard guru BK untuk mengelola kunjungan
```

## 💾 Data Storage

Data kunjungan disimpan di **localStorage** dengan key `bk_visits`. Struktur data:

```typescript
interface Visit {
  id: number;
  studentName: string;
  class: string;
  visitDate: string;
  visitTime: string;
  reason: string;
  status: "pending" | "approved" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  email?: string;
  phone?: string;
}
```

## 🔄 Alur Kerja

### Alur Pengajuan Kunjungan
1. Murid mengakses halaman `/schedule`
2. Klik tombol "Ajukan Kunjungan"
3. Mengisi form dengan lengkap
4. Submit form (status: pending)
5. Data tersimpan di localStorage
6. Murid menunggu konfirmasi

### Alur Persetujuan (Guru BK)
1. Guru BK login dan akses dashboard
2. Melihat daftar kunjungan di tab "Kunjungan Murid"
3. Review detail kunjungan
4. Menyetujui (approved) atau menolak (cancelled)
5. Jika approved, murid bisa datang sesuai jadwal
6. Setelah selesai, guru BK ubah status ke "completed"
7. Menambahkan catatan hasil konseling

## 🎨 Komponen UI yang Digunakan

- **Dialog**: Form pengajuan dan detail kunjungan
- **Card**: Menampilkan informasi kunjungan
- **Table**: Daftar kunjungan di dashboard
- **Badge**: Status indicator
- **Button**: Aksi-aksi seperti setujui, tolak, dll
- **Input/Textarea**: Form input data
- **Select**: Dropdown pilihan (kelas, waktu)

## 📋 Waktu Kunjungan Tersedia

```
08:00 WIB
09:00 WIB
10:00 WIB
11:00 WIB
13:00 WIB (Setelah istirahat)
14:00 WIB
15:00 WIB
16:00 WIB
```

## 🏫 Daftar Kelas

- X IPA 1, X IPA 2, X IPS 1, X IPS 2
- XI IPA 1, XI IPA 2, XI IPS 1, XI IPS 2
- XII IPA 1, XII IPA 2, XII IPS 1, XII IPS 2

## 🔐 Akses & Permissions

### Murid
- Akses: `/schedule`
- Dapat mengajukan kunjungan
- Melihat status kunjungan mereka
- Tidak perlu login

### Guru BK
- Akses: `/dashboard` (perlu login)
- Mengelola semua kunjungan
- Menyetujui/menolak pengajuan
- Menambahkan catatan
- Melihat statistik

## 📱 Fitur Responsif

- ✅ Desktop optimized
- ✅ Tablet friendly
- ✅ Mobile responsive
- ✅ Touch-friendly untuk mobile devices

## 🚀 Cara Penggunaan

### Untuk Development

1. Pastikan sudah ada data admin di localStorage:
```javascript
{
  "name": "Guru BK",
  "username": "admin",
  "role": "Administrator"
}
```

2. Data kunjungan otomatis terinisialisasi dengan contoh data saat pertama kali diakses.

3. Akses halaman:
   - Murid: `http://localhost:5173/schedule`
   - Guru BK: `http://localhost:5173/dashboard` (login required)

### Untuk Testing

1. Buat pengajuan kunjungan di `/schedule`
2. Login sebagai admin di `/login`
3. Buka dashboard dan cek tab "Kunjungan Murid"
4. Test berbagai aksi (setujui, tolak, selesai)
5. Tambahkan catatan pada detail kunjungan

## 🔄 Update & Maintenance

### Menambah Waktu Kunjungan
Edit array `timeSlots` di `Schedule.tsx`:
```typescript
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00" // tambah waktu baru
];
```

### Menambah Kelas
Edit array `classes` di `Schedule.tsx`:
```typescript
const classes = [
  "X IPA 1", "X IPA 2", // ... tambah kelas baru
];
```

### Mengubah Guru BK
Edit array `counselors` di `Schedule.tsx`:
```typescript
const counselors = [
  {
    id: "1",
    name: "Nama Guru",
    specialty: "Spesialisasi",
    availability: ["Senin 10:00", "Rabu 14:00"]
  }
];
```

## 📊 Status Kunjungan

| Status | Deskripsi | Badge Color | Icon |
|--------|-----------|-------------|------|
| pending | Menunggu persetujuan | Yellow | AlertCircle |
| approved | Telah disetujui | Green | CheckCircle |
| completed | Kunjungan selesai | Blue | CheckCircle |
| cancelled | Ditolak/dibatalkan | Red | XCircle |

## 🎯 Best Practices

1. **Validasi Form**: Pastikan semua field wajib terisi
2. **User Feedback**: Gunakan toast notification untuk setiap aksi
3. **Real-time Update**: Load ulang data setelah perubahan
4. **Data Persistence**: Semua data tersimpan di localStorage
5. **Error Handling**: Handle kasus data kosong atau error

## 🐛 Troubleshooting

### Data Tidak Muncul
- Cek localStorage browser (F12 > Application > Local Storage)
- Pastikan key `bk_visits` ada
- Coba clear localStorage dan reload

### Form Tidak Submit
- Cek console untuk error
- Pastikan semua field required terisi
- Validasi format tanggal dan waktu

### Status Tidak Update
- Pastikan fungsi `loadVisits()` dipanggil setelah update
- Cek apakah data tersimpan di localStorage
- Reload halaman jika perlu

## 🔮 Future Improvements

- [ ] Notifikasi email/SMS untuk murid
- [ ] Calendar view untuk jadwal kunjungan
- [ ] Filter dan search kunjungan
- [ ] Export data ke Excel/PDF
- [ ] History kunjungan per murid
- [ ] Reminder otomatis H-1
- [ ] Integration dengan sistem sekolah

## 📞 Support

Jika ada pertanyaan atau masalah, hubungi:
- Developer: [Your Name]
- Email: [Your Email]

---

**Created with ❤️ for better student counseling management**
