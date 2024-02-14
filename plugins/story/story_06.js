import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story6;
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
handler.menustory = ['story06 *<level_31>*']
handler.tagsstory = ['story']
handler.command = /^(story06)$/i;
handler.register = true
handler.level = 31

export default handler;
