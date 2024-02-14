import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    if (!text) throw "Mau Nanya Apa?";
    const emsg = await conn.sendMessage(m.chat, { text: wait });
    try {
        conn.sendPresenceUpdate("composing", m.chat);
        const endpoint = "/api/cai-createroom";
        const requestParams = { charid: text, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const result = res.result;

        const { chat: { chat_id, create_time, character_id } } = result;

        const editedMessage = {
            conversation: `*Character ID:* ${character_id}\n*Chat ID:* ${chat_id}\n*Create Time:* ${create_time}`,
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

handler.menuai = ["caicreateroom *<charID>*"];
handler.tagsai = ["ai"];
handler.command = /^(caicreateroom)$/i;
handler.limit = true;
handler.premium = true;

export default handler;
