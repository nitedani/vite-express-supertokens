import { useMemo } from "react";
import { refreshPermissionsClaim } from "shared/api.telefunc";
import Session, {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles";

export type ProtectedProps = {
  permission?: string;
  fallback?: React.ReactNode;
  disableRedirect?: boolean;
};

let refreshingPromise: Promise<void> | null = null;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
PermissionClaim.refresh = async () => {
  if (refreshingPromise) {
    return refreshingPromise;
  }
  console.log("refreshing permissions claim");
  refreshingPromise = refreshPermissionsClaim().finally(
    () => (refreshingPromise = null)
  );
  return refreshingPromise;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
PermissionClaim.defaultMaxAgeInSeconds = 0.2;

export const Protected = ({
  children,
  permission,
  fallback = null,
  disableRedirect = false,
}: {
  children: React.ReactNode;
} & ProtectedProps): JSX.Element => {
  const extraValidators: Session.SessionClaimValidator[] = useMemo(() => {
    const v = [];
    if (permission) {
      v.push(PermissionClaim.validators.includes(permission));
    }
    return v;
  }, [permission]);

  return (
    <SessionAuth
      doRedirection={!disableRedirect}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        ...extraValidators,
      ]}
    >
      <InvalidClaimHandler fallback={fallback}>{children}</InvalidClaimHandler>
    </SessionAuth>
  );
};

const InvalidClaimHandler = (
  props: React.PropsWithChildren<{
    fallback?: React.ReactNode;
  }>
) => {
  const sessionContext = useSessionContext();
  if (sessionContext.loading) {
    return <></>;
  }

  console.log(sessionContext);

  if (sessionContext.invalidClaims.length) {
    return <>{props.fallback}</>;
  }

  return <>{props.children}</>;
};
