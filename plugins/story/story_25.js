import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story25;
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
handler.menustory = ['story25 *<level_74>*']
handler.tagsstory = ['story']
handler.command = /^(story25)$/i;
handler.register = true
handler.level = 74

export default handler;
