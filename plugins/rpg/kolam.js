import db from '../../lib/database.js'
let { MessageType } = (await import('@whiskeysockets/baileys')).default
let handler = async (m, { conn }) => {

    let username = db.data.users[m.sender].name
    let leveluser = db.data.users[m.sender].level
    let exp = db.data.users[m.sender].exp
    let nixie = db.data.users[m.sender].nixie
    let triton = db.data.users[m.sender].triton
    let marlin = db.data.users[m.sender].marlin
    let coralin = db.data.users[m.sender].coralin
    let finley = db.data.users[m.sender].finley
    let gourami = db.data.users[m.sender].gourami
    let azure = db.data.users[m.sender].azure
    let wave = db.data.users[m.sender].wave
    let keplie = db.data.users[m.sender].keplie
    let lagoon = db.data.users[m.sender].lagoon
    let aqualis = db.data.users[m.sender].aqualis
    let fingrod = db.data.users[m.sender].fingrod
    let nymphora = db.data.users[m.sender].nymphora
    let zeplyn = db.data.users[m.sender].zeplyn
    let tritonus = db.data.users[m.sender].tritonus
    let finara = db.data.users[m.sender].finara
    let naucitus = db.data.users[m.sender].naucitus
    let tetra = db.data.users[m.sender].tetra
    let clownfi = db.data.users[m.sender].clownfi
    let hyoxis = db.data.users[m.sender].hyoxis
    let past = `*—「 KOLAM  」—*
━─┈───────────────┈─━
• Nixie: *${nixie}*   
• Triton: *${triton}*   
• Marlin: *${marlin}*   
• Coralin: *${coralin}*   
• Finley: *${finley}*  
• Gourami: *${gourami}*
• Azure: *${azure}*
• Wave: *${wave}*
• Keplie: *${keplie}*
• Lagoon: *${lagoon}*
• Aqualis: *${aqualis}*
• Fingrod: *${fingrod}*
• Nymphora: *${nymphora}*
• Zeplyn: *${zeplyn}*
• Tritonus: *${tritonus}*
• Finara: *${finara}*
• Naucitus: *${naucitus}*
• Tetra: *${tetra}*
• Clownfi: *${clownfi}*
• Hyoxis: *${hyoxis}*
`.trim()
conn.sendMessage(m.chat, {
    text: past,
    contextInfo: {
        externalAdReply: {
            title: `Name : ${username}`,
            body: `Level : ${leveluser}`,
            thumbnailUrl: `https://telegra.ph/file/a247af38708f316e042fb.jpg`,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
})
}
handler.menurpg = ['kolam']
handler.tagsrpg = ['rpg']
handler.command = /^(kotak(ikan)?|kolam(ikan)?)$/i
handler.group = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
