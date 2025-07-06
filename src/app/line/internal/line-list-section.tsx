import { globalGetDatabase } from "../../../utils/notion/getDatabase";

export const InternalLineListSection = async () => {
  const database = await globalGetDatabase("LINE", {
    filter: {
      property: "is_done",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "added_date",
        direction: "ascending",
      },
    ],
  });

  if (database === undefined) {
    return <p>No items to show</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {database.map((item, index) => {
        const refinedTitles = (() => {
          if (!item.quote && item.sub_title) {
            return { main: item.sub_title, sub: null };
          }
          return { main: item.quote, sub: item.sub_title };
        })();
        const refinedComment = (() => {
          if (!item.comment) {
            return null;
          }
          const splittedComment = item.comment.split("\n");
          if (splittedComment.length === 1) {
            return <p>{splittedComment[0]}</p>;
          }
          return (
            <div>
              {splittedComment.map((line, index) => (
                <p key={`${item.title}-${index}`}>{line}</p>
              ))}
            </div>
          );
        })();
        return (
          <article key={`${item.title}-${index}`} className="rounded-md border border-gray-200 p-4">
            <h3 className="text-center text-2xl font-bold">{refinedTitles.main}</h3>
            <p className="text-center text-base">{item.title}에서</p>
            <p className="text-center text-base">{item.when}</p>
            <div className="flex justify-between">
              <div />
              <div>
                <p>{item.from}</p>
                <p>{item.key_points.join(", ")}</p>
                <p>{item.added_date}</p>
                {refinedTitles.sub && <p>{refinedTitles.sub}</p>}
              </div>
            </div>
            {refinedComment}
          </article>
        );
      })}
    </div>
  );
};
