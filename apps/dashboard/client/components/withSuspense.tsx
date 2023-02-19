import { ComponentType, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorFallback } from "./error-fallback";

export function withSuspense<T extends object = any>(
  Component: ComponentType<T>,
  Fallback: React.FC<T> | string = ""
) {
  const ComponentWithSuspense = (componentProps: T) => {
    const queryClient = useQueryClient();
    const handleReset = () => {
      queryClient.resetQueries({
        predicate(query) {
          return query.state.status === "error";
        },
      });
    };

    const onError = (error: Error) => {
      queryClient.removeQueries({
        predicate(query) {
          return query.state.status === "error";
        },
      });
    };

    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={handleReset}
        onError={onError}
      >
        <Suspense
          fallback={
            typeof Fallback === "string" ? (
              Fallback
            ) : (
              <Fallback {...componentProps} />
            )
          }
        >
          <Component {...componentProps} />
        </Suspense>
      </ErrorBoundary>
    );
  };
  ComponentWithSuspense.displayName = `withSuspense(${
    Component.displayName || Component.name
  })`;
  return ComponentWithSuspense;
}
