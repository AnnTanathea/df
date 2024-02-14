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
Berikut adalah fitur anime yang kami miliki.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsanime = {
		'anime': 'ANIME MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menuanime = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuanime: Array.isArray(plugin.tagsanime) ? plugin.menuanime : [plugin.menuanime] ,
				tagsanime: Array.isArray(plugin.tagsanime) ? plugin.tagsanime : [plugin.tagsanime],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuanime)
			if (plugin && 'tagsanime' in plugin)
				for (let tag of plugin.tagsanime)
					if (!(tag in tagsanime) && tag) tagsanime[tag] = tag
		conn.animemenu = conn.animemenu ? conn.animemenu : {}
		let before = conn.animemenu.before || defaultMenu.before
		let header = conn.animemenu.header || defaultMenu.header
		let body = conn.animemenu.body || defaultMenu.body
		let footer = conn.animemenu.footer || defaultMenu.footer
		let after = conn.animemenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsanime).map(tag => {
				return header.replace(/%category/g, tagsanime[tag]) + '\n' + [
					...menuanime.filter(animemenu => animemenu.tagsanime && animemenu.tagsanime.includes(tag) && animemenu.menuanime).map(animemenu => {
						return animemenu.menuanime.map(menuanime => {
							return body.replace(/%cmd/g, animemenu.prefix ? menuanime : '%p' + menuanime)
								.replace(/%islimit/g, animemenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, animemenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.animemenu == 'string' ? conn.animemenu : typeof conn.animemenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.anime }, gifPlayback: true, caption: text });
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

handler.help = ['*[02]* animemenu']
handler.tags = ['victoriamenu']
handler.command = /^(animem(enu)?|m(enu)?anime|02)$/i

export default handler