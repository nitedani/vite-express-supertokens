import { Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";

export type TelefuncCtx = {
  req: SessionRequest & { error?: any };
  res: Response;
  next: (err?: any) => void;
};
