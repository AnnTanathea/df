import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story16;
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
handler.menustory = ['story16 *<level_55>*']
handler.tagsstory = ['story']
handler.command = /^(story16)$/i;
handler.register = true
handler.level = 55

export default handler;
