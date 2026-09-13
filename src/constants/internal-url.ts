export const GLOBAL_INTERNAL_URL = {
  LINES: (page?: number) => (page ? `/lines?page=${page}` : "/lines"),
  MOVIES_SERIES: (page?: number) => (page ? (`/movies-series?page=${page}` as const) : "/movies-series"),
  MOVIES_SERIES_REVIEW: (reviewId: string) => `/movies-series/${reviewId}` as const,
  ROOT: "/",
  GAMES: "/games",
};
