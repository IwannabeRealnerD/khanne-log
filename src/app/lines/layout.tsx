import { Suspense } from "react";

import { GlobalTop } from "@/components/Top";

const LinesLayout = async (props: LayoutProps<"/lines">) => {
  return (
    <>
      <div className="mb-8 pb-4">
        <GlobalTop>좋아하는 대사</GlobalTop>
        <p className="mt-1 text-caption text-muted italic">memorable quotes from what I watched</p>
      </div>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default LinesLayout;
