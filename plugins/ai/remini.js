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

        const endpoint = "/api/remini";
        const requestParams = { url: url, apikey: MaelynKEY };
        const res = await MealynAPI(endpoint, requestParams);

        if (!res || res.status !== 'Success' || !res.result || !res.result.name) {
            throw new Error("Failed to retrieve anime image. Please try again later.");
        }

        let hasil = res.result.name;
        let size = formatFileSize(res.result.size);
        let expired = convertToHours(res.result.expired);

        await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
        await conn.sendFile(m.chat, hasil, 'remini.jpg', `Size: ${size}\nExpired: ${expired}`, m);
    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        m.reply("Terjadi kesalahan saat memproses permintaan. Pastikan server dalam kondisi baik atau coba lagi nanti.");
    }
};

handler.menuai = ['remini *<reply_media>*'];
handler.tagsai = ['ai'];
handler.command = /^(remini)$/i;
handler.limit = true;
handler.premium = true;

export default handler;

// Function to format file size
function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// Function to convert expiration time to hours
function convertToHours(expirationTimestamp) {
    const currentTimestamp = Date.now();
    const millisecondsRemaining = expirationTimestamp - currentTimestamp;
    const hoursRemaining = Math.floor(millisecondsRemaining / (1000 * 60 * 60));
    return `${hoursRemaining} hours`;
}