import Link from "next/link";

import { GLOBAL_INTERNAL_URL } from "@/constants/internal-url";

const HomePage = () => {
  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <Link className="underline" href={GLOBAL_INTERNAL_URL.LINES()}>
        Lines
      </Link>
    </div>
  );
};

export default HomePage;
