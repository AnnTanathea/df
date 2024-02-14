import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story17;
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
handler.menustory = ['story17 *<level_57>*']
handler.tagsstory = ['story']
handler.command = /^(story17)$/i;
handler.register = true
handler.level = 57

export default handler;
