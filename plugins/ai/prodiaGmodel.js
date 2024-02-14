import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn }) => {
  const emsg = await conn.sendMessage(m.chat, { text: wait });
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const endpoint = "/api/prodia-getmodel";
    const requestParams = { apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result;
    const clayzaRes = `*Daftar Model Prodia:*\n\n${clayza.map((model, index) => ` ${index + 1}. ${model}`).join('\n')}`;

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

handler.menuai = ["txt2imgmodel"];
handler.tagsai = ["ai"];
handler.command = /^(txt2imgmodel)$/i;
handler.limit = true;
handler.premium = true;

export default handler;
