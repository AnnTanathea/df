import { MealynAPI } from '../../lib/maelyn.js';

let handler = async (m, { conn, text }) => {
    if (m.isHandled) return;
    m.isHandled = true;
    if (!text) return m.reply(what);
    m.reply(wait);

    try {
        const endpoint = "/api/instagram";
        const requestParams = { url: text, apikey: MaelynKEY };

        const res = await MealynAPI(endpoint, requestParams);

        if (res.status === "Success" && res.result.length > 0) {
            for (let imageUrl of res.result) {
                conn.sendFile(m.chat, imageUrl, "instagram.jpg");
            }
        } else {
            m.reply("Tidak dapat menemukan Video tersebut.");
        }
    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan saat memproses permintaan.");
    }
};

handler.menudownload = ["instagram *<link>*"];
handler.tagsdownload = ["download"];
handler.command = ["instagram"];

export default handler;
