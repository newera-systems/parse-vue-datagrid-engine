module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    project: ["./tsconfig.json", "./tsconfig.demo.json"],
    extraFileExtensions: [".vue"]
  },
  plugins: [
    "vue"
  ],
  rules: {
    "vue/no-deprecated-v-bind-sync": "off",
    "@typescript-eslint/triple-slash-reference": "off"
  },
  ignorePatterns: ["spec/**"]
};
