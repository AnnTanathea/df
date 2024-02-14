import { MealynAPI } from '../../lib/maelyn.js';
import uploadImage from '../../lib/uploadImage.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .jadianime';

        conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });
        let media = await q.download();
        let url = await uploadImage(media);

        const endpoint = "/api/geminiimage";
        const requestParams = { q: text, url: url, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        const clayza = res.result;

        await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
        await m.reply(clayza)
    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        m.reply("Terjadi kesalahan saat memproses permintaan. Pastikan server dalam kondisi baik atau coba lagi nanti.");
    }
};

handler.menuai = ['geminiimg *<text + image>*'];
handler.tagsai = ['ai'];
handler.command = /^(geminiimg)$/i;
handler.limit = true;
handler.premium = true;

export default handler;
