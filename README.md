# Create a New Board on Monday.com Sample App

This is a Deno template used to build out a sample app using the Slack
CLI and a third-party API.

**Guide Outline**:

- [Setup](#setup)
  - [Install the Slack CLI](#install-the-slack-cli)
  - [Clone the Repository](#clone-the-repository)
  - [Monday.com Authorization Token](#mondaycom-authorization-token)
- [Create a Link Trigger](#create-a-link-trigger)
- [Running Your Project Locally](#running-your-project-locally)
- [Project Structure](#project-structure)
---

## Setup

Before getting started, make sure you have a development workspace where you
have permissions to install apps. If you don’t already have one, go ahead and
[create one](https://slack.com/create). Also, please note that the workspace
requires any of [the Slack paid plans](https://slack.com/pricing).

### Install the Slack CLI

To use this sample, you must first install and configure the Slack CLI.
Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/future/quickstart).

### Clone the Repository

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ slack create my-app -t slack-samples/deno-mondaycom-create-board

# Change into this project directory
$ cd my-app
```
### Monday.com Authorization Token

A personal access token is required when calling the Monday.com GraphQL API. Follow these instructions to [create your token](https://developer.monday.com/api-reference/docs/authentication).

## Create a Link Trigger

[Triggers](https://api.slack.com/future/triggers) are what cause Workflows to
run. These Triggers can be invoked by a user, or automatically as a response to
an event within Slack.

A [Link Trigger](https://api.slack.com/future/triggers/link) is a type of
Trigger that generates a **Shortcut URL**, which, when posted in a channel or
added as a bookmark, becomes a link. When clicked, the Link Trigger will run the
associated Workflow.

Link Triggers are _unique to each installed version of your app_. This means
that Shortcut URLs will be different across each workspace, as well as between
[locally run](#running-your-project-locally) and
[deployed apps](#deploying-your-app). When creating a Trigger, you must select
the Workspace that you'd like to create the Trigger in. Each Workspace has a
development version (denoted by `(dev)`), as well as a deployed version.

To create a Link Trigger for the Workflow in this sample, run the following
command:

```zsh
$ slack trigger create --trigger-def triggers/create_board_trigger.ts
```

After selecting a Workspace, the output provided will include the Link Trigger
Shortcut URL. Copy and paste this URL into a channel as a message.

**Note: this link won't run the Workflow until the app is either running locally
or deployed!** Read on to learn how to run your app locally.

## Run Your Project Locally

While building your app, you can see your changes propagated to your workspace
in real-time with `slack run`. In both the CLI and in Slack, you'll know an app
is the development version if the name has the string `(dev)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```
![create_board_form](https://user-images.githubusercontent.com/108959677/193082881-e1484107-6c6d-4940-a788-059002903f55.png)

![created_board](https://user-images.githubusercontent.com/108959677/193082901-c1dd4276-4266-4a37-afa5-907c58209bdd.png)

![create_board_message](https://user-images.githubusercontent.com/108959677/193082916-ef434ae7-be1e-43eb-b33e-6c414ff063e3.png)

Once running, click the
[previously created Shortcut URL](#create-a-link-trigger) associated with the
`(dev)` version of your app. This should start the included sample Workflow.

To stop running locally, press `<CTRL> + C` to end the process.

## Project Structure

### `manifest.ts`

The [app manifest](https://api.slack.com/future/manifest) contains the app's
configuration. This file defines attributes, such as app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `/functions`

[Functions](https://api.slack.com/future/functions) are reusable building blocks
of automation that accept inputs, perform calculations, and provide outputs.
Functions can be used independently, or as steps within Workflows.

### `/workflows`

[Workflows](https://api.slack.com/future/workflows) are sets of steps that are
executed in order. Each step in a Workflow is a function.

Workflows can be configured to run without user input, or they can collect input
by beginning with a [form](https://api.slack.com/future/forms) before continuing
on to the next step.

### `/triggers`

[Triggers](https://api.slack.com/future/triggers) determine when Workflows are
executed. A trigger file describes a scenario in which a workflow should be run,
such as a user pressing a button or after a specific event occurs.

To view all documentation and guides available, visit the
[Overview page](https://api.slack.com/future/overview).
