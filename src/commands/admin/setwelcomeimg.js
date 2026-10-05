import fs from "node:fs/promises";
import path from "node:path";
import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";
import { download } from "../../utils/index.js";

const FILE = path.resolve("assets/admin-settings.json");
const IMAGE_DIR = path.resolve("assets/welcome");

async function load() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

async function save(data) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

function getQuotedImage(webMessage) {
  const directImage = webMessage?.message?.imageMessage;

  if (directImage) {
    return "image";
  }

  const quoted =
    webMessage?.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
    webMessage?.message?.imageMessage?.contextInfo?.quotedMessage ||
    webMessage?.message?.videoMessage?.contextInfo?.quotedMessage;

  if (quoted?.imageMessage) {
    return "image";
  }

  return null;
}

export default {
  name: "setwelcomeimg",
  description: "Define a imagem personalizada da boas-vindas.",
  commands: ["setwelcomeimg", "set-welcome-img"],
  usage: `${PREFIX}setwelcomeimg`,

  handle: async ({
    webMessage,
    remoteJid,
    isGroup,
    socket,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    if (!getQuotedImage(webMessage)) {
      throw new WarningError(
        `Responda a uma imagem com ${PREFIX}setwelcomeimg.`
      );
    }

    await fs.mkdir(IMAGE_DIR, { recursive: true });

    const safeId = remoteJid.replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `welcome-${safeId}`;
    const extension = "jpg";

    const filePath = await download(
      webMessage,
      fileName,
      "image",
      extension,
      socket,
    );

    const finalPath = path.join(IMAGE_DIR, `${fileName}.${extension}`);

    await fs.copyFile(filePath, finalPath);

    const data = await load();

    if (!data[remoteJid]) {
      data[remoteJid] = {};
    }

    data[remoteJid].welcomeImage = finalPath;

    await save(data);

    await sendSuccessReply(
      `🖼️ Imagem de boas-vindas salva!\n\nEla será usada somente neste grupo.`
    );
  },
};
