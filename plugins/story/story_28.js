import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story28;
	conn.sendMessage(m.chat, {
		text: text,
		contextInfo: {
			externalAdReply: {
				title: global.judulstory,
				body: global.authorstory,
				thumbnailUrl: global.imgstory,
				mediaType: 1,
				renderLargerThumbnail: true
			}
		}
	})
}
handler.menustory = ['story28 *<level_83>*']
handler.tagsstory = ['story']
handler.command = /^(story28)$/i;
handler.register = true
handler.level = 83

export default handler;
