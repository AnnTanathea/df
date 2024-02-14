import db from '../../lib/database.js'
import { plugins } from '../../lib/plugins.js'
import { readMore, ranNumb, padLead, runtimes } from '../../lib/func.js'
import { promises } from 'fs'
import fs from 'fs' 
import { join } from 'path'
import path from 'path' 
import os from 'os'
import fetch from 'node-fetch'

const defaultMenu = {
	before: `Hello! %name, I'm Victoria Rosalind, a WhatsApp-based smart assistant who is here to help you.

⛨〡︎ *Premium:* %prems 🅟
⛨〡︎ *Limit:* %limit 🅛
⛨〡 *Uptime* : *%uptime*
⛨〡 *Version* : *6.0*
⛨〡 *Prefix Used* : *[ %p ]*
⛨〡︎ *Rest Api:* https://api.maelyn.my.id
⛨〡︎ *HomePage:* https://maelyn.my.id

What can I do for you? I am designed to provide information, perform specific tasks, and provide direct support via WhatsApp messages.
%readmore
  `.trimStart(),
	header: '*╭─────⋠ %category ⋡*',
	body: '*╎❈* %cmd %isPremium %islimit',
	footer: '*╰────────〢*',
	after: global.wm,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, command }) => {
	let tags = {
		'victoriamenu': 'D A S H B O A R D',
	}
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await (await fetch('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/menus.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role, level, exp, age, eris, registered } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n', '')
		let uptime = runtimes(process.uptime())
		let osuptime = runtimes(os.uptime())
		let premium = db.data.users[m.sender].expired
		let prems = `${premium > 0 ? 'Yes' : 'No'}`
		let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
				tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
				prefix: 'customPrefix' in plugin,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of help)
			if (plugin && 'tags' in plugin)
				for (let tag of plugin.tags)
					if (!(tag in tags) && tag) tags[tag] = tag
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let after = conn.menu.after || defaultMenu.after
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tags).map(tag => {
				return header.replace(/%category/g, tags[tag]) + '\n' + [
					...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
						return menu.help.map(help => {
							return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
								.replace(/%islimit/g, menu.limit ? '🅛' : '')
								.replace(/%isPremium/g, menu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p, uptime, osuptime,
			me: conn.getName(conn.user.jid),
			github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
			limit, name, role, _p, eris, age, prems, level,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		conn.sendMessage(m.chat, {
			text: text,
			contextInfo: {
				externalAdReply: {
					title: global.namebot,
					body: global.author,
					thumbnailUrl: global.menu,
					sourceUrl: myGroup,
					mediaType: 1,
					renderLargerThumbnail: true,
				}
			}
		})
	} catch (e) {
		throw e
	}
}

handler.command = /^((m(enu)?|help)(list)?|\?)$/i

export default handler