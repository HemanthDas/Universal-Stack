import inquirer from "inquirer";
import { setupProject } from "./installDeps.js";

export async function promptForSetup() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
      validate: (input) => (input ? true : "Project name cannot be empty."),
    },
    {
      type: "list",
      name: "language",
      message: "Select the Vite + React variant:",
      choices: ["JavaScript", "TypeScript"],
    },
    {
      type: "confirm",
      name: "addTailwind",
      message: "Do you want to add Tailwind CSS?",
      default: false,
    },
    {
      type: "confirm",
      name: "addReactRouter",
      message: "Do you want to add React Router?",
      default: false,
    },
    {
      type: "confirm",
      name: "addBackend",
      message: "Do you want to set up an Express backend?",
      default: false,
    },
  ]);

  // If adding an Express backend, prompt for the server file name
  let serverFile = "server.js"; // default value
  if (answers.addBackend) {
    serverFile = await promptServerFile(); // If the backend is being set up, prompt for server file name
  }
  await setupProject({ ...answers, serverFile }); // Pass serverFile to setupProject
}

// Function to prompt for server file name
async function promptServerFile() {
  const { serverFile } = await inquirer.prompt([
    {
      type: "input",
      name: "serverFile",
      message: "Enter the name of the server file (default: server.js):",
      default: "server.js",
    },
  ]);
  return serverFile;
}
