import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story11;
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
handler.menustory = ['story11 *<level_45>*']
handler.tagsstory = ['story']
handler.command = /^(story11)$/i;
handler.register = true
handler.level = 45

export default handler;
