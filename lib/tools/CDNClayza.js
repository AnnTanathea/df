import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

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
  const { ext, mime } = await fileTypeFromBuffer(buffer);
  let form = new FormData();
  const blob = new Blob([buffer], { type: mime });
  form.append("file", blob, "tmp." + ext);

  let res = await fetch("https://cdn.maelyn.my.id/api/upload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Error uploading the file.");
  }

  let img = await res.json();
  if (img.error) {
    throw new Error(img.error);
  }

  return `${img.data.name}`;
};
