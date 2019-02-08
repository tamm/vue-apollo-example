module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // This is disabled because of @client directive not being valid in linter
    // "graphql/template-strings": [
    //   "error",
    //   {
    //     env: "apollo",
    //     schemaJson: require("./schema.json")
    //   }
    // ]
  },
  overrides: [
    {
      files: ["*.graphql", "*.gql"],
      rules: {
        "prettier/prettier": "off"
      }
    }
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["graphql"]
};
