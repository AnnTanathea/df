import fetch from 'node-fetch';
import { format } from 'util';

const handler = async (m, { text, conn }) => {
    try {
        if (!/^https?:\/\//.test(text)) throw 'Awali *URL* dengan http:// atau https://';
        const res = await fetch(text);
        
        if (res.headers.get('content-length') > 100 * 1024 * 1024) {
            throw `Content-Length: ${res.headers.get('content-length')}`;
        }
        
        if (!/text|json/.test(res.headers.get('content-type'))) {
            return conn.sendFile(m.chat, text, 'file', text, m);
        }
        
        const txt = await res.text();
        m.reply(txt.slice(0, 65536) + '');
    } catch (error) {
        throw error;
    }
};

handler.menuinternet = ['get'].map(v => v + ' *<url>*');
handler.tagsinternet = ['internet'];
handler.command = /^(get)$/i;

export default handler;