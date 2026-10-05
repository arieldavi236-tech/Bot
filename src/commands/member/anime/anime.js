import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, imageOf, clean } from "../../../utils/anime/api.js";

export default {
  name: "anime",
  description: "Mostra informações de um anime.",
  commands: ["anime"],
  usage: `${PREFIX}anime <nome>`,
  handle: async ({ fullArgs, sendReply, sendWaitReact, sendImageFromURL }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}anime Naruto`);
    }

    await sendWaitReact();

    try {
      const a = await getAnime(fullArgs.trim());

      if (!a) {
        throw new InvalidParameterError("Anime não encontrado.");
      }

      const titulo =
        a.title?.english ||
        a.title?.romaji ||
        a.title?.native ||
        "?";

      const genres =
        a.genres?.length
          ? a.genres.join(", ")
          : "Não informado";

      const nota =
        a.averageScore != null
          ? `${a.averageScore}/100`
          : "?";

      const ano = a.seasonYear || "?";

      const descricao = clean(a.description || "");

      const texto = [
        "╭━━━「 🎌 アニメ INFO 」━━━╮",
        `┃ ✦ 𝑻í𝒕𝒖𝒍𝒐: ${titulo}`,
        `┃ ✦ 𝑬𝒑𝒊𝒔ó𝒅𝒊𝒐𝒔: ${a.episodes ?? "?"}`,
        `┃ ✦ 𝑺𝒕𝒂𝒕𝒖𝒔: ${a.status || "?"}`,
        `┃ ✦ 𝑵𝒐𝒕𝒂: ${nota}`,
        `┃ ✦ 𝑮ê𝒏𝒆𝒓𝒐𝒔: ${genres}`,
        `┃ ✦ 𝑨𝒏𝒐: ${ano}`,
        "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
        "",
        descricao
          ? `📖 ${descricao.slice(0, 500)}${descricao.length > 500 ? "..." : ""}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      const image = imageOf(a);

      if (image) {
        await sendImageFromURL(image, texto);
      } else {
        await sendReply(texto);
      }
    } catch (e) {
      if (e instanceof InvalidParameterError) throw e;
      throw new Error("Não consegui consultar o anime agora.");
    }
  },
};
