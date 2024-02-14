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
Berikut adalah Grup menu, menu-menu yang ada hanya dapat digunakan di grup saja.
%readmore
  `.trimStart(),
  header: '*╭─────⋠ %category ⋡*',
  body: '*╎❈* %cmd %isPremium %islimit',
  footer: '*╰────────〢*',
  after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tagsgroup = {
		'group': 'GROUP MENU'
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/ClayzaAubert/library/main/media/ClayzaImages.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let menugroup = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menugroup: Array.isArray(plugin.tagsgroup) ? plugin.menugroup : [plugin.menugroup] ,
				tagsgroup: Array.isArray(plugin.tagsgroup) ? plugin.tagsgroup : [plugin.tagsgroup],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menugroup)
			if (plugin && 'tagsgroup' in plugin)
				for (let tag of plugin.tagsgroup)
					if (!(tag in tagsgroup) && tag) tagsgroup[tag] = tag
		conn.groupmenu = conn.groupmenu ? conn.groupmenu : {}
		let before = conn.groupmenu.before || defaultMenu.before
		let header = conn.groupmenu.header || defaultMenu.header
		let body = conn.groupmenu.body || defaultMenu.body
		let footer = conn.groupmenu.footer || defaultMenu.footer
		let after = conn.groupmenu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsgroup).map(tag => {
				return header.replace(/%category/g, tagsgroup[tag]) + '\n' + [
					...menugroup.filter(groupmenu => groupmenu.tagsgroup && groupmenu.tagsgroup.includes(tag) && groupmenu.menugroup).map(groupmenu => {
						return groupmenu.menugroup.map(menugroup => {
							return body.replace(/%cmd/g, groupmenu.prefix ? menugroup : '%p' + menugroup)
								.replace(/%islimit/g, groupmenu.limit ? '🅛' : '')
								.replace(/%isPremium/g, groupmenu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.groupmenu == 'string' ? conn.groupmenu : typeof conn.groupmenu == 'object' ? _text : ''
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
		//conn.sendMessage(m.chat, { video: { url: global.group }, gifPlayback: true, caption: text });
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

handler.help = ['*[09]* groupmenu']
handler.tags = ['victoriamenu']
handler.command = /^(groupm(enu)?|m(enu)?group|09)$/i

export default handler