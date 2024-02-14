import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
  let user = db.data.users[m.sender]
  let level = db.data.users[m.sender].level
  let leveluser = `${level}`
  const caption = `
*BANK PLAYER* 
*Eris :* ${user.eris} 💲
*Bank :* ${user.bank} 💲 / ${user.fullatm} 💲
`.trim()
conn.sendMessage(m.chat, {
  text: caption,
  contextInfo: {
      externalAdReply: {
          title: `Name : ${user.registered ? user.name : conn.getName(m.sender)}`,
          body: `Level : ${leveluser}`,
          thumbnailUrl: 'https://i.ibb.co/qg32y3C/Iron-Bank.jpg',
          mediaType: 1,
          renderLargerThumbnail: true
      }
  }
})
}
handler.menurpg = ['bank']
handler.tagsrpg = ['rpg']
handler.command = /^(bank)$/i

handler.register = true
export default handler
