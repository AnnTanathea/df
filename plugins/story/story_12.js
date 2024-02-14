import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story12;
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
handler.menustory = ['story12 *<level_47>*']
handler.tagsstory = ['story']
handler.command = /^(story12)$/i;
handler.register = true
handler.level = 47

export default handler;
