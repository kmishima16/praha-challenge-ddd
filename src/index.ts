import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { createAssignmentController } from "./presentation/assignment/create-assignment-controller";
import { editAssignmentTitleController } from "./presentation/assignment/edit-assignment-title-controller";
import { getAssignmentController } from "./presentation/assignment/get-assignment-controller";
import { getAssignmentListController } from "./presentation/assignment/get-assignment-list-controller";

const app = new Hono();

app.route("/", getAssignmentController);
app.route("/", getAssignmentListController);
app.route("/", createAssignmentController);
app.route("/", editAssignmentTitleController);

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
