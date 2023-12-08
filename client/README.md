# Phaser 3 TypeScript Project Template

This repository contains a boilerplate setup for a Phaser 3 game written in TypeScript.

## Prerequisites

Before you begin, ensure you have installed the latest version of [Node.js](https://nodejs.org/), which includes npm (Node Package Manager).

## Setup

To get started with the project, clone the repository to your local machine.

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

## Installation
Once the project is cloned, install the dependencies using npm or bun.

```bash
bun install
```

## TypeScript Configuration
Make sure you have the tsconfig.json file in your project root with the necessary TypeScript configurations.

## Project Structure
The project is structured as follows:

- index.ts: This is the entry point for your Phaser game.
- index.html: The HTML file to run your Phaser game in a web browser.
- src: This directory contains all your TypeScript files.
- public: This directory will hold all the game assets like images, sounds, etc.
- dist: This directory will contain the JavaScript code and is generated after running the build script.

## Running the Project
To start the project, you need to run the development server.

```bash
bun run dev
```

This command will compile the TypeScript files and serve your project at localhost:5173 or another port if this one is busy.

## Development with Vite

This project utilizes Vite as its build tool and development server. Vite serves your code via native ES modules, which makes it extremely fast. When you run `run dev`, Vite starts a development server that compiles TypeScript on-the-fly and supports hot module replacement (HMR).

### Vite's Advantages

- **Instant Server Start**: With Vite, the server starts up almost instantly, regardless of the size of your project.
- **Hot Module Replacement**: Vite replaces modules in the browser as you make changes to the files, without requiring a full reload. This provides a smoother development experience and preserves the application state.
- **No Need to Manually Compile TypeScript**: You can write TypeScript in your `src` directory and Vite will automatically compile it. There's no need to run a separate TypeScript compilation step.

### Working with Vite

Simply make your changes in the `src` folder and Vite will automatically rebuild the affected files and update the browser. This allows you to stay focused on coding rather than managing build processes.

To see your changes, just save the file and look at your browser. Vite takes care of the rest.

### Customizing Vite Configuration

If you need to customize the Vite configuration for your project's needs, you can do so by editing the `vite.config.js` file at the root of your project.

For more information on Vite and its capabilities, visit the [Vite documentation](https://vitejs.dev/guide/).

## Using This Repository as a Template

To start a new project based on this template:

1. Click the green "Use this template" button at the top of this repository's page.
2. Choose a name for your new repository and configure the other options.
3. Click the "Create repository from template" button.

You can then clone your new repository to your local machine and begin working on your game.
