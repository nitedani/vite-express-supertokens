import EmailPassword from "supertokens-node/recipe/emailpassword";
import UserMetadata from "supertokens-node/recipe/usermetadata";

export const createUser = async (
  email: string,
  password: string,
  metadata?: UserMetadata.JSONObject
) => {
  const result = await EmailPassword.signUp(email, password);
  if (result.status === "EMAIL_ALREADY_EXISTS_ERROR") {
    return (await EmailPassword.getUserByEmail(email))!;
  } else {
    if (metadata) {
      await UserMetadata.updateUserMetadata(result.user.id, metadata);
    }
    return result.user;
  }
};
