import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import html from "@html-eslint/eslint-plugin";

export default defineConfig([
    {
        files: ["*.html", "**/*.html"],
        plugins: {
            html,
        },
        language: "html/html",
        extends: ["html/recommended"],
        rules: {
            "html/no-target-blank": "error",
            "html/no-duplicate-class": "error",
            "html/no-duplicate-id": "error",
            "html/require-doctype": "error"
        }
    },  
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
]);
