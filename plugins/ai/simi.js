import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  const emsg = await conn.sendMessage(m.chat, { text: wait });
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const endpoint = "/api/simi";
    const requestParams = { q: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;

    const editedMessage = {
      conversation: clayza,
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

handler.menuai = ["simi *<text>*"];
handler.tagsai = ["ai"];
handler.command = /^(simi)$/i;

export default handler;
