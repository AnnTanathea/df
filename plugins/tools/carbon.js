import { MealynAPI } from '../../lib/maelyn.js';

let handler = async (m, { conn, text }) => {
    if (m.isHandled) return;
    m.isHandled = true;
    if (!text) throw "Mau Nanya Apa?";
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

  try {
    const endpoint = "/api/carbon";
    const requestParams = { q: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;
    const clayzaRes = clayza.name

    await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
    await conn.sendFile(m.chat, clayzaRes, '',"ini hasilnya", m);
  } catch (error) {
    console.error("Error:", error);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply("Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
  }
};

handler.menutools = ["carbon *<code>*"];
handler.tagstools = ["tools"];
handler.command = ["carbon"];

export default handler;
