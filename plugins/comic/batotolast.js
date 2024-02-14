import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    try {
        const endpoint = "/api/batotorandom";
        const requestParams = { apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayza = res.result.results;
        const clayzaRes = clayza.map((v) => `*Title:* ${v.title.original}\n*Synonyms:* ${v.title.synonyms.join(", ")}}\n*Link:* https://bato.to/title/${v.id}\n*Thumbnail:* ${v.poster}`).join('\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n');
        conn.sendFile(m.chat, clayza[0].poster, '', clayzaRes, m);

    } catch (error) {
        console.error("Error:", error);
        m.reply(
            `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
        );
    }
};

handler.menucomic = ["batotorandom"];
handler.tagscomic = ["comic"];
handler.command = /^(batotorandom)$/i;

export default handler;
