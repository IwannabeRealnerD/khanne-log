import Link from "next/link";

import { GlobalTop } from "@/components/Top";

const HomePage = () => {
  return (
    <div>
      <GlobalTop>Main</GlobalTop>
      <nav className="flex flex-col items-center gap-5">
        <Link href="/lines?page=1">Lines</Link>
        <p className="text-gray-400">Movies & Series(Not implemented yet)</p>
        <p className="text-gray-400">Games(Not implemented yet)</p>
      </nav>
    </div>
  );
};
export default HomePage;
