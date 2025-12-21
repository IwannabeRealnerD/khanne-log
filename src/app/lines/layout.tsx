import { Suspense } from "react";

import { GlobalTop } from "@/components/Top";

const LinesLayout = async (props: LayoutProps<"/lines">) => {
  return (
    <>
      <GlobalTop>좋아하는 대사 모음집</GlobalTop>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default LinesLayout;
