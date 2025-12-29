// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      "dist/*",
      "*.svg",
      "*.mp3",
      "*.js",
      "node_modules",
      ".next",
      "android",
      "ios",
    ],
  },
  {
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
      },
      globals: {
        HTMLInputElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLElement: "readonly",
        TouchEvent: "readonly",
        MouseEvent: "readonly",
        RequestInit: "readonly",
        window: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "import/prefer-default-export": "off",
      "import/no-named-as-default-member": "off",
      "no-shadow": "off",
      "import/no-unresolved": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": "off",
      "eslint-plugin-import/no-named-as-default": "off",
      "consistent-return": "off",
      "class-methods-use-this": "off",
      "import/no-named-as-default": "off",
      "no-useless-escape": "off",
      "no-useless-constructor": "off",
      "no-empty-function": "off",
      radix: "off",
      "no-underscore-dangle": "off",
      "no-param-reassign": "off",
      "import/extensions": "off",
      "no-use-before-define": "off",
      "no-plusplus": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);
