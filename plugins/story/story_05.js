import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story5;
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
handler.menustory = ['story05 *<level_25>*']
handler.tagsstory = ['story']
handler.command = /^(story05)$/i;
handler.register = true
handler.level = 25

export default handler;
