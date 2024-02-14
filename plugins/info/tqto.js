// Terima Kasih Telah Menggunakan Script Victoria
// Tolong jangan di hapus creditnya silakan saja isi nama kalian
import fs from 'fs'

let handler = async (m, { conn }) => {
	let tqto = `
Thanks Too :
> Nurutomo
> BochilGaming
> ImYanXiao
> ShirokamiRyzn
> Xyroinee
> Zerenity

Contributors :
> Amelia Aubert (Story)
> Clara Aubert (Support)
> Clayza Aubert (Recode)
> Re:era (Art)
> Hakomiwa (Art)

Script Victoria Rosalind Di Recode Oleh: *Clayza Aubert*
`;

conn.sendMessage(m.chat, {
	text: tqto,
	contextInfo: {
	externalAdReply: {
	title: 'Credit Bot Whatsapp',
	body: 'Victoria Rosalind',
	thumbnailUrl: global.thumb,
	sourceUrl: 'https://youtube.com/c/ClayzaAubert',
	mediaType: 1,
	renderLargerThumbnail: true
	}}})
  
}
handler.menuinfo = ['tqto']
handler.tagsinfo = ['info']
handler.command = /^(tqto)$/i;
handler.register = true 
export default handler;
