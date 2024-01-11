import {build} from "vite";
import path from "path";
import dts from "vite-plugin-dts";

["gpt3\.5", "gpt4"].forEach(
  async (instance) => await build({
    configFile: false,
    resolve: {
      alias: {
        "@": "./src",
      },
    },
    build: {
      emptyOutDir: false,
      lib: {
        name: "anything-gpt",
        entry: `./src/use/${instance}.ts`,
        formats: ["umd"],
        fileName: () => `use/${instance}.js`
      }
    },
    plugins: [
      dts({
        exclude: [
          "./src/types",
          "./src/utils",
          "./src/core.ts",
        ]
      })
    ]
  })
)
