import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getManga, imageOf } from "../../../utils/anime/api.js";

export default {
  name: "manga",
  description: "Mostra informações de um mangá.",
  commands: ["manga"],
  usage: `${PREFIX}manga <nome>`,
  handle: async ({ fullArgs, sendReply, sendImageFromURL }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}manga Naruto`);
    const m = await getManga(fullArgs.trim());
    if (!m) throw new InvalidParameterError("Mangá não encontrado.");

    const genres = m.genres?.map(g => g.name).join(", ") || "?";
    const texto = [
      "╭━━━「 漫画 • MANGÁ 」━━━╮",
      `┃ ✦ 𝑻í𝒕𝒖𝒍𝒐: ${m.title || "?"}`,
      `┃ ✦ 𝑻𝒊𝒑𝒐: ${m.type || "?"}`,
      `┃ ✦ 𝑽𝒐𝒍𝒖𝒎𝒆𝒔: ${m.volumes ?? "?"}`,
      `┃ ✦ 𝑪𝒂𝒑í𝒕𝒖𝒍𝒐𝒔: ${m.chapters ?? "?"}`,
      `┃ ✦ 𝑵𝒐𝒕𝒂: ${m.score ?? "?"}`,
      `┃ ✦ 𝑮ê𝒏𝒆𝒓𝒐𝒔: ${genres}`,
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n");

    const image = imageOf(m);
    if (image) await sendImageFromURL(image, texto);
    else await sendReply(texto);
  },
};
