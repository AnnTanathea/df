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
Berikut adalah menu sticker yang kami sediakan.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagssticker = {
		'sticker': 'STICKER MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menusticker = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menusticker: Array.isArray(plugin.tagssticker) ? plugin.menusticker : [plugin.menusticker] ,
				tagssticker: Array.isArray(plugin.tagssticker) ? plugin.tagssticker : [plugin.tagssticker],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menusticker)
			if (plugin && 'tagssticker' in plugin)
				for (let tag of plugin.tagssticker)
					if (!(tag in tagssticker) && tag) tagssticker[tag] = tag
		conn.stickermenu = conn.stickermenu ? conn.stickermenu : {}
		let before = conn.stickermenu.before || defaultMenu.before
		let header = conn.stickermenu.header || defaultMenu.header
		let body = conn.stickermenu.body || defaultMenu.body
		let footer = conn.stickermenu.footer || defaultMenu.footer
		let after = conn.stickermenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagssticker).map(tag => {
				return header.replace(/%category/g, tagssticker[tag]) + '\n' + [
					...menusticker.filter(stickermenu => stickermenu.tagssticker && stickermenu.tagssticker.includes(tag) && stickermenu.menusticker).map(stickermenu => {
						return stickermenu.menusticker.map(menusticker => {
							return body.replace(/%cmd/g, stickermenu.prefix ? menusticker : '%p' + menusticker)
								.replace(/%islimit/g, stickermenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, stickermenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.stickermenu == 'string' ? conn.stickermenu : typeof conn.stickermenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.sticker }, gifPlayback: true, caption: text });
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

handler.help = ['*[15]* stickermenu']
handler.tags = ['victoriamenu']
handler.command = /^(stickerm(enu)?|m(enu)?sticker|15)$/i

export default handler