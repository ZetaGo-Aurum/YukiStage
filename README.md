# ❄️ YukiStage

<p align="center">
  <img src="yuki.png" alt="YukiStage Logo" width="400" />
</p>

<p align="center">
  <b>Advanced WhatsApp Web API Hybrid Client Library for Node.js</b><br>
  <sub>High-performance Baileys fork + Built-in MessageBuilder v4.6 integration</sub>
</p>

<p align="center">
  <a href="https://img.shields.io/badge/version-1.1.4-00D4FF?style=for-the-badge&logo=octopusdeploy&logoColor=white">
    <img src="https://img.shields.io/badge/version-1.1.4-00D4FF?style=for-the-badge&logo=octopusdeploy&logoColor=white" alt="Version" />
  </a>
  <a href="https://img.shields.io/badge/node-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/node-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
  </a>
  <a href="https://img.shields.io/badge/platform-Win%20%7C%20Linux%20%7C%20macOS%20%7C%20Termux-blueviolet?style=for-the-badge">
    <img src="https://img.shields.io/badge/platform-Win%20%7C%20Linux%20%7C%20macOS%20%7C%20Termux-blueviolet?style=for-the-badge" alt="Platform" />
  </a>
  <a href="https://img.shields.io/badge/license-MIT-green?style=for-the-badge">
    <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
  </a>
</p>

<div align="center">

### 🔗 Support & Community

<a href="https://trakteer.id/Aleocrophic/tip" target="_blank"><img src="buttons/trakteer_button.svg" alt="Trakteer Tip" width="250"></a>
<a href="https://chat.whatsapp.com/KwTSsF7t5868ERksMPamyQ" target="_blank"><img src="buttons/community_button.svg" alt="Join Community" width="250"></a>

</div>

---

## ❄️ Deskripsi Proyek

**YukiStage** adalah hasil **"kawin silang resmi"** antara `@whiskeysockets/baileys` dan **`baileys-mbuilder` v4.6** yang dirancang khusus oleh **ZetaGo-Aurum** untuk memenuhi kebutuhan performa bot **Yuki AI** dengan maskot pelayan anime es (kuudere) khas Yuki.

Pustaka ini menggabungkan kekuatan core API komunikasi Baileys terbaru dengan kenyamanan MessageBuilder v4.6 untuk membuat Button, Carousel, Native Flow, dan AI Rich Response WhatsApp dalam satu paket tunggal tanpa perlu menginstal dependensi terpisah!

---

## 🚀 Fitur Utama & Optimalisasi

1. **Integrasi MessageBuilder v4.6 Bawaan (Hybrid)**
   - Akses langsung class builder: `Button`, `ButtonV2`, `Carousel`, `AIRich`, dan `Toolkit` langsung dari root import `yukistage`.
   - Pembuatan pesan interaktif, dropdown menu (`single_select`), carousel multi-kartu, dan respon AI terformat menjadi sangat mudah dengan Fluent Chaining API.

2. **Stabilitas Koneksi Tinggi (Anti-Disconnect)**
   - Interval keep-alive/ping dipersingkat menjadi **15 detik** (default: 30 detik) untuk mencegah penutupan koneksi TCP secara sepihak oleh tabel NAT firewall VPS/Docker.
   - Durasi timeout koneksi awal diperpanjang hingga **30 detik** untuk toleransi jaringan lambat.

3. **Optimasi Pengiriman Pesan Bisnis**
   - Penambahan metadata bisnis (`biz` node) otomatis pada pengiriman interaktif untuk menjamin kesuksesan render tombol tanpa penolakan (silent drop) oleh server WhatsApp pada akun personal.

4. **Performa Ringan & Cepat**
   - Pemangkasan berkas `.map` dan dependensi tidak terpakai.
   - Penanganan media yang dioptimalkan dengan resolusi buffer dan image resizer terintegrasi.

---

## 📦 Instalasi

Gunakan npm atau yarn untuk menginstal **YukiStage** ke dalam proyek Anda:

```bash
npm install yukistage
```

---

## 🛠️ Contoh Penggunaan

Menggunakan YukiStage dengan inisialisasi soket dan pembuatan tombol terintegrasi:

```javascript
import makeWASocket, { DisconnectReason, useMultiFileAuthState, Button, ButtonV2, Toolkit } from 'yukistage';
import log from 'pino';

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session_yuki');
    
    const client = makeWASocket({
        auth: state,
        logger: log({ level: 'silent' }),
        printQRInTerminal: true,
        connectTimeoutMs: 30000,
        keepAliveIntervalMs: 15000
    });

    client.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('YukiStage berhasil terhubung ke WhatsApp!');
        }
    });

    client.ev.on('messages.upsert', async (chatUpdate) => {
        const msg = chatUpdate.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const jid = msg.key.remoteJid;

        // Contoh Membuat Tombol Interaktif (Native Flow) dengan YukiStage
        const button = new Button(client)
            .setTitle("❄️ Yuki Menu")
            .setBody("Halo Senapi, ada yang bisa Yuki bantu?")
            .setFooter("YukiStage Hybrid Client")
            .addReply("❄️ Menu", "menu_id")
            .addUrl("🌐 GitHub", "https://github.com")
            .addSelection("🔘 Pilihan Lainnya")
            .makeSection("Kategori Utama")
            .makeRow("🎧 Audio", "play_audio", "Putar audio musik", "row_1")
            .makeRow("🎬 Video", "play_video", "Putar video klip", "row_2");

        await button.send(jid);
    });

    client.ev.on('creds.update', saveCreds);
}

startBot();
```

---

## 🎖️ Credits & Penghargaan

Pustaka **YukiStage** ini menggunakan MessageBuilder v4.6 sebagai pustaka internal tambahannya. Kredit penuh dan ucapan terima kasih sebesar-besarnya kami haturkan kepada:
* **Nixel (NIXCODE)** — Pembuat asli dan pengembang utama pustaka [baileys-mbuilder](https://www.npmjs.com/package/baileys-mbuilder).
* **FongsiDev** / **FgsiDev** — Kontributor pustaka `baileys-mbuilder` & npm package publisher.
* **Update & Support** — Silakan bergabung di [WhatsApp Channel](https://whatsapp.com/channel/0029VbCV1ck8fewpdNb2TY2k) MBuilder.
* Pustaka asli Baileys oleh Rajeh Taher & WhiskeySockets.

---

## 📄 License

MIT © **ZetaGo-Aurum**

> **Note:** The underlying MBuilder library (integrated into this project) is Copyright © 2026 **Nixel(Dev)** & **FgsiDev(Contributor)**.

---

Developed and maintained with ❄️ by **ZetaGo-Aurum**.
