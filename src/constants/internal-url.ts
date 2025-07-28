export const GLOBAL_INTERNAL_URL = {
  LINES: (pageIndex?: number) => {
    if (!pageIndex) {
      return "/lines";
    }
    return `/lines?page=${pageIndex}`;
  },
  MOVIES_SERIES: "/movies-series",
  GAMES: "/games",
};
