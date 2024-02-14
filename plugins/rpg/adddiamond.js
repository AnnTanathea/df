import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Tag User'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Masukan Jumlah XP Untuk Di Tambahkan'
  if (isNaN(txt)) throw ' 🔢 Hanya Angka!!'
  let dm = parseInt(txt)
  let diamond = dm
  
  if (diamond < 1) throw '✳️ Minimal *1*'
  let users = db.data.users
  users[who].diamond += dm

  await m.reply(`Succes Menambahkah Diamond Sebesar ${dm} Ke User`)
 conn.fakeReply(m.chat, `▢ Did you recieve \n\n *+${dm} Diamond*`, who, m.text)
}

handler.menurpg = ['adddm *<@user> <jumlah>*']
handler.tagsrpg = ['ADMIN']
handler.command = ['adddm'] 
handler.rowner = true

export default handler