import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story4;
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
handler.menustory = ['story04 *<level_20>*']
handler.tagsstory = ['story']
handler.command = /^(story04)$/i;
handler.register = true
handler.level = 20

export default handler;
