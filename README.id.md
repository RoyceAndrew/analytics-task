# 🧠 Dashboard Analytics dan Pelaporan

Dashboard visualisasi data supermarket yang komprehensif dengan fitur proses ETL, backend API, dan frontend interaktif menggunakan React & Plotly.

![Preview Dashboard](https://img.shields.io/badge/Status-Siap%20Produksi-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20PostgreSQL-blue)

---

## 📦 Tech Stack

- **Database:** PostgreSQL (via pgAdmin)
- **Backend:** Node.js, Express, Prisma ORM
- **Frontend:** React, TanStack Query, Zustand, Plotly.js
- **Pipeline ETL:** Node.js + parser xlsx
- **Sumber Data:** Dataset Supermarket dari Kaggle

---
### 🎥 Demo Video - ([Click here](https://www.youtube.com/watch?v=CSa8QfW5UAo))
---

## 🚀 Panduan Cepat

### Persyaratan Sistem
- Node.js (v16 atau lebih tinggi)
- PostgreSQL dengan pgAdmin
- Git

### 1. Clone Repository & Install Dependencies

```bash
# Clone repository
git clone https://github.com/RoyceAndrew/analytics-task
cd analytics-task

# Install dependencies ETL
cd etl && npm install

# Install dependencies backend
cd ../backend && npm install

# Install dependencies frontend
cd ../frontend && npm install
```

### 2. Setup Database

1. **Install dan buka pgAdmin**
2. **Buat database baru:**
   - Nama database: `analytics_task`
   - Pastikan PostgreSQL berjalan di port yang sesuai

### 3. Konfigurasi Backend

Buat file `.env` di direktori `backend/`:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/analytics_task?schema=public"
```

### 4. Migrasi Database

**PENTING:** Jalankan migrasi database terlebih dahulu sebelum ETL:

```bash
cd backend
npx prisma generate
npx prisma db push  # Sinkronisasi schema database
```

### 5. Konfigurasi ETL

Buat file `.env` di direktori `etl/`:

```env
USER=postgres
PASSWORD=your_postgresql_password
HOST=localhost
PORT=your_postgresql_port
DATABASE=analytics_task
```

### 6. Jalankan Proses ETL

Transform data Excel ke PostgreSQL:

```bash
cd etl
node etl.js
```

**Output yang Diharapkan:**
```
Data inserted successfully!
```

### 7. Jalankan Server Backend

```bash
cd backend
npm run start
```

**Backend akan berjalan di:** `http://localhost:3000`

### 8. Jalankan Aplikasi Frontend

```bash
cd frontend
npm run dev
```

**Frontend akan berjalan di:** `http://localhost:5173`

---

## 📊 Fitur Dashboard

### Visualisasi Utama

| Visualisasi | Deskripsi | Teknologi |
|-------------|-----------|-----------|
| 🥧 **Pie Chart** | Distribusi produk terlaris | Plotly.js |
| 🔵 **Scatter Plot** | Korelasi diskon vs penjualan per negara bagian | Plotly.js |
| 🗺️ **Heatmap** | Volume penjualan berdasarkan wilayah geografis | Plotly.js |

### Fitur Interaktif
- **Filter data real-time**
- **Analisis geografis berdasarkan negara bagian**
- **Breakdown kategori produk**
- **Desain responsif untuk semua perangkat**

---

## 🎯 Keputusan Teknis Utama

### Mengapa PostgreSQL Lokal?
- **Relevansi Proses ETL:** Menggunakan cloud database akan melewatkan nilai pembelajaran pipeline ETL
- **Kecepatan Development:** Setup lokal memungkinkan iterasi dan testing yang cepat
- **Efisiensi Biaya:** Tidak ada biaya cloud database selama development

### Pilihan State Management
- **Zustand:** Alternatif ringan untuk Redux dalam state management React
- **TanStack Query:** Manajemen server state yang efisien dengan caching

---

## 📈 Optimasi Performa

- **Database Indexing:** Query dioptimalkan untuk dataset besar
- **React Query Caching:** Mengurangi panggilan API dengan caching pintar
- **Lazy Loading:** Komponen dimuat sesuai kebutuhan

---

## 📬 Kontak

**Royce Andrew Wijaya**  
📧 Email: royceandrew142@gmail.com  
🐱 GitHub: [@royceandrew](https://github.com/RoyceAndrew)  
💼 LinkedIn: [Royce Andrew Wijaya](https://linkedin.com/in/royceandrewwijaya)

---

## 🙏 Ucapan Terima Kasih

- **Sumber Dataset:** [Supermarket Dataset - Kaggle](https://www.kaggle.com/datasets/wellkilo/supermarket-dataset?phase=FinishSSORegistration&returnUrl=/datasets/wellkilo/supermarket-dataset/versions/1?resource=download&SSORegistrationToken=CfDJ8JWxt6IrvD9KktVh6Ttp9j0BH_xTsYdKsTNlyLHxONiuuWp-Wr3i70crNNjTL7c3B8gj4xF2mZlilAHZTovcGPvTFsYMLKHkMl0D240-Sdze2lU-05Q_ls7vDTbx905V1yXsnI6BJtp-Mknqun9yYcfrqGgRvdPKUuHmjA10hT1uGMY-mrtuyaBBQtRW11f4rNy8G1CoJyw6mxY_rm7m1voU8Q-Tja8_tHmsdPhDHE51dNv_YTFHErv-iPHfRPbaeOg0ReyPiUTM8PumpyQmjbD2PeOf0PWm7B_FAkMRxRk3UHK2VpAvpVenSAdEFJSO0tDtqfuzdG-pXOFtzOUflmZeQCNb&DisplayName=David%20Tobing)
- **Library Visualisasi:** [Plotly.js](https://plotly.com/javascript/)
- **Framework Backend:** [Express.js](https://expressjs.com/)
- **Framework Frontend:** [React](https://reactjs.org/)

---

<div align="center">
  <img src="https://img.shields.io/badge/Dibuat%20dengan-❤️-red.svg"/>
  <img src="https://img.shields.io/badge/Dikembangkan%20oleh-Royce%20Andrew-blue.svg"/>
</div>
