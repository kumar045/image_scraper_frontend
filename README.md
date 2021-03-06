---
markdown-version: v1
tool-type: theia
title: module2/code_coverage
branch: lab-809-instruction
version-history-start-date: 2022-06-20T01:10:05.000Z
---

::page{title="Code Coverage"}

**Estimated time needed:** 30 minutes

Code Coverage is a measure of how much of your code has been executed. It is typically presented as a report that shows the percentage of the code that has been executed. For automated testing, the report does not measure the quality of tests, only whether your code is executed by the tests. It is especially useful to check that critical or high-risk areas of your code are covered because they should receive the most rigorous testing.

In this lab, you will learn how to integrate Codecov with your GitHub repository using GitHub Actions to generate coverage reports every time you push changes or make a pull request.

## Learning Objectives

*   Setting up the Lab Environment
*   Getting Familiar with Codecov
*   Configuring GitHub Actions
*   Running tests and generating a Coverage report
*   Setting up Codecov

## Prerequisites

Before beginning this lesson, you should:

*   Be familiar with the syntax for GitHub Actions
*   Have basic understanding of:
    *   nosetests
*   Have GitHub account
*   Have Intermediate level knowledge of CLIs

::page{title="Step 1: Setting Up Project"}

You have a little preparation to do before you can start the lab.

Open a terminal window by using the menu in the editor: Terminal > New Terminal.!

![](http://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-CD0241EN-SkillsNetwork/labs/module2/images/01\_terminal.png)

In the terminal, if you are not already in the /home/projects folder, change to your project folder now.

```shell
cd /home/project
```

Clone the GitHub Actions repo that was created/forked in the previous module. In order to clone the repo, you have to authenticate with GitHub. Please follow the below steps to authenticate and clone the repo.

## Authenticate with GitHub host

```shell
gh auth login
```

Follow the following guidelines to authenticate.

> What account do you want to log into? GitHub.com
> What is your preferred protocol for Git operations? HTTPS
> Authenticate Git with your GitHub credentials? Yes
> How would you like to authenticate GitHub CLI? Paste an authentication token
> Paste your authentication token: \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
> You will be logged into GitHub as your account user.

## Fork Clone the Reference Repo

```shell
gh repo clone wtecc-CICD_PracticeCode
```

Your output should look similar to the image below:
![](https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-CD0215EN-SkillsNetwork/images/screenshot-at-jun-21-23-52-03.png)

::page{title="Step 2: Getting Familiar with Codecov"}

Code coverage tools incentivize developers to write tests and increase coverage. During the process of writing tests, the developer may discover new bugs or syntax issues in the source code that are important to resolve before distributing the application.

Codecov takes coverage to the next level. Unlike open source and paid products, Codecov focuses on integration and promoting healthy pull requests. Codecov delivers or "injects" coverage metrics directly into the modern workflow to promote more code coverage, especially in pull requests where new features and bug fixes commonly occur.

Codecov's Action currently supports five inputs from the user: `token`,`file`,`flags`,`name` , and `fail_ci_if_error`. These inputs, along with their descriptions and usage contexts, are listed in the table below:

| Input                  | Description                                                                                                                                                                                                                                                                    | Usage                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| token                  | Used to authorize coverage report uploads                                                                                                                                                                                                                                      | Required for private repos |
| files                  | Comma-separated paths to the coverage report(s)                                                                                                                                                                                                                                | Optional                   |
| directory              | Directory to search for coverage reports.                                                                                                                                                                                                                                      | Optional                   |
| dry_run                | Don't upload files to Codecov                                                                                                                                                                                                                                                  | Optional                   |
| flags                  | Flag the upload to group coverage metrics (unittests, uitests, etc.). Multiple flags are separated by a comma (ui,chrome)                                                                                                                                                      | Optional                   |
| commit_parent          | The commit SHA of the parent for which you are uploading coverage. If not present, the parent will be determined using the API of your repository provider. When using the repository provider's API, the parent is determined via finding the closest ancestor to the commit. | Optional                   |
| env_vars               | Environment variables to tag the upload with. Multiple env variables can be separated with commas (e.g. OS,PYTHON)                                                                                                                                                             | Optional                   |
| faile_ci_if_error      | Specify if CI pipeline should fail when Codecov runs into errors during upload. Defaults to false                                                                                                                                                                              | Optional                   |
| functionalities        | Toggle functionalities                                                                                                                                                                                                                                                         | Optional                   |
| network                | network Disable uploading the file network                                                                                                                                                                                                                                     | Optional                   |
| gcov                   | Run with gcov support                                                                                                                                                                                                                                                          | Optional                   |
| gcov_args              | Extra arguments to pass to gcov                                                                                                                                                                                                                                                | Optional                   |
| gcov_ignore            | Paths to ignore during gcov gathering                                                                                                                                                                                                                                          | Optional                   |
| gcov_include           | Paths to include during gcov gathering                                                                                                                                                                                                                                         | Optional                   |
| move_coverage_to_trash | Move discovered coverage reports to the trash                                                                                                                                                                                                                                  | Optional                   |
| name                   | Custom defined name for the upload                                                                                                                                                                                                                                             | Optional                   |
| override_branch        | Specify the branch name                                                                                                                                                                                                                                                        | Optional                   |
| override_build         | Specify the build number                                                                                                                                                                                                                                                       | Optional                   |
| override_commit        | Specify the commit SHA                                                                                                                                                                                                                                                         | Optional                   |
| override_pr            | Specify the pull request number                                                                                                                                                                                                                                                | Optional                   |
| override_tag           | Specify the git tag                                                                                                                                                                                                                                                            | Optional                   |
| path_to_write_report   | Write upload file to path before uploading                                                                                                                                                                                                                                     | Optional                   |
| root_dir               | Used when not in git/hg project to identify project root directory                                                                                                                                                                                                             | Optional                   |
| slug                   | Specify the slug manually (Enterprise use)                                                                                                                                                                                                                                     | Optional                   |
| url                    | Change the upload host (Enterprise use)                                                                                                                                                                                                                                        | Optional                   |
| verbose                | Specify whether the Codecov output should be verbose                                                                                                                                                                                                                           | Optional                   |
| version                | Specify which version of the Codecov Uploader should be used. Defaults to latest                                                                                                                                                                                               | Optional                   |
| working-directory      | Directory in which to execute codecov.sh                                                                                                                                                                                                                                       | Optional                   |
| xcode                  | Run with xcode support                                                                                                                                                                                                                                                         | Optional                   |
| xcode_archive_path     | Specify the xcode archive path. Likely specified as the -resultBundlePath and should end in .xcresult                                                                                                                                                                          | Optional                   |

::page{title="Step 3: Configuring GitHub Actions"}

We are now going to add a new step in the workflow, which will upload the Coverage XML report to Codecov.

To integrate Codecov with your Actions pipeline, specify the name of this repository with a tag number (@v2 is recommended) as a step within your `workflow.yml` file.

If you have a private repository, this Action also requires you to provide an upload token from codecov.io (tip: in order to avoid exposing your token, store it as a secret). Optionally, you can choose to include up to four additional inputs to customize the upload context. For public repositories, no token is needed inside your `.github/workflows/workflow.yml` file.

## Your Task

Add a new step in the workflow\.yml using Codecov GitHub Action v2 which will upload the coverage XML report to Codecov.

## Solution

<details>
	<summary>Click here for the answer</summary>
	Copy the below code and add it in workflow.yml as a step under build job. Be sure to indent properly:

```
steps:
- name: Upload code coverage
- uses: codecov/codecov-action@v2
  with:
		token: ${{ secrets.CODECOV_TOKEN }} # not required for public repos
		files: ./coverage1.xml
		flags: unittests
		fail_ci_if_error: true # optional (default = false)
		verbose: true # optional (default = false)
		version: "v0.1.13"
```

</details>

> Note: This assumes that you've set your Codecov token inside Settings > Secrets as CODECOV_TOKEN. If not, you can get an upload token for your specific repo on codecov.io. Keep in mind that secrets are not available to forks of repositories.

::page{title="Step 4: Running test and generating a Coverage report"}

The workflow created in the previous step triggers when you push code to the master branch in the repository, or create/update a pull request. It contains a build job which has 5 steps:

*   Checkout code
*   Install Python dependencies
*   Linting
*   Run unit tests with nose
*   Upload code coverage

Commit and push your workflow definition.

Go to the Actions tab in GitHub and select the latest commit???s workflow.
You will notice that `Run unit tests with nose` will generate the coverage report and `Upload code coverage` step will upload the report to Codecov.

![](https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-CD0215EN-SkillsNetwork/images/screenshot-at-jun-20-15-44-19.png)

::page{title="Step 5: View Codecov Report"}

When the new workflow finishes, navigate to the repository in the Codecov dashboard and select the latest commit.
View the `Upload code coverage` logs, you will notice a resultURL field at the very end. Use that link to access the coverage report that is uploaded on Codecov.

![](https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-CD0215EN-SkillsNetwork/images/screenshot-at-jun-19-22-01-18.png)

![](https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-CD0215EN-SkillsNetwork/images/screenshot-at-jun-19-22-01-54.png)

::page{title="Conclusion"}

In this lab, you integrated Codecov with your GitHub repository using GitHub Actions to generate coverage reports every time you push changes or make a pull request.

## Author(s)

Tapas Mandal

### Other Contributor(s)

< Contributor 1 Name >, < Contributor 2 Name >, etc.

## Changelog

| Date       | Version | Changed by   | Change Description                                   |
| ---------- | ------- | ------------ | ---------------------------------------------------- |
| 2022-06-20 | 0.1     | Tapas Mandal | Created new instructions for Code Coverage Lab       |
| 2022-06-22 | 0.2     | Tapas Mandal | Updated the reference repo and added new screenshots |
|            |         |              |                                                      |
|            |         |              |                                                      |
