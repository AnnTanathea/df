import { performance } from 'perf_hooks'

let handler = async (m, { conn }) => {

 let start = `⚡ Boosting . . .`

   await m.reply(start)
   let old = performance.now()
   let neww = performance.now()
   let speed = `${neww - old}`
   let finish = `✔️Berhasil mempercepat Bot hingga\n${speed} milisec!`

     conn.reply(m.chat, finish, m)
}
handler.menuinfo = ['boost', 'refresh']
handler.tagsinfo = ['info']
handler.command = /^boost|refresh/i
handler.register = true
handler.fail = null
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
