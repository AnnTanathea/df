import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story23;
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
handler.menustory = ['story23 *<level_68>*']
handler.tagsstory = ['story']
handler.command = /^(story23)$/i;
handler.register = true
handler.level = 68

export default handler;
