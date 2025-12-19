export const GLOBAL_INTERNAL_URL = {
<<<<<<< HEAD
  LINES: (pageIndex?: number) => {
    if (pageIndex === undefined) {
      return "/lines/1";
    }
    return `/lines/${pageIndex}`;
  },
  ROOT: "/",
=======
  LINES: (page?: number) => (page ? `/lines?page=${page}` : "/lines"),
>>>>>>> ddde6fb (feat/better-ssr)
  MOVIES_SERIES: "/movies-series",
  GAMES: "/games",
};
