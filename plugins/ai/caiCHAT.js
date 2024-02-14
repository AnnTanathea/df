import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  const emsg = await conn.sendMessage(m.chat, { text: wait });
  
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const endpoint = "/api/cai-chat";
    const requestParams = { q: text, charid: "al66ie2MAHSMunfxBvlU60_hPHSguDbInquKKu2e2XY", chatid: "053b79dd-27cf-4f61-8f59-8a25e41a1240", apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const result = res.result;
    
    const editedMessage = {
      conversation: result.candidates[0].raw_content,
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

handler.menuai = ["caichat *<text>*"];
handler.tagsai = ["ai"];
handler.command = /^(caichat)$/i;
handler.limit = true;
handler.premium = true;

export default handler;
