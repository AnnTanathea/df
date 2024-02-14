import { MealynAPI } from '../../lib/maelyn.js';
import uploadImage from '../../lib/uploadImage.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .jadianime';

        m.reply('Tunggu Sebentar...');
        let media = await q.download();
        let url = await uploadImage(media);

        const endpoint = "/api/ocr";
        const requestParams = { url: url, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);

        let hasil = res.result;

        await conn.sendFile(m.chat, media, 'ocr.jpg', `${hasil}`, m);
    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan saat memproses permintaan. Pastikan server dalam kondisi baik atau coba lagi nanti.");
    }
};

handler.menuai = ['ocr'];
handler.tagsai = ['ai'];
handler.command = /^(ocr)$/i;
handler.limit = true;
handler.premium = true;

export default handler;