import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
  try {
    const imageUrl = 'https://raw.githubusercontent.com/ClayzaAubert/library/main/media/cosplay18.json';
    let response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw `Failed to fetch image list. Status code: ${response.status}`;
    }

    let images = await response.json();
    let result = images[Math.floor(Math.random() * images.length)];

    response = await fetch(result);
    if (!response.ok) {
      throw `Failed to fetch image. Status code: ${response.status}`;
    }

    let buffer = await response.buffer();
    conn.sendFile(m.chat, buffer, 'cosplay18.jpg', '_Cih Sangean..._', m);
  } catch (error) {
    console.error(error);
    throw 'Error fetching or sending the image.';
  }
};

handler.menuimage = ['cosplay18'];
handler.tagsimage = ['image'];
handler.command = /^(cosplay18|cp18)$/i;
handler.limit = true;
handler.premium = true;
handler.register = true;

export default handler;
