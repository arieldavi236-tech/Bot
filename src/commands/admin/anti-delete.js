import { DangerError } from "../../errors/index.js";

const estados = new Map();

export default {
  name: "antidelete",
  description: "Ativa ou desativa o Anti-Delete do grupo",
  commands: ["antidelete"],
  usage: "&antidelete on/off",

  handle: async ({ remoteJid, args, isGroup, isAdmin }) => {
    if (!isGroup) {
      throw new DangerError("Este comando só pode ser usado em grupos.");
    }

    if (!isAdmin) {
      throw new DangerError("Apenas administradores podem usar este comando.");
    }

    const opcao = args[0]?.toLowerCase();

    if (!["on", "off"].includes(opcao)) {
      throw new DangerError(
        "Use:\n&antidelete on\nou\n&antidelete off"
      );
    }

    if (opcao === "on") {
      estados.set(remoteJid, true);
      return "♛ ✅ Anti-Delete ativado neste grupo!";
    }

    estados.set(remoteJid, false);
    return "♛ ❌ Anti-Delete desativado neste grupo!";
  },
};

export function isAntiDeleteEnabled(groupJid) {
  return estados.get(groupJid) === true;
}
