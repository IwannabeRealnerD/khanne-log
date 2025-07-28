import { FunctionComponent } from "react";

interface InternalKeyPointsProps {
  keyPoints: string[];
}
export const InternalKeyPoints: FunctionComponent<InternalKeyPointsProps> = (props) => {
  return (
    <p className="text-xs">{props.keyPoints.join(" / ")}</p>
    // <div className="flex">
    //   {props.keyPoints.map((keyPoint) => {
    //     return (
    //       <div key={keyPoint} className="rounded-lg border-1 px-1">
    //         <p className="text-xs">{keyPoint}</p>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};
