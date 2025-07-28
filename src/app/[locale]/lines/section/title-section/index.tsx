import { InternalMainTitle } from "./main-title";

interface InternalTitleSectionProps {
  quote: string | null;
  scene_description: string;
  id: string;
}
export const TitleSection = (props: InternalTitleSectionProps) => {
  const refinedTitles = (() => {
    if (!props.quote && props.scene_description) {
      return {
        main: <InternalMainTitle isDescription id={props.id} title={props.scene_description} />,
        sub: null,
      };
    }
    return {
      main: <InternalMainTitle id={props.id} title={props.quote ?? ""} />,
      sub: <p className="text-base">{props.scene_description}</p>,
    };
  })();

  return (
    <div className="mb-3 flex flex-col gap-1 border-b border-dashed border-gray-200 pb-2">
      {refinedTitles.main}
      {refinedTitles.sub && refinedTitles.sub}
    </div>
  );
};
