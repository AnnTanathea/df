import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Tag User'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Masukan Jumlah XP Untuk Di Tambahkan'
  if (isNaN(txt)) throw ' 🔢 Hanya Angka!!'
  let eme = parseInt(txt)
  let emerald = eme
  
  if (emerald < 1) throw '✳️ Minimal *1*'
  let users = db.data.users
  users[who].emerald += eme

  await m.reply(`Succes Menambahkah Emerald Sebesar ${eme} Ke User`)
 conn.fakeReply(m.chat, `▢ Did you recieve \n\n *+${eme} Emerald*`, who, m.text)
}

handler.menurpg = ['addeme *<@user> <jumlah>*']
handler.tagsrpg = ['ADMIN']
handler.command = ['addeme'] 
handler.rowner = true

export default handler