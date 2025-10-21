# Artikel Management System

## Overview
Sistem pengelolaan artikel yang terintegrasi antara Dashboard Admin dan halaman Articles untuk user. Artikel disimpan di localStorage browser sehingga perubahan akan langsung terlihat di kedua halaman.

## Fitur yang Diimplementasikan

### 1. **Central Article Storage** (`src/lib/articleStorage.ts`)
   - Menyimpan artikel di localStorage dengan key `bk_articles`
   - Inisialisasi 6 artikel default saat pertama kali
   - Interface Article dengan field: id, title, excerpt, content, image, date, author, category, readTime

### 2. **Dashboard Admin** (`src/pages/Dashboard.tsx`)
   - **Tambah Artikel**: Form lengkap dengan kategori dan waktu baca
   - **Edit Artikel**: Update artikel existing
   - **Hapus Artikel**: Hapus artikel dengan konfirmasi
   - **Preview Artikel**: Card view dengan thumbnail
   - Semua perubahan langsung disimpan ke localStorage

### 3. **Halaman Articles** (`src/pages/Articles.tsx`)
   - Otomatis load artikel dari localStorage
   - Filter berdasarkan kategori
   - Search artikel by title dan excerpt
   - Responsive grid layout

### 4. **Article Detail** (`src/pages/ArticleDetail.tsx`)
   - Menampilkan artikel lengkap dari storage
   - Format tanggal yang rapi
   - 404 handling jika artikel tidak ditemukan

## Kategori Artikel
- Mental Health
- Career Guidance
- Academic
- Personal Growth

## Waktu Baca (Read Time)
- 3 min read
- 5 min read
- 7 min read
- 10 min read
- 15 min read

## Cara Menggunakan

### Untuk Admin:
1. Login dengan akun admin:
   - Username: `super.admin`
   - Password: `guru123`

2. Akses Dashboard dari navbar

3. Tab "Kelola Artikel":
   - Klik "Tambah Artikel" untuk membuat artikel baru
   - Isi form (title, kategori, waktu baca, ringkasan, konten, URL gambar)
   - Klik icon pensil untuk edit
   - Klik icon trash untuk hapus

4. Perubahan akan langsung terlihat di halaman Articles

### Untuk User:
1. Buka halaman "Articles" dari navbar
2. Browse artikel yang sudah dibuat admin
3. Gunakan search box untuk mencari artikel
4. Filter berdasarkan kategori
5. Klik artikel untuk membaca detail lengkap

## Technical Details

### Storage Functions:
```typescript
getArticles(): Article[]              // Ambil semua artikel
getArticleById(id): Article           // Ambil 1 artikel by ID
addArticle(article): Article          // Tambah artikel baru
updateArticle(id, updates): Article   // Update artikel
deleteArticle(id): boolean            // Hapus artikel
```

### Data Flow:
1. Admin create/update/delete artikel di Dashboard
2. Data disimpan ke localStorage via articleStorage functions
3. Articles page load data dari localStorage saat mount
4. ArticleDetail page load artikel specific by ID

## Default Articles
Sistem menyediakan 6 artikel default:
1. Managing Stress and Anxiety in School (Mental Health)
2. Exploring Career Paths (Career Guidance)
3. Effective Study Techniques (Academic)
4. Building Healthy Relationships (Personal Growth)
5. Time Management Skills (Academic)
6. Preparing for College (Career Guidance)

## Future Enhancements
- Export/Import artikel sebagai JSON
- Upload gambar ke cloud storage
- Rich text editor untuk konten
- Preview sebelum publish
- Draft system
- Tags untuk artikel
- View counter
- Comments system
