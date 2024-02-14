import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story14;
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
handler.menustory = ['story14 *<level_51>*']
handler.tagsstory = ['story']
handler.command = /^(story14)$/i;
handler.register = true
handler.level = 51

export default handler;
