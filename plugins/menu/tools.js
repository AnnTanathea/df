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
Berikut adalah Tools menu yang kami sediakan.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagstools = {
		'tools': 'TOOLS MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menutools = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menutools: Array.isArray(plugin.tagstools) ? plugin.menutools : [plugin.menutools] ,
				tagstools: Array.isArray(plugin.tagstools) ? plugin.tagstools : [plugin.tagstools],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menutools)
			if (plugin && 'tagstools' in plugin)
				for (let tag of plugin.tagstools)
					if (!(tag in tagstools) && tag) tagstools[tag] = tag
		conn.toolsmenu = conn.toolsmenu ? conn.toolsmenu : {}
		let before = conn.toolsmenu.before || defaultMenu.before
		let header = conn.toolsmenu.header || defaultMenu.header
		let body = conn.toolsmenu.body || defaultMenu.body
		let footer = conn.toolsmenu.footer || defaultMenu.footer
		let after = conn.toolsmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagstools).map(tag => {
				return header.replace(/%category/g, tagstools[tag]) + '\n' + [
					...menutools.filter(toolsmenu => toolsmenu.tagstools && toolsmenu.tagstools.includes(tag) && toolsmenu.menutools).map(toolsmenu => {
						return toolsmenu.menutools.map(menutools => {
							return body.replace(/%cmd/g, toolsmenu.prefix ? menutools : '%p' + menutools)
								.replace(/%islimit/g, toolsmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, toolsmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.toolsmenu == 'string' ? conn.toolsmenu : typeof conn.toolsmenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.tools }, gifPlayback: true, caption: text });
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

handler.help = ['*[18]* toolsmenu']
handler.tags = ['victoriamenu']
handler.command = /^(toolsm(enu)?|m(enu)?tools|19)$/i

export default handler