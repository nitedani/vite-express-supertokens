import express, { Express, NextFunction, Request, Response } from "express";
import { readFile } from "fs/promises";
import path, { join } from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";
import viteDevServer from "vavite/vite-dev-server";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const serveClient = async (
  app: Express,
  options: {
    entry: string;
  }
) => {
  if (import.meta.env.PROD) {
    app.use(express.static(join(__dirname, "..", "client")));
  }

  if (options.entry.startsWith("/")) {
    options.entry = options.entry.substring(1);
  }

  let clientEntryPath: string;
  if (viteDevServer) {
    clientEntryPath = options.entry;
  } else {
    const manifest = JSON.parse(
      await readFile(join(cwd(), "dist/client/manifest.json"), "utf-8")
    );
    clientEntryPath = manifest[options.entry].file;
  }

  app.get("*", async (req: Request, res: Response, _next: NextFunction) => {
    let html = `<!DOCTYPE html><html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>React Express</title>
  </head>
  <body>
    <div id="root"/>
    <script type="module" src="/${clientEntryPath}"></script>
  </body>
</html>`;
    if (viteDevServer) {
      html = await viteDevServer.transformIndexHtml(req.url, html);
    }

    res.send(html);
  });
};
