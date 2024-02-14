import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '✳️ tag user'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '✳️ Masukan Jumlah Eris Untuk Di Tambahkan'
    if (isNaN(txt)) throw '🔢 Hanya Angka!!'
    let dmt = parseInt(txt)
    let diamond = dmt

    if (diamond < 1) throw '✳️ Minimal  *1*'
    let users = db.data.users
    users[who].eris += dmt
 
    await m.reply(`
Succes Menambahkah Eris Sebesar ${dmt} Ke User`)
    conn.fakeReply(m.chat, `▢ Did you receive \n\n *+${dmt}* Eris`, who, m.text)
}

handler.menurpg = ['adderis *<@user> <jumlah>*']
handler.tagsrpg = ['ADMIN']
handler.command = ['adderis']
handler.rowner = true

export default handler