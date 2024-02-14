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
Berikut adalah fitur fun yang kami sediakan.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsfun = {
		'fun': 'FUN MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menufun = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menufun: Array.isArray(plugin.tagsfun) ? plugin.menufun : [plugin.menufun] ,
				tagsfun: Array.isArray(plugin.tagsfun) ? plugin.tagsfun : [plugin.tagsfun],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menufun)
			if (plugin && 'tagsfun' in plugin)
				for (let tag of plugin.tagsfun)
					if (!(tag in tagsfun) && tag) tagsfun[tag] = tag
		conn.funmenu = conn.funmenu ? conn.funmenu : {}
		let before = conn.funmenu.before || defaultMenu.before
		let header = conn.funmenu.header || defaultMenu.header
		let body = conn.funmenu.body || defaultMenu.body
		let footer = conn.funmenu.footer || defaultMenu.footer
		let after = conn.funmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsfun).map(tag => {
				return header.replace(/%category/g, tagsfun[tag]) + '\n' + [
					...menufun.filter(funmenu => funmenu.tagsfun && funmenu.tagsfun.includes(tag) && funmenu.menufun).map(funmenu => {
						return funmenu.menufun.map(menufun => {
							return body.replace(/%cmd/g, funmenu.prefix ? menufun : '%p' + menufun)
								.replace(/%islimit/g, funmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, funmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.funmenu == 'string' ? conn.funmenu : typeof conn.funmenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.fun }, gifPlayback: true, caption: text });
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

handler.help = ['*[06]* funmenu']
handler.tags = ['victoriamenu']
handler.command = /^(funm(enu)?|m(enu)?fun|06)$/i

export default handler