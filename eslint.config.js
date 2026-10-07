import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

// AI generated extension
const importNaming = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      component: 'Component import "{{name}}" must use PascalCase.',
      nonComponent: 'Non-component import "{{name}}" must use camelCase.',
    },
  },
  create(context) {
    const pascalCase = /^[A-Z][a-zA-Z0-9]*$/;
    const camelCase = /^[a-z][a-zA-Z0-9]*$/;
    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== "string") return;
        const normalizedSource = source.replace(/\\/g, "/");
        if (!normalizedSource.startsWith(".")) return;
        const isComponent =
          normalizedSource.startsWith("./components/") ||
          normalizedSource.startsWith("../components/") ||
          normalizedSource.includes("/components/") ||
          /(?:^|\/)App(?:\.[jt]sx?)?$/.test(normalizedSource);
        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportNamespaceSpecifier") continue;
          const name = specifier.local.name;
          if (isComponent) {
            if (!pascalCase.test(name)) {
              context.report({
                node: specifier.local,
                messageId: "component",
                data: { name },
              });
            }
          } else if (!camelCase.test(name)) {
            context.report({
              node: specifier.local,
              messageId: "nonComponent",
              data: { name },
            });
          }
        }
      },
    };
  },
};

const namingConvention = (functionFormat) => [
  "error",
  {
    selector: "default",
    format: ["camelCase"],
  },
  {
    selector: "import",
    format: null,
  },
  {
    selector: "variable",
    modifiers: ["const", "global"],
    format: ["UPPER_CASE"],
  },
  {
    selector: "function",
    format: [functionFormat],
  },
  {
    selector: "typeLike",
    format: ["PascalCase"],
  },
];

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      local: {
        rules: {
          "import-naming": importNaming,
        },
      },
    },
    rules: {
      "local/import-naming": "error",
    },
  },

  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["src/*pp.{tsx,jsx}", "src/components/**/*.{tsx,jsx}"],
    rules: {
      "@typescript-eslint/naming-convention": namingConvention("camelCase"),
    },
  },

  {
    files: ["src/components/**/*.{tsx,jsx}", "src/*pp.{tsx,jsx}"],
    rules: {
      "@typescript-eslint/naming-convention": namingConvention("PascalCase"),
    },
  },
]);
