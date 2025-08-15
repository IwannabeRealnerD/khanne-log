export const GLOBAL_INTERNAL_URL = {
  LINES: (pageIndex?: number) => {
    if (pageIndex === undefined) {
      return "/lines/1";
    }
    return `/lines/${pageIndex}`;
  },
  ROOT: "/",
  MOVIES_SERIES: "/movies-series",
  GAMES: "/games",
};
