import UserRoles from "supertokens-node/recipe/userroles";
import { updateSessionClaims } from "./roles";

export const createNewRoleOrAddPermissions = async (
  role: string,
  permissions: string[]
) => {
  await UserRoles.createNewRoleOrAddPermissions(role, permissions);
  const res = await UserRoles.getUsersThatHaveRole(role);
  if (res.status === "OK") {
    for (const userId of res.users) {
      await updateSessionClaims(userId);
    }
  }
};

export const removePermissionsFromRole = async (
  role: string,
  permissions: string[]
) => {
  await UserRoles.removePermissionsFromRole(role, permissions);
  const res = await UserRoles.getUsersThatHaveRole(role);
  if (res.status === "OK") {
    for (const userId of res.users) {
      await updateSessionClaims(userId);
    }
  }
};
