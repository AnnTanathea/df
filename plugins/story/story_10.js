import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story10;
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
handler.menustory = ['story10 *<level_43>*']
handler.tagsstory = ['story']
handler.command = /^(story10)$/i;
handler.register = true
handler.level = 43

export default handler;
