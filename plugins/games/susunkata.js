import db from '../../lib/database.js'
import { susunkata } from '@bochilteam/scraper'

let timeout = 120000
let poin = 3499
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	conn.susunkata = conn.susunkata ? conn.susunkata : {}
	let id = m.chat
	if (id in conn.susunkata) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
		throw false
	}
	let usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.eris > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	const json = await susunkata()
	let caption = `
🎮 *Susun Kata* 🎮

Soal : ${json.soal}
Tipe : ${json.tipe}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} eris
`.trim()
	conn.susunkata[id] = [
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.susunkata[id][0])
			delete conn.susunkata[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menugames = ['susunkata *(eris+)*']
handler.tagsgames = ['games']
handler.command = /^(susunkata)$/i
handler.register = true
handler.game = true

export default handler