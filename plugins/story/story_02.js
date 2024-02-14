import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story2;
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
handler.menustory = ['story02 *<level_12>*']
handler.tagsstory = ['story']
handler.command = /^(story02)$/i;
handler.register = true
handler.level = 12

export default handler;
