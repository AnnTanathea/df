import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story30;
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
handler.menustory = ['story30 *<level_90>*']
handler.tagsstory = ['story']
handler.command = /^(story30)$/i;
handler.register = true
handler.level = 90

export default handler;
