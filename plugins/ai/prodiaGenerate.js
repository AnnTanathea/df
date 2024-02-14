import { MealynAPI } from '../../lib/maelyn.js';

const handler = async (m, { conn, text }) => {
  if (!text) throw "Mau Buat Apa? Contoh: .txt2img anime,white hair|4";
  const [prompt, modelIndex] = text.split("|").map(item => item.trim());

  try {
    const endpoint = "/api/prodia-generate";

    const selectedModel = models[parseInt(modelIndex) - 1];

    const requestParams = { prompt: prompt, model: selectedModel, apikey: MaelynKEY };
    const res = await MealynAPI(endpoint, requestParams);
    const clayza = res.result[0];
    let size = formatFileSize(clayza.size);

    await conn.sendFile(m.chat, clayza.name, 'txt2img.jpg', `*[ TEXT TO IMAGE ]*\n\n*Prompt:* ${prompt}\n*Model:* "${selectedModel}"\n*Size:* ${size}\n`, m);
  } catch (error) {
    console.error("Error:", error);
    m.reply("Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
  }
};

handler.menuai = ["txt2img *<prompt>|<model>*"];
handler.tagsai = ["ai"];
handler.command = /^(txt2img)$/i;
handler.limit = true;
handler.premium = true;

export default handler;

function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const models = [
  "3 Guofeng3 V3.4",
  "Absolute Reality V1.6",
  "Absolute Reality V1.8.1",
  "Am I Real V4.1",
  "Analog V1",
  "Anything V3",
  "Anything V4.5",
  "Anything V5",
  "AbyssOrangeMix V3",
  "Blazing Drive V10g",
  "CetusMix Version35",
  "Children's Stories V1 3D",
  "Children's Stories V1 SemiReal",
  "Children's Stories V1 Toon-Anime",
  "Counterfeit V3.0",
  "CuteYukimix MidChapter3",
  "CyberRealistic V3.3",
  "Dalcefo V4",
  "Deliberate V2",
  "Deliberate V3",
  "Dreamlike Anime V1",
  "Dreamlike Diffusion V1",
  "Dreamlike Photoreal V2",
  "Dreamshaper 6 baked vae",
  "Dreamshaper 7",
  "Dreamshaper 8",
  "Edge of Realism EOR V2.0",
  "Eimis Anime Diffusion V1.0",
  "Elldreth's Vivid",
  "EpiCRealism Natural Sin RC1",
  "I Cant Believe Its Not Photography Seco",
  "Juggernaut Aftermath",
  "Lofi V4",
  "Lyriel V1.6",
  "MajicMix Realistic V4",
  "MechaMix V1.0",
  "MeinaMix Meina V9",
  "MeinaMix Meina V11",
  "Neverending Dream V1.22",
  "Openjourney V4",
  "Pastel-Mix",
  "Portrait+ V1",
  "Protogen x3.4",
  "Realistic Vision V1.4",
  "Realistic Vision V2.0",
  "Realistic Vision V4.0",
  "Realistic Vision V5.0",
  "Redshift Diffusion V1.0",
  "ReV Animated V1.2.2",
  "RunDiffusion FX 2.5D V1.0",
  "RunDiffusion FX Photorealistic V1.0",
  "SD V1.4",
  "SD V1.5",
  "SD V1.5 Inpainting",
  "Shonin's Beautiful People V1.0",
  "TheAlly's Mix II",
  "Timeless V1",
  "ToonYou Beta 6"
  ];