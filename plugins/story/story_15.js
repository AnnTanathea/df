import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story15;
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
handler.menustory = ['story15 *<level_53>*']
handler.tagsstory = ['story']
handler.command = /^(story15)$/i;
handler.register = true
handler.level = 53

export default handler;
