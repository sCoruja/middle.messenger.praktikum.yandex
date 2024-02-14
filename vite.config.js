import { resolve } from "path";
import { defineConfig } from "vite";
// import handlebars from "./src/services/vite-plugin-handlebars-precompile";
import handlebars from "vite-plugin-handlebars";
export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  plugins: [handlebars()],
});
