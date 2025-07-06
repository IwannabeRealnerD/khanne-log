import { Suspense } from "react";

import { GlobalTop } from "@/components/Top";

import { InternalLineListSection } from "./internal/line-list-section";

const LinePage = async () => {
  return (
    <div>
      <GlobalTop>좋아하는 대사 모음집</GlobalTop>
      <Suspense fallback={<div>Loading...</div>}>
        <InternalLineListSection />
      </Suspense>
    </div>
  );
};

export default LinePage;
