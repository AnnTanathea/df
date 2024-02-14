import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story33;
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
handler.menustory = ['story100 *<level_100>*']
handler.tagsstory = ['story']
handler.command = /^(story100)$/i;
handler.register = true
handler.level = 100

export default handler;
