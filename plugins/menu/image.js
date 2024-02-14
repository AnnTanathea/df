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
Berikut adalah menu dari Random Image.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsimage = {
		'image': 'RANDOM IMAGE MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menuimage = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuimage: Array.isArray(plugin.tagsimage) ? plugin.menuimage : [plugin.menuimage] ,
				tagsimage: Array.isArray(plugin.tagsimage) ? plugin.tagsimage : [plugin.tagsimage],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuimage)
			if (plugin && 'tagsimage' in plugin)
				for (let tag of plugin.tagsimage)
					if (!(tag in tagsimage) && tag) tagsimage[tag] = tag
		conn.imagemenu = conn.imagemenu ? conn.imagemenu : {}
		let before = conn.imagemenu.before || defaultMenu.before
		let header = conn.imagemenu.header || defaultMenu.header
		let body = conn.imagemenu.body || defaultMenu.body
		let footer = conn.imagemenu.footer || defaultMenu.footer
		let after = conn.imagemenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsimage).map(tag => {
				return header.replace(/%category/g, tagsimage[tag]) + '\n' + [
					...menuimage.filter(imagemenu => imagemenu.tagsimage && imagemenu.tagsimage.includes(tag) && imagemenu.menuimage).map(imagemenu => {
						return imagemenu.menuimage.map(menuimage => {
							return body.replace(/%cmd/g, imagemenu.prefix ? menuimage : '%p' + menuimage)
								.replace(/%islimit/g, imagemenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, imagemenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.imagemenu == 'string' ? conn.imagemenu : typeof conn.imagemenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.image }, gifPlayback: true, caption: text });
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

handler.help = ['*[10]* imagemenu']
handler.tags = ['victoriamenu']
handler.command = /^(imagem(enu)?|m(enu)?image|10)$/i

export default handler