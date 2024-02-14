import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 * @return {Promise<string>}
 */
export default async (buffer) => {
  const fileTypeResult = await fileTypeFromBuffer(buffer);

  // Check if fileTypeResult is defined before destructuring
  if (!fileTypeResult) {
    throw new Error('File type detection failed.');
  }

  const { ext, mime } = fileTypeResult;

  let form = new FormData();
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime });
  form.append('file', blob, 'tmp.' + ext);

  let res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form,
  });

  let img = await res.json();

  if (img.error) {
    throw new Error(img.error);
  }

  return 'https://telegra.ph' + img[0].src;
};
