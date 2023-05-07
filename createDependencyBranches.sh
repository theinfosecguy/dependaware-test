#!/bin/bash

git config --global user.email "keshavaarav22@gmail.com"
git config --global user.name "Keshav Malik"

function executeCommand() {
  command="$1"
  echo "Executing: $command"
  eval $command
}

DEPENDENCIES=$(jq 'keys[]' outdated.json)

for DEPENDENCY in $DEPENDENCIES; do
  DEPENDENCY=$(echo $DEPENDENCY | tr -d '"')
  LATEST_VERSION=$(jq -r ".[\"$DEPENDENCY\"].latest" outdated.json)
  BRANCH_NAME="update-$DEPENDENCY-$LATEST_VERSION"

  executeCommand "git checkout -b $BRANCH_NAME"
  executeCommand "npm install $DEPENDENCY@$LATEST_VERSION"
  
  # Rebase the branch to be up-to-date with the main branch and resolve conflicts in package-lock.json
  executeCommand "git rebase main"
  executeCommand "rm package-lock.json"
  executeCommand "npm install"

  executeCommand "git add package*.json"
  executeCommand "git commit -m \"DependAware: Update $DEPENDENCY to $LATEST_VERSION\""
  
  executeCommand "git push https://${GH_PAT}@github.com/${GITHUB_REPOSITORY}.git $BRANCH_NAME"
  executeCommand "git checkout main"
done
