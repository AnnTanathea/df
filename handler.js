import * as os from 'os'
import chalk from 'chalk'
import db, { loadDatabase } from './lib/database.js'
import Connection from './lib/connection.js'
import fs, { unwatchFile, watchFile } from 'fs'
import Helper from './lib/helper.js'
import path, { join } from 'path'
import printMessage from './lib/print.js'
import Queque from './lib/queque.js'
import { fileURLToPath } from 'url'
import { format } from 'util'
import { plugins } from './lib/plugins.js'
import { smsg } from './lib/simple.js'

/** @type {import('@whiskeysockets/baileys')} */
const { getContentType } = (await import('@whiskeysockets/baileys')).default

const isNumber = x => typeof x === 'number' && !isNaN(x)
const isLinux = (os.platform() === 'win32') ? false : true
/**
 * Handle messages upsert
 * @this {import('./lib/connection').Socket}
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.upsert']} chatUpdate
 */
export async function handler(chatUpdate) {
	this.msgqueque = this.msgqueque || new Queque()
	if (!chatUpdate)
		return
	let m = chatUpdate.messages[chatUpdate.messages.length - 1]
	if (!m)
		return
	if (m.message?.viewOnceMessageV2) m.message = m.message.viewOnceMessageV2.message
	if (m.message?.documentWithCaptionMessage) m.message = m.message.documentWithCaptionMessage.message
	if (m.message?.viewOnceMessageV2Extension) m.message = m.message.viewOnceMessageV2Extension.message
	if (db.data == null)
		await loadDatabase()
	try {
		m = smsg(this, m) || m
		if (!m)
			return
		m.exp = 0
		m.limit = false
		try {
			// TODO: use loop to insert data instead of this
			let user = db.data.users[m.sender]
			if (m.sender.endsWith('@s.whatsapp.net')) {
				if (typeof user !== 'object')
					db.data.users[m.sender] = {}
				if (user) {
					if (!isNumber(user.exp))
						user.exp = 0
					if (!isNumber(user.limit))
						user.limit = 10
					if (!isNumber(user.lastclaim))
						user.lastclaim = 0
					if (!('registered' in user))
						user.registered = false
					if (!('viewstatus' in user))
						user.viewstatus = false
					if (!user.registered) {
						if (!('name' in user))
							user.name = m.name
						if (!isNumber(user.age))
							user.age = -1
						if (!isNumber(user.regTime))
							user.regTime = -1
					}
					if (!isNumber(user.afk))
						user.afk = -1
					if (!('afkReason' in user))
						user.afkReason = ''
					if (!('banned' in user))
						user.banned = false
					if (!('permaban' in user))
						user.permaban = false
					if (!isNumber(user.lastbanned))
						user.lastbanned = 0
					if (!isNumber(user.bannedcd))
						user.bannedcd = 0
					if (!isNumber(user.warn))
						user.warn = 0
					if (!isNumber(user.level))
						user.level = 0
					if (!('skill' in user))
                    	user.skill = ''
					if (!('title' in user))
                    	user.title = ''
					if (!user.job)
                    	user.job = 'Pengangguran'
					if (!('role' in user))
						user.role = 'Beginner'
					if (!('autolevelup' in user))
						user.autolevelup = false

					if (!isNumber(user.eris))
						user.eris = 0
					if (!isNumber(user.atm))
						user.atm = 0
					if (!isNumber(user.fullatm))
						user.fullatm = 0
					if (!isNumber(user.bank))
						user.bank = 0
					if (!isNumber(user.health))
						user.health = 100
					if (!isNumber(user.potion))
						user.potion = 0
					if (!isNumber(user.trash))
						user.trash = 0
					if (!isNumber(user.wood))
						user.wood = 0
					if (!isNumber(user.rock))
						user.rock = 0
					if (!isNumber(user.string))
						user.string = 0
					if (!isNumber(user.mana))
						user.mana = 0

					if (!isNumber(user.emerald))
						user.emerald = 0
					if (!isNumber(user.diamond))
						user.diamond = 0
					if (!isNumber(user.gold))
						user.gold = 0
					if (!isNumber(user.iron))
						user.iron = 0
					if (!isNumber(user.upgrader))
						user.upgrader = 0

					if (!isNumber(user.common))
						user.common = 0
					if (!isNumber(user.uncommon))
						user.uncommon = 0
					if (!isNumber(user.mythic))
						user.mythic = 0
					if (!isNumber(user.legendary))
						user.legendary = 0

					if (!isNumber(user.pancingan))
						user.pancingan = 0
					if (!isNumber(user.umpan))
						user.umpan = 0
					if (!isNumber(user.stamina))
						user.stamina = 0
					if (!isNumber(user.crystal))
						user.crystal = 0
					if (!isNumber(user.coal))
						user.coal = 0

					if (!isNumber(user.armor))
						user.armor = 0
					if (!isNumber(user.armordurability))
						user.armordurability = 0
					if (!isNumber(user.sword))
						user.sword = 0
					if (!isNumber(user.sworddurability))
						user.sworddurability = 0
					if (!isNumber(user.pickaxe))
						user.pickaxe = 0
					if (!isNumber(user.pickaxedurability))
						user.pickaxedurability = 0
					if (!isNumber(user.fishingrod))
						user.fishingrod = 0
					if (!isNumber(user.fishingroddurability))
						user.fishingroddurability = 0

						//last - CD
					if (!isNumber(user.lastclaim))
						user.lastclaim = 0
					if (!isNumber(user.lastberburu))
						user.lastberburu = 0
					if (!isNumber(user.hadiahowner))
						user.hadiahowner = 0
					if (!isNumber(user.lastadventure))
						user.lastadventure = 0
					if (!isNumber(user.lastfishing))
						user.lastfishing = 0
					if (!isNumber(user.lastdungeon))
						user.lastdungeon = 0
					if (!isNumber(user.lastduel))
						user.lastduel = 0
					if (!isNumber(user.lastmasak))
						user.lastmasak = 0
					if (!isNumber(user.lastmining))
						user.lastmining = 0
					if (!isNumber(user.lastmisi))
						user.lastmisi = 0
					if (!isNumber(user.lastlumber))
						user.lastlumber = 0
					if (!isNumber(user.lasthunt))
						user.lasthunt = 0
					if (!isNumber(user.lastjb))
						user.lastjb = 0
					if (!isNumber(user.lastkerja))
						user.lastkerja = 0
					if (!isNumber(user.lastweekly))
						user.lastweekly = 0
					if (!isNumber(user.lastmonthly))
						user.lastmonthly = 0
					if (!isNumber(user.lastbunga))
						user.lastbunga = 0
					if (!isNumber(user.note))
						user.note = 0

						//Bibit
					if (!isNumber(user.bibitmangga))
						user.bibitmangga = 0
					if (!isNumber(user.bibitapel))
						user.bibitapel = 0
					

						//Kandang
					if (!isNumber(user.chicken))
						user.chicken = 0
					if (!isNumber(user.cow))
						user.cow = 0
					if (!isNumber(user.goat))
						user.goat = 0
					if (!isNumber(user.rabbit))
						user.rabbit = 0
					if (!isNumber(user.sheep))
						user.sheep = 0
					if (!isNumber(user.bear))
						user.bear = 0
					if (!isNumber(user.pig))
						user.pig = 0
					if (!isNumber(user.buffalo))
						user.buffalo = 0
					if (!isNumber(user.griffin))
						user.griffin = 0
					if (!isNumber(user.eagle))
						user.eagle = 0
					if (!isNumber(user.thorne))
						user.thorne = 0
					if (!isNumber(user.zephyr))
						user.zephyr = 0
					if (!isNumber(user.ocelot))
						user.ocelot = 0
					if (!isNumber(user.faelen))
						user.faelen = 0
					if (!isNumber(user.arctic))
						user.arctic = 0
					if (!isNumber(user.cheetah))
						user.cheetah = 0
					if (!isNumber(user.koala))
						user.koala = 0
					if (!isNumber(user.leopard))
						user.leopard = 0
					if (!isNumber(user.horse))
						user.horse = 0
					if (!isNumber(user.fox))
						user.fox = 0

						//Kolam
					if (!isNumber(user.nixie))
						user.nixie = 0
					if (!isNumber(user.triton))
						user.triton = 0
					if (!isNumber(user.marlin))
						user.marlin = 0
					if (!isNumber(user.coralin))
						user.coralin = 0
					if (!isNumber(user.finley))
						user.finley = 0
					if (!isNumber(user.gourami))
						user.gourami = 0
					if (!isNumber(user.azure))
						user.azure = 0
					if (!isNumber(user.wave))
						user.wave = 0
					if (!isNumber(user.keplie))
						user.keplie = 0
					if (!isNumber(user.lagoon))
						user.lagoon = 0
					if (!isNumber(user.aqualis))
						user.aqualis = 0
					if (!isNumber(user.fingrod))
						user.fingrod = 0
					if (!isNumber(user.nymphora))
						user.nymphora = 0
					if (!isNumber(user.zeplyn))
						user.zeplyn = 0
					if (!isNumber(user.tritonus))
						user.tritonus = 0
					if (!isNumber(user.finara))
						user.finara = 0
					if (!isNumber(user.naucitus))
						user.naucitus = 0
					if (!isNumber(user.tetra))
						user.tetra = 0
					if (!isNumber(user.clownfi))
						user.clownfi = 0
					if (!isNumber(user.hyoxis))
						user.hyoxis = 0

					if (!isNumber(user.masak))
						user.masak = 0
					if (!isNumber(user.masakrole))
						user.masakrole = 0
					if (!isNumber(user.masakexp))
						user.masakexp = 0
					if (!isNumber(user.masaklevel))
						user.masaklevel = 0

					if (!isNumber(user.bawang))
						user.bawang = 0
					if (!isNumber(user.cabai))
						user.cabai = 0
					if (!isNumber(user.kemiri))
						user.kemiri = 0
					if (!isNumber(user.jahe))
						user.jahe = 0
					if (!isNumber(user.saus))
						user.saus = 0
					if (!isNumber(user.asam))
						user.asam = 0


					if (!('openaitxt' in user))
						user.openaitxt = []
					if (!isNumber(user.rumahsakitexp))
						user.rumahsakitexp = 0
					if (!isNumber(user.restoranexp))
						user.restoranexp = 0
					if (!isNumber(user.pabrikexp))
						user.pabrikexp = 0
					if (!isNumber(user.tambangexp))
						user.tambangexp = 0
					if (!isNumber(user.pelabuhanexp))
						user.pelabuhanexp = 0
					if (!isNumber(user.rumahsakitlvl))
						user.rumahsakitlvl = 0
					if (!isNumber(user.restoranlvl))
						user.restoranlvl = 0
					if (!isNumber(user.pabriklvl))
						user.pabriklvl = 0
					if (!isNumber(user.tambanglvl))
						user.tambanglvl = 0
					if (!isNumber(user.pelabuhanlvl))
						user.pelabuhanlvl = 0
					if (!isNumber(user.expired))
						user.expired = 0
					if (!isNumber(user.spamcount))
						user.spamcount = 0
				} else db.data.users[m.sender] = {
					exp: 0,
					limit: 10,
					lastclaim: 0,
					registered: false,
					viewstatus: false,
					name: m.name,
					age: -1,
					regTime: -1,
					afk: -1,
					afkReason: '',
					banned: false,
					permaban: false,
					lastbanned: 0,
					bannedcd: 0,
					warn: 0,
					level: 0,
					title: '',
					skill: '',
					job: '',
					role: 'Warga Biasa',
					autolevelup: false,

					eris: 0,
					bank: 0,
					atm: 0,
					fullatm: 0,
					health: 100,
					potion: 10,
					trash: 0,
					wood: 0,
					rock: 0,
					string: 0,
					mana: 100,

					emerald: 0,
					diamond: 0,
					gold: 0,
					iron: 0,
					upgrader: 0,

					common: 0,
					uncommon: 0,
					mythic: 0,
					legendary: 0,

					pancingan: 0,
					umpan: 0,
					stamina: 100,
					crystal: 0,
					coal: 10,

					armor: 0,
					armordurability: 0,
					sword: 0,
					sworddurability: 0,
					pickaxe: 0,
					pickaxedurability: 0,
					fishingrod: 0,
					fishingroddurability: 0,

					lastclaim: 0,
					lastberburu: 0,
					hadiahowner: 0,
					lastadventure: 0,
					lastfishing: 0,
					lastdungeon: 0,
					lastduel: 0,
					lastmining: 0,
					lastmisi: 0,
					lasthunt: 0,
					lastjb: 0,
					lastlumber: 0,
					lastkerja: 0,
					lastweekly: 0,
					lastmonthly: 0,
					lastbunga: 0,
					note: 0,
					skillexp: 0,

					chicken: 0,
					cow: 0,
					goat: 0,
					rabbit: 0,
					sheep: 0,
					bear: 0,
					pig: 0,
					buffalo: 0,
					griffin: 0,
					eagle: 0,
					thorne: 0,
					zephyr: 0,
					ocelot: 0,
					faelen: 0,
					arctic: 0,
					cheetah: 0,
					koala: 0,
					leopard: 0,
					horse: 0,
					fox: 0,

					nixie: 0,
					triton: 0,
					marlin: 0,
					coralin: 0,
					finley: 0,
					gourami: 0,
					azure: 0,
					wave: 0,
					keplie: 0,
					lagoon: 0,
					aqualis: 0,
					fingrord: 0,
					nymphora: 0,
					zeplyn: 0,
					tritonus: 0,
					finara: 0,
					naucitus: 0,
					tetra: 0,
					clownfi: 0,
					hyoxis: 0,

					masak: 0,
					masakrole: 0,
					masakexp: 0,
					masaklevel: 0,

					bawang: 0,
					cabai: 0,
					kemiri: 0,
					jahe: 0,
					saus: 0,
					asam: 0,

					steak: 0,
					sate: 0,
					rendang: 0,
					kornet: 0,
					nugget: 0,
					bluefin: 0,
					seafood: 0,
					sushi: 0,
					moluska: 0,
					squidprawm: 0,

					openaitxt: [],
					expired: 0,
					spamcount: 0,
				}
				let akinator = db.data.users[m.sender].akinator
				if (typeof akinator !== 'object')
					db.data.users[m.sender].akinator = {}
				if (akinator) {
					if (!('sesi' in akinator))
						akinator.sesi = false
					if (!('server' in akinator))
						akinator.server = null
					if (!('frontaddr' in akinator))
						akinator.frontaddr = null
					if (!('session' in akinator))
						akinator.session = null
					if (!('signature' in akinator))
						akinator.signature = null
					if (!('question' in akinator))
						akinator.question = null
					if (!('progression' in akinator))
						akinator.progression = null
					if (!('step' in akinator))
						akinator.step = null
					if (!('soal' in akinator))
						akinator.soal = null
				} else db.data.users[m.sender].akinator = {
					sesi: false,
					server: null,
					frontaddr: null,
					session: null,
					signature: null,
					question: null,
					progression: null,
					step: null,
					soal: null
				}
			}
			let chat = db.data.chats[m.chat]
			if (m.chat.endsWith('@g.us')) {
				if (typeof chat !== 'object')
					db.data.chats[m.chat] = {}
				if (chat) {
					if (!('presence' in chat))
						chat.presence = false
					if (!("getmsg" in chat))
						chat.getmsg = true
					if (!('isBanned' in chat))
						chat.isBanned = false
					if (!('permaBan' in chat))
						chat.permaBan = false
					if (!('welcome' in chat))
						chat.welcome = false
					if (!('detect' in chat))
						chat.detect = false
					if (!('sWelcome' in chat))
						chat.sWelcome = ''
					if (!('sBye' in chat))
						chat.sBye = ''
					if (!('sPromote' in chat))
						chat.sPromote = ''
					if (!('sDemote' in chat))
						chat.sDemote = ''
					if (!('openaitxt' in chat))
						chat.openaitxt = []
					if (!('delete' in chat))
						chat.delete = false
					if (!('antiLink' in chat))
						chat.antiLink = false
					if (!('antivirus' in chat))
						chat.antivirus = false
					if (!('antisticker' in chat))
						chat.antivirus = false
					if (!('nsfw' in chat))
						chat.nsfw = false
					if (!('pdf' in chat))
						chat.pdf = false
					if (!('game' in chat))
						chat.game = false
					if (!('simi' in chat))
						chat.simi = false
					if (!('lastsimi' in chat))
						chat.lastsimi = false
					if (!('viewonce' in chat))
						chat.viewonce = false
					if (!('antiToxic' in chat))
						chat.antiToxic = false
					if (!('autolevelup' in chat))
						chat.autolevelup = false
					if (!('autoai' in chat))
						chat.autoai = false
					if (!isNumber(chat.joindate))
						chat.joindate = 0
					if (!isNumber(chat.joincd))
						chat.joincd = 0
					if (!isNumber(chat.expired))
						chat.expired = 0
					if (!isNumber(chat.lastmute))
						chat.lastmute = 0
					if (!isNumber(chat.mutecd))
						chat.mutecd = 0
					if (!isNumber(chat.spamcount))
						chat.spamcount = 0
				} else db.data.chats[m.chat] = {
					presence: false,
					getmsg: true,
					isBanned: false,
					permaBan: false,
					welcome: false,
					detect: false,
					sWelcome: '',
					sBye: '',
					sPromote: '',
					sDemote: '',
					openaitxt: [],
					delete: false,
					antiLink: false,
					antiAudio: false,
					antiBot: false,
					antiFoto: false,
					antiSticker: false,
					antiVideo: false,
					antivirus: false,
					nsfw: false,
					pdf: false,
					game: false,
					simi: false,
					lastsimi: false,
					viewonce: false,
					antiToxic: false,
					autolevelup: false,
					autoai: false,
					joindate: 0,
					joincd: 0,
					expired: 0,
					lastmute: 0,
					mutecd: 0,
					spamcount: 0,
				}
				let akinator = db.data.chats[m.chat].akinator
				if (typeof akinator !== 'object')
					db.data.chats[m.chat].akinator = {}
				if (akinator) {
					if (!('sesi' in akinator))
						akinator.sesi = false
					if (!('server' in akinator))
						akinator.server = null
					if (!('frontaddr' in akinator))
						akinator.frontaddr = null
					if (!('session' in akinator))
						akinator.session = null
					if (!('signature' in akinator))
						akinator.signature = null
					if (!('question' in akinator))
						akinator.question = null
					if (!('progression' in akinator))
						akinator.progression = null
					if (!('step' in akinator))
						akinator.step = null
					if (!('soal' in akinator))
						akinator.soal = null
				} else db.data.chats[m.chat].akinator = {
					sesi: false,
					server: null,
					frontaddr: null,
					session: null,
					signature: null,
					question: null,
					progression: null,
					step: null,
					soal: null
				}
			}
			let settings = db.data.settings[this.user.jid]
			if (typeof settings !== 'object') db.data.settings[this.user.jid] = {}
			if (settings) {
				if (!('self' in settings)) settings.self = false
				if (!('autoread' in settings)) settings.autoread = false
				if (!('restrict' in settings)) settings.restrict = false
			} else db.data.settings[this.user.jid] = {
				self: false,
				autoread: false,
				restrict: false
			}
			let datas = db.data.datas
			if (typeof datas !== 'object') db.data.datas = {}
			if (datas) {
				if (!('maingroupname' in datas)) datas.maingroupname = ''
				if (!('aiprofile' in datas)) datas.aiprofile = ''
				if (!('packname' in datas)) datas.packname = ''
				if (!('author' in datas)) datas.author = datas.author || global.author || '';
				if (!('linkgc' in datas)) datas.linkgc = ''
				if (!('spamcountreset' in datas)) datas.spamcountreset = 0
				if (!('spamcountgcreset' in datas)) datas.spamcountgcreset = 0
				if (!('spamlistmsg' in datas)) datas.spamlistmsg = null
				if (!('spamlistgcmsg' in datas)) datas.spamlistgcmsg = null
				if (!('anticall' in datas)) datas.anticall = false
				if (!('autoai' in datas)) datas.autoai = true
				if (!('teksdonasi' in datas)) datas.teksdonasi = ''
				if (!('tekssewa' in datas)) datas.tekssewa = ''
				if (!('teksjadibot' in datas)) datas.teksjadibot = ''
				if (!('tekstopup' in datas)) datas.tekstopup = ''
				if (!('linkgc' in datas)) datas.linkgc = ''
				if (!('prems' in datas)) datas.prems = [{ user: '', date: 0 }]
				if (!('api' in datas)) datas.api = {}
				if (!('rowner' in datas)) datas.rowner = []
				if (!('owner' in datas)) datas.owner = []
				if (!('store' in datas)) datas.store = []
				if (!('storestatus' in datas)) datas.storestatus = {}
				if (!('menfess' in datas)) datas.menfess = {}
				if (!('listgc' in datas)) datas.listgc = []
				if (!('openaikey' in datas)) datas.openaikey = []
				if (!('menfesschat' in datas)) datas.menfesschat = {}
				if (!('menfesschatcd' in datas)) datas.menfesschatcd = 0
			} else db.data.datas = {
				maingroupname: '',
				aiprofile: '',
				packname: '',
				author: '',
				linkgc: '',
				wgempa: '',
				spamcountreset: 0,
				spamcountgcreset: 0,
				spamlistmsg: null,
				spamlistgcmsg: null,
				anticall: false,
				autoai: true,
				teksdonasi: '',
				tekssewa: '',
				teksjadibot: '',
				tekstopup: '',
				prems: [{ user: '', date: 0 }],
				api: {},
				rowner: [],
				owner: [],
				store: [],
				storestatus: {},
				menfess: {},
				listgc: [],
				openaikey: [],
				menfesschat: {},
				menfesschatcd: 0,
			}
		} catch (e) {
			console.error(e)
		}

		const isMods = global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isROwner = isMods || [this.decodeJid(this.user.id), ...db.data.datas.rowner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isOwner = isROwner || m.fromMe || db.data.datas.owner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isPrems = isOwner || db.data.datas.prems.map(v => v.user).includes(m.sender)

		if (opts['nyimak'])
			return
		if (!isROwner && opts['self'])
			return
		if (opts['pconly'] && m.chat.endsWith('g.us'))
			return
		if (opts['gconly'] && !m.chat.endsWith('g.us') && !isPrems)
			return
		if (opts['swonly'] && m.chat !== 'status@broadcast')
			return
		if (typeof m.text !== 'string')
			m.text = ''

		if (opts['queque'] && m.text && !m.fromMe && !(isMods || isPrems)) {
			const id = m.id
			this.msgqueque.add(id)
			await this.msgqueque.waitQueue(id)
		}

		if (m.isBaileys) return
		m.exp += Math.ceil(Math.random() * 10)

		let usedPrefix
		let _user = db.data?.users?.[m.sender]

		const groupMetadata = (m.isGroup ? await Connection.store.fetchGroupMetadata(m.chat, this.groupMetadata) : {}) || {}
		const participants = (m.isGroup ? groupMetadata.participants : []) || []
		const user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender) : {}) || {} // User Data
		const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
		const isRAdmin = user?.admin == 'superadmin' || false
		const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
		const isBotAdmin = bot?.admin || false // Are you Admin?

		const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
		for (let name in plugins) {
			let plugin = plugins[name]
			if (!plugin)
				continue
			if (plugin.disabled)
				continue
			const __filename = join(___dirname, name)
			if (typeof plugin.all === 'function') {
				try {
					await plugin.all.call(this, m, {
						chatUpdate,
						__dirname: ___dirname,
						__filename
					})
				} catch (e) {
					// if (typeof e === 'string') continue
					console.error(e)
					if (db.data.datas.rowner.length > 0) {
						for (let [jid] of db.data.datas.rowner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
							let data = (await this.onWhatsApp(jid))[0] || {}
							if (data.exists)
								m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
						}
					}
				}
			}
			if (!opts['restrict'])
				if (plugin.tags && plugin.tags.includes('admin')) {
					// global.dfail('restrict', m, this)
					continue
				}
			const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
			let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : global.prefix
			let match = (_prefix instanceof RegExp ? // RegExp Mode?
				[[_prefix.exec(m.text), _prefix]] :
				Array.isArray(_prefix) ? // Array?
					_prefix.map(p => {
						let re = p instanceof RegExp ? // RegExp in Array?
							p :
							new RegExp(str2Regex(p))
						return [re.exec(m.text), re]
					}) :
					typeof _prefix === 'string' ? // String?
						[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
						[[[], new RegExp]]
			).find(p => p[1])
			if (typeof plugin.before === 'function') {
				if (await plugin.before.call(this, m, {
					match,
					conn: this,
					participants,
					groupMetadata,
					user,
					bot,
					isROwner,
					isOwner,
					isRAdmin,
					isAdmin,
					isBotAdmin,
					isPrems,
					chatUpdate,
					__dirname: ___dirname,
					__filename
				}))
					continue
			}
			if (typeof plugin !== 'function')
				continue
			if ((usedPrefix = (match[0] || '')[0])) {
				let noPrefix = m.text.replace(usedPrefix, '')
				let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
				args = args || []
				let _args = noPrefix.trim().split` `.slice(1)
				let text = _args.join` `
				command = (command || '').toLowerCase()
				let fail = plugin.fail || global.dfail // When failed
				let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
					plugin.command.test(command) :
					Array.isArray(plugin.command) ? // Array?
						plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
							cmd.test(command) :
							cmd === command
						) :
						typeof plugin.command === 'string' ? // String?
							plugin.command === command :
							false

				if (!isAccept)
					continue
				m.plugin = name.replace(isLinux ? 'plugins/' : 'plugins\\', '')
				if (m.chat in db.data.chats || m.sender in db.data.users) {
					let chat = db.data.chats[m.chat]
					let user = db.data.users[m.sender]
					let ubc = isLinux ? 'owner/unbanchat.js' : 'owner\\unbanchat.js'
					let ubu = isLinux ? 'owner/unbanuser.js' : 'owner\\unbanuser.js'
					if (m.plugin != ubc && chat?.isBanned && !isROwner)
						return // Except this
					if (m.plugin != ubu && user?.banned)
						return
				}
				if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
					fail('owner', m, this)
					continue
				}
				if (plugin.rowner && !isROwner) { // Real Owner
					fail('rowner', m, this)
					continue
				}
				if (plugin.owner && !isOwner) { // Number Owner
					fail('owner', m, this)
					continue
				}
				if (plugin.mods && !isMods) { // Moderator
					fail('mods', m, this)
					continue
				}
				if (plugin.premium && !isPrems) { // Premium
					fail('premium', m, this)
					continue
				}
				if (plugin.nsfw && m.isGroup && !db.data.chats[m.chat].nsfw) {
					fail('nsfw', m, this)
					continue
				}
				if (plugin.game && m.isGroup && !db.data.chats[m.chat].game) {
					fail('game', m, this)
					continue
				}
				if (plugin.group && !m.isGroup) { // Group Only
					fail('group', m, this)
					continue
				} else if (plugin.botAdmin && !isBotAdmin) { // You Admin
					fail('botAdmin', m, this)
					continue
				} else if (plugin.admin && !isAdmin) { // User Admin
					fail('admin', m, this)
					continue
				}
				if (plugin.private && m.isGroup) { // Private Chat Only
					fail('private', m, this)
					continue
				}
				if (plugin.register == true && _user.registered == false) { // Butuh daftar?
					fail('unreg', m, this)
					continue
				}
				m.isCommand = true
				_user.spamcount += 1
				let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
				if (xp > 200)
					m.reply('Ngecit -_-') // Hehehe
				else
					m.exp += xp
				if (!isPrems && plugin.limit && db.data.users[m.sender].limit < plugin.limit * 1) {
					this.reply(m.chat, `Limit Kamu Habis, Silakan pergih ke shop yang ada di menu store untuk membelinya`, m)
					continue // Limit habis
				}
				if (plugin.level > _user.level) {
					this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
					continue // If the level has not been reached
				}
				let extra = {
					match,
					usedPrefix,
					noPrefix,
					_args,
					args,
					command,
					text,
					conn: this,
					participants,
					groupMetadata,
					user,
					bot,
					isROwner,
					isOwner,
					isRAdmin,
					isAdmin,
					isBotAdmin,
					isPrems,
					chatUpdate,
					__dirname: ___dirname,
					__filename
				}
				try {
					await plugin.call(this, m, extra)
					if (!isPrems)
						m.limit = m.limit || plugin.limit || false
				} catch (e) {
					// Error occured
					m.error = e
					console.error(e)
					if (e) {
						let text = format(e)
						text = text.replace(new RegExp(global.MaelynKEY, 'g'), '#HIDDEN#');
						m.reply(text)
						if (e.name)
							if (db.data.datas.rowner.length > 0) {
								for (let [jid] of db.data.datas.rowner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
									let data = (await this.onWhatsApp(jid))[0] || {}
									if (data.exists)
										m.reply(`*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
								}
							}
						m.reply(text)
					}
				} finally {
					// m.reply(util.format(_user))
					if (typeof plugin.after === 'function') {
						try {
							await plugin.after.call(this, m, extra)
						} catch (e) {
							console.error(e)
						}
					}
				}
				break
			}
		}
	} catch (e) {
		console.error(e)
	} finally {
		if (m.isGroup) {
			//auto typing / record
			if (db.data.chats[m.chat].presence) await this.sendPresenceUpdate(['composing', 'recording'].getRandom(), m.chat)
		}
		if (opts['queque'] && m.text) {
			const id = m.id
			this.msgqueque.unqueue(id)
		}
		//console.log(db.data.users[m.sender])
		let user, stats = db.data.stats
		if (m) {
			if (m.sender && (user = db.data.users[m.sender])) {
				user.exp += m.exp
				user.limit -= m.limit * 1
			}

			let stat
			if (m.plugin) {
				let now = +new Date
				if (m.plugin in stats) {
					stat = stats[m.plugin]
					if (!isNumber(stat.total))
						stat.total = 1
					if (!isNumber(stat.success))
						stat.success = m.error != null ? 0 : 1
					if (!isNumber(stat.last))
						stat.last = now
					if (!isNumber(stat.lastSuccess))
						stat.lastSuccess = m.error != null ? 0 : now
				} else
					stat = stats[m.plugin] = {
						total: 1,
						success: m.error != null ? 0 : 1,
						last: now,
						lastSuccess: m.error != null ? 0 : now
					}
				stat.total += 1
				stat.last = now
				if (m.error == null) {
					stat.success += 1
					stat.lastSuccess = now
				}
			}
		}

		try {
			if (!opts['noprint']) await printMessage(m, this)
		} catch (e) {
			console.log(m, m.quoted, e)
		}
		if (opts['autoread'])
			await this.readMessages([m.key]).catch(() => { }) // WARNING : easy to get banned

	}
}

/**
 * Handle groups participants update
 * @this {import('./lib/connection').Socket}
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
	if (opts['self']) return
	if (this.isInit) return
	if (db.data == null) await loadDatabase()
}

/**
 * Handle groups update
 * @this {import('./lib/connection').Socket}
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
	if (opts['self'])
		return
	for (const groupUpdate of groupsUpdate) {
		const id = groupUpdate.id
		if (!id) continue
		let chats = db.data.chats[id], text = ''
		if (!chats?.detect) continue
		if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || Connection.conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
		if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || Connection.conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
		if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || Connection.conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
		if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || Connection.conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
		if (!text) continue
		await this.sendMessage(id, { text, mentions: this.parseMention(text) })
	}
}

/**
 * @this {import('./lib/connection').Socket}
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.delete']} message 
 */
export async function deleteUpdate(message) {

	if (Array.isArray(message.keys) && message.keys.length > 0) {
		const tasks = await Promise.allSettled(message.keys.map(async (key) => {
			if (key.fromMe) return
			const msg = this.loadMessage(key.remoteJid, key.id) || this.loadMessage(key.id)
			if (!msg || !msg.message) return
			let chat = db.data.chats[key.remoteJid]
			if (!chat || !chat.delete) return

			// if message type is conversation, convert it to extended text message because if not, it will throw an error
			const mtype = getContentType(msg.message)
			if (mtype === 'conversation') {
				msg.message.extendedTextMessage = { text: msg.message[mtype] }
				delete msg.message[mtype]
			}

			const participant = msg.participant || msg.key.participant || msg.key.remoteJid
			await this.reply(key.remoteJid, `Terdeteksi @${participant.split`@`[0]} telah menghapus pesan\nUntuk mematikan fitur ini, ketik\n*.off antidelete*`, msg, { mentions: [participant] })
			return await this.copyNForward(key.remoteJid, msg).catch(e => console.log(e, msg))
		}))
		tasks.map(t => t.status === 'rejected' && console.error(t.reason))
	}
}


global.dfail = (type, m, conn) => {
	let msg = {
		rowner: `*「 REAL OWNER BOT ONLY 」*`,
		owner: `*「 OWNER BOT ONLY 」*`,
		mods: `*「 DEV / MODS ONLY 」*`,
		premium: `*「 PREMIUM USER ONLY 」*`,
		group: `*「 GROUP ONLY 」*`,
		private: `*「 PRIVATE CHAT ONLY 」*`,
		admin: `*「 ADMIN GROUP ONLY 」*`,
		nsfw: `[ *NSFW NOT ACTIVED* ]`,
		game: '*「 ACTIVED GAME MODE!! 」*',
		botAdmin: `*「 BOT MUST BE ADMIN 」*`,
		unreg: 'Silahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*.daftar nama.umur*\n\nContoh: *.daftar Maelyn.20*',
		restrict: 'Fitur ini di *disable*!'
	}[type]
	if (msg) return m.reply(msg)
}

let file = Helper.__filename(import.meta.url, true)
watchFile(file, async () => {
	unwatchFile(file)
	console.log(chalk.redBright("Update 'handler.js'"))
	if (Connection.reload) console.log(await Connection.reload(await Connection.conn))
})