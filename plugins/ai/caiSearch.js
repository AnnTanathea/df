import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    if (!text) throw "Mau Nanya Apa?";
    const emsg = await conn.sendMessage(m.chat, { text: wait });
    try {
        conn.sendPresenceUpdate("composing", m.chat);
        const endpoint = "/api/cai-search";
        const requestParams = { q: text, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayza = res.result.slice(0, 5);

        const editedMessage = {
            conversation: clayza.map(item => `*Char ID :* ${item.char_id}\n*Char Name :* ${item.char_name}\n*Title :* ${item.title}\n*Greating :* ${item.greeting}\n*Score :* ${item.search_score}\n_______________________________`).join('\n'),
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

handler.menuai = ["caisearch *<text>*"];
handler.tagsai = ["ai"];
handler.command = /^(caisearch)$/i;
handler.limit = true;
handler.premium = true;
export default handler;
