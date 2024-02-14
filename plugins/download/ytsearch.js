import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  const emsg = await conn.sendMessage(m.chat, { text: wait });
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const endpoint = "/api/youtubesearch";
    const requestParams = { q: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result.slice(0, 5);

    let clayzaRes = '*[ Youtube Search ]*:\n\n';
    
    clayza.forEach((result, index) => {
      clayzaRes += `*Result ${index + 1}:*\n`;
      clayzaRes += `📂 Type: ${result.type}\n`;
      clayzaRes += `🔗 URL: ${result.url}\n`;
      clayzaRes += `🔍 Title: ${result.title}\n`;
      clayzaRes += `🃏 Thumbnail: ${result.thumbnail}\n`;
      clayzaRes += `⏳ Timestamp: ${result.timestamp}\n`;
      clayzaRes += `📆 Ago: ${result.ago}\n`;
      clayzaRes += `👤 Views: ${result.views}\n`;
      clayzaRes += `___________________________\n\n`;
    });
    
    const editedMessage = {
      conversation: clayzaRes,
    };

    await conn.relayMessage(
      m.chat,
      {
        protocolMessage: {
          key: emsg.key,
          type: 14,
          editedMessage: editedMessage,
        },
      },
      {}
    );
    
  } catch (error) {
    console.error("Error:", error);
    m.reply(
      `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
    );
  }
};

handler.menudownload = ["yts *<text>*"];
handler.tagsdownload = ["download"];
handler.command = /^(yts)$/i;

export default handler;
