module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
      es6: true,
      node: true,
      jest: true,
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
      "project": [
        "./tsconfig.json",
        "./packages/hippy_ui_react/tsconfig.json",
        "./packages/hippy_ui_react_business/tsconfig.json",
        "./example/tsconfig.json",
      ]
    },
    "plugins": [
        "react",
        "prettier"
    ],
  settings: {
    react: {
      version: "detect"
    }
  },
    "rules": {
      "@typescript-eslint/promise-function-async": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/ban-types": "off",
      '@typescript-eslint/no-unnecessary-type-assertion': "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/explicit-member-accessibility": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-non-null-assertion": 0,
      "@typescript-eslint/no-use-before-define": ["error", { variables: false, functions: false }],
      "react/no-deprecated": 0,
      // "quotes": [2, "single"],
      "comma-dangle": [2,"always-multiline"],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "no-template-curly-in-string": "off",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "no-type-imports" }],
      "@typescript-eslint/consistent-type-exports": "off",
      "@typescript-eslint/naming-convention": "off",
    }
}
