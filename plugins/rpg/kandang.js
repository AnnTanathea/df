import db from '../../lib/database.js'
let handler = async (m, {
	conn,
	usedPrefix
}) => {
	let chicken = db.data.users[m.sender].chicken
	let cow = db.data.users[m.sender].cow
	let goat = db.data.users[m.sender].goat
	let rabbit = db.data.users[m.sender].rabbit
	let sheep = db.data.users[m.sender].sheep
	let bear = db.data.users[m.sender].bear
	let pig = db.data.users[m.sender].pig
    let level = db.data.users[m.sender].level
    let who = m.sender
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
    let name = m.sender
    let username = `${await conn.getName(name)}`
    let leveluser = `${level}`

	let ndy = `List Hewan Di Kandang
    
• Chicken: ${chicken} Ekor
• Cow: ${cow} Ekor
• Goat: ${goat} Ekor
• Rabbit: ${rabbit} Ekor
• Sheep: ${sheep} Ekor
• Bear: ${bear} Ekor
• Pig: ${pig} Ekor
 
 `.trim()
let tb = 'https://telegra.ph/file/b4fe86d33e3494881bd3d.jpg'
 conn.sendMessage(m.chat, {
    text: ndy,
    contextInfo: {
        externalAdReply: {
            title: `Name : ${username}`,
            body: `Level : ${leveluser}`,
            thumbnailUrl: tb,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
})

}
handler.menurpg = ['kandang']
handler.tagsrpg = ['rpg']
handler.register = true
handler.command = /^(kandang)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
