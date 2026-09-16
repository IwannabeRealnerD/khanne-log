import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Markdown, { type Components } from "react-markdown";

import { GlobalHeading } from "@/components/heading";
import { GlobalOttBadge } from "@/components/ott-badge";
import { GlobalRenderingTypeBadge, ROUTE_RENDERING_CONFIG } from "@/components/rendering-type-badge";

import { getReviewDetail, getReviewPageData } from "./get-review-detail";
import ReviewDetailLoading from "./loading";

const DATE_FORMATTER = new Intl.DateTimeFormat("ko", { dateStyle: "long" });

const REVIEW_MARKDOWN_COMPONENTS = {
  h1: ({ children }) => <GlobalHeading level={2}>{children}</GlobalHeading>,
  h2: ({ children }) => <GlobalHeading level={3}>{children}</GlobalHeading>,
  h3: ({ children }) => <GlobalHeading level={4}>{children}</GlobalHeading>,
} satisfies Components;

const formatDate = (date: string): string => DATE_FORMATTER.format(new Date(date));

/* eslint-disable @typescript-eslint/naming-convention */
export const generateMetadata = async (props: PageProps<"/movies-series/[reviewId]">): Promise<Metadata> => {
  const { reviewId } = await props.params;
  const review = await getReviewPageData(reviewId);

  if (!review) {
    return { title: "리뷰를 찾을 수 없습니다" };
  }

  return {
    description: review.one_liner ?? `${review.title} 작품 리뷰`,
    title: review.title,
  };
};
/* eslint-enable @typescript-eslint/naming-convention */

const ReviewDetailContent = async (props: Pick<PageProps<"/movies-series/[reviewId]">, "params">) => {
  const { reviewId } = await props.params;
  const review = await getReviewDetail(reviewId);

  if (!review) {
    notFound();
  }

  return (
    <article>
      <header className="mt-6 border-b border-edge pb-8">
        <GlobalHeading level={1}>{review.title}</GlobalHeading>
        {review.one_liner ? <p className="mt-3 text-body leading-6 text-muted">“{review.one_liner}”</p> : null}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          {review.from.length > 0 ? (
            <div aria-label="감상 채널" className="flex items-center gap-2">
              {review.from.map((ottName) => (
                <GlobalOttBadge key={ottName} ottName={ottName} />
              ))}
            </div>
          ) : null}
          {review.key_points.length > 0 ? (
            <ul aria-label="리뷰 키워드" className="flex flex-wrap gap-2">
              {review.key_points.map((keyPoint) => (
                <li
                  key={keyPoint}
                  className="rounded-full border border-edge bg-bg-subtle px-2.5 py-1 text-caption text-muted"
                >
                  {keyPoint}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-caption text-subtle">
          <div className="flex gap-1.5">
            <dt>작성</dt>
            <dd>
              <time dateTime={review.added_date}>{formatDate(review.added_date)}</time>
            </dd>
          </div>
          <div className="flex gap-1.5">
            <dt>수정</dt>
            <dd>
              <time dateTime={review.edited_date}>{formatDate(review.edited_date)}</time>
            </dd>
          </div>
        </dl>
      </header>

      {review.markdown ? (
        <div className="prose prose-sm mt-8 max-w-none text-muted prose-a:text-accent prose-blockquote:border-accent-light prose-blockquote:text-muted prose-hr:border-edge">
          <Markdown components={REVIEW_MARKDOWN_COMPONENTS}>{review.markdown}</Markdown>
        </div>
      ) : (
        <p className="mt-8 text-body text-muted">작성된 리뷰 본문이 없습니다.</p>
      )}
    </article>
  );
};

const MoviesSeriesReviewDetailPage = (props: PageProps<"/movies-series/[reviewId]">) => {
  return (
    <>
      <Suspense fallback={<ReviewDetailLoading />}>
        <ReviewDetailContent params={props.params} />
      </Suspense>
      <GlobalRenderingTypeBadge config={ROUTE_RENDERING_CONFIG["/movies-series/[reviewId]"]} />
    </>
  );
};

export default MoviesSeriesReviewDetailPage;
