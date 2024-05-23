import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    {
        files: ["./src/**/*js"],
        ignorePatterns: ["public/**/*", "node_modules/**/*"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.es2021,
                ...globals.jquery,
                ...globals.node,
                window: "writable",
                navigationManager: "writable",
                api: "writable",
                ecmaVersion: 5,
                sourceType: "module"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "quotes": [ 2, "double" ]
        }
    },
    pluginJs.configs.recommended,
];