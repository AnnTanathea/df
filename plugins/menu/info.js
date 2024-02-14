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
Berikut adalah menu info kami, menu ini menyediakan informasi seputar bot.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsinfo = {
		'info': 'INFO MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menuinfo = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuinfo: Array.isArray(plugin.tagsinfo) ? plugin.menuinfo : [plugin.menuinfo] ,
				tagsinfo: Array.isArray(plugin.tagsinfo) ? plugin.tagsinfo : [plugin.tagsinfo],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuinfo)
			if (plugin && 'tagsinfo' in plugin)
				for (let tag of plugin.tagsinfo)
					if (!(tag in tagsinfo) && tag) tagsinfo[tag] = tag
		conn.infomenu = conn.infomenu ? conn.infomenu : {}
		let before = conn.infomenu.before || defaultMenu.before
		let header = conn.infomenu.header || defaultMenu.header
		let body = conn.infomenu.body || defaultMenu.body
		let footer = conn.infomenu.footer || defaultMenu.footer
		let after = conn.infomenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsinfo).map(tag => {
				return header.replace(/%category/g, tagsinfo[tag]) + '\n' + [
					...menuinfo.filter(infomenu => infomenu.tagsinfo && infomenu.tagsinfo.includes(tag) && infomenu.menuinfo).map(infomenu => {
						return infomenu.menuinfo.map(menuinfo => {
							return body.replace(/%cmd/g, infomenu.prefix ? menuinfo : '%p' + menuinfo)
								.replace(/%islimit/g, infomenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, infomenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.infomenu == 'string' ? conn.infomenu : typeof conn.infomenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.info }, gifPlayback: true, caption: text });
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

handler.help = ['*[11]* infomenu']
handler.tags = ['victoriamenu']
handler.command = /^(infom(enu)?|m(enu)?info|11)$/i

export default handler