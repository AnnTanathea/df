import db from '../../lib/database.js';

let handler = async (m, { conn }) => {
    let __timers = new Date() - db.data.users[m.sender].lastberburu;
    let _timers = 500000 - __timers;
    let timers = clockString(_timers);
    let user = db.data.users[m.sender];

    if (new Date() - user.lastberburu > 500000) {
        let randomaku1 = Math.floor(Math.random() * 10);
        let randomaku2 = Math.floor(Math.random() * 10);
        let randomaku3 = Math.floor(Math.random() * 10);
        let randomaku4 = Math.floor(Math.random() * 10);
        let randomaku5 = Math.floor(Math.random() * 10);
        let randomaku6 = Math.floor(Math.random() * 10);
        let randomaku7 = Math.floor(Math.random() * 10);

        let rbrb1 = randomaku1 * 1;
        let rbrb2 = randomaku2 * 1;
        let rbrb3 = randomaku3 * 1;
        let rbrb4 = randomaku4 * 1;
        let rbrb5 = randomaku5 * 1;
        let rbrb6 = randomaku6 * 1;
        let rbrb7 = randomaku7 * 1;

        let anti1 = `${rbrb1}`;
        let anti2 = `${rbrb2}`;
        let anti3 = `${rbrb3}`;
        let anti4 = `${rbrb4}`;
        let anti5 = `${rbrb5}`;
        let anti6 = `${rbrb6}`;
        let anti7 = `${rbrb7}`;

        let hsl = `
*Hasil Buruanmu* :
${global.rpg.emoticon('ayam')} > ${anti1} Ekor
${global.rpg.emoticon('sapi')} > ${anti2} Ekor
${global.rpg.emoticon('kambing')} > ${anti3} Ekor
${global.rpg.emoticon('kelinci')} > ${anti4} Ekor
${global.rpg.emoticon('domba')} > ${anti5} Ekor
${global.rpg.emoticon('beruang')} > ${anti6} Ekor
${global.rpg.emoticon('babi')} > ${anti7} Ekor

*Ketik: .kandang Untuk Melihat Hasilnya*
`;

        user.chicken += rbrb1;
        user.cow += rbrb2;
        user.goat += rbrb3;
        user.rabbit += rbrb4;
        user.sheep += rbrb5;
        user.bear += rbrb6;
        user.pig += rbrb7;

        conn.reply(m.chat, hsl, m);
        user.lastberburu = new Date * 1
    } else {
        conn.reply(m.chat, `*Sepertinya Kamu Sudah Kecapekan*\n*Silahkan Istirahat Dulu Selama* ${timers}`, m);
    }
};

handler.menurpg = ['berburu'];
handler.tagsrpg = ['rpg'];
handler.command = /^(berburu)$/i;
handler.group = true;

export default handler;

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n' + d, ' *Hari*\n ', h, ' *Jam*\n ', m, ' *Menit*\n ', s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('');
}
