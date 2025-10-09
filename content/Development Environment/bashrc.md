---
title: .bashrc
date: 2025-10-01
description:
draft: false
tags:
aliases:
cssclasses:
---

''~/.bashrc''

```ini
export PATH="$HOME/npm/bin:$HOME/bin:$HOME/.local/bin:$PATH"
export PROJECTS="$HOME/dev/projects"
export UTILS="$PROJECTS/utils"
export NGCOMMON="$PROJECTS/ng-common"
export NGSCHEMATICS="$PROJECTS/ng-schematics"

alias ls="ls -a --color"
alias editbashrc="code ~/.bashrc"
alias editnpmrc="code ~/.npmrc"
alias editgitconfig="code ~/.gitconfig"
alias refreshbashrc=". ~/.bashrc"

alias updatenpm="npm i -g npm"
alias updatenpmcheckupdates="npm i -g npm-check-updates"
alias updateangularcli="npm i -g @angular/cli@latest"

alias nbuild="npm run build"
alias nstart="npm start"
alias ntest="npm test"
alias ntestcov="npm run test:cov"
alias ntestfile="npm run test:file"
alias nlint="npm run lint"
alias ncypress="npm run cypress"
alias npushpatch="npm run push:patch"
alias npushminor="npm run push:minor"
alias npushmajor="npm run push:major"
alias npmi="npm install --ignore-scripts"
alias niutils="npm i -S @bjanderson/utils@latest"
alias niclitool="npm i -g @bjanderson/cli-tool@latest"
alias nimoneytoolshared="npm i -S @bjanderson/moneytool-shared@latest"
alias ningcommon="npm i -S @bjanderson/ng-common@latest"
alias ningschematics="npm i -D @bjanderson/ng-schematics@latest"

alias ngcomponent="ng g @bjanderson/ng-schematics:component -n"
alias ngdialog="ng g @bjanderson/ng-schematics:dialog -n"
alias ngmodel="ng g @bjanderson/ng-schematics:model -n"
alias ngservice="ng g @bjanderson/ng-schematics:service -n"
alias ngstore="ng g @bjanderson/ng-schematics:store -n"
alias ngtable="ng g @bjanderson/ng-schematics:table -n"
alias ngtablewithdatasource="ng g @bjanderson/ng-schematics:table-with-data-source -n"
alias ngtablewithserversidedatasource="ng g @bjanderson/ng-schematics:table-with-server-side-data-source -n"
alias ngjest="ng g @bjanderson/ng-schematics:setup-jest"

alias gs="git status"
alias ga="git add -A"
alias gc="git commit -m"
alias gcamend="git commit --amend --no-edit"
alias gcmaster="git checkout master"
alias gcdev="git checkout dev"
alias gcedits="git checkout edits"
alias gmedits="git merge edits"
alias gbdedits="git branch -d edits"
alias gcbedits="git checkout -b edits"
alias gnewedits="git branch -d edits && git checkout -b edits"

function parse_git_branch () {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

BLUE="\[\033[01;34m\]"
GREEN="\[\033[0;32m\]"
RED="\[\033[0;31m\]"
WHITE="\[\033[0m\]"
YELLOW="\[\033[0;33m\]"
PS1="$BLUE\W$YELLOW\$(parse_git_branch)$BLUE\$$WHITE "
```
