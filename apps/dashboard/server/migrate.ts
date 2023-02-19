import { createNewRoleOrAddPermissions } from "./auth/permissions";
import { addRolesToUser } from "./auth/roles";
import { createUser } from "./auth/users";

export const migrate = async () => {
  await createNewRoleOrAddPermissions("admin", [
    "posts:some-post-id:read",
    "posts:some-post-id:write",
    "pages:protected",
  ]);

  const user = await createUser("admin@admin.admin", "admin");

  await addRolesToUser(user.id, ["admin"]);
};
