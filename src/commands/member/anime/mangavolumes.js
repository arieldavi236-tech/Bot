import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getManga } from "../../../utils/anime/api.js";

export default {
  name: "mangavolumes",
  description: "Mostra a quantidade de volumes.",
  commands: ["mangavolumes"],
  usage: `${PREFIX}mangavolumes <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}mangavolumes One Piece`);
    }

    const m = await getManga(fullArgs.trim());

    if (!m) {
      throw new InvalidParameterError("Mangá não encontrado.");
    }

    const titulo = m.title?.english || m.title?.romaji || m.title?.native || "?";

    await sendReply(
      `📚 *${titulo}*\n📕 Volumes: ${m.volumes ?? "Não informado"}`
    );
  },
};