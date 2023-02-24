import express from "express";
import proxy from "express-http-proxy";

const app = express();

app.use(express.static("./"));
app.use(
  "/lyrics",
  proxy("https://genius.com", {
    proxyReqPathResolver(req) {
      return req.url.replace(/^\/lyrics/, "");
    },
  })
);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`);
});
