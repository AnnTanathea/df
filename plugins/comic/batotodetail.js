import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
    if (!text) throw "Mau Nanya Apa?";
    try {
        // Extracting the ID from the URL
        const id = text.replace('https://bato.to/title/', '');

        const endpoint = "/api/batotodetail";
        const requestParams = { id: id, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayza = res.result.results;

        if (!clayza) {
            m.reply("Tidak ada hasil ditemukan.");
            return;
        }

        const { title, description, artists, poster, genres, score, status, chapters } = clayza;

        const chaptersList = chapters.map((chapter) => {
            return `*Chapter:* ${chapter.name}\n*ID:* ${chapter.id}\n*Link:* https://bato.to/title/${id}/${chapter.id}\n`;
        }).join('\n');

        const clayzaRes = `*Title:* ${title.original}\n` +
            `*Description:* ${description}\n` +
            `*Artists:* ${artists.join(", ")}\n` +
            `*Poster:* ${poster}\n` +
            `*Genres:* ${genres.join(", ")}\n` +
            `*Score:* ${score}\n` +
            `*Status:* ${status}\n` +
            `*Chapters:*\n${chaptersList}`;

        conn.sendFile(m.chat, poster, '', clayzaRes, m);

    } catch (error) {
        console.error("Error:", error);
        m.reply(
            `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
        );
    }
};

handler.menucomic = ["batotodetail *<text>*"];
handler.tagscomic = ["comic"];
handler.command = /^(batotodetail)$/i;

export default handler;
