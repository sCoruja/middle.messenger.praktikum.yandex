import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename).replace("/src", "");

// app.use("/static", express.static(__dirname + "/static"));
// app.use(express.static(__dirname + "/dist"));
app.get("*", (req, res) => {
  if (req.path.startsWith("/static")) {
    res.sendFile(path.join(__dirname, req.path));
  } else if (req.path.startsWith("/assets")) {
    res.sendFile(path.join(__dirname, "dist" + req.path.slice(0, -1)));
  } else {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  }
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
