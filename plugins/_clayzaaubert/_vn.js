import util from "util";
import path from "path";

let handler = async (m, { conn }) => {
	conn.sendFile(m.chat, `${vn.getRandom()}`, "ara.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(hallo|pagi|malam|sepi|hmm)$/i;
handler.command = new RegExp()

export default handler;

const vn = [
"../../media/mp3/no0.mp3",
"../../media/mp3/no1.mp3",
"../../media/mp3/no2.mp3",
"../../media/mp3/no3.mp3",
"../../media/mp3/no4.mp3",
"../../media/mp3/no5.mp3",
"../../media/mp3/no6.mp3",
]