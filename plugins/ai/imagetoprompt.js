import { MealynAPI } from '../../lib/maelyn.js';
import uploadImage from '../../lib/uploadImage.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .img2prompt';

        m.reply('Tunggu Sebentar...');
        let media = await q.download();
        let url = await uploadImage(media);

        const endpoint = "/api/img2prompt";
        const requestParams = { url: url, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        console.log('API Response:', res);
        if (!res || res.status !== 'Success') {
            throw new Error("Failed to retrieve image. Please try again later.");
        }

        let hasil = res.result;

        await conn.sendFile(m.chat, media, 'ocr.jpg', `${hasil}`, m);
    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan saat memproses permintaan. Mungkin file terlalu besar atau silakan coba lagi nanti.");
    }
};

handler.menuai = ['img2prompt'];
handler.tagsai = ['ai'];
handler.command = /^(img2prompt)$/i;
handler.limit = true;
handler.premium = true;

export default handler;
