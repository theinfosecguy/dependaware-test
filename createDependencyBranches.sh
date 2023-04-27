#!/bin/bash

echo "GH_PAT: ${GH_PAT}"

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
  executeCommand "git add package*.json"
  executeCommand "git commit -m \"chore: update $DEPENDENCY to $LATEST_VERSION\""
  executeCommand "git push https://${GH_PAT}@github.com/${GITHUB_REPOSITORY}.git $branch_name"
  executeCommand "git checkout main"
done
