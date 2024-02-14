import db from '../../lib/database.js'
import { siapakahaku } from '@bochilteam/scraper'

let timeout = 120000
let poin = 3499
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
	let id = m.chat
	if (id in conn.siapakahaku) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
		throw false
	}
	let usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.eris > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	const json = await siapakahaku()
	let caption = `
🎮 *Siapakah Aku* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} eris
`.trim()
	conn.siapakahaku[id] = [
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0])
			delete conn.siapakahaku[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menugames = ['siapakahaku *(eris+)*']
handler.tagsgames = ['games']
handler.command = /^(siapa(kah)?aku)$/i
handler.register = true
handler.game = true

export default handler