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
Berikut adalah menu dari AI (Artificial Intelligence)
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsai = {
		'ai': 'AI MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch(`https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json`)).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menuai = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuai: Array.isArray(plugin.tagsai) ? plugin.menuai : [plugin.menuai] ,
				tagsai: Array.isArray(plugin.tagsai) ? plugin.tagsai : [plugin.tagsai],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuai)
			if (plugin && 'tagsai' in plugin)
				for (let tag of plugin.tagsai)
					if (!(tag in tagsai) && tag) tagsai[tag] = tag
		conn.aimenu = conn.aimenu ? conn.aimenu : {}
		let before = conn.aimenu.before || defaultMenu.before
		let header = conn.aimenu.header || defaultMenu.header
		let body = conn.aimenu.body || defaultMenu.body
		let footer = conn.aimenu.footer || defaultMenu.footer
		let after = conn.aimenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsai).map(tag => {
				return header.replace(/%category/g, tagsai[tag]) + '\n' + [
					...menuai.filter(aimenu => aimenu.tagsai && aimenu.tagsai.includes(tag) && aimenu.menuai).map(aimenu => {
						return aimenu.menuai.map(menuai => {
							return body.replace(/%cmd/g, aimenu.prefix ? menuai : '%p' + menuai)
								.replace(/%islimit/g, aimenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, aimenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.aimenu == 'string' ? conn.aimenu : typeof conn.aimenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.ai }, gifPlayback: true, caption: text });
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

handler.help = ['*[01]* aimenu']
handler.tags = ['victoriamenu']
handler.command = /^(aim(enu)?|m(enu)?ai|01)$/i

export default handler