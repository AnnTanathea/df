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
Berikut adalah story menu yang kami sediakan, setiap story hanya dapat di buka jika level kalian mencukupi.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsstory = {
		'story': 'STORY RPG MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menustory = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menustory: Array.isArray(plugin.tagsstory) ? plugin.menustory : [plugin.menustory] ,
				tagsstory: Array.isArray(plugin.tagsstory) ? plugin.tagsstory : [plugin.tagsstory],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menustory)
			if (plugin && 'tagsstory' in plugin)
				for (let tag of plugin.tagsstory)
					if (!(tag in tagsstory) && tag) tagsstory[tag] = tag
		conn.storymenu = conn.storymenu ? conn.storymenu : {}
		let before = conn.storymenu.before || defaultMenu.before
		let header = conn.storymenu.header || defaultMenu.header
		let body = conn.storymenu.body || defaultMenu.body
		let footer = conn.storymenu.footer || defaultMenu.footer
		let after = conn.storymenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsstory).map(tag => {
				return header.replace(/%category/g, tagsstory[tag]) + '\n' + [
					...menustory.filter(storymenu => storymenu.tagsstory && storymenu.tagsstory.includes(tag) && storymenu.menustory).map(storymenu => {
						return storymenu.menustory.map(menustory => {
							return body.replace(/%cmd/g, storymenu.prefix ? menustory : '%p' + menustory)
								.replace(/%islimit/g, storymenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, storymenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.storymenu == 'string' ? conn.storymenu : typeof conn.storymenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.story }, gifPlayback: true, caption: text });
		conn.sendMessage(m.chat, {
			text: text,
			contextInfo: {
				externalAdReply: {
					title: global.namebot,
					body: global.author,
					thumbnailUrl: global.story,
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

handler.help = ['*[17]* storymenu']
handler.tags = ['victoriamenu']
handler.command = /^(storym(enu)?|m(enu)?story|17)$/i

export default handler