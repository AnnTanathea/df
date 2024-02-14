import db from '../../lib/database.js'
import { xpRange } from '../../lib/levelling.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

const defaultMenu = {
	before: `
⌬〡 *Nama Bot:* %me
⌬〡 *Nama:*  %name 
⌬〡︎ *Premium:* %prems 🅟
⌬〡︎ *Limit:* %limit 🅛
⌬〡 *Role:* %role
⌬〡︎ *Level:* %level
⌬〡︎ *Xp:* %exp / %maxexp
⌬〡︎ *Total Xp:* %totalexp

╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
_Di Mohon untuk tidak terlalu spam._

╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Kami sudah menyajikan story untuk setiap level tertentu yang nantinya akan ada potongan cerita, anda juga dapat membaca story di story menu, yang dapat di buka di level tertentu saja, level maksimal dari story ini adalah 100.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsrpg = {
		'rpg': 'RPG MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let { min, xp, max } = xpRange(level, global.multiplier)
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menurpg = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menurpg: Array.isArray(plugin.tagsrpg) ? plugin.menurpg : [plugin.menurpg],
				tagsrpg: Array.isArray(plugin.tagsrpg) ? plugin.tagsrpg : [plugin.tagsrpg],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menurpg)
			if (plugin && 'tagsrpg' in plugin)
				for (let tag of plugin.tagsrpg)
					if (!(tag in tagsrpg) && tag) tagsrpg[tag] = tag
		conn.rpgmenu = conn.rpgmenu ? conn.rpgmenu : {}
		let before = conn.rpgmenu.before || defaultMenu.before
		let header = conn.rpgmenu.header || defaultMenu.header
		let body = conn.rpgmenu.body || defaultMenu.body
		let footer = conn.rpgmenu.footer || defaultMenu.footer
		let after = conn.rpgmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsrpg).map(tag => {
				return header.replace(/%category/g, tagsrpg[tag]) + '\n' + [
					...menurpg.filter(rpgmenu => rpgmenu.tagsrpg && rpgmenu.tagsrpg.includes(tag) && rpgmenu.menurpg).map(rpgmenu => {
						return rpgmenu.menurpg.map(menurpg => {
							return body.replace(/%cmd/g, rpgmenu.prefix ? menurpg : '%p' + menurpg)
								.replace(/%islimit/g, rpgmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, rpgmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.rpgmenu == 'string' ? conn.rpgmenu : typeof conn.rpgmenu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p,
			exp: exp - min,
			maxexp: xp,
			totalexp: exp,
			xp4levelup: max - exp,
			me: conn.getName(conn.user.jid),
			github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
			limit, name, role, _p, eris, age, prems, level,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		//conn.sendMessage(m.chat, { video: { url: global.rpg }, gifPlayback: true, caption: text });
		conn.sendMessage(m.chat, {
			text: text,
			contextInfo: {
				externalAdReply: {
					title: global.namebot,
					body: global.author,
					thumbnailUrl: nais,
					sourceUrl: global.myweb,
					mediaType: 1,
					renderLargerThumbnail: true
				}
			}
		})
	} catch (e) {
		throw e
	}
}

handler.help = ['*[14]* rpgmenu']
handler.tags = ['victoriamenu']
handler.command = /^(rpgm(enu)?|m(enu)?rpg|14)$/i

export default handler