import { plugins } from '../../lib/plugins.js'

let handler = async (m) => {
	let count = 0
	let txt = `*[ PLUGINS LIST ]*\n`
	let obj = Object.values(plugins)
	let all = [...new Set(obj.map(v => v = Object.keys(v)[0]))]
	for (let x of all.filter(v => !/ef|ll|mm/i.test(v))) {
		let cmd = obj.filter(v => v[x] && !v.disabled).map(v => v[x]).flat().length
		count += cmd
		txt += `\n*◈ ${x.replace('help', 'Main Menu')} :* ${cmd} fitur`
	}
	txt += `\n\n*Total Fitur : ${count} Commands*`
	await m.reply(txt.replace(/menu/g, ''))
}

handler.menuinfo = ['totalfitur']
handler.tagsinfo = ['info']
handler.command = /^(ft|total(ft?|fitur|cmd|command))$/i
handler.register = false
export default handler