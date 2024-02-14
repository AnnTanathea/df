import fetch from 'node-fetch'
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import CDNClayza from "../../lib/tools/CDNClayza.js";
import CDNUguu from "../../lib/tools/CDNUguu.js";
import DiscordCDN from "../../lib/tools/CDNDiscord.js";
const ThumCDN = 'https://telegra.ph/file/8e85b9937576aa41c2e3a.png'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Usage:\nV1= CDN Telegra (Img,Mp4 | Max 5mb | Permanen)\nV2= CDN Rosalyn (Img,Mp4 | Max 25mb | 5 Hours)\nV3= CDN Uguu (Img,Mp4 | Max 32mb | 3 Hours)\nV4= CDN Discord (Img,Mp4 | Max 25mb | Permanen)\n\nExample:\n.tourl v2 *<Reply Media>*");
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw "No media found";
  let media = await q.download();
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link;

  let version = text.toLowerCase();
  switch (version) {
    case "v1":
      link = await (isTele ? uploadImage : uploadFile)(media);
      break;
    case "v2":
      link = await (isTele ? CDNClayza : uploadFile)(media);
      break;
    case "v3":
      link = await (isTele ? CDNUguu : uploadFile)(media);
      break;
    case "v4":
      link = await (isTele ? DiscordCDN : uploadFile)(media);
      if (link.attachments && link.attachments.length > 0) {
        const result = link.attachments[0];
        const pesan = `*🖨 Link :* ${result.url}
*💾 Size :* ${formatBytes(result.size)}`;
        conn.sendMessage(m.chat, {
          text: pesan,
          contextInfo: {
            externalAdReply: {
              title: "Upload To CDN",
              body: "Success..",
              thumbnailUrl: ThumCDN,
              sourceUrl: `${link}`,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        })
      } else {
        await m.reply('Pesan Anda berhasil terkirim!');
      }
      break;
    default:
      throw "Invalid URL version. Use 'v1', 'v2' or 'v3'.";
  }

  if (version !== "v4") {
    const text = `*🖨 Link :* ${link}
*💾 Size :* ${formatBytes(media.length)}`
conn.sendMessage(m.chat, {
  text: text,
  contextInfo: {
    externalAdReply: {
      title: "Upload To CDN",
      body: "Success..",
      thumbnailUrl: ThumCDN,
      sourceUrl: `${link}`,
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
})
  }
};

handler.menutools = ["tourl *<option>*"];
handler.tagstools = ["tools"];
handler.command = /^(tourl|upload)$/i;
handler.limit = true;

export default handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function shortUrl(url) {
  const response = await fetch(`https://url.aubert.my.id/api/shorturl?url=${url}`);
  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error('Failed to shorten URL');
  }
  return data.data.shortUrl;
}