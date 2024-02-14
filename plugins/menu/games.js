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
Berikut adalah fitur games yang kami sediakan.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsgames = {
		'games': 'GAMES MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menugames = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menugames: Array.isArray(plugin.tagsgames) ? plugin.menugames : [plugin.menugames] ,
				tagsgames: Array.isArray(plugin.tagsgames) ? plugin.tagsgames : [plugin.tagsgames],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menugames)
			if (plugin && 'tagsgames' in plugin)
				for (let tag of plugin.tagsgames)
					if (!(tag in tagsgames) && tag) tagsgames[tag] = tag
		conn.gamesmenu = conn.gamesmenu ? conn.gamesmenu : {}
		let before = conn.gamesmenu.before || defaultMenu.before
		let header = conn.gamesmenu.header || defaultMenu.header
		let body = conn.gamesmenu.body || defaultMenu.body
		let footer = conn.gamesmenu.footer || defaultMenu.footer
		let after = conn.gamesmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsgames).map(tag => {
				return header.replace(/%category/g, tagsgames[tag]) + '\n' + [
					...menugames.filter(gamesmenu => gamesmenu.tagsgames && gamesmenu.tagsgames.includes(tag) && gamesmenu.menugames).map(gamesmenu => {
						return gamesmenu.menugames.map(menugames => {
							return body.replace(/%cmd/g, gamesmenu.prefix ? menugames : '%p' + menugames)
								.replace(/%islimit/g, gamesmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, gamesmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.gamesmenu == 'string' ? conn.gamesmenu : typeof conn.gamesmenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.games }, gifPlayback: true, caption: text });
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

handler.help = ['*[07]* gamesmenu']
handler.tags = ['victoriamenu']
handler.command = /^(gamesm(enu)?|m(enu)?games|07)$/i

export default handler