import db from '../../lib/database.js'

const xpperlimit = 1
let handler = async (m, { conn, command, args }) => {
	let user = db.data.users[m.sender]
  let count = command.replace(/^tarik/i, '')
  count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].bank / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.atm == 0) return m.reply('Kamu Belum Punya ATM, Bikin Dulu Sana')
  if (db.data.users[m.sender].bank >= xpperlimit * count) {
    db.data.users[m.sender].bank -= xpperlimit * count
    db.data.users[m.sender].eris += count
    conn.reply(m.chat, `Sukses Menarik Eris Sebesar ${count}`, m)
  } else conn.reply(m.chat, `Eris Kamu Tidak Mencukupi Untuk Menarik ${count}`, m)
}
handler.menurpg = ['tarik']
handler.tagsrpg = ['rpg']
handler.command = /^tarik([0-9]+)|tarik|tarikall$/i
handler.register = true

export default handler
