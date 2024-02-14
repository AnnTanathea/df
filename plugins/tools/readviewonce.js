let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'where\'s message?'
    if (m.quoted.mtype !== 'viewOnceMessage') throw 'Itu bukan pesan viewOnce'
    const msg = await conn.loadMessage(m.quoted.id)
    if (!msg) throw 'can\'t open message!'
    await conn.copyNForward(m.chat, msg, true, { readViewOnce: true })
}

handler.menutools = ['readviewonce *<reply_foto>*']
handler.tagstools = ['tools']
handler.command = /^(rvo|readviewonce)$/i;

export default handler