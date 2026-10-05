const ANILIST_URL = "https://graphql.anilist.co";

async function anilist(query, variables = {}) {
  const response = await fetch(ANILIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  if (!response.ok || data.errors) {
    throw new Error(
      data?.errors?.[0]?.message || `AniList HTTP ${response.status}`
    );
  }

  return data.data;
}

function clean(text = "") {
  return String(text)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function imageOf(item) {
  return (
    item?.coverImage?.extraLarge ||
    item?.coverImage?.large ||
    item?.coverImage?.medium ||
    item?.image?.large ||
    item?.image?.medium ||
    null
  );
}

const ANIME_FIELDS = `
  id
  title {
    romaji
    english
    native
  }
  episodes
  status
  averageScore
  genres
  description
  season
  seasonYear
  coverImage {
    large
    extraLarge
  }
`;

const CHARACTER_FIELDS = `
  id
  name {
    first
    middle
    last
    full
    native
  }
  description
  image {
    large
    medium
  }
`;

const MANGA_FIELDS = `
  id
  title {
    romaji
    english
    native
  }
  chapters
  volumes
  status
  averageScore
  genres
  description
  coverImage {
    large
    extraLarge
  }
`;

export async function getAnime(search) {
  const data = await anilist(
    `query ($search: String!) {
      Page(perPage: 1) {
        media(search: $search, type: ANIME) {
          ${ANIME_FIELDS}
        }
      }
    }`,
    { search }
  );

  return data?.Page?.media?.[0] || null;
}

export async function getAnimeResults(search, limit = 5) {
  const data = await anilist(
    `query ($search: String!, $limit: Int!) {
      Page(perPage: $limit) {
        media(search: $search, type: ANIME) {
          ${ANIME_FIELDS}
        }
      }
    }`,
    { search, limit }
  );

  return data?.Page?.media || [];
}

export async function getCharacter(search) {
  const data = await anilist(
    `query ($search: String!) {
      Page(perPage: 1) {
        characters(search: $search) {
          ${CHARACTER_FIELDS}
        }
      }
    }`,
    { search }
  );

  return data?.Page?.characters?.[0] || null;
}

export async function getCharacterResults(search, limit = 5) {
  const data = await anilist(
    `query ($search: String!, $limit: Int!) {
      Page(perPage: $limit) {
        characters(search: $search) {
          ${CHARACTER_FIELDS}
        }
      }
    }`,
    { search, limit }
  );

  return data?.Page?.characters || [];
}

export async function getManga(search) {
  const data = await anilist(
    `query ($search: String!) {
      Page(perPage: 1) {
        media(search: $search, type: MANGA) {
          ${MANGA_FIELDS}
        }
      }
    }`,
    { search }
  );

  return data?.Page?.media?.[0] || null;
}

export async function getMangaResults(search, limit = 5) {
  const data = await anilist(
    `query ($search: String!, $limit: Int!) {
      Page(perPage: $limit) {
        media(search: $search, type: MANGA) {
          ${MANGA_FIELDS}
        }
      }
    }`,
    { search, limit }
  );

  return data?.Page?.media || [];
}

export async function getAnimePictures(search) {
  const results = await getAnimeResults(search, 5);

  return results
    .map((anime) => imageOf(anime))
    .filter(Boolean);
}

export async function getCharacterPictures(search) {
  const results = await getCharacterResults(search, 5);

  return results
    .map((character) => imageOf(character))
    .filter(Boolean);
}

export { imageOf, clean };

export async function getSeasonAnime(year, season, limit = 10) {
  const seasonMap = {
    winter: "WINTER",
    spring: "SPRING",
    summer: "SUMMER",
    fall: "FALL",
  };

  const data = await anilist(
    `query ($year: Int!, $season: MediaSeason!, $limit: Int!) {
      Page(perPage: $limit) {
        media(
          type: ANIME
          season: $season
          seasonYear: $year
          sort: POPULARITY_DESC
        ) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
        }
      }
    }`,
    {
      year,
      season: seasonMap[season],
      limit,
    }
  );

  return data?.Page?.media || [];
}
