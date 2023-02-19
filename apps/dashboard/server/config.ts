import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import { appInfo } from "shared/config";

export const SuperTokensConfig: TypeInput = {
  supertokens: {
    // this is the location of the SuperTokens core.
    connectionURI: process.env.SUPERTOKENS_URL!,
  },
  appInfo,
  // recipeList contains all the modules that you want to
  // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
  recipeList: [
    EmailPassword.init(),
    Session.init(),
    UserRoles.init({
      skipAddingPermissionsToAccessToken: true,
      skipAddingRolesToAccessToken: true,
    }),
    Dashboard.init({
      apiKey: "supertokens_is_awesome",
    }),
  ],
};
