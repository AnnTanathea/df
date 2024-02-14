import fs from 'fs';
import path from 'path';

let handler = async (m, { usedPrefix, command, text, __dirname }) => {
	if (!text) {
		// Jika tidak ada teks yang diberikan, tampilkan daftar folder dan file dalam folder "plugins"
		let listItems = fs.readdirSync(path.join(__dirname), { withFileTypes: true })
			.map(item => item.isDirectory() ? `[Folder] ${item.name}` : `[File] ${item.name}`);
		return m.reply(`Daftar folder dan file dalam 'plugins':\n${listItems.join('\n')}`);
	}

	let itemPath = path.join(__dirname, text);
	if (!fs.existsSync(itemPath)) {
		return m.reply(`'${text}' tidak ditemukan di dalam 'plugins'`);
	}

	if (fs.statSync(itemPath).isDirectory()) {
		// Jika teks yang diberikan adalah nama folder, tampilkan daftar file dalam folder tersebut
		let listFiles = fs.readdirSync(itemPath)
			.filter(file => file.endsWith('.js'))
			.map(file => `[File] ${file}`);
		
		if (listFiles.length === 0) {
			return m.reply(`Tidak ada file JavaScript (.js) dalam folder '${text}'`);
		}

		return m.reply(`Daftar file dalam folder '${text}':\n${listFiles.join('\n')}`);
	} else if (text.endsWith('.js')) {
		// Jika teks yang diberikan adalah nama file JavaScript, baca dan kirimkan isinya
		let fileContent = fs.readFileSync(itemPath, 'utf8');
		return m.reply(`${fileContent}`);
	} else {
		return m.reply(`'${text}' bukan folder dan bukan file JavaScript (.js) di dalam 'plugins'`);
	}
}

handler.menuowner = ['getplugin']
handler.tagsowner = ['owner']
handler.command = /^(gp|getplugin|pg|pluginget)$/i

handler.mods = true

export default handler
