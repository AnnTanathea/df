import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story3;
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
handler.menustory = ['story03 *<level_17>*']
handler.tagsstory = ['story']
handler.command = /^(story03)$/i;
handler.register = true
handler.level = 17

export default handler;
