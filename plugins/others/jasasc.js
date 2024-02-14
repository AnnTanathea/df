let handler = async (m, { conn, command }) => {
	let txt = `*[ I N F O R M A T I O N ]*

╔╣ *INFO*
║ • NAME BOT: Victoria Rosalind
║ • VERSI: 5.0.1
║ • OWNER: Clayza Aubert
║ • WEB : https://clayzaaubert.my.id
║ • REST APIs : https://api.clayzaaubert.my.id
╚══╣ 

╔╣ *FEATURES*
║ • AI : Gpt, Bing, Bard, To Anime, Txt2img, dll
║ • ANIME : Neonime, whatAnime, dll
║ • CAI : HOLOLIVE Version
║ • COMIC : komikcast, Komiku, WestManga, dll
║ • DOWNLOAD : FB, TT, YT, IG, Mega, spotify, dll
║ • INTERNET : Pixiv, SsWeb, Google, Infoloker, Pinterest, dll
╚══╣ _95% Scrape & No Apikey_

╔╣ *SOURCE CODE*
║ • YT : ClayzaAubert
║ • Source Code? 70k
╚══╣
`
	//m.reply(txt)
	conn.relayMessage(m.chat,  {
		requestPaymentMessage: {
			currencyCodeIso4217: 'IDR',
			amount1000: 70000 * 1000,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: txt,
					contextInfo: {
						mentionedJid: [m.sender],
						externalAdReply: {
							showAdAttribution: true
						}
					}
				}
			}
		}
	}, {})
}

handler.command = /^(sc|sourcecode)$/i

export default handler