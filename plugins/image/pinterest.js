import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Nanya Apa?";
  try {
    const endpoint = "/api/pinterest";
    const requestParams = { q: text, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);

    if (res.result.length === 0) {
      return m.reply(`Tidak dapat menemukan gambar untuk pencarian: ${text}`);
    }
    const randomIndex = Math.floor(Math.random() * res.result.length);
    const randomImageUrl = res.result[randomIndex];
    console.log(randomImageUrl)

    await conn.sendFile(m.chat, randomImageUrl, 'pinterest.jpg', `*Search result*\n->    ${text}`.trim(), m);
  } catch (error) {
    console.error("Error:", error);
    m.reply(
      `Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`
    );
  }
};

handler.menuimage = ["pinterest *<text>*"];
handler.tagsimage = ["image"];
handler.command = /^(pinterest)$/i;

export default handler;
