import { TelefuncCtx } from "shared/types";
import { Abort, getContext } from "telefunc";

export const getSession = () => {
  const ctx = getContext<TelefuncCtx>();
  const session = ctx.req.session;
  if (!session) {
    throw Abort("Session not found");
  }
  return session;
};
