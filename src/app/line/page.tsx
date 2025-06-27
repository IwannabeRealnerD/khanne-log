import { Suspense } from "react";

import { GlobalTop } from "@/components/Top";

import { LineSection } from "./sections/LineSection";

const LinePage = async () => {
  return (
    <div>
      <GlobalTop>좋아하는 대사 모음집</GlobalTop>
      <Suspense fallback={<div>Loading...</div>}>
        <LineSection />
      </Suspense>
    </div>
  );
};

export default LinePage;
