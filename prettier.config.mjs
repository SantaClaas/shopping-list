// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
export default {
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};