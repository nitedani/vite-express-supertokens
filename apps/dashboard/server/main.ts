import express from "express";
import { TelefuncCtx } from "shared/types";
import supertokens from "supertokens-node";
import {
  errorHandler,
  middleware,
  SessionRequest,
} from "supertokens-node/framework/express";
import SuperTokensError from "supertokens-node/lib/build/error";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { getContext, onBug, provideTelefuncContext, telefunc } from "telefunc";
import "telefunc/async_hooks";
import httpDevServer from "vavite/http-dev-server";
import { SuperTokensConfig } from "./config";
import { migrate } from "./migrate";

import { serveClient } from "./vite.module";

supertokens.init(SuperTokensConfig);

onBug((err) => {
  const { req, res } = getContext<TelefuncCtx>();
  if (SuperTokensError.isErrorFromSuperTokens(err)) {
    const oldsend = res.send.bind(res);
    res.send = function (body) {
      return oldsend(JSON.stringify({ ret: "Auth error", abort: true }));
    };

    return errorHandler()(err, req, res, () => {});
  }
});

async function bootstrap() {
  await migrate();
  const app = express();

  app.use(
    "/_telefunc",
    verifySession({ sessionRequired: false }), // sets req.session
    express.text({ limit: "10mb" }),
    async (req: SessionRequest, res, next) => {
      provideTelefuncContext({ req, res }); // async_hooks
      const httpResponse = await telefunc({
        //this line calls the actual function in the file above
        url: req.originalUrl,
        method: req.method,
        body: req.body,
      });
      if (res.headersSent) return;

      const { body, statusCode, contentType } = httpResponse;
      res.status(statusCode).type(contentType).send(body);
    }
  );
  app.use("/api/auth", [middleware()]);
  app.use(errorHandler());

  serveClient(app, { entry: "/client/client-entry.tsx" });

  if (import.meta.env.PROD) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } else {
    httpDevServer!.on("request", app);
  }
}

bootstrap();
