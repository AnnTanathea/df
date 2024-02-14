import db from '../../lib/database.js'
import { tebakgambar } from '@bochilteam/scraper'

let timeout = 120000
let poin = 3499
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
	let id = m.chat
	if (id in conn.tebakgambar) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
		throw false
	}
	let usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.eris > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	try {
		const json = await tebakgambar()
		let caption = `
🎮 *Tebak Gambar* 🎮

${json.deskripsi}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} eris
`.trim()
		conn.tebakgambar[id] = [
			await conn.sendMsg(m.chat, { image: { url: json.img }, caption: caption }, { quoted: m }),
			json, poin,
			setTimeout(() => {
				if (conn.tebakgambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgambar[id][0])
				delete conn.tebakgambar[id]
			}, timeout)
		]
		console.log(json.jawaban)
	} catch (e) {
		console.log(e)
		throw 'failed to fetch image, try again'
	}
}

handler.menugames = ['tebakgambar *(eris+)*']
handler.tagsgames = ['games']
handler.command = /^(tebakgambar)$/i
handler.register = true
handler.game = true

export default handler