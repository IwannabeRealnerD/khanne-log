import { FunctionComponent } from "react";

import Markdown, { type Components } from "react-markdown";

import { GlobalHeading } from "@/components/heading";
import { getPageMarkdown } from "@/utils/notion/get-page-markdown";

interface CommentProps {
  pageId: string;
}

const COMMENT_MARKDOWN_COMPONENTS = {
  h1: ({ children }) => <GlobalHeading level={3}>{children}</GlobalHeading>,
  h2: ({ children }) => <GlobalHeading level={4}>{children}</GlobalHeading>,
  h3: ({ children }) => <GlobalHeading level={5}>{children}</GlobalHeading>,
} satisfies Components;

export const Comment: FunctionComponent<CommentProps> = async (props) => {
  const comment = await getPageMarkdown(props.pageId);
  if (!comment) {
    return null;
  }

  return (
    <div className="prose prose-sm max-w-full border-t border-edge px-4 py-3 text-muted">
      <Markdown components={COMMENT_MARKDOWN_COMPONENTS}>{comment}</Markdown>
    </div>
  );
};
