import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  const emsg = await conn.sendMessage(m.chat, { text: wait });
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const endpoint = "/api/zerochan";
    const requestParams = { q: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result.itemList.slice(0, 10);

    let clayzaRes = '*[ Zerochan Search ]*:\n\n';
    
    clayza.forEach((result, index) => {
      clayzaRes += `*Result ${index + 1}:*\n`;
      clayzaRes += `📂 Name: ${result.name}\n`;
      clayzaRes += `🔗 URL: ${result.url}\n`;
      clayzaRes += `🃏 Thumbnail: ${result.thumbnailUrl}\n`;
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

handler.menuimage = ["zerochan *<text>*"];
handler.tagsimage = ["image"];
handler.command = /^(zerochan)$/i;

export default handler;
