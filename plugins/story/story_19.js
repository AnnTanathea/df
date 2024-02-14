import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story19;
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
handler.menustory = ['story19 *<level_61>*']
handler.tagsstory = ['story']
handler.command = /^(story19)$/i;
handler.register = true
handler.level = 61

export default handler;
