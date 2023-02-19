export const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div>
      <div>{error.abortValue || error.message}</div>
      <button onClick={resetErrorBoundary}>Reload</button>
    </div>
  );
};
