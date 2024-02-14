import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

/**
 * Upload image to Discord CDN
 * Supported mimetypes:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png` 
 * @param {Buffer} content Image Buffer
 * @param {string} fileNames Desired file name
 * @return {Promise<string>} URL of the uploaded image
 */
export default async function DiscordCDN(content, fileNames) {
  try {
    const { ext, mime } = await fileTypeFromBuffer(content);
    const blob = new Blob([content], { type: mime });
    const formData = new FormData();
    formData.append('files[0]', blob, fileNames + '.' + ext);

    const res = await fetch("https://discord.com/api/v9/channels/1204676700697530414/messages", {
      method: "POST",
      headers: {
        Authorization: "Bot MTE4Nzc2NzcxMTAxMTQ1NTA0OA.GA7faI.cHCinrD9p-kHUN9oijmmS3WtHNqMueL2YQFesY"
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Error uploading the file to Discord CDN.');
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}
