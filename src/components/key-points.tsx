import { FunctionComponent } from "react";

interface KeyPointsProps {
  keyPoints: string[];
}

export const GlobalKeyPoints: FunctionComponent<KeyPointsProps> = (props) => {
  if (props.keyPoints.length === 0) {
    return null;
  }

  return <span>{props.keyPoints.join(" / ")}</span>;
};
