import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

/**
 * Upload image or file using uguu.se
 * @param {Buffer} buffer File or image buffer
 * @return {Promise<string>} URL of the uploaded file or image
 */
export default async (buffer) => {
  const { ext, mime } = await fileTypeFromBuffer(buffer);
  let form = new FormData();
  const blob = new Blob([buffer], { type: mime });
  form.append('files[]', blob, 'tmp.' + ext);

  let res = await fetch('https://uguu.se/upload.php', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    throw new Error('Error uploading the file.');
  }

  let data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return data.files[0].url;
};
