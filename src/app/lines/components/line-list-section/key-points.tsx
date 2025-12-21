import { FunctionComponent } from "react";

interface KeyPointsProps {
  keyPoints: string[];
}
export const KeyPoints: FunctionComponent<KeyPointsProps> = (props) => {
  return <p className="text-xs">{props.keyPoints.join(" / ")}</p>;
};
