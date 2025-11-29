import { defineConfig } from "@opennextjs/cloudflare";

export default defineConfig({
  // Use the same wrangler config as the workflow.
  wrangler: {
    configPath: "./wrangler.jsonc",
  },
});
