import { FunctionComponent } from "react";

import Markdown from "react-markdown";

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
    <div className="prose prose-sm max-w-full border-t border-border px-4 py-3 text-muted">
      <Markdown>{comment}</Markdown>
    </div>
  );
};
