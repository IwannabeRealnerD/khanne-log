import { FunctionComponent } from "react";

import { GlobalMarkdownContent } from "@/components/markdown-content";
import { getPageMarkdown } from "@/utils/notion/get-page-markdown";

interface CommentProps {
  pageId: string;
}

export const Comment: FunctionComponent<CommentProps> = async (props) => {
  const comment = await getPageMarkdown(props.pageId);
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
