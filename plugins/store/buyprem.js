import db from '../../lib/database.js';

let handler = async (m, { conn, text }) => {
  let user = db.data.users[m.sender];

  const hargaPremium = {
    "1": 5000000, // Harga 1000000 uang, mendapatkan 1 hari premium
    "7": 30000000, // Harga 9000000 uang, mendapatkan 7 hari premium
    "15": 50000000, // Harga 17000000 uang, mendapatkan 15 hari premium
    "30": 90000000, // Harga 35000000 uang, mendapatkan 30 hari premium
  };

  const input = text.trim();
  if (!/^(1|7|15|30)$/.test(input)) {
    return conn.reply(
      m.chat,
      `Silakan pilih angka sesuai daftar berikut:\n\n${Object.entries(hargaPremium)
        .map(([key, harga]) => `*${key}*. Untuk *${key} hari* total *Rp.${harga.toLocaleString()}*`)
        .join('\n')}`,
      m
    );
  }

  const harga = hargaPremium[input];
  if (!harga) return conn.reply(m.chat, "🚫 *Pilihan harga tidak valid.* 🚫", m);

  if (user.eris < harga) {
    return conn.reply(m.chat, "🚫 *Anda membutuhkan setidaknya 10000 eris untuk menjadi pengguna premium.* 🚫", m);
  }

  const durasi = parseInt(input);
  const existingPremium = db.data.datas.prems.find(p => p.user === m.sender);

  if (existingPremium) {
    existingPremium.date += durasi * 86400000;
  } else {
    db.data.datas.prems.push({ user: m.sender, date: new Date() * 1 + durasi * 86400000 });
  }

  user.eris -= harga;

  let message = existingPremium
    ? `🌟 *Selamat! Jumlah hari premium bertambah.* 🌟\n⏳ *Countdown:* ${getCountdownText(new Date() * 1, existingPremium.date)}`
    : `🎉 *Selamat! Anda sekarang pengguna premium.* 🎉\n⏳ *Countdown:* ${getCountdownText(new Date() * 1, db.data.datas.prems[0].date)}`;

  conn.reply(m.chat, message, m);
};

handler.menustore = ["buyprem"];
handler.tagsstore = ["store"];
handler.command = /^buyprem$/i;

export default handler;

function getCountdownText(now, premiumTime) {
  let remainingTime = premiumTime - now;
  let days = Math.floor(remainingTime / 86400000);
  let hours = Math.floor((remainingTime % 86400000) / 3600000);
  let minutes = Math.floor((remainingTime % 3600000) / 60000);
  let seconds = Math.floor((remainingTime % 60000) / 1000);

  let countdownText = "";

  if (days > 0) countdownText += `${days} hari `;
  if (hours > 0) countdownText += `${hours} jam `;
  if (minutes > 0) countdownText += `${minutes} menit `;
  if (seconds > 0) countdownText += `${seconds} detik`;

  return countdownText.trim();
}