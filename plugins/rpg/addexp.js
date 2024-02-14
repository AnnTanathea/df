import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Tag User'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Masukan Jumlah XP Untuk Di Tambahkan'
  if (isNaN(txt)) throw ' 🔢 Hanya Angka!!'
  let xp = parseInt(txt)
  let exp = xp
  
  if (exp < 1) throw '✳️ Minimal *1*'
  let users = db.data.users
  users[who].exp += xp

  await m.reply(`Succes Menambahkah Eris Sebesar ${xp} Ke User`)
 conn.fakeReply(m.chat, `▢ Did you recieve \n\n *+${xp} XP*`, who, m.text)
}

handler.menurpg = ['addxp *<@user> <jumlah>*']
handler.tagsrpg = ['ADMIN']
handler.command = ['addxp'] 
handler.rowner = true

export default handler