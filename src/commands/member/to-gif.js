import fs from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import { getRandomName } from "../../utils/index.js";
import { InvalidParameterError } from "../../errors/index.js";

const execFileAsync = promisify(execFile);

export default {
  name: "togif",
  description: "Transforma figurinha animada em GIF",
  commands: ["togif", "gif"],

  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendWaitReact,
    sendSuccessReact,
    sendGifFromFile,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("Você precisa enviar uma figurinha!");
    }

    await sendWaitReact();

    const input = await downloadSticker(webMessage, getRandomName());
    const gif = `${input}.gif`;
    const mp4 = `${input}.mp4`;

    await execFileAsync("magick", [
      input,
      "-coalesce",
      "-layers", "Optimize",
      gif,
    ]);

    await execFileAsync("ffmpeg", [
      "-y",
      "-i", gif,
      "-movflags", "+faststart",
      "-pix_fmt", "yuv420p",
      "-c:v", "libx264",
      "-an",
      mp4,
    ]);

    await sendSuccessReact();
    await sendGifFromFile(mp4, "", null, false);

    await fs.unlink(input).catch(() => {});
    await fs.unlink(gif).catch(() => {});
    await fs.unlink(mp4).catch(() => {});
  },
};
