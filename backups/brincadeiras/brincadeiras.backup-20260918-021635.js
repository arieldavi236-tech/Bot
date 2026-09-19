import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_FILE = path.join(
  __dirname,
  "../../../database/brincadeiras.json"
);

function lerBanco() {
  try {
    if (!fs.existsSync(DATABASE_FILE)) {
      fs.writeFileSync(DATABASE_FILE, "{}", "utf8");
    }

    return JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));
  } catch {
    return {};
  }
}

function salvarBanco(banco) {
  fs.writeFileSync(
    DATABASE_FILE,
    JSON.stringify(banco, null, 2),
    "utf8"
  );
}

function adicionarPonto(userLid, pontos = 1) {
  const banco = lerBanco();

  if (!banco[userLid]) {
    banco[userLid] = {
      pontos: 0,
      vitorias: 0,
    };
  }

  banco[userLid].pontos += pontos;
  banco[userLid].vitorias += 1;

  salvarBanco(banco);

  return banco[userLid];
}

function embaralhar(lista) {
  return [...lista].sort(() => Math.random() - 0.5);
}

const perguntas = [
  {
    pergunta: "Qual é o maior planeta do Sistema Solar?",
    resposta: "jupiter",
  },
  {
    pergunta: "Quantos dias tem uma semana?",
    resposta: "7",
  },
  {
    pergunta: "Qual é a capital do Brasil?",
    resposta: "brasilia",
  },
  {
    pergunta: "Quanto é 9 + 6?",
    resposta: "15",
  },
  {
    pergunta: "Qual animal é conhecido como rei da selva?",
    resposta: "leao",
  },
  {
    pergunta: "Quantos lados tem um triângulo?",
    resposta: "3",
  },
  {
    pergunta: "Qual é o maior oceano da Terra?",
    resposta: "pacifico",
  },
  {
    pergunta: "Quanto é 10 x 5?",
    resposta: "50",
  },
];

const desafios = [
  "Mande um emoji que represente seu humor agora 😂",
  "Escolha alguém do grupo para mandar uma pergunta engraçada.",
  "Descreva seu dia usando apenas 3 emojis.",
  "Mande uma palavra que comece com a letra A.",
  "Escolha um número de 1 a 10 e descubra sua sorte.",
  "Faça uma frase usando as palavras Shizuka, grupo e diversão.",
  "Mande seu emoji favorito.",
  "Diga uma coisa que você gosta muito.",
];

const palavrasForca = [
  "banana",
  "abacaxi",
  "computador",
  "amizade",
  "shizuka",
  "whatsapp",
  "brincadeira",
  "chocolate",
];

const adivinhacoes = [
  {
    dica: "Tenho teclas, mas não abro portas. O que sou?",
    resposta: "teclado",
  },
  {
    dica: "Tenho ponteiros, mas não sou pessoa.",
    resposta: "relogio",
  },
  {
    dica: "Quanto mais tiro, maior fico. O que sou?",
    resposta: "buraco",
  },
  {
    dica: "Tenho dentes, mas não mordo.",
    resposta: "pente",
  },
];

function mencionar(userLid) {
  return `@${String(userLid || "").replace("@lid", "")}`;
}

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export const comandos = {
  quiz: {
    name: "quiz",
    description: "Quiz de conhecimentos gerais",
    commands: ["quiz"],
    usage: "!quiz",

    handle: async ({
      args,
      userLid,
      sendReply,
    }) => {
      const banco = lerBanco();
      banco._quiz = banco._quiz || {};

      if (args.length > 0) {
        const resposta = normalizar(args.join(" "));
        const atual = banco._quiz[userLid];

        if (!atual) {
          await sendReply(
            "🎯 Não existe um quiz seu ativo.\n\nUse !quiz para começar."
          );
          return;
        }

        if (resposta === atual.resposta) {
          delete banco._quiz[userLid];
          salvarBanco(banco);

          const dados = adicionarPonto(userLid, 1);

          await sendReply(
            `🎉 ACERTOU!\n\n` +
            `🏆 Você ganhou +1 ponto!\n` +
            `⭐ Pontos: ${dados.pontos}`
          );
        } else {
          await sendReply("❌ Resposta errada! Tente novamente.");
        }

        return;
      }

      const pergunta =
        perguntas[Math.floor(Math.random() * perguntas.length)];

      banco._quiz[userLid] = pergunta;
      salvarBanco(banco);

      await sendReply(
        `╭────〔 🎯 QUIZ 〕\n` +
        `│\n` +
        `│ ❓ ${pergunta.pergunta}\n` +
        `│\n` +
        `│ 💡 Responda usando:\n` +
        `│ !quiz sua resposta\n` +
        `│\n` +
        `╰────────────────────`
      );
    },
  },

  jokenpo: {
    name: "jokenpo",
    description: "Pedra, papel ou tesoura",
    commands: ["jokenpo"],
    usage: "!jokenpo pedra",

    handle: async ({ args, userLid, sendReply }) => {
      const escolha = normalizar(args[0]);

      if (!["pedra", "papel", "tesoura"].includes(escolha)) {
        await sendReply(
          "✦ ── 𝐉𝐎𝐊𝐄𝐍𝐏Ô\n\n✊ Pedra\n✋ Papel\n✂️ Tesoura\n\nUse: !jokenpo pedra"
        );
        return;
      }

      const opcoes = ["pedra", "papel", "tesoura"];
      const bot = opcoes[Math.floor(Math.random() * opcoes.length)];

      const emojis = {
        pedra: "✊",
        papel: "✋",
        tesoura: "✂️",
      };

      let resultado;
      let pontosTexto = "";

      if (escolha === bot) {
        resultado = "🤝 𝑬𝒎𝒑𝒂𝒕𝒆!";
      } else if (
        (escolha === "pedra" && bot === "tesoura") ||
        (escolha === "papel" && bot === "pedra") ||
        (escolha === "tesoura" && bot === "papel")
      ) {
        const dados = adicionarPonto(userLid, 1);

        resultado = "𝑽𝒐𝒄𝒆̂ 𝒗𝒆𝒏𝒄𝒆𝒖!";
        pontosTexto = `\n   ⭐ +1 ponto\n   💎 ${dados.pontos} pontos`;
      } else {
        resultado = "😅 𝑨 𝑺𝒉𝒊𝒛𝒖𝒌𝒂 𝒗𝒆𝒏𝒄𝒆𝒖!";
      }

      await sendReply(
        `✦ ── 𝐉𝐎𝐊𝐄𝐍𝐏Ô

👤 @${userLid.replace("@lid", "")}

${emojis[escolha]} ${escolha.charAt(0).toUpperCase() + escolha.slice(1)}
♛ Shizuka → ${emojis[bot]} ${bot.charAt(0).toUpperCase() + bot.slice(1)}

╰─ ✧ ${resultado}${pontosTexto}`,
        [userLid]
      );
    },
  },

  forca: {
    name: "forca",
    description: "Jogo da forca",
    commands: ["forca"],
    usage: "!forca",

    handle: async ({
      args,
      userLid,
      sendReply,
    }) => {
      const banco = lerBanco();
      banco._forca = banco._forca || {};

      const atual = banco._forca[userLid];

      if (!atual) {
        const palavra =
          palavrasForca[
            Math.floor(Math.random() * palavrasForca.length)
          ];

        banco._forca[userLid] = {
          palavra,
          letras: [],
          erros: 0,
        };

        salvarBanco(banco);

        await sendReply(
          `╭────〔 🔤 FORCA 〕\n` +
          `│\n` +
          `│ Palavra: ${"_ ".repeat(palavra.length)}\n` +
          `│ ❤️ Tentativas: 6\n` +
          `│\n` +
          `│ Use !forca letra\n` +
          `╰────────────────────`
        );

        return;
      }

      const letra = normalizar(args[0]);

      if (!letra || letra.length !== 1) {
        await sendReply("🔤 Digite apenas uma letra.\n\nExemplo: !forca a");
        return;
      }

      if (atual.letras.includes(letra)) {
        await sendReply("⚠️ Você já tentou essa letra.");
        return;
      }

      atual.letras.push(letra);

      if (!atual.palavra.includes(letra)) {
        atual.erros++;
      }

      const exibida = atual.palavra
        .split("")
        .map((l) => (atual.letras.includes(l) ? l : "_"))
        .join(" ");

      if (!exibida.includes("_")) {
        delete banco._forca[userLid];
        salvarBanco(banco);

        const dados = adicionarPonto(userLid, 2);

        await sendReply(
          `🎉 VOCÊ VENCEU A FORCA!\n\n` +
          `🔤 Palavra: ${atual.palavra}\n` +
          `🏆 +2 pontos\n` +
          `⭐ Pontos: ${dados.pontos}`
        );

        return;
      }

      if (atual.erros >= 6) {
        delete banco._forca[userLid];
        salvarBanco(banco);

        await sendReply(
          `💀 FIM DE JOGO!\n\n` +
          `🔤 A palavra era: ${atual.palavra}\n\n` +
          `Use !forca para jogar novamente.`
        );

        return;
      }

      salvarBanco(banco);

      await sendReply(
        `🔤 ${exibida}\n\n` +
        `❌ Erros: ${atual.erros}/6\n` +
        `🔠 Letras: ${atual.letras.join(", ")}`
      );
    },
  },

  adivinhe: {
    name: "adivinhe",
    description: "Jogo de adivinhação",
    commands: ["adivinhe"],
    usage: "!adivinhe",

    handle: async ({
      args,
      userLid,
      sendReply,
    }) => {
      const banco = lerBanco();
      banco._adivinhe = banco._adivinhe || {};

      const atual = banco._adivinhe[userLid];

      if (args.length > 0 && atual) {
        const resposta = normalizar(args.join(" "));

        if (resposta === atual.resposta) {
          delete banco._adivinhe[userLid];
          salvarBanco(banco);

          const dados = adicionarPonto(userLid, 2);

          await sendReply(
            `🎉 ACERTOU!\n\n` +
            `🏆 +2 pontos\n` +
            `⭐ Pontos: ${dados.pontos}`
          );
        } else {
          await sendReply("❌ Não é isso! Tente novamente.");
        }

        return;
      }

      const pergunta =
        adivinhacoes[
          Math.floor(Math.random() * adivinhacoes.length)
        ];

      banco._adivinhe[userLid] = pergunta;
      salvarBanco(banco);

      await sendReply(
        `╭────〔 🔮 ADIVINHE 〕\n` +
        `│\n` +
        `│ 💭 ${pergunta.dica}\n` +
        `│\n` +
        `│ Responda:\n` +
        `│ !adivinhe sua resposta\n` +
        `╰────────────────────`
      );
    },
  },

  dado: {
    name: "dado",
    description: "Rola um dado",
    commands: ["dado"],
    usage: "!dado",

    handle: async ({ sendReply }) => {
      const numero = Math.floor(Math.random() * 6) + 1;

      await sendReply(
        `🎲 DADO\n\n` +
        `🎯 Resultado: ${numero}`
      );
    },
  },

  numero: {
    name: "numero",
    description: "Adivinhe o número secreto",
    commands: ["numero"],
    usage: "!numero",

    handle: async ({
      args,
      userLid,
      sendReply,
    }) => {
      const banco = lerBanco();
      banco._numero = banco._numero || {};

      let atual = banco._numero[userLid];

      if (!atual) {
        atual = {
          numero: Math.floor(Math.random() * 100) + 1,
          tentativas: 0,
        };

        banco._numero[userLid] = atual;
        salvarBanco(banco);

        await sendReply(
          `🔢 NÚMERO SECRETO\n\n` +
          `Pensei em um número de 1 a 100!\n\n` +
          `Use !numero 50 para tentar.`
        );

        return;
      }

      const tentativa = Number(args[0]);

      if (!Number.isInteger(tentativa) || tentativa < 1 || tentativa > 100) {
        await sendReply("🔢 Digite um número entre 1 e 100.");
        return;
      }

      atual.tentativas++;

      if (tentativa === atual.numero) {
        delete banco._numero[userLid];
        salvarBanco(banco);

        const dados = adicionarPonto(userLid, 2);

        await sendReply(
          `🎉 ACERTOU!\n\n` +
          `🔢 Número: ${atual.numero}\n` +
          `🎯 Tentativas: ${atual.tentativas}\n` +
          `🏆 +2 pontos\n` +
          `⭐ Pontos: ${dados.pontos}`
        );

        return;
      }

      salvarBanco(banco);

      await sendReply(
        tentativa < atual.numero
          ? "⬆️ O número secreto é MAIOR!"
          : "⬇️ O número secreto é MENOR!"
      );
    },
  },

  parouimpar: {
    name: "parouimpar",
    description: "Jogo de par ou ímpar",
    commands: ["parouimpar"],
    usage: "!parouimpar par",

    handle: async ({
      args,
      userLid,
      sendReply,
    }) => {
      const escolha = normalizar(args[0]);

      if (!["par", "impar"].includes(escolha)) {
        await sendReply(
          "⚖️ PAR OU ÍMPAR\n\n" +
          "Use:\n" +
          "!parouimpar par\n" +
          "!parouimpar impar"
        );
        return;
      }

      const numeroJogador = Math.floor(Math.random() * 10) + 1;
      const numeroBot = Math.floor(Math.random() * 10) + 1;
      const soma = numeroJogador + numeroBot;

      const resultado = soma % 2 === 0 ? "par" : "impar";

      if (resultado === escolha) {
        const dados = adicionarPonto(userLid, 1);

        await sendReply(
          `🎉 VOCÊ VENCEU!\n\n` +
          `👤 Seu número: ${numeroJogador}\n` +
          `♛ Shizuka: ${numeroBot}\n` +
          `➕ Soma: ${soma}\n` +
          `⚖️ Resultado: ${resultado}\n\n` +
          `🏆 +1 ponto\n` +
          `⭐ Pontos: ${dados.pontos}`
        );
      } else {
        await sendReply(
          `😅 Você perdeu!\n\n` +
          `👤 Seu número: ${numeroJogador}\n` +
          `♛ Shizuka: ${numeroBot}\n` +
          `➕ Soma: ${soma}\n` +
          `⚖️ Resultado: ${resultado}`
        );
      }
    },
  },

  desafio: {
    name: "desafio",
    description: "Recebe um desafio aleatório",
    commands: ["desafio"],
    usage: "!desafio",

    handle: async ({ sendReply }) => {
      const desafio =
        desafios[Math.floor(Math.random() * desafios.length)];

      await sendReply(
        `╭────〔 🎮 DESAFIO 〕\n` +
        `│\n` +
        `│ 🎯 ${desafio}\n` +
        `│\n` +
        `╰────────────────────`
      );
    },
  },

  ranking: {
    name: "ranking",
    description: "Ranking de pontos das brincadeiras",
    commands: ["ranking"],
    usage: "!ranking",

    handle: async ({ sendReply }) => {
      const banco = lerBanco();

      const jogadores = Object.entries(banco)
        .filter(([id]) => !id.startsWith("_"))
        .sort((a, b) => (b[1].pontos || 0) - (a[1].pontos || 0))
        .slice(0, 10);

      if (jogadores.length === 0) {
        await sendReply(
          "🏆 Ainda não existem jogadores no ranking."
        );
        return;
      }

      const linhas = jogadores.map(
        ([id, dados], index) =>
          `${index + 1}. @${id.replace("@lid", "")}
   ⭐ ${dados.pontos || 0} pontos`
      );

      const mencoes = jogadores.map(([id]) => id);

      await sendReply(
        `╭────〔 🏆 RANKING 〕
│
${linhas.join("\n")}
│
╰────────────────────`,
        mencoes
      );
    },
  },

  pontos: {
    name: "pontos",
    description: "Consulta seus pontos",
    commands: ["pontos"],
    usage: "!pontos",

    handle: async ({
      userLid,
      sendReply,
    }) => {
      const banco = lerBanco();
      const dados = banco[userLid] || {
        pontos: 0,
        vitorias: 0,
      };

      await sendReply(
        `╭────〔 ⭐ PONTOS 〕\n` +
        `│\n` +
        `│ 👤 Jogador: ${userLid}\n` +
        `│ ⭐ Pontos: ${dados.pontos}\n` +
        `│ 🏆 Vitórias: ${dados.vitorias}\n` +
        `│\n` +
        `╰────────────────────`
      );
    },
  },
};

export default comandos;
