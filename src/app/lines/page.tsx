import { GLOBAL_ITEMS_PER_PAGE } from "@/constants/pagination";

import { LineListSection } from "./components/line-list-section";

const LinePage = async (props: PageProps<"/lines">) => {
  const { page } = await props.searchParams;
  return <LineListSection currentPage={page ? Number(page) : 1} itemsPerPage={GLOBAL_ITEMS_PER_PAGE} />;
};

export default LinePage;
