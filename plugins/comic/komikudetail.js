import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    if (!text) throw "Mau Nanya Apa?";
    try {
        const endpoint = "/api/komikudetail";
        const requestParams = { url: text, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayza = res.result;

        let { awal, terbaru, konsep_cerita, komikus } = clayza.metadata;
        const chapters = clayza.chapters.map((v) => `*Chapter:* ${v.chapter}\n*Url:* ${v.url}`).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`;
        
        let komiku = `• *Judul:* ${clayza.title}\n• *Awal:* ${awal}\n• *Terbaru:* ${terbaru}\n• *Genre:* ${konsep_cerita}\n• *Komikus:* ${komikus}\n• *Deskripsi:* ${clayza.description}\n• *Chapters*: ${chapters}\n\n`;

        conn.reply(m.chat, komiku, m);

    } catch (error) {
        console.error("Error:", error);
        m.reply(
            `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
        );
    }
};

handler.menucomic = ["komikudetail *<text>*"];
handler.tagscomic = ["comic"];
handler.command = /^(komikudetail)$/i;

export default handler;
