import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

import { GLOBAL_ITEMS_PER_PAGE } from "@/constants/pagination";

import { InternalListSection } from "./internal/section/list-section";
import { InternalPageInfoSection } from "./internal/section/page-info-section";

export const generateStaticParams = async () => {
  const linesDatabase = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public", "generated", "lines.json"), "utf-8")
  );

  const totalPages = Math.ceil(linesDatabase.data.length / GLOBAL_ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());

  return pages.map((page) => ({
    page,
  }));
};

const LinePage = ({ params }: { params: { page: string; locale: string } }) => {
  const { page } = params;
  const databaseResponse = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public", "generated", "lines.json"), "utf-8")
  );

  const totalPageCount = Math.ceil(databaseResponse.data.length / GLOBAL_ITEMS_PER_PAGE);
  const pageAsNumber = Number(page);

  if (Number.isNaN(pageAsNumber) || pageAsNumber < 1 || pageAsNumber > totalPageCount) {
    notFound();
  }

  const startIndex = (pageAsNumber - 1) * GLOBAL_ITEMS_PER_PAGE;
  const endIndex = pageAsNumber * GLOBAL_ITEMS_PER_PAGE;
  const pageData = databaseResponse.data.slice(startIndex, endIndex);

  return (
    <div>
      <InternalPageInfoSection dataLength={databaseResponse.data.length} fetchedAt={databaseResponse.fetchedAt} />
      <InternalListSection currentPage={pageAsNumber} lineData={pageData} totalPageCount={totalPageCount} />
    </div>
  );
};

export default LinePage;
