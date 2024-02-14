import db from '../../lib/database.js'

const rewards = {
	exp: 350,
	eris: 27000,
	potion: 2,
	wood: 4,
	rock: 4,
	string: 3,
	iron: 3,
}
const cooldown = 604800000
let handler = async (m) => {
	let user = db.data.users[m.sender]
	if (new Date - user.lastweekly < cooldown) throw `You have already claimed this weekly claim!, wait for *${((user.lastweekly + cooldown) - new Date()).toTimeString()}*`
	let text = ''
	for (let reward of Object.keys(rewards)) {
		if (!(reward in user)) continue
		user[reward] += rewards[reward]
		text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
	}
	m.reply(text.trim())
	user.lastweekly = new Date * 1
}

handler.menurpg = ['weekly']
handler.tagsrpg = ['rpg']
handler.command = /^(weekly)$/i

handler.cooldown = cooldown

export default handler
