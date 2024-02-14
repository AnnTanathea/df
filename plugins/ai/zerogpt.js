import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  const emsg = await conn.sendMessage(m.chat, { text: wait });
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const endpoint = "/api/zerogpt";
    const requestParams = { q: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;
    const clayzaRes = `*Hasil ZeroGPT:*\n\nIs Human: ${clayza.isHuman}%\nText Words: ${clayza.textWords}\nAI Words: ${clayza.aiWords}\nFeedback: ${clayza.feedback}\n\nOriginal Paragraph:\n${clayza.originalParagraph}`;


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

handler.menuai = ["zerogpt *<text>*"];
handler.tagsai = ["ai"];
handler.command = /^(zerogpt)$/i;
handler.limit = true;
handler.premium = true;

export default handler;
