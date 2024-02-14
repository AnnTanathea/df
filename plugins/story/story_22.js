import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story22;
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
handler.menustory = ['story22 *<level_66>*']
handler.tagsstory = ['story']
handler.command = /^(story22)$/i;
handler.register = true
handler.level = 66

export default handler;
