import { GlobalNavItem } from "@/components/nav-item";
import { GlobalRenderingTypeBadge } from "@/components/rendering-type-badge";
import { ROUTE_RENDERING_CONFIG } from "@/components/rendering-type-badge/constants/contents";

const HomePage = () => {
  return (
    <>
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-h2 font-bold tracking-tight text-fg">Khanne Log</h2>
        <p className="mt-2 text-body text-muted">movies, series, and games I love</p>
        <div className="mt-3 h-0.5 w-8 rounded-full bg-accent" />

        <nav className="mt-8 flex w-full max-w-sm flex-col gap-3">
          <GlobalNavItem description="memorable quotes from what I watched" href="/lines?page=1" label="Lines" />
          <GlobalNavItem description="movies & series reviews" href="/movies-series?page=1" label="Movies & Series" />
          <GlobalNavItem disabled description="game logs & reviews" href="#" label="Games" />
        </nav>
      </div>
      <GlobalRenderingTypeBadge config={ROUTE_RENDERING_CONFIG["/"]} />
    </>
  );
};
export default HomePage;
