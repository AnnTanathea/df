import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story13;
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
handler.menustory = ['story13 *<level_49>*']
handler.tagsstory = ['story']
handler.command = /^(story13)$/i;
handler.register = true
handler.level = 49

export default handler;
