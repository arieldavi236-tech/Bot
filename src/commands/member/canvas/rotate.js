import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { Ffmpeg } from "../../../services/ffmpeg.js";

export default {
  name: "rotate",
  description: "Gira uma imagem.",
  commands: ["rotate", "girar"],
  usage: `${PREFIX}rotate 90 (responda ou marque uma imagem)`,
  handle: async ({
    args,
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "Você precisa marcar uma imagem ou responder a uma imagem"
      );
    }

    const degrees = Number(args?.[0] || 90);

    if (![90, 180, 270].includes(degrees)) {
      throw new InvalidParameterError("Use: 90, 180 ou 270");
    }

    await sendWaitReact();

    const filePath = await downloadImage(webMessage);
    const ffmpeg = new Ffmpeg();

    try {
      const outputPath = await ffmpeg.rotateImage(filePath, degrees);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
      await ffmpeg.cleanup(outputPath);
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
