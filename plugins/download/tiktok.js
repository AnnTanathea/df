import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

  try {
    const endpoint = "/api/tiktok";
    const requestParams = { url: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;

    const sdVideo = clayza.medias.find(media => media.quality.toLowerCase() === 'sd');
    if (!sdVideo) throw "Video dengan kualitas 'sd' tidak ditemukan.";

    const ClayzaRes = `🔍 Title: ${clayza.title}\n🃏 Source: ${clayza.source}\n⏳ Durasi: ${clayza.duration}\n📆 Size: ${sdVideo.formattedSize}\n💽 Quality: ${sdVideo.quality}\n`;

    await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
    await conn.sendFile(m.chat, sdVideo.url, '', ClayzaRes, m);
  } catch (error) {
    console.error("Error:", error);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply("Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
  }
};

handler.menudownload = ["tiktok *<link>*"];
handler.tagsdownload = ["download"];
handler.command = /^(tiktok)$/i;

export default handler;
