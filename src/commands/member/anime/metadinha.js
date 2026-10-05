import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, imageOf } from "../../../utils/anime/api.js";

export default {
  name: "metadinha",
  description: "Cria uma imagem temática baseada no anime informado.",
  commands: ["metadinha"],
  usage: `${PREFIX}metadinha <anime> [casal|amizade|dupla]`,
  handle: async ({ fullArgs, sendImageFromURL }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(
        `Use: ${PREFIX}metadinha Naruto casal`
      );
    }

    const partes = fullArgs.trim().split(/\s+/);
    const tipo = ["casal", "amizade", "dupla"].includes(
      partes[partes.length - 1].toLowerCase()
    )
      ? partes.pop().toLowerCase()
      : "dupla";

    const a = await getAnime(partes.join(" "));
    const image = imageOf(a);

    if (!image) throw new InvalidParameterError("Não encontrei imagem para esse anime.");

    const titulo =
      tipo === "casal" ? "💞 CASAL" :
      tipo === "amizade" ? "🤝 AMIZADE" : "⚔️ DUPLA";

    await sendImageFromURL(
      image,
      `╭━━━「 🎴 METADINHA 」━━━╮\n┃ ✦ ${titulo}\n┃ ✦ ${a.title}\n╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯`
    );
  },
};
