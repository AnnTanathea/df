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
Berikut adalah menu internet yang kami sediakan.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsinternet = {
		'internet': 'INTERNET MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menuinternet = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuinternet: Array.isArray(plugin.tagsinternet) ? plugin.menuinternet : [plugin.menuinternet] ,
				tagsinternet: Array.isArray(plugin.tagsinternet) ? plugin.tagsinternet : [plugin.tagsinternet],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuinternet)
			if (plugin && 'tagsinternet' in plugin)
				for (let tag of plugin.tagsinternet)
					if (!(tag in tagsinternet) && tag) tagsinternet[tag] = tag
		conn.internetmenu = conn.internetmenu ? conn.internetmenu : {}
		let before = conn.internetmenu.before || defaultMenu.before
		let header = conn.internetmenu.header || defaultMenu.header
		let body = conn.internetmenu.body || defaultMenu.body
		let footer = conn.internetmenu.footer || defaultMenu.footer
		let after = conn.internetmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsinternet).map(tag => {
				return header.replace(/%category/g, tagsinternet[tag]) + '\n' + [
					...menuinternet.filter(internetmenu => internetmenu.tagsinternet && internetmenu.tagsinternet.includes(tag) && internetmenu.menuinternet).map(internetmenu => {
						return internetmenu.menuinternet.map(menuinternet => {
							return body.replace(/%cmd/g, internetmenu.prefix ? menuinternet : '%p' + menuinternet)
								.replace(/%islimit/g, internetmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, internetmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.internetmenu == 'string' ? conn.internetmenu : typeof conn.internetmenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.internet }, gifPlayback: true, caption: text });
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

handler.help = ['*[12]* internetmenu']
handler.tags = ['victoriamenu']
handler.command = /^(internetm(enu)?|m(enu)?internet|12)$/i

export default handler