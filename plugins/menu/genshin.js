import db from '../../lib/database.js'
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

╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Berikut adalah menu dari genshin impact, menun ini mencari informasi seputar genshin.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsgenshin = {
		'genshin': 'GENSHIN IMPACT MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menugenshin = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menugenshin: Array.isArray(plugin.tagsgenshin) ? plugin.menugenshin : [plugin.menugenshin] ,
				tagsgenshin: Array.isArray(plugin.tagsgenshin) ? plugin.tagsgenshin : [plugin.tagsgenshin],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menugenshin)
			if (plugin && 'tagsgenshin' in plugin)
				for (let tag of plugin.tagsgenshin)
					if (!(tag in tagsgenshin) && tag) tagsgenshin[tag] = tag
		conn.genshinmenu = conn.genshinmenu ? conn.genshinmenu : {}
		let before = conn.genshinmenu.before || defaultMenu.before
		let header = conn.genshinmenu.header || defaultMenu.header
		let body = conn.genshinmenu.body || defaultMenu.body
		let footer = conn.genshinmenu.footer || defaultMenu.footer
		let after = conn.genshinmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsgenshin).map(tag => {
				return header.replace(/%category/g, tagsgenshin[tag]) + '\n' + [
					...menugenshin.filter(genshinmenu => genshinmenu.tagsgenshin && genshinmenu.tagsgenshin.includes(tag) && genshinmenu.menugenshin).map(genshinmenu => {
						return genshinmenu.menugenshin.map(menugenshin => {
							return body.replace(/%cmd/g, genshinmenu.prefix ? menugenshin : '%p' + menugenshin)
								.replace(/%islimit/g, genshinmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, genshinmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.genshinmenu == 'string' ? conn.genshinmenu : typeof conn.genshinmenu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p,
			me: conn.getName(conn.user.jid),
			github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
			limit, name, role, _p, eris, age, prems, level,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		//conn.sendMessage(m.chat, { video: { url: global.genshin }, gifPlayback: true, caption: text });
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

handler.help = ['*[08]* genshinmenu']
handler.tags = ['victoriamenu']
handler.command = /^(genshinm(enu)?|m(enu)?genshin|08)$/i

export default handler