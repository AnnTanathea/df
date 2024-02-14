import { stories } from '../../lib/story.js'

let handler = async (m, { conn }) => {
	let text = stories.story7;
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
handler.menustory = ['story07 *<level_34>*']
handler.tagsstory = ['story']
handler.command = /^(story07)$/i;
handler.register = true
handler.level = 34

export default handler;
