import Session from "supertokens-node/recipe/session";
import UserRoles from "supertokens-node/recipe/userroles";
import { getSession } from "./session";

export const updateSessionClaims = async (userId: string) => {
  const sessionHandles = await Session.getAllSessionHandlesForUser(userId);
  for (const handle of sessionHandles) {
    await Session.fetchAndSetClaim(handle, UserRoles.PermissionClaim);
    await Session.fetchAndSetClaim(handle, UserRoles.UserRoleClaim);
  }

  try {
    const session = getSession();
    if (session.getUserId() === userId) {
      session.fetchAndSetClaim(UserRoles.PermissionClaim);
      session.fetchAndSetClaim(UserRoles.UserRoleClaim);
    }
  } catch (error) {
    /* empty */
  }
};

export const addRolesToUser = async (userId: string, roles: string[]) => {
  for (const role of roles) {
    await UserRoles.addRoleToUser(userId, role);
  }
  await updateSessionClaims(userId);
};

export const removeRolesFromUser = async (userId: string, roles: string[]) => {
  for (const role of roles) {
    await UserRoles.removeUserRole(userId, role);
  }
  await updateSessionClaims(userId);
};
