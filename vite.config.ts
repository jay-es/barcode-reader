import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { certificateFor } from "devcert";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { key, cert } = await certificateFor("localhost");

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      https: { key, cert },
    },
  };
});
