import { FunctionComponent } from "react";

import { RiMovieLine } from "react-icons/ri";
import { SiAppletv, SiHbo, SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";

import { GlobalOttServiceName } from "@/app/[locale]/lines/components/line-list-section/ott-badge/ott-service";

interface OttBadgeProps {
  ottName: GlobalOttServiceName | string | null;
}

export const OttBadge: FunctionComponent<OttBadgeProps> = (props) => {
  if (!props.ottName) {
    return null;
  }

  switch (props.ottName) {
    case "HBO max":
      return <SiHbo className="text-2xl" />;
    case "Netflix":
      return <SiNetflix className="text-2xl text-red-500" />;
    case "Apple TV+":
      return <SiAppletv className="text-2xl" />;
    case "Disney Plus":
      return <TbBrandDisney className="text-2xl text-teal-400" />;
    case "Movie":
      return <RiMovieLine className="text-2xl" />;
    default:
      return <span>{props.ottName}</span>;
  }
};
