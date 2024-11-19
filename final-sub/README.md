# Skenario
Anda sedang mengikuti program bootcamp yang melibatkan dua alur belajar yakni Cloud Computing dan Machine Learning. Pada akhir masa belajar, siswa diharapkan membentuk tim yang terdiri dari dua alur belajar tersebut. Setiap tim berisi dua anggota di mana satu anggota berasal dari alur belajar Cloud Computing dan satu anggota berasal dari alur belajar Machine Learning.

Setiap tim harus membuat aplikasi machine learning yang dapat menyelesaikan permasalahan di dunia nyata. 

Anda adalah siswa dari alur belajar Cloud Computing dan membentuk satu tim dengan orang bernama Melly yang merupakan siswa dari alur belajar Machine Learning. Nama tim Anda adalah Asclepius yang terinspirasi dari nama dewa penyembuhan Yunani.

Dengan nama tim tersebut, permasalahan yang ingin tim Anda selesaikan adalah mendeteksi penyakit kanker kulit. Hasil yang diharapkan adalah terdapat aplikasi machine learning yang mampu mendeteksi gambar kulit dan mengklasifikasikannya menjadi dua kelas, yakni Cancer dan Non-cancer.

Secara detail, berikut adalah tugas tim Anda.

Melly: 
- Mengumpulkan dan membersihkan dataset.
- Melakukan analisis data terkait kebutuhan model.
- Mencari algoritma machine learning yang sesuai dengan kebutuhan model.
- Membangun model machine learning untuk mendeteksi penyakit kanker kulit.

Anda:
- Membangun aplikasi backend dan mengintegrasikannya dengan frontend dan model machine learning.
- Aplikasi back-end adalah web server yang dapat menangani inferensi model machine learning yang telah dibuat oleh Melly dan di-deploy ke Compute Engine.
- Aplikasi front-end adalah antarmuka aplikasi machine learning dan di-deploy ke App Engine.
- Menggunakan Cloud Storage sebagai tempat menyimpan model.
- Menggunakan Firestore sebagai basis data untuk menyimpan data hasil prediksi.

Seluruh aplikasi tersebut harus di-deploy menggunakan layanan dari Google Cloud dengan arsitekturnya adalah sebagai berikut (lihat Arsitektur.jpeg).

Melly akan bertanggung jawab terhadap pembuatan model machine learning. Sedangkan, Anda bertanggung jawab terhadap pembuatan aplikasi dan deployment aplikasi ke Google Cloud.

---

# Kriteria
Terdapat tujuh kriteria utama yang harus Anda penuhi untuk membangun aplikasi machine learning dengan Google Cloud.

## Kriteria 1: Membuat Google Cloud Project
Guna menghindari lingkungan kerja antara personal project dengan submission, Anda perlu membuat Google Cloud project baru dengan ketentuan format project ID atau project name seperti berikut submissionmlgc-namapeserta.

## Kriteria 2: Memberi Hak Akses ke Auditor Eksternal
Setelah proses deployment aplikasi usai, Anda harus memberikan hak akses yang sesuai kepada auditor eksternal. Sehingga, ia bisa memeriksa arsitektur cloud yang telah Anda buat dengan saksama.
Silakan berikan hak akses kepada reviewer_googlecloud@dicoding.com ke dalam project Anda.

## Kriteria 3: Membuat API dan melakukan deployment aplikasi backend menggunakan Compute Engine
Sebagaimana disebutkan sebelumnya, Anda perlu membuat web server yang dapat menangani inferensi model machine learning. 

API yang dibuat harus memiliki detail seperti berikut.
Prediksi:
- URL Endpoint: /predict
- Method: POST
- Content-Type: multipart/form-data
- Request body:
    - image as file, harus berukuran maksimal 1MB (1000000 byte)


    a. Jika pengguna mengirimkan gambar yang terindikasi penyakit kanker, respon API harus memiliki struktur berikut.
    ```json
    {
       "status": "success",
       "message": "Model is predicted successfully",
       "data": {
           "id": "77bd90fc-c126-4ceb-828d-f048dddff746",
           "result": "Cancer",
           "suggestion": "Segera periksa ke dokter!",
           "createdAt": "2023-12-22T08:26:41.834Z"
       }
    }
    ```

    b. Jika pengguna mengirimkan gambar yang TIDAK terindikasi penyakit kanker, respon API harus memiliki struktur berikut.
    ```json
    {
       "status": "success",
       "message": "Model is predicted successfully",
       "data": {
           "id": "77bd90fc-c126-4ceb-828d-f048dddff746",
           "result": "Non-cancer",
           "suggestion": "Penyakit kanker tidak terdeteksi.",
           "createdAt": "2023-12-22T08:26:41.834Z"
       }
    }
    ```
    
    c. Jika pengguna mengirimkan gambar lebih dari 1MB (1000000 byte), API akan merespons error dengan detail seperti berikut.
    ```json
    {
        Status Code: 413
        Body Response:
           "status": "fail",
           "message": "Payload content length greater than maximum allowed: 1000000"
    }
    ```
    d. Jika prediksi mengalami error seperti format dan shape gambar yang tidak sesuai atau merujuk pada kesalahan ketika melakukan prediksi baik dari sisi model atau pun pengguna. API akan merespons error dengan detail seperti berikut
    ```json
    {
        Status Code: 400
        Body Response:
           "status": "fail",
           "message": "Terjadi kesalahan dalam melakukan prediksi"
    }


Saat membangun aplikasi backend, Anda dapat menggunakan framework selain Hapi tetapi wajib mengikuti seluruh ketentuan di atas.

## Kriteria 4: Melakukan deployment aplikasi frontend menggunakan App Engine.
Tak hanya back-end, Anda pun harus melakukan deployment aplikasi front-end menggunakan App Engine standard environment. 

Seluruh kode aplikasi front-end telah disediakan oleh tim Dicoding dan tidak diperbolehkan menggunakan kode lainnya. Anda hanya perlu memasukan base url backend pada berkas src -> scripts -> api.js. Perhatikan kode yang diberikan komentar //TODO.

Kode aplikasi front-end dapat Anda lihat pada folder `asclepius`.


## Kriteria 5: Menggunakan Cloud Storage untuk menyimpan model machine learning.
Singkat cerita, Melly telah berhasil melakukan pengembangan model machine learning dan disimpan dalam SavedModel format, lalu mengubahnya menjadi TensorFlow.js web format. Anda dapat melihat di folder `submission-model`

Model yang Melly bangun adalah binary classification dengan input shape model, yakni:
- Lebar (width) berukuran 224 pixel,
- Tinggi (height) berukuran 224 pixel, dan
- Warna (color kernel) adalah RGB dengan 3 warna.
- Perlu diingat, binary classification adalah jenis klasifikasi machine learning di mana hasil yang didapat berupa dua kelas. Dalam hal ini, model machine learning hanya mengembalikan Cancer dan Non-cancer.  

Oh iya, Melly memiliki catatan untuk Anda:

> “Saat ini, TensorFlow js sering mengalami kendala instalasi di Windows. Jika ingin mengembangkan aplikasi, Anda bisa menggunakan WSL dan menginstal library @tensorflow/tfjs-node dengan versi 3.21.1. Oh iya, pastikan menggunakan node js dengan versi minimalnya adalah 18.16.” 

Model akan mengembalikan array dengan rentang nilai 0 hingga 1. Di mana jika rentang nilainya di atas 50% diklasifikasikan sebagai Cancer, jika di bawah atau sama dengan 50% diklasifikasikan sebagai Non-cancer. 

Tugas Anda adalah menyimpan model yang Melly buat di Cloud Storage bucket dan aplikasi Anda perlu melakukan load model dari object tersebut.

## Kriteria 6: Menggunakan Firestore sebagai basis data dalam menyimpan hasil prediksi.
Seluruh data dari response API harus disimpan ke Firestore dengan native mode. Struktur data di dalam Firestore adalah root-level collection. (lihat di gambar firestore.png)
- Sesuai dengan visualisasi di atas, database Anda harus memiliki kriteria berikut.
- Collection bernama predictions.
- Nama setiap dokumen harus merupakan id response.
- Data pada setiap dokumen harus mengandung field id, result, suggestion, dan createdAt.
- Untuk memudahkan pemeriksaan data, PASTIKAN dalam project submission Anda, hanya memiliki 1 database dan 1 collection bernama "predictions".

Disarankan menggunakan database "(default)"untuk memanfaatkan free quota dan jika Anda sudah memiliki database "(default)" dengan mode Datastore, selama data tersebut masih kosong Anda bisa mengubahnya dengan mengikuti dokumen berikut https://cloud.google.com/datastore/docs/firestore-or-datastore#changing_between_native_mode_and_datastore_mode.

## Kriteria 7: Web Server menggunakan Static External IP
Terakhir, eksternal IP untuk web server Anda harus merupakan static IP agar web server dapat bekerja secara optimal dan konsisten dalam menangani setiap request yang masuk melalui front-end.


# Penilaian
Dalam memberikan hak akses ke auditor eksternal, Anda harus menerapkan principle of least privilege.
Melakukan deployment aplikasi backend menggunakan layanan Cloud Run.
Perlu diingat, jika Anda menerapkan saran ini, kriteria utama poin 3 tentang deployment Compute Engine dan poin 7 tentang penggunaan static IP akan otomatis terpenuhi. Sehingga Anda tidak perlu mengerjakannya.
Menambahkan endpoint baru yang bertujuan sebagai riwayat prediksi dengan cara mengambil seluruh data yang telah Anda simpan di Firestore.  Berikut detail ketentuannya.
    - Method: GET
    - Path: /predict/histories
    - Response body yang harus ditampilkan adalah sebagai berikut.
        ```json
        {
           "status": "success",
           "data": [
               {
                   "id": "13e907b3-4213-42ad-b12b-b9b7e12eb90e",
                   "history": {
                       "result": "Cancer",
                       "createdAt": "2023-12-22T10:04:40.341Z",
                       "suggestion": "Segera periksa ke dokter!",
                       "id": "13e907b3-4213-42ad-b12b-b9b7e12eb90e"
                   }
               },
               {
                   "id": "19555e44-9cc7-4bc4-98b9-732d69cac082",
                   "history": {
                       "result": "Non-cancer",
                       "createdAt": "2023-12-22T10:06:50.783Z",
                       "suggestion": "Anda sehat!",
                       "id": "19555e44-9cc7-4bc4-98b9-732d69cac082"
                   }
               }
           ]
        }
        ```


# Tips and Trik
Berikut adalah beberapa tips yang perlu Anda perhatikan.
1. Anda dapat merujuk pada kelas Menjadi Google Cloud Engineer untuk mempelajari cara melakukan deployment menggunakan Cloud Run.
2. Apabila Anda menemukan masalah, cobalah temukan solusinya di dokumentasi Google Cloud.
3. Jika menggunakan Hapi, Anda bisa memanfaatkan onPreResponse pada Hapi untuk menangani error pada seluruh endpoint.
4. Sebelum melakukan deployment ke tingkat production (Google Cloud), Anda harus memastikan semuanya berjalan baik di lokal komputer.
5. Tim reviewer akan memeriksa daftar layanan-layanan di bawah ini, Anda bisa mencari permissions atau role yang sesuai berdasarkan kebutuhan reviewer.
    - App Engine.
    - Compute Engine.
    - Cloud Storage.
    - VPC Network -> IP addresses (Pastikan API Compute Engine aktif).
    - Firestore.
    - Cloud Run (jika mengerjakan saran).
    - Cloud Artifact Registry (jika mengerjakan saran).
6. Untuk pengguna Windows, pastikan menggunakan terminal ubuntu untuk menjalankan web service selama proses deployment. Anda bisa merujuk kembali ke materi di modul 2 tentang Latihan Membangun Environment Machine Learning dengan Compute Engine.
7. Contoh response API untuk kriteria ke-6 dilampirkan pada Ketentuan Pengiriman Submissions.


# Lainnya
## Ketentuan Pengiriman Submissions
Beberapa poin yang perlu diperhatikan ketika mengirimkan submission antara lain:
1. Anda harus mengirimkan file dengan ketentuan berikut.
Salin kode di bawah ini dan isi value JSON sesuai dengan yang dibutuhkan, setelah itu simpan ke dalam file json bernama requirements.json.
    ```json
    {  
     "backend-service-url": "isi dengan url backend Anda",
     "frontend-service-url": "isi dengan url frontend Anda",
     "project-id": "isi dengan project ID Google Cloud Project Anda",
     "bucket-name": "isi dengan nama bucket yang menyimpan model Anda"
    }
    ```
Ketentuan di atas harus sama persis, baik nama file atau pun nilai yang berada pada file requirements.json.

Berkas submission yang dikirimkan merupakan folder yang berisi kumpulan berkas yang diminta dalam bentuk ZIP. Pastikan Anda tidak melakukan ZIP dalam ZIP.

## Submission Anda akan Ditolak bila
- Aplikasi backend mengalami kesalahan ketika menjalankan request pada folder "Asclepius Mandatory" Postman.
- Aplikasi frontend tidak berjalan dengan baik, ditandai dengan aplikasi tidak bisa melakukan prediksi, aplikasi front end gagal memuat CSS dan/atau Javascript, serta base url pada src -> scripts -> api.js berbeda dengan backend url pada requirements.json yang Anda berikan.
- Kriteria wajib tidak terpenuhi.
- Ketentuan berkas submission tidak terpenuhi.
- Berkas yang diminta tidak bisa dibuka, error, atau isinya benar-benar berantakan.
- Melakukan kecurangan seperti tindakan plagiarisme.