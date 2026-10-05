import axios from "axios";
import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";

export default {
  name: "genero",
  description: "Busca animes por gênero.",
  commands: ["genero"],
  usage: `${PREFIX}genero <gênero>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}genero ação`);
    const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: { q: fullArgs.trim(), limit: 5 },
      timeout: 15000,
    });

    const list = data?.data || [];
    if (!list.length) throw new InvalidParameterError("Não encontrei resultados.");

    await sendReply([
      "╭━━━「 𝑮Ê𝑵𝑬𝑹𝑶 • ジャンル 」━━━╮",
      `┃ ✦ Busca: ${fullArgs.trim()}`,
      ...list.map((a, i) => `┃ ${i + 1}. ${a.title}`),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n"));
  },
};
