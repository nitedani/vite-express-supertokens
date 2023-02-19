import { getSession } from "server/auth/session";
import UserRoles from "supertokens-node/recipe/userroles";

export const refreshPermissionsClaim = async () => {
  const session = getSession();
  await session.fetchAndSetClaim(UserRoles.PermissionClaim);
};

export const getPost = async (postId: string) => {
  const session = getSession();
  await session.assertClaims([
    UserRoles.PermissionClaim.validators.includes(`posts:${postId}:write`),
  ]);

  return "OK";
};
