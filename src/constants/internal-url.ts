export const GLOBAL_INTERNAL_URL = {
  LINES: (page?: number) => (page ? `/lines?page=${page}` : "/lines"),
  MOVIES_SERIES: "/movies-series",
  ROOT: "/",
  GAMES: "/games",
};
