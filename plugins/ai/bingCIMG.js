import { MealynAPI } from '../../lib/maelyn.js';

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(what);
    m.reply(wait);

    try {
        const endpoint = "/api/bingimage";
        const requestParams = { prompt: text, apikey: MaelynKEY };

        const res = await MealynAPI(endpoint, requestParams);

        if (res.status === "Success" && res.result.length > 0) {
            for (let imageUrl of res.result) {
                conn.sendFile(m.chat, imageUrl, "bingimage.jpg");
            }
        } else {
            m.reply("Tidak dapat menemukan gambar untuk prompt tersebut.");
        }
    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan saat memproses permintaan.");
    }
};

handler.menuai = ["bingimg *<prompt>*"];
handler.tagsai = ["ai"];
handler.command = ["bingimg"];
handler.limit = true;
handler.premium = true;

export default handler;
