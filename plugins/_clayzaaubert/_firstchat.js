import moment from 'moment-timezone';
import db from '../../lib/database.js'
export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat dinihari 🌆"
    if (time >= 4) {
        res = "Selamat pagi 🌄"
    }
    if (time > 10) {
        res = "Selamat siang ☀️"
    }
    if (time >= 15) {
        res = "Selamat sore 🌇"
    }
    if (time >= 18) {
        res = "Selamat malam 🌙"
    }

    let user = db.data.users[m.sender]
    let txt = `👋 Hai, ${res}

${user.banned ? '📮Maaf, kamu dibanned & Tidak bisa menggunakan bot ini lagi' : `Saya ${namebot}, WhatsApp bot yang siap membantu sehari-hari Anda. Cukup ketik ".menu" untuk menjelajahi fitur-fitur saya.`}`.trim()

    if (new Date() - user.pc < 21600000) return // waktu ori 21600000 (6 jam)
    await this.reply(m.chat, txt, null)
    user.pc = new Date * 1
}