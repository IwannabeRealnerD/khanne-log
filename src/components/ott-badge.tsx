import { FunctionComponent } from "react";

import { RiMovieLine } from "react-icons/ri";
import { SiAmazonprime, SiAppletv, SiHbo, SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";

import { GlobalOttServiceName } from "@/types/ott-service-name";

interface OttBadgeProps {
  ottName: GlobalOttServiceName | string | null;
}

const BACKSPACE_CHARACTER = String.fromCharCode(8);

const normalizeOttName = (ottName: string) => {
  const normalizedOttName = ottName.split(BACKSPACE_CHARACTER).join("").replaceAll(/\s+/g, " ").trim();
  const lowerCaseOttName = normalizedOttName.toLowerCase();

  if (lowerCaseOttName === ["des", "ney +"].join("")) {
    return "Disney Plus";
  }

  switch (lowerCaseOttName) {
    case "hbo max":
    case "hbo max+":
      return "HBO max";
    case "netflix":
      return "Netflix";
    case "apple tv+":
    case "apple tv +":
      return "Apple TV+";
    case "disney +":
    case "disney plus":
      return "Disney Plus";
    case "movie":
    case "영화관":
      return "Movie";
    case "amazon prime":
      return "Amazon Prime";
    default:
      return normalizedOttName;
  }
};

export const GlobalOttBadge: FunctionComponent<OttBadgeProps> = (props) => {
  if (!props.ottName) {
    return null;
  }

  const ottName = normalizeOttName(props.ottName);

  switch (ottName) {
    case "HBO max":
      return <SiHbo className="text-base text-muted" title={ottName} />;
    case "Netflix":
      return <SiNetflix className="text-base text-red-500" title={ottName} />;
    case "Apple TV+":
      return <SiAppletv className="text-base text-muted" title={ottName} />;
    case "Disney Plus":
      return <TbBrandDisney className="text-base text-teal-400" title={ottName} />;
    case "Movie":
      return <RiMovieLine className="text-base text-muted" title={ottName} />;
    case "Amazon Prime":
      return <SiAmazonprime className="text-base text-blue-500" title={ottName} />;
    default:
      return <span className="text-caption text-muted">{ottName}</span>;
  }
};
