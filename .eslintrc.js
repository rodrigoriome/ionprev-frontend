module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["eslint:recommended", "prettier", "prettier/vue", "plugin:prettier/recommended", "plugin:vue/essential"],
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "vue/html-self-closing": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
