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
Berikut adalah menu downloader yang kami sediakan.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsdownload = {
		'download': 'DOWNLOAD MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menudownload = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menudownload: Array.isArray(plugin.tagsdownload) ? plugin.menudownload : [plugin.menudownload] ,
				tagsdownload: Array.isArray(plugin.tagsdownload) ? plugin.tagsdownload : [plugin.tagsdownload],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menudownload)
			if (plugin && 'tagsdownload' in plugin)
				for (let tag of plugin.tagsdownload)
					if (!(tag in tagsdownload) && tag) tagsdownload[tag] = tag
		conn.downloadmenu = conn.downloadmenu ? conn.downloadmenu : {}
		let before = conn.downloadmenu.before || defaultMenu.before
		let header = conn.downloadmenu.header || defaultMenu.header
		let body = conn.downloadmenu.body || defaultMenu.body
		let footer = conn.downloadmenu.footer || defaultMenu.footer
		let after = conn.downloadmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsdownload).map(tag => {
				return header.replace(/%category/g, tagsdownload[tag]) + '\n' + [
					...menudownload.filter(downloadmenu => downloadmenu.tagsdownload && downloadmenu.tagsdownload.includes(tag) && downloadmenu.menudownload).map(downloadmenu => {
						return downloadmenu.menudownload.map(menudownload => {
							return body.replace(/%cmd/g, downloadmenu.prefix ? menudownload : '%p' + menudownload)
								.replace(/%islimit/g, downloadmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, downloadmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.downloadmenu == 'string' ? conn.downloadmenu : typeof conn.downloadmenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.download }, gifPlayback: true, caption: text });
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

handler.help = ['*[05]* downloadmenu']
handler.tags = ['victoriamenu']
handler.command = /^(downloadm(enu)?|m(enu)?download|05)$/i

export default handler