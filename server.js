import express from "express";
import proxy from "express-http-proxy";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("./"));

app.use(
  "/lyrics",
  proxy("https://genius.com", {
    proxyReqPathResolver(req) {
      return req.url.replace(/^\/lyrics/, "");
    },
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`);
});
