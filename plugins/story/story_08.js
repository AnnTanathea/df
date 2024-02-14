import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story8;
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
handler.menustory = ['story08 *<level_38>*']
handler.tagsstory = ['story']
handler.command = /^(story08)$/i;
handler.register = true
handler.level = 38

export default handler;
