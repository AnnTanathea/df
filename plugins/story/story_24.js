import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story24;
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
handler.menustory = ['story24 *<level_70>*']
handler.tagsstory = ['story']
handler.command = /^(story24)$/i;
handler.register = true
handler.level = 70

export default handler;
