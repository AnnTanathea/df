let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `Contoh penggunaan:\n${usedPrefix + command} aku siapa? @6286512149646 kamu ownerku ><`, m, { contextInfo: { mentionedJid: ['6286512149646@s.whatsapp.net'] } })
  let cm = copy(m)
  let who
  if (text.includes('@0')) who = '0@s.whatsapp.net'
  else if (m.isGroup) who = cm.participant = m.mentionedJid[0]
  else who = m.chat
  if (!who) return conn.reply(m.chat, `Contoh penggunaan:\n${usedPrefix + command} aku siapa? @6286512149646 kamu ownerku ><`, m, { contextInfo: { mentionedJid: ['6286512149646@s.whatsapp.net'] } })
  cm.key.fromMe = false
  cm.message[m.mtype] = copy(m.msg)
  let sp = '@' + who.split`@`[0]
  let [fake, ...real] = text.split(sp)
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
    contextInfo: {
      mentionedJid: conn.parseMention(real.join(sp).trim())
    }
  })
}
handler.menufun = ['fitnah *<teks> @user <teks>*']
handler.tagsfun = ['fun']
handler.command = /^(fitnah|fakereply)$/
handler.group = true 
export default handler 

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}