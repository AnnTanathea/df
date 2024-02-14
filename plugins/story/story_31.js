import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story31;
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
handler.menustory = ['story31 *<level_94>*']
handler.tagsstory = ['story']
handler.command = /^(story31)$/i;
handler.register = true
handler.level = 94

export default handler;
