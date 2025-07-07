import Link from "next/link";

import { useTranslations } from "next-intl";

import { GlobalTop } from "@/components/Top";
import { GLOBAL_INTERNAL_URL } from "@/constants/internal-url";

const HomePage = () => {
  const t = useTranslations();
  return (
    <div>
      <GlobalTop>{t("main")}</GlobalTop>
      <nav className="flex flex-col items-center gap-5">
        <Link href={GLOBAL_INTERNAL_URL.LINES}>Lines</Link>
        <p className="text-gray-400">Movies & Series(Not implemented yet)</p>
        <p className="text-gray-400">Games(Not implemented yet)</p>
      </nav>
    </div>
  );
};
export default HomePage;
