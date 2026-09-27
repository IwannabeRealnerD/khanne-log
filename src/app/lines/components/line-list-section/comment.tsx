import { FunctionComponent } from "react";

import { GlobalMarkdownContent } from "@/components/markdown-content";
import { getNotionPostBodyMarkdown } from "@/utils/notion/get-notion-post-body-markdown";

interface CommentProps {
  pageId: string;
}

export const Comment: FunctionComponent<CommentProps> = async (props) => {
  const comment = await getNotionPostBodyMarkdown(props.pageId);
  if (!comment) {
    return null;
  }

  return (
    <GlobalMarkdownContent
      className="max-w-full border-t border-edge px-4 py-3"
      headingStartLevel={3}
      markdown={comment}
    />
  );
};
