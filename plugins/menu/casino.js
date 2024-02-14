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
_Di Mohon untuk tidak terlalu spam._

╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Berikut adalah game casino yang kami sediakan
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagscasino = {
		'casino': 'CASINO MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menucasino = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menucasino: Array.isArray(plugin.tagscasino) ? plugin.menucasino : [plugin.menucasino],
				tagscasino: Array.isArray(plugin.tagscasino) ? plugin.tagscasino : [plugin.tagscasino],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menucasino)
			if (plugin && 'tagscasino' in plugin)
				for (let tag of plugin.tagscasino)
					if (!(tag in tagscasino) && tag) tagscasino[tag] = tag
		conn.casinomenu = conn.casinomenu ? conn.casinomenu : {}
		let before = conn.casinomenu.before || defaultMenu.before
		let header = conn.casinomenu.header || defaultMenu.header
		let body = conn.casinomenu.body || defaultMenu.body
		let footer = conn.casinomenu.footer || defaultMenu.footer
		let after = conn.casinomenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagscasino).map(tag => {
				return header.replace(/%category/g, tagscasino[tag]) + '\n' + [
					...menucasino.filter(casinomenu => casinomenu.tagscasino && casinomenu.tagscasino.includes(tag) && casinomenu.menucasino).map(casinomenu => {
						return casinomenu.menucasino.map(menucasino => {
							return body.replace(/%cmd/g, casinomenu.prefix ? menucasino : '%p' + menucasino)
								.replace(/%islimit/g, casinomenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, casinomenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.casinomenu == 'string' ? conn.casinomenu : typeof conn.casinomenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.casino }, gifPlayback: true, caption: text });
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

handler.help = ['*[03]* casinomenu']
handler.tags = ['victoriamenu']
handler.command = /^(casinom(enu)?|m(enu)?casino|03)$/i

export default handler