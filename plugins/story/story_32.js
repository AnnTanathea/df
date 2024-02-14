import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story32;
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
handler.menustory = ['story32 *<level_97>*']
handler.tagsstory = ['story']
handler.command = /^(story32)$/i;
handler.register = true
handler.level = 97

export default handler;
