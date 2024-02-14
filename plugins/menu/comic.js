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
Berikut adalah fitur comic yang kami miliki.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagscomic = {
		'comic': 'COMIC MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menucomic = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menucomic: Array.isArray(plugin.tagscomic) ? plugin.menucomic : [plugin.menucomic] ,
				tagscomic: Array.isArray(plugin.tagscomic) ? plugin.tagscomic : [plugin.tagscomic],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menucomic)
			if (plugin && 'tagscomic' in plugin)
				for (let tag of plugin.tagscomic)
					if (!(tag in tagscomic) && tag) tagscomic[tag] = tag
		conn.comicmenu = conn.comicmenu ? conn.comicmenu : {}
		let before = conn.comicmenu.before || defaultMenu.before
		let header = conn.comicmenu.header || defaultMenu.header
		let body = conn.comicmenu.body || defaultMenu.body
		let footer = conn.comicmenu.footer || defaultMenu.footer
		let after = conn.comicmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagscomic).map(tag => {
				return header.replace(/%category/g, tagscomic[tag]) + '\n' + [
					...menucomic.filter(comicmenu => comicmenu.tagscomic && comicmenu.tagscomic.includes(tag) && comicmenu.menucomic).map(comicmenu => {
						return comicmenu.menucomic.map(menucomic => {
							return body.replace(/%cmd/g, comicmenu.prefix ? menucomic : '%p' + menucomic)
								.replace(/%islimit/g, comicmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, comicmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.comicmenu == 'string' ? conn.comicmenu : typeof conn.comicmenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.comic }, gifPlayback: true, caption: text });
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

handler.help = ['*[04]* comicmenu']
handler.tags = ['victoriamenu']
handler.command = /^(comicm(enu)?|m(enu)?comic|04)$/i

export default handler