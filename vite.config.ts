import { BuildOptions, defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue2";

// used to build the library
const libraryModeConfigBuild: BuildOptions = {
  outDir: "dist",
  emptyOutDir: true,
  lib: {
    // Could also be a dictionary or array of multiple entry points
    entry: resolve(__dirname, "src/datagrid-bvue.ts"),
    name: "DataGridBVue",
    formats: ["es", "umd"],
    fileName: "datagrid-bvue"
  },
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: ["vue"],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: "Vue"
      },
      exports: "named"
    }
  },
};

// used to build the demo
const devModeConfigBuild: BuildOptions = {
  outDir: "demo",
  emptyOutDir: true
};

const decoratorModeConfigBuild: BuildOptions = {
  outDir: "dist",
  emptyOutDir: true,
  lib: {
    entry: resolve(__dirname, "src/ModelDecorator/index.ts"),
    name: "ModelDecorator",
    formats: ["es", "umd"],
    fileName: "model-decorator"
  },
  rollupOptions: {
    external: [],
    output: {
      globals: {},
      exports: "named"
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let buildConfig: BuildOptions;
  switch (mode) {
    case "development":
        buildConfig = devModeConfigBuild;
        break;
    case "decorator":
        buildConfig = decoratorModeConfigBuild;
        break;
    default:
        buildConfig = libraryModeConfigBuild;
  }
  return {
    plugins: [vue({})],
    build: buildConfig,
    resolve: {
      alias: [
        { find: "@", replacement: resolve("./src") },
        { find: "@rule", replacement: resolve("./src/rule") },
        { find: "@components", replacement: resolve("./src/components") }
      ]
    },
    base: mode === "development" ? "/parse-vue-datagrid-engine/" : "./"
  };
});
