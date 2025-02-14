Taxi Data API - NestJS

Deskripsi

API ini dikembangkan menggunakan NestJS untuk mengambil dan memfilter data taksi dari API eksternal:NYC Taxi Data API

API ini menyediakan berbagai fitur filtering dan pagination untuk menampilkan data dengan lebih fleksibel, terutama untuk visualisasi dalam peta dan chart.

Instalasi dan Menjalankan


# Taxi Data API - NestJS

## Deskripsi

API ini dikembangkan menggunakan **NestJS** untuk mengambil dan memfilter data taksi dari API eksternal:\
[NYC Taxi Data API](https://data.cityofnewyork.us/resource/gkne-dk5s.json)

API ini menyediakan berbagai fitur filtering dan pagination untuk menampilkan data dengan lebih fleksibel, terutama untuk visualisasi dalam peta dan chart.

## Instalasi dan Menjalankan

### 1. Clone Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Server

```bash
npm run start
```

Server akan berjalan di `http://localhost:3000`

## Dokumentasi API

### **Endpoint**: GET `/taxi`

**Query Parameters**:

| Parameter        | Tipe              | Deskripsi                                       |
| ---------------- | ----------------- | ----------------------------------------------- |
| `vendor_id`      | string            | Filter berdasarkan ID vendor                    |
| `payment_type`   | string            | Filter berdasarkan metode pembayaran            |
| `min_lat`        | number            | Batas bawah latitude pickup                     |
| `max_lat`        | number            | Batas atas latitude pickup                      |
| `min_lng`        | number            | Batas bawah longitude pickup                    |
| `max_lng`        | number            | Batas atas longitude pickup                     |
| `center_lat`     | number            | Latitude pusat untuk filter berdasarkan radius  |
| `center_lng`     | number            | Longitude pusat untuk filter berdasarkan radius |
| `radius`         | number            | Radius (dalam km) dari titik pusat              |
| `start_time`     | string (ISO 8601) | Waktu awal pickup                               |
| `end_time`       | string (ISO 8601) | Waktu akhir pickup                              |
| `min_passengers` | number            | Minimal jumlah penumpang                        |
| `max_passengers` | number            | Maksimal jumlah penumpang                       |
| `min_fare`       | number            | Minimal tarif                                   |
| `max_fare`       | number            | Maksimal tarif                                  |
| `min_distance`   | number            | Minimal jarak perjalanan                        |
| `max_distance`   | number            | Maksimal jarak perjalanan                       |
| `page`           | number            | Nomor halaman untuk pagination (default: 1)     |
| `limit`          | number            | Jumlah data per halaman (default: 10)           |

### **Contoh Request**

```bash
GET http://localhost:3000/taxi?min_fare=10&max_fare=50&page=2&limit=5
```

### **Contoh Response**

```json
{
  "totalItems": 100,
  "page": 2,
  "limit": 5,
  "totalPages": 20,
  "data": [
    {
      "vendor_id": "CMT",
      "pickup_datetime": "2014-12-09T00:47:50.000",
      "dropoff_datetime": "2014-12-09T01:12:14.000",
      "passenger_count": "1",
      "trip_distance": "10",
      "pickup_longitude": "-73.988860000000003",
      "pickup_latitude": "40.722844000000002",
      "dropoff_longitude": "-73.975556999999995",
      "dropoff_latitude": "40.612572",
      "payment_type": "CSH",
      "fare_amount": "29.5",
      "total_amount": "30.5"
    }
  ]
}
```


