import { Suspense } from "react";

import { GlobalHeading } from "@/components/heading";

const LinesLayout = async (props: LayoutProps<"/lines">) => {
  return (
    <>
      <div className="mb-8 pb-4">
        <GlobalHeading level={1}>좋아하는 대사</GlobalHeading>
        <p className="mt-1 text-caption text-muted italic">memorable quotes from what I watched</p>
      </div>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default LinesLayout;
