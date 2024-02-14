import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story26;
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
handler.menustory = ['story26 *<level_77>*']
handler.tagsstory = ['story']
handler.command = /^(story26)$/i;
handler.register = true
handler.level = 77

export default handler;
