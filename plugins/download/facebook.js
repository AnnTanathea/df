import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

  try {
    const endpoint = "/api/facebook";
    const requestParams = { url: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;
    
    const sdVideo = clayza.video_hd || clayza.video_sd;
    if (!sdVideo) throw "Video tidak ditemukan.";

    await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
    await conn.sendFile(m.chat, sdVideo, '', `Audio:`, m);
  } catch (error) {
    console.error("Error:", error);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply("Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
  }
};

handler.menudownload = ["facebook *<link>*"];
handler.tagsdownload = ["download"];
handler.command = /^(facebook)$/i;

export default handler;
