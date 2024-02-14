import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story9;
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
handler.menustory = ['story09 *<level_41>*']
handler.tagsstory = ['story']
handler.command = /^(story09)$/i;
handler.register = true
handler.level = 41

export default handler;
