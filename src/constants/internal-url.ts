export const GLOBAL_INTERNAL_URL = {
  LINES: (page?: number) => (page ? `/lines?page=${page}` : "/lines"),
  MOVIES_SERIES: (page?: number) => (page ? `/movies-series?page=${page}` : "/movies-series"),
  ROOT: "/",
  GAMES: "/games",
};
