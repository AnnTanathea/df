import { MealynAPI } from '../../lib/maelyn.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) throw 'Kirim/Reply Gambar Dengan Caption .img2prompt';

        m.reply('Tunggu Sebentar...');

        const endpoint = "/api/dalle";
        const requestParams = { prompt: text, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);
        if (!res || res.status !== 'Success' || !res.result || !res.result.name) {
            throw new Error("Failed to retrieve anime image. Please try again later.");
        }

        let hasil = res.result.name;

        await conn.sendFile(m.chat, hasil, 'ocr.jpg', `Prompt : ${text}\nModel : Pixelart`, m);
    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan saat memproses permintaan. Mungkin file terlalu besar atau silakan coba lagi nanti.");
    }
};

handler.menuai = ['dalle *<prompt>*'];
handler.tagsai = ['ai'];
handler.command = /^(dalle)$/i;
handler.limit = true;
handler.premium = true;

export default handler;