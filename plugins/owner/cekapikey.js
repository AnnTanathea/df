import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  const emsg = await conn.sendMessage(m.chat, { text: wait });
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const endpoint = "/checkapikey";
    const requestParams = { apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;
    const clayzaRes = `*Check ApiKey Maelyn:*\n\nUsername: ${clayza.username}\nLimit: ${clayza.limit}\nPremium: ${clayza.premium}\nPremium Expired: ${clayza.premiumExpired}`;

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

handler.menuowner = ["checkkey *<text>*"];
handler.tagsowner = ["owner"];
handler.command = /^(checkkey)$/i;
handler.owner = true

export default handler;
