import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });
  try {
    const endpoint = "/api/youtubeaudio";
    const requestParams = { url: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;
    const ClayzaRes = `🔍 Title: ${clayza.title}\n🃏 Thumb: ${clayza.thumb}\n⏳ channel: ${clayza.channel}\n📆 published: ${clayza.published}\n👤 Views: ${clayza.views}\n`

    await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
    await conn.sendMessage(m.chat, { 
      document: { url: `${clayza.url}` }, 
      mimetype: 'audio/mpeg', 
      fileName: `${clayza.title}.mp3`,
      caption: ClayzaRes
    }, m)
  } catch (error) {
    console.error("Error:", error);
    m.reply(
      `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
    );
  }
};

handler.menudownload = ["yta *<text>*"];
handler.tagsdownload = ["download"];
handler.command = /^(yta)$/i;

export default handler;
