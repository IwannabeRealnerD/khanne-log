interface InternalCommentProps {
  comment: string | null;
  id: string;
}
export const InternalComment = (props: InternalCommentProps) => {
  const refinedComment = (() => {
    if (!props.comment) {
      return null;
    }
    const splittedComment = props.comment.split("\n");
    if (splittedComment.length === 1) {
      return <p className="pl-2 -indent-3 text-sm">{splittedComment[0]}</p>;
    }
    return (
      <ul className="flex flex-col gap-1.5">
        {splittedComment.map((line, index) => (
          <li key={`${props.id}-${index}`} className="pl-3 -indent-3 text-sm break-keep">
            {line}
          </li>
        ))}
      </ul>
    );
  })();
  return refinedComment;
};
