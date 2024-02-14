import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    if (!text) throw "Mau Nanya Apa?";
    try {
        const endpoint = "/api/batotosearch";
        const requestParams = { q: text, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayzaList = res.result;

        if (clayzaList.length === 0) {
            m.reply("Tidak ada hasil ditemukan.");
            return;
        }

        const clayzaRes = clayzaList.map((clayza) => {
            return `*Title:* ${clayza.title.original}\n` +
                `*ID:* ${clayza.id}\n` +
                `*Link:* https://bato.to/title/${clayza.id}\n` +
                `*Synomyms:* ${clayza.title.synonyms.join(", ")}\n` +
                `*Authors:* ${clayza.authors.join(", ")}\n` +
                `*Poster:* ${clayza.poster}\n` +
                `*Genres:* ${clayza.genres.join(", ")}\n`;
        }).join('\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n');

        conn.sendFile(m.chat, clayzaList[0].poster, '', clayzaRes, m);

    } catch (error) {
        console.error("Error:", error);
        m.reply(
            `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
        );
    }
};

handler.menucomic = ["batotosearch *<text>*"];
handler.tagscomic = ["comic"];
handler.command = /^(batotosearch)$/i;

export default handler;
