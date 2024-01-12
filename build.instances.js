import {build} from "vite";
import {execSync} from "child_process";

for await (const instance of ["gpt3.5", "gpt4"]) {
  await build({
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
  })

  // Generates dist/**/*.d.ts
  execSync(`npx tsc --project tsconfig.build.json`, { stdio: 'inherit' });
  // Replace path aliases with relative paths
  execSync(`npx tsc-alias -p tsconfig.build.json`, { stdio: 'inherit' });
}
