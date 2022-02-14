import dts from "rollup-plugin-dts";
import styles from "rollup-plugin-styles";
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
                file: "dist/index.esm.js",
                format: "esm",
            },
        ],
        plugins: [styles(), external(), commonjs(), typescript()],
    },
    {
        input: "types/index.d.ts",
        external: [/\.css$/u],
        output: [
            {
                file: "dist/index.d.ts",
                format: "esm",
            },
        ],
        plugins: [dts(), styles()],
    },
];
