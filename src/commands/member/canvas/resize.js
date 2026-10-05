import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { Ffmpeg } from "../../../services/ffmpeg.js";

export default {
  name: "resize",
  description: "Redimensiona uma imagem.",
  commands: ["resize", "redimensionar"],
  usage: `${PREFIX}resize 512 512 (responda ou marque uma imagem)`,
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

    const width = Number(args?.[0] || 512);
    const height = Number(args?.[1] || 512);

    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new InvalidParameterError("Use: 512 512");
    }

    await sendWaitReact();

    const filePath = await downloadImage(webMessage);
    const ffmpeg = new Ffmpeg();

    try {
      const outputPath = await ffmpeg.resizeImage(filePath, width, height);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
      await ffmpeg.cleanup(outputPath);
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
