import { resolve } from "path";
import { defineConfig } from "vite-plus";

export default defineConfig({
  base: "./",
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        chromeApi: resolve(__dirname, "src/hooks/apiUsers/chromeApi.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
