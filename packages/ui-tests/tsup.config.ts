import { defineConfig } from "tsup";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
const EsbuildPluginResolve = {
  name: 'esbuild-resolve',
  setup: (build) => {
      const filter = /@test/;
      build.onResolve({ filter, namespace: 'file' }, async (args) => {
          return { path: args.path, external: true };
      });
  }
};

export default defineConfig({
    entry: [
        "src/index.tsx",
        "src/test/index.tsx"
    ],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [
        EsbuildPluginResolve,
        markAsExternalPlugin,
    ],
    loader: {
        ".svg": "dataurl",

    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});

