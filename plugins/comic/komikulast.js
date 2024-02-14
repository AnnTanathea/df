import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    try {
        const endpoint = "/api/komikulastupdate";
        const requestParams = { apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayza = res.result;
        const clayzaRes = clayza.map((v) => `*Title:* ${v.title}\n*Update:* ${v.update}\n*Link:* ${v.url}\n*Thumbnail:* ${v.thumbnail}`).join('\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n');
        conn.sendFile(m.chat, clayza[0].thumbnail, '', clayzaRes, m);

    } catch (error) {
        console.error("Error:", error);
        m.reply(
            `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
        );
    }
};

handler.menucomic = ["komikulast"];
handler.tagscomic = ["comic"];
handler.command = /^(komikulast)$/i;

export default handler;
