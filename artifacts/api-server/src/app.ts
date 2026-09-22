import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const frontendDistDir = path.resolve(
  __dirname,
  "..",
  "..",
  "mechengineersoft",
  "dist",
  "public",
);

if (fs.existsSync(frontendDistDir)) {
  app.use(
    express.static(frontendDistDir, {
      maxAge: "1y",
      etag: false,
      extensions: ["html"],
    }),
  );

  app.get("(.*)", (_req, res) => {
    const indexPath = path.join(frontendDistDir, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
} else {
  app.get("/", (_req, res) => {
    res.json({
      status: "ok",
      message:
        "API server running. Frontend static files not found - build may not have completed yet.",
    });
  });
}

export default app;
