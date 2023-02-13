import http from "http";
import { spawn } from "child_process";
import "./loadEnvironment.js";
import { respondWithNotFoundError, respondWithOk } from "./utils.js";

const port = process.env.PORT ?? 3050;
const server = http.createServer();

server.on("request", (req, res) => {
  if (req.method === "POST") {
    console.log("Received webhook request");
    let deployScript: string;

    switch (req.url) {
      case "/deploy/identity-server":
        deployScript = "identity-server.deploy.sh";
        break;
      case "/deploy/coder-cat":
        deployScript = "coder-cat.deploy.sh";
        break;
      default:
        respondWithNotFoundError(res);
        return;
    }

    const deploy = spawn(
      new URL(`../scripts/${deployScript}`, import.meta.url).toString(),
      [],
      {
        detached: true,
        stdio: "inherit",
      }
    );
    deploy.unref();

    respondWithOk(res);

    return;
  }

  respondWithNotFoundError(res);
});

server.listen(port, () => {
  console.log(`Webhook server listening on http://localhost:${port}`);
});
