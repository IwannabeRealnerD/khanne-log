import { FunctionComponent } from "react";

interface CommentProps {
  comment: string | null;
  id: string;
}
export const Comment: FunctionComponent<CommentProps> = (props) => {
  if (!props.comment) {
    return null;
  }

  const lines = props.comment.split("\n");

  if (lines.length === 1) {
    return <p className="text-body text-muted">{lines[0]}</p>;
  }

  return (
    <ul className="flex flex-col gap-1">
      {lines.map((line, index) => (
        <li key={`${props.id}-${index}`} className="text-body break-keep text-muted">
          {line}
        </li>
      ))}
    </ul>
  );
};
