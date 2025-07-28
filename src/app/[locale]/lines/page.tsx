import { globalGetLinesDatabase } from "@/utils/globalGetNotionDatabase";

import { ListSection } from "./section/list-section";
import { PageInfoSection } from "./section/page-info-section";

const LinePage = async () => {
  const databaseResponse = await globalGetLinesDatabase();

  if (databaseResponse === undefined) {
    return <p>No items to show</p>;
  }

  return (
    <div>
      <PageInfoSection dataLength={databaseResponse.data.length} fetchedAt={databaseResponse.fetchedAt} />
      <ListSection databaseResponse={databaseResponse} />
    </div>
  );
};

export default LinePage;
