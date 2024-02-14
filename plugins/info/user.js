import fs from 'fs'
import moment from 'moment-timezone'
import db from '../../lib/database.js'

let handler = async (m, { usedPrefix, command, conn, text }) => {
  let mentionedJid = [m.sender]
let name = conn.getName(m.sender)
let usernya = global.thumb
    let totalreg = Object.keys(db.data.users).length
    let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
    let kon = `*Database Saat Ini ${totalreg} User*\n*Terdaftar Saat Ini ${rtotalreg} User*`
    await conn.sendMessage(m.chat, { image: { url: global.thumb },  caption: kon }, m)
}
handler.menuinfo = ['user']
handler.tagsinfo = ['info']
handler.command = /^(pengguna|(jumlah)?database|user)$/i

export default handler
