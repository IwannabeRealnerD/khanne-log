"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      {/* TODO - Need mailto link */}
      <h2>Something went wrong!</h2>
      <p>You are not supposed to see this page. 100% my fault.</p>
      <div>
        <h2>error.message</h2>
        <p>{error.message}</p>
      </div>
      <div>
        <h2>error.cause</h2>
        <p>{JSON.stringify(error.cause)}</p>
      </div>
      <div>
        <h2>error.tack</h2>
        <pre>{error.stack}</pre>
      </div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
