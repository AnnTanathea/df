import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story18;
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
handler.menustory = ['story18 *<level_59>*']
handler.tagsstory = ['story']
handler.command = /^(story18)$/i;
handler.register = true
handler.level = 59

export default handler;
