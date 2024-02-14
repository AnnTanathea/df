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
Menu ini hanya dapat digunakan oleh owner
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsowner = {
		'owner': 'OWNER MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menuowner = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuowner: Array.isArray(plugin.tagsowner) ? plugin.menuowner : [plugin.menuowner] ,
				tagsowner: Array.isArray(plugin.tagsowner) ? plugin.tagsowner : [plugin.tagsowner],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuowner)
			if (plugin && 'tagsowner' in plugin)
				for (let tag of plugin.tagsowner)
					if (!(tag in tagsowner) && tag) tagsowner[tag] = tag
		conn.ownermenu = conn.ownermenu ? conn.ownermenu : {}
		let before = conn.ownermenu.before || defaultMenu.before
		let header = conn.ownermenu.header || defaultMenu.header
		let body = conn.ownermenu.body || defaultMenu.body
		let footer = conn.ownermenu.footer || defaultMenu.footer
		let after = conn.ownermenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsowner).map(tag => {
				return header.replace(/%category/g, tagsowner[tag]) + '\n' + [
					...menuowner.filter(ownermenu => ownermenu.tagsowner && ownermenu.tagsowner.includes(tag) && ownermenu.menuowner).map(ownermenu => {
						return ownermenu.menuowner.map(menuowner => {
							return body.replace(/%cmd/g, ownermenu.prefix ? menuowner : '%p' + menuowner)
								.replace(/%islimit/g, ownermenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, ownermenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.ownermenu == 'string' ? conn.ownermenu : typeof conn.ownermenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.owner }, gifPlayback: true, caption: text });
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

handler.help = ['*[13]* ownermenu']
handler.tags = ['victoriamenu']
handler.command = /^(ownerm(enu)?|m(enu)?owner|13)$/i

export default handler