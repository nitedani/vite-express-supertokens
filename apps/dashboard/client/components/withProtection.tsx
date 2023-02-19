import { ComponentType } from "react";
import { Protected, ProtectedProps } from "./protected";

export function withProtection<T extends object = any>(
  permission: string,
  Component: ComponentType<T>,
  Fallback: React.FC<T> | string = "",
  props: Omit<ProtectedProps, "Fallback" | "permission"> = {}
) {
  const ComponentWithProtection = (componentProps: T) => {
    return (
      <Protected
        {...props}
        permission={permission}
        fallback={
          typeof Fallback === "string" ? (
            Fallback
          ) : (
            <Fallback {...componentProps} />
          )
        }
      >
        <Component {...componentProps} />
      </Protected>
    );
  };
  ComponentWithProtection.displayName = `withProtection(${
    Component.displayName || Component.name
  })`;
  return ComponentWithProtection;
}
