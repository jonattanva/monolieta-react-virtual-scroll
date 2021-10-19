import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";

export default [
    {
        input: "src/index.tsx",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
            },
            {
                file: "dist/index.min.js",
                format: "cjs",
                plugins: [terser()],
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
            },
        ],
        plugins: [external(), commonjs(), typescript()],
    },
    {
        input: "types/index.d.ts",
        output: [
            {
                file: "dist/index.d.ts",
                format: "esm",
            },
        ],
        plugins: [dts()],
    },
];
