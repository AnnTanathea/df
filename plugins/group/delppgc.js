let handler = async (m, { conn }) => {
	await conn.removeProfilePicture(m.chat)
}

handler.menugroup = ['delppgc']
handler.tagsgroup = ['group']
handler.command = /^(d(el(ete)?)?pp(gc|gro?up)?)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true
handler.register = true
export default handler