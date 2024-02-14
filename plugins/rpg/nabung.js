import db from '../../lib/database.js'
const xpperlimit = 1

let handler = async (m, { conn, command, args }) => {
	let user = db.data.users[m.sender]
  let count = command.replace(/^nabung/i, '')
  count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].eris / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.atm == 0) return m.reply('Kamu Belum Punya ATM, Bikin Dulu Sana')
  if (db.data.users[m.sender].eris >= xpperlimit * count) {
    db.data.users[m.sender].eris -= xpperlimit * count
    db.data.users[m.sender].bank += count
    conn.reply(m.chat, `Sukses Menabung Eris Sebesar ${count}`, m)
  } else conn.reply(m.chat, `Eris Kamu Tidak Mencukupi Untuk di Tabung ${count}`, m)
}
handler.menurpg = ['nabung']
handler.tagsrpg = ['rpg']
handler.command = /^nabung([0-9]+)|nabung|nabungall$/i
handler.register = true

export default handler
