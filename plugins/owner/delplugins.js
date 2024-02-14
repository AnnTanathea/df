import { readdirSync, statSync, unlinkSync } from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {
    const getAllFiles = (dir, filesList = []) => {
        const files = readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = statSync(filePath);
            if (stat.isDirectory()) {
                getAllFiles(filePath, filesList);
            } else {
                filesList.push(filePath);
            }
        }
        return filesList;
    };

    const pluginFolderPath = path.join(__dirname, '../plugins');
    const files = getAllFiles(pluginFolderPath);
    const filenames = files.map(file => path.basename(file, '.js'));

    if (!text) throw `File mana yang ingin kamu hapus?\n\nNote: Lagsung masukan saja nama file yang ingin di hapus dan tidak perlu menggunakan format .js\n\nBenar: ${_p}df tes\nSalah: ${_p}df others/tes`;
    if (!filenames.includes(text)) return m.reply(`File '${text}.js' tidak ditemukan dalam folder 'plugins' maupun di dalam subfolder 'plugins'.`);

    const filename = text + '.js';
    const fileToDelete = files.find(file => path.basename(file) === filename);

    if (!fileToDelete) {
        return m.reply(`File '${filename}' tidak ditemukan dalam folder 'plugins' maupun di dalam subfolder 'plugins'.`);
    }

    unlinkSync(fileToDelete);
    conn.reply(m.chat, `Berhasil menghapus file "${filename}" di dalam folder 'plugins' maupun di dalam subfolder 'plugins'.`, m);
};

handler.menuowner = ['df'];
handler.tagsowner = ['owner'];
handler.command = /^(df)$/i;
handler.mods = true;

export default handler;
