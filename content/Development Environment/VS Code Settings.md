---
title: VS Code Settings
date: 2025-10-01
description:
draft: false
tags:
aliases:
cssclasses:
---

```json
{
  "angular.enable-strict-mode-prompt": false,

  "breadcrumbs.enabled": true,

  "css.lint.unknownProperties": "ignore",
  "css.lint.unknownVendorSpecificProperties": "ignore",

  "diffEditor.ignoreTrimWhitespace": true,

  "editor.autoClosingQuotes": "beforeWhitespace",
  "editor.autoIndent": "brackets",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll": true
  },
  "editor.cursorSurroundingLines": 5,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.insertSpaces": true,
  "editor.minimap.enabled": true,
  "editor.minimap.showSlider": "always",
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.scrollBeyondLastLine": false,
  "editor.snippetSuggestions": "top",
  "editor.suggestSelection": "first",
  "editor.suggest.preview": true,
  "editor.suggest.showDeprecated": false,
  "editor.tabCompletion": "on",
  "editor.tabSize": 2,
  "editor.trimAutoWhitespace": true,

  "eslint.alwaysShowStatus": true,
  "eslint.codeActionsOnSave.mode": "problems",
  "eslint.format.enable": true,
  "eslint.options": {
    "extensions": [".html", ".ts", ".tsx", ".js", ".jsx"]
  },
  "eslint.validate": ["javascript", "typescript"],

  "explorer.confirmDelete": true,
  "explorer.confirmDragAndDrop": true,

  "extensions.ignoreRecommendations": true,

  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "files.trimTrailingWhitespace": true,

  "html.format.enable": true,
  "html.format.endWithNewline": true,
  "html.format.wrapAttributes": "force-expand-multiline",
  "html.format.wrapLineLength": 50,

  "javascript.format.enable": false,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": true,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": true,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": true,
  "javascript.preferences.quoteStyle": "single",
  "javascript.suggest.completeFunctionCalls": true,
  "javascript.updateImportsOnFileMove.enabled": "never",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },

  "js/ts.implicitProjectConfig.experimentalDecorators": true,

  "less.lint.unknownProperties": "ignore",
  "less.lint.unknownVendorSpecificProperties": "ignore",

  "rest-client.enableTelemetry": false,

  "scss.lint.unknownProperties": "ignore",
  "scss.lint.unknownVendorSpecificProperties": "ignore",

  "security.workspace.trust.untrustedFiles": "open",

  "typescript.format.enable": false,
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": true,
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": true,
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": true,
  "typescript.preferences.quoteStyle": "single",
  "typescript.suggest.completeFunctionCalls": true,
  "typescript.updateImportsOnFileMove.enabled": "never",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },

  "telemetry.telemetryLevel": "off",

  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",

  "window.zoomLevel": 0,

  "workbench.editor.enablePreview": false,
  "workbench.startupEditor": "none"
}
```
