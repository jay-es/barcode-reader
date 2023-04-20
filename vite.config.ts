import preact from "@preact/preset-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { certificateFor } from "devcert";
import { CommonServerOptions, defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  let https: CommonServerOptions["https"];

  if (process.env.NODE_ENV === "development") {
    const { key, cert } = await certificateFor("localhost");
    https = { key, cert };
  }

  return {
    plugins: [preact(), vanillaExtractPlugin()],
    server: {
      https,
    },
  };
});
