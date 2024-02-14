import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story21;
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
handler.menustory = ['story21 *<level_64>*']
handler.tagsstory = ['story']
handler.command = /^(story21)$/i;
handler.register = true
handler.level = 64

export default handler;
