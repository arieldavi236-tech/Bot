const PT_BR_TITLES = {
  "Witch Hat Atelier": "Ateliê do Chapéu Pontudo",
};

export function getAnimeTitle(title = {}) {
  const english = title?.english || "";
  const romaji = title?.romaji || "";
  const native = title?.native || "";

  return (
    PT_BR_TITLES[english] ||
    PT_BR_TITLES[romaji] ||
    english ||
    romaji ||
    native ||
    "Título desconhecido"
  );
}
