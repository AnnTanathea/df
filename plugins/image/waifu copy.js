import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    let res = await fetch(`https://api.waifu.pics/nsfw/waifu`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendFile(m.chat, json.url, '', 'istri kartun', m)
}
handler.menuimage = ['waifu18']
handler.tagsimage = ['image']
handler.command = /^(waifu18)$/i
handler.register = true
handler.limit = true
export default handler
