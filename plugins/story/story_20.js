import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story20;
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
handler.menustory = ['story20 *<level_63>*']
handler.tagsstory = ['story']
handler.command = /^(story20)$/i;
handler.register = true
handler.level = 63

export default handler;
