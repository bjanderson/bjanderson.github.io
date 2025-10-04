---
title: Add ESLint And Prettier
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

To get started you can simply type the following in at the root of your project:

```bash
ng add @angular-eslint/schematics
```

That will install all the eslint packages you will need, create an eslint config file, and add a lint command hook to your angular.json file.

If you were not going to use prettier, this would probably be the only thing you needed to do, but I like to use prettier, so we have to configure that to work together with eslint.

## Install prettier

```bash
npm i -D prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier
```

## Configure prettier in eslintrc.json

My eslintrc.json looks like this:

//Make sure to change the prefix settings to match your project prefix that is set in angular.json.//

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "myproj",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "myproj",
            "style": "kebab-case"
          }
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off"
      }
    },
    {
      "files": ["*.html"],
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:@angular-eslint/template/accessibility",
        "plugin:prettier/recommended"
      ],
      "rules": {
        "@angular-eslint/template/label-has-associated-control": "off",
        "prettier/prettier": ["error", { "parser": "angular" }]
      }
    }
  ]
}
```

## Add .prettierrc

Create a file named `.prettierrc` (prettier.config.js is also valid if you prefer js over json) and add this to it:

```json
{
  "arrowParens": "always",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "jsxSingleQuote": false,
  "quoteProps": "as-needed",
  "printWidth": 100,
  "proseWrap": "preserve",
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false
}
```

Of course, these are my preferred settings. You can configure them as you like. Check out the [prettier config docs](https://prettier.io/docs/en/configuration.html) for more information.

## .editorconfig

One more config file that helps keep your code formatted uniformly is called [EditorConfig](https://editorconfig.org/).

It's a config file that many different editors support, and it is an easy way to set editor settings consistently for anyone working on a given project.

To add it just add a file named `.editorconfig` to your project's root directory, and add this to it:

```ini
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts,*.js]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false

[COMMIT_EDITMSG]
max_line_length = 0
```

You should make sure that the settings in this file align with the settings in your .prettierrc file to avoid conflicts in your editor.

## Reload

You should already have the correct [[VS Code Extensions]] installed to support running eslint, prettier, and editorconfig as you code.

And you may need to restart VS Code in order for prettier and eslint to start working correctly.

<div class="note">
''Pro Tip:'' You can press CTRL+SHIFT+P in your editor and search for Reload Window, and run 'Developer: Reload Window' instead of closing and re-opening VS Code.
</div>

## Run the linter

You can run the linter with

```bash
npm run lint
```

or, if you copied my [[bashrc]] config:

```bash
nlint
```

In most cases to fix the linting, you can just open the file with the warnings and press CTRL+S, and the linter will run and fix all the fixable warnings before the file is saved.

## Commit

Remember to commit your progress before moving on to the next step.
