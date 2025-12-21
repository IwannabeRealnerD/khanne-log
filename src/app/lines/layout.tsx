import { Suspense } from "react";

import { GlobalTop } from "@/components/Top";

import { LineListSectionSkeleton } from "./components/LineListSectionSkeleton";

const LinesLayout = (props: LayoutProps<"/lines">) => {
  return (
    <>
      <GlobalTop>좋아하는 대사 모음집</GlobalTop>
      <Suspense fallback={<LineListSectionSkeleton />}>{props.children}</Suspense>
    </>
  );
};

export default LinesLayout;
