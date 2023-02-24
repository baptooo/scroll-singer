import { useQuery } from "react-query";
import * as cheerio from "cheerio";

const GENIUS_TOKEN =
  "5jxukcV5okGMzeo4NEA3hsoLSywVAVpdpENkfOMioDhgltyXhLlD2Ag1mmimhQbf";

interface LyricsResult {
  title: string;
  thumb: string;
  path: string;
  id: number;
}

export const useSearchLyrics = (term: string) => {
  return useQuery(
    ["search-lyrics", term],
    async function () {
      const lyrics = await fetch(
        `https://api.genius.com/search?access_token=${GENIUS_TOKEN}&q=${term}`
      );
      const json = await lyrics.json();

      const hits: any[] = json?.response?.hits;

      // TODO: fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://genius.com/Red-hot-chili-peppers-under-the-bridge-lyrics')}`)

      return hits?.map<LyricsResult>((value) => ({
        path: value.result.path ?? "",
        thumb: value.result.header_image_thumbnail_url ?? "",
        title: value.result.full_title ?? "",
        id: value.result.id ?? -1,
      }));
    },
    {
      enabled: false,
      retry: false,
    }
  );
};

export const useScrapLyrics = (path: string | undefined) => {
  return useQuery(
    ["lyrics", path],
    async function (data) {
      const resp = await fetch(`/lyrics${path}`);
      return await resp.text();
    },
    {
      select(html) {
        const $ = cheerio.load(html);
        const frag = $('[data-lyrics-container="true"]');

        // Clean and re-shape markup
        frag.find("[role=img]").remove();
        frag.find("br").replaceWith("\n");

        return frag.text();
      },
      enabled: path != null,
    }
  );
};
