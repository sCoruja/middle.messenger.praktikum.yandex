import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename).replace('/src','');

app.use("/static", express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/dist/pages"));

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
