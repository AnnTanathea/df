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
Berikut adalah menu store yang kami sediakan, untuk melihat apa saja yang kami jual silakan ketik "*.liststore*". 
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsstore = {
		'store': 'STORE MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menustore = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menustore: Array.isArray(plugin.tagsstore) ? plugin.menustore : [plugin.menustore] ,
				tagsstore: Array.isArray(plugin.tagsstore) ? plugin.tagsstore : [plugin.tagsstore],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menustore)
			if (plugin && 'tagsstore' in plugin)
				for (let tag of plugin.tagsstore)
					if (!(tag in tagsstore) && tag) tagsstore[tag] = tag
		conn.storemenu = conn.storemenu ? conn.storemenu : {}
		let before = conn.storemenu.before || defaultMenu.before
		let header = conn.storemenu.header || defaultMenu.header
		let body = conn.storemenu.body || defaultMenu.body
		let footer = conn.storemenu.footer || defaultMenu.footer
		let after = conn.storemenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsstore).map(tag => {
				return header.replace(/%category/g, tagsstore[tag]) + '\n' + [
					...menustore.filter(storemenu => storemenu.tagsstore && storemenu.tagsstore.includes(tag) && storemenu.menustore).map(storemenu => {
						return storemenu.menustore.map(menustore => {
							return body.replace(/%cmd/g, storemenu.prefix ? menustore : '%p' + menustore)
								.replace(/%islimit/g, storemenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, storemenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.storemenu == 'string' ? conn.storemenu : typeof conn.storemenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.store }, gifPlayback: true, caption: text });
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

handler.help = ['*[16]* storemenu']
handler.tags = ['victoriamenu']
handler.command = /^(storem(enu)?|m(enu)?store|16)$/i

export default handler