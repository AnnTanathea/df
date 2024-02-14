import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
    let health = db.data.users[m.sender].health
    let armor = db.data.users[m.sender].armor
    let diamond = db.data.users[m.sender].diamond
    let trash = db.data.users[m.sender].trash
    let wood = db.data.users[m.sender].wood
    let coal = db.data.users[m.sender].coal
    let rock = db.data.users[m.sender].rock
    let emerald = db.data.users[m.sender].emerald
    let gold = db.data.users[m.sender].gold
    let potion = db.data.users[m.sender].potion
    let common = db.data.users[m.sender].common
    let uncommon = db.data.users[m.sender].uncommon
    let mythic = db.data.users[m.sender].mythic
    let legendary = db.data.users[m.sender].legendary
    let level = db.data.users[m.sender].level
    let exp = db.data.users[m.sender].exp
    let limit = db.data.users[m.sender].limit
    let iron = db.data.users[m.sender].iron
    let sword = db.data.users[m.sender].sword
    let string = db.data.users[m.sender].string
    let sortederis = Object.entries(db.data.users).sort((a, b) => b[1].eris - a[1].eris)
    let sortedlevel = Object.entries(db.data.users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(db.data.users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedtrash = Object.entries(db.data.users).sort((a, b) => b[1].trash - a[1].trash)
    let sortedcommon = Object.entries(db.data.users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncommon = Object.entries(db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
    let sortedmythic = Object.entries(db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
    let userseris = sortederis.map(v => v[0])
    let who = m.sender
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
    let name = m.sender
    let username = `${await conn.getName(name)}`
    let leveluser = `${level}`
    let str = `
*INVENTORY ${username}*
Health: *${health}*
Armor: *${armor == 0 ? 'Tidak Punya' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Netherite Armor' : ''}*
Sword: *${sword}*
Limit: *${limit}*
Exp: *${exp}*

*Inventory Kotak Harta*
Common: *${common}*
Uncommon: *${uncommon}*
Mythic: *${mythic}*
Legendary: *${legendary}*

*Inventory Nambang*
Diamond: ${diamond}
Gold: *${gold}*
Emerald: *${emerald}*
Potion: *${potion}*
Trash: *${trash}*
Wood: *${wood}*
Iron: *${iron}*
Rock: *${rock}*
String: *${string}*
Coal: *${coal}*
`.trim()
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
}
handler.menurpg = ['inv']
handler.tagsrpg = ['rpg']
handler.command = /^(inv|inventory)$/i
handler.group = false
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)