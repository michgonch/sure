import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/sure.js",
  output: { file: pkg.main, format: "cjs" },
  plugins: [terser()]
};
