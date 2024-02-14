import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

// Untuk setting owner, author dll, sekarang di pindhkan, kalian bisa mengunakan fitur seperti .setowner dll untuk melakukan setting
// Real Owner moved to db.data.datas.rowner, kalian juga bisa mengunakan command untuk menambah owner,rowner
global.mods = ['6283833771101']
global.wm = '\n©Victoria Rosalind By Aubert'

// WAJIB DI ISI!!
global.MaelynKEY = '' // Daftar Di https://api.maelyn.my.id
global.licenseKey = '' // Isi Dengan LicensiKeys Dari Admin

// Information
global.author = 'Clayza'
global.namebot = 'Victoria Rosalind';
global.stickpack = '​©Victoria Rosalind'
global.stickauth = `By Aubert`
global.myweb = 'https://maelyn.my.id';
global.myGroup = 'https://chat.whatsapp.com/DvywZlJ8ggyK8t3XxSJC6H';
global.myChannel = 'https://www.whatsapp.com/channel/0029VaAftonBPzjPgb1cSH33';
global.thumb = 'https://cdn.jsdelivr.net/gh/ClayzaAubert/library/media/pixelart-006.jpg';

// Message
global.what = '*Ada Yang Bisa saya bantu?*'
global.wait = '*_Processing, Please Wait...._*';
global.eror = '*_Error, Please Try Again Later_*';
global.whatchat = '*_Can Maelyn help you?_*';
global.whatimage = '*_Upload a photo or reply to a photo?_*';

///STORY RPG [PLEASE DONT REMOVE]///
global.judulstory = `Destiny's Radiance: The mystery of eternity`
global.authorstory = 'Author: Amelia Aubert'
global.imgstory = 'https://telegra.ph/file/a8f2b77a4821611f0f91f.jpg'

/// IMAGE MENU ///
global.ai = '';
global.anime = '';
global.casino = '';
global.comic = '';
global.download = '';
global.fun = '';
global.games = '';
global.genshin = '';
global.group = '';
global.image = '';
global.info = '';
global.internet = '';
global.menu = 'https://i.ibb.co/XXj7wpt/Arch-Angel-2-Custom.jpg';
global.owner = '';
global.rpg = '';
global.sticker = '';
global.store = '';
global.story = '';
global.tools = '';

// Default Message
global.mwelcome = "Hai, @user!\nSelamat datang di grup @subject\n\n@desc";
global.mbye =  "Selamat tinggal @user!";
global.msprompte = "@user sekarang admin!";
global.msdemote = "@user sekarang bukan admin!";
global.msDesc = "Deskripsi telah diubah ke \n@desc";
global.msSubject = "Judul grup telah diubah ke \n@subject";
global.msIcon = "Icon grup telah diubah!";
global.msRevoke = "Link group telah diubah ke \n@revoke";

global.multiplier = 69

global.rpg = {
	emoticon(string) {
		string = string.toLowerCase()
		let emot = {
			role: '🏅',
			level: '🧬',
			limit: '🌌',
			health: '❤️',
			exp: '✉️',
			money: '💵',
			potion: '🥤',
			diamond: '💎',
			common: '📦',
			uncommon: '🎁',
			mythic: '🗳️',
			legendary: '🗃️',
			pet: '🎁',
			trash: '🗑',
			armor: '🥼',
			sword: '⚔️',
			pickaxe: '⛏️',
			fishingrod: '🎣',
			bow: '🏹',
			wood: '🪵',
			rock: '🪨',
			string: '🕸️',
			horse: '🐎',
			cat: '🐈',
			dog: '🐕',
			fox: '🦊',
			wolf: '🐺',
			centaur: '🐎',
			phoenix: '🦜',
			dragon: '🐉',
			petfood: '🍖',
			iron: '⛓️',
			gold: '👑',
			emerald: '💚',
			bibitmangga: '🌾',
			bibitanggur: '🌾',
			bibitjeruk: '🌾',
			bibitpisang: '🌾',
			bibitapel: '🌾',
			mangga: '🥭',
			anggur: '🍇',
			jeruk: '🍊',
			pisang: '🍌',
			apel: '🍎',
			ayam: '🐔',
			kambing: '🐐',
			sapi: '🐄',
			kelinci: '🐇',
			domba: '🐑',
			beruang: '🐻',
			babi: '🐖',
			kerbau: '🐃',
			harimau: '🐅',
			banteng: '🐂',
			monyet: '🐒',
			babihutan: '🐗',
			panda: '🐼',
			gajah: '🐘',
			buaya: '🐊',
			orca: '🐋',
			paus: '🐳',
			lumba: '🐬',
			hiu: '🦈',
			ikan: '🐟',
			lele: '🐟',
			bawal: '🐡',
			nila: '🐠',
			kepiting: '🦀',
			lobster: '🦞',
			gurita: '🐙',
			cumi: '🦑',
			udang: '🦐',
			steak: '🍝',
			sate: '🍢',
			rendang: '🍜',
			kornet: '🥣',
			nugget: '🍱',
			bluefin: '🍲',
			seafood: '🍛',
			sushi: '🍣',
			moluska: '🥘',
			squidprawm: '🍤',
			rumahsakit: '🏥',
			restoran: '🏭',
			pabrik: '🏯',
			tambang: '⚒️',
			pelabuhan: '🛳️'
		}
		let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
		if (!results.length) return ''
		else return emot[results[0][0]]
	}}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
	unwatchFile(file)
	console.log(chalk.redBright("Update 'config.js'"))
	import(`${file}?update=${Date.now()}`)
})