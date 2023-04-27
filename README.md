## DependAware - Automatic Dependency Update
DependAware is an automated dependency update tool for NPM repositories that creates pull requests for updating package dependencies in your repositories. It helps you keep your projects up-to-date and secure by automatically updating outdated or vulnerable dependencies.

## Features
- Automatically scans and detects outdated or vulnerable package dependencies in NPM repositories
- Creates pull requests for each updated dependency with detailed titles and descriptions
- Easy integration with GitHub Actions
- Adds the "dependencies" label to the pull requests

## Prerequisites
- A GitHub repository with an NPM project
- A GitHub Personal Access Token (PAT) with the necessary permissions
- The "dependencies" label created in your repository

## Setup

Follow these steps to set up DependAware in your repository:

1. Fork or clone this repository to your local machine.

2. Copy the `check_dependencies.yml` file from this repository to the `.github/workflows` folder in your project repository. This file contains the GitHub Actions workflow for checking outdated dependencies in your NPM project.

3. Copy the `create_prs.yml` file from this repository to the `.github/workflows` folder in your project repository. This file contains the GitHub Actions workflow for creating pull requests from branches created by the main action.

4. Copy the `createDependencyBranches.sh` file from this repository to your project repository. This shell script is used to create branches for each outdated dependency.

5. Set up your Git configuration with your email and name:

   ```
   git config --global user.email "your_email@example.com"
   git config --global user.name "Your Name"
   ```

6. In your project repository, navigate to "Settings" > "Secrets" > "New repository secret" and create a secret named `GH_PAT`. Set its value to your GitHub Personal Access Token.

7. Commit and push your changes to your project repository.

8. Navigate to the "Actions" tab in your repository and manually trigger the "Check Dependencies" and "Create Pull Requests" workflows.

DependAware will now scan your NPM project, create branches for each outdated dependency, and create pull requests for each branch with detailed titles and descriptions, and labeled with "dependencies".
