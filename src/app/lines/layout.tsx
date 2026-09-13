import { Suspense } from "react";

import { GlobalPageHeading } from "@/components/page-heading";

const LinesLayout = async (props: LayoutProps<"/lines">) => {
  return (
    <>
      <div className="mb-8 pb-4">
        <GlobalPageHeading>좋아하는 대사</GlobalPageHeading>
        <p className="mt-1 text-caption text-muted italic">memorable quotes from what I watched</p>
      </div>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default LinesLayout;
