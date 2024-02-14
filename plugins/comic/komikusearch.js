import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    if (!text) throw "Mau Nanya Apa?";
    try {
        const endpoint = "/api/komikusearch";
        const requestParams = { q: text, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayza = res.result;
        const clayzaRes = clayza.map((v) => `*Title:* ${v.title}\n*Title_ID:* ${v.title_id}\n*Awal:* ${v.awal}\n*Terbaru:* ${v.terbaru}\n*Link:* ${v.url}\nDeskripsi: ${v.description}`).join('\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n');
        conn.sendFile(m.chat, clayza[0].thumbnail, '', clayzaRes, m);

    } catch (error) {
        console.error("Error:", error);
        m.reply(
            `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
        );
    }
};

handler.menucomic = ["komikusearch *<text>*"];
handler.tagscomic = ["comic"];
handler.command = /^(komikusearch)$/i;

export default handler;
