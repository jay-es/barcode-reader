import preact from "@preact/preset-vite";
import { certificateFor } from "devcert";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { key, cert } = await certificateFor("localhost");

  return {
    plugins: [preact()],
    server: {
      https: { key, cert },
    },
  };
});
