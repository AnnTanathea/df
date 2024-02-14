import { sticker4 } from '../../lib/sticker.js';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const stiker = await sticker4(null, 'https://telegra.ph/file/276d3f4d623684c3c79f8.jpg', global.packname, global.author);
    if (stiker) {
      return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
    } else {
      throw 'Gagal membuat stiker.';
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat membuat stiker.', m);
  }
};

handler.customPrefix = /^@6281282405626$/i;
handler.command = new RegExp;

export default handler;