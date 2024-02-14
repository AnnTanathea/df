import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Use example: \n.qrcode Clara Aubert', m)

conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '¯\\_(ツ)_/¯', m)
}

handler.menutools = ['', 'code'].map(v => 'qr' + v + ' *<teks>*')
handler.tagstools = ['tools']
handler.command = /^qr(code)?$/i


export default handler