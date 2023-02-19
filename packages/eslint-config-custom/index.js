module.exports = {
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:sonarjs/recommended",
      "react-app",
      "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "sonarjs"],
    rules: {
      "sonarjs/prefer-immediate-return": "off",
    },
  };
  