import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { createChallengeController } from "./presentation/challenge/create-challenge-controller";

const app = new Hono();

app.route("/", createChallengeController);

const port = 3000;
console.log(`Server is running on port ${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});

if (import.meta.hot) {
  // HMR時に同一ポートでサーバーが立ち上がろうとする為、リロードが発生する前にサーバーを閉じる
  import.meta.hot.on("vite:beforeFullReload", () => {
    server.close();
  });
}
