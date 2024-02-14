import fetch from 'node-fetch'
import path from 'path';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Example : *${usedPrefix + command} ahegao\n*List NSFW:*\n
• ass
• anal
• bdsm
• classic
• cum
• creampie
• manga
• femdom
• hentai
• incest
• masturbation
• public
• ero
• orgy
• elves
• yuri
• pantsu
• pussy
• glasses
• cuckold
• blowjob
• boobjob
• handjob
• footjob
• boobs
• thighs
• ahegao
• uniform
• gangbang
• tentacles
• nsfwNeko
• nsfwMobileWallpaper
• zettaiRyouiki`
    let res = await fetch(`https://hmtai.hatsunia.cfd/v2/${text}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'

    let ext = path.extname(json.url).slice(1);
    conn.sendFile(m.chat, json.url, `${text}.${ext}`, `Result: ${text}`, m)
}

handler.menuimage = ['nsfw']
handler.tagsimage = ['image']
handler.command = /^(nsfw)$/i
handler.register = true
handler.nsfw = true
handler.limit = true
export default handler
