import db from '../../lib/database.js'

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = db.data.chats[m.chat]
  let sender = db.data.chats[m.sender]
  let isSticker = m.mtype
  let fdel = m.key.participant
  let clayza = m.key.id
  if (chat.antiSticker && isSticker) {
    if(isSticker === "stickerMessage"){
        if (isAdmin || !isBotAdmin){		  
        } else {
          await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: clayza, participant: fdel }})
          await conn.reply(m.chat, `*Sticker Terdeteksi*\n\nMaaf Tapi Harus Saya Hapus, Karena Admin/Owner Mengaktifkan Anti Sticker Untuk Chat Ini`, m)
          return false
        }
        return true
    }
  }
  return true
}
