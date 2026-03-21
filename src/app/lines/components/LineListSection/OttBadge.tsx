import { FunctionComponent } from "react";

import { RiMovieLine } from "react-icons/ri";
import { SiAppletv, SiHbo, SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";

import { GlobalOttServiceName } from "@/types/OttServiceName";

interface OttBadgeProps {
  ottName: GlobalOttServiceName | string | null;
}

export const OttBadge: FunctionComponent<OttBadgeProps> = (props) => {
  if (!props.ottName) {
    return null;
  }

  switch (props.ottName) {
    case "HBO max":
      return <SiHbo className="text-base text-muted" />;
    case "Netflix":
      return <SiNetflix className="text-base text-red-500" />;
    case "Apple TV+":
      return <SiAppletv className="text-base text-muted" />;
    case "Disney Plus":
      return <TbBrandDisney className="text-base text-teal-400" />;
    case "Movie":
      return <RiMovieLine className="text-base text-muted" />;
    default:
      return <span className="text-caption text-muted">{props.ottName}</span>;
  }
};
