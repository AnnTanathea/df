import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story27;
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
handler.menustory = ['story27 *<level_79>*']
handler.tagsstory = ['story']
handler.command = /^(story27)$/i;
handler.register = true
handler.level = 79

export default handler;
