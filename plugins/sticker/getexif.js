import { format } from 'util'
const { default: { Image } } = await import('node-webpmux')

let handler = async (m) => {
    if (!m.quoted) return m.reply('Tag stikernya!')
    if (/sticker/.test(m.quoted.mtype)) {
        let img = new Image()
        await img.load(await m.quoted.download())
        m.reply(format(JSON.parse(img.exif.slice(22).toString())))
    }
}
handler.menusticker = ['getexif *<reply_stiker>*']
handler.tagssticker = ['sticker']
handler.command = ['getexif']

handler.limit = true;
export default handler