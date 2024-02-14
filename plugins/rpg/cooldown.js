
import fetch from "node-fetch";
import fs from "fs";
import db from "../../lib/database.js";

let handler = async (m, { conn, usedPrefix }) => {
    let whoo = m.sender
    let name1 = m.sender
    let pp = await conn.profilePictureUrl(whoo, 'image').catch(_ => '../../src/avatar_contact.png')
    let level = db.data.users[m.sender].level
    let {
        lastclaim,
        lastberburu,
        lastadventure,
        lastfishing,
        lastdungeon,
        lastduel,
        lastmining,
        lastmisi,
        lastlumber,
        lasthunt,
        lastjb,
        lastkerja,
        lastweekly,
        lastmonthly,
        lastbunga,
    } = db.data.users[m.sender];

    let who =
        m.mentionedJid && m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.fromMe
                ? conn.user.jid
                : m.sender;
    let name = await conn.getName(who);
    let username = `${await conn.getName(name1)}`
    let leveluser = `${level}`
    let str = `
*—「 Cooldown 」—*
*Last Claim :* ${lastclaim > 0 ? "❌" : "✅"}
*Last Berburu :* ${lastberburu > 0 ? "❌" : "✅"}
*Last Adventure :* ${lastadventure > 0 ? "❌" : "✅"}
*Last Memancing :* ${lastfishing > 0 ? "❌" : "✅"}
*Last Dungeon :* ${lastdungeon > 0 ? "❌" : "✅"}
*Last Duel :* ${lastduel > 0 ? "❌" : "✅"}
*Last Mining :* ${lastmining > 0 ? "❌" : "✅"}
*Last Misi :* ${lastmisi > 0 ? "❌" : "✅"}
*Last Lumber :* ${lastlumber > 0 ? "❌" : "✅"}
*Last Hunt :* ${lasthunt > 0 ? "❌" : "✅"}
*Last Jual Beli :* ${lastjb > 0 ? "❌" : "✅"}
*Last Kerja :* ${lastkerja > 0 ? "❌" : "✅"}
*Last Bunga :* ${lastbunga > 0 ? "❌" : "✅"}
*Last Weekly :* ${lastweekly > 0 ? "❌" : "✅"}
*Last Monthly :* ${lastmonthly > 0 ? "❌" : "✅"}
`.trim();
conn.sendMessage(m.chat, {
    text: str,
    contextInfo: {
        externalAdReply: {
            title: `Name : ${username}`,
            body: `Level : ${leveluser}`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
})
};
handler.menurpg = ["cd", "cooldown"];
handler.tagsrpg = ["rpg"];
handler.command = /^(cd|cooldown)$/i;
handler.group = true;
export default handler;


