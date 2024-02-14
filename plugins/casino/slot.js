let reg = 40
import db from '../../lib/database.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {


   /* if (global.db.data.users[m.sender].level < 5) {
        return conn.reply(m.chat, 'You must be at least level 5 to use this command.', m);
    }*/

    let fa = `🟥 *Provide the amount of Eris to bet*

*Example :
${usedPrefix + command} 500*`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let amount = parseInt(args[0])
    let users = db.data.users[m.sender]
    let time = users.lastslot + 10000
    if (new Date - users.lastslot < 10000) throw `⏳ Wait *${msToTime(time - new Date())}* to use again`
    if (amount < 500) throw `🟥 *You can't bet Eris less than 500*`
    if (users.eris < amount) {
        throw `🟥 *You do not have enough Eris to bet*`
    }
    if (amount > 100000) throw `🟥 *You can't bet Eris more than 100000*`

    let emojis = ["🕊️", "🦀", "🦎"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `🎊 *Jackpot!* You won ${amount + amount} Eris`
        users.credit += amount + amount
   // } else if (a == b || a == c || b == c) {
   //     end = `You lost  *₹${amount}*\n*But you almost made it keep trying*`
   //     users.eris -= amount
    } else {
        end = `      You lost ${amount} Eris`
        users.eris -= amount
    }
    users.lastslot = new Date * 1
    return await m.reply(
        `
     🎰 ┃ *SLOTS* ┃ 🎰
     ───────────
         ${x[0]} : ${y[0]} : ${z[0]}
         ${x[1]} : ${y[1]} : ${z[1]}
         ${x[2]} : ${y[2]} : ${z[2]}
     ───────────     
${end}`) 
}
handler.menucasino = ['slot *<amount>*']
handler.tagscasino = ['casino']
handler.command = ['slot']
handler.register = true
handler.group = true

export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return seconds + " seconds"
}