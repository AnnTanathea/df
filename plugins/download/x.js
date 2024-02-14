import { MealynAPI } from '../../lib/maelyn.js';

let handler = async (m, { conn, text }) => {
    if (m.isHandled) return;
    m.isHandled = true;
    if (!text) throw "Mau Nanya Apa?";
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

  try {
    const endpoint = "/api/x";
    const requestParams = { url: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;
    const ClayzaRes = `🔍 Desc: ${clayza.desc}\n🃏 Thumb: ${clayza.thumb}`;

    await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
    await conn.sendFile(m.chat, `${clayza.video_hd}`, '', ClayzaRes, m);
  } catch (error) {
    console.error("Error:", error);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply("Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
  }
};

handler.menudownload = ["x *<link>*"];
handler.tagsdownload = ["download"];
handler.command = ["x"];

export default handler;
