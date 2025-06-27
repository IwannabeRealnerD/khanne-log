"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      {/* TODO - Need mailto link */}
      <h2>Something went wrong!</h2>
      <p>You are not supposed to see this page. 100% my fault.</p>
      <p>{error.message}</p>
      <p>{JSON.stringify(error.cause)}</p>
      <pre>{error.stack}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
