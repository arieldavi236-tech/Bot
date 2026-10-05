import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getCharacter, imageOf, clean } from "../../../utils/anime/api.js";

export default {
  name: "personagem",
  description: "Pesquisa um personagem de anime.",
  commands: ["personagem"],
  usage: `${PREFIX}personagem <nome>`,
  handle: async ({ fullArgs, sendReply, sendWaitReact, sendImageFromURL }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}personagem Naruto`);
    await sendWaitReact();

    const c = await getCharacter(fullArgs.trim());
    if (!c) throw new InvalidParameterError("Personagem não encontrado.");

    const texto = [
      "╭━━━「 キャラ • PERSONAGEM 」━━━╮",
      `┃ ✦ 𝑵𝒐𝒎𝒆: ${c.name || "?"}`,
      `┃ ✦ 𝑱𝒂𝒑𝒐𝒏ê𝒔: ${c.name_kanji || "?"}`,
      `┃ ✦ 𝑭𝒂𝒏𝒔: ${c.favorites ?? "?"}`,
      `┃ ✦ ${clean(c.about, 450) || "Sem descrição disponível."}`,
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n");

    const image = imageOf(c);
    if (image) await sendImageFromURL(image, texto);
    else await sendReply(texto);
  },
};
