import inquirer from "inquirer";
import { setupProject } from "./installDeps.js";

/**
 * Prompts the user for setup configuration options for a new project.
 * 
 * This function uses inquirer to prompt the user with a series of questions
 * regarding the project setup, including project name, language preference,
 * and additional features such as Tailwind CSS, React Router, and an Express backend.
 * 
 * If the user opts to set up an Express backend, additional prompts will be presented
 * to gather backend configuration details.
 * 
 * @async
 * @function promptForSetup
 * @returns {Promise<void>} - A promise that resolves when the setup process is complete.
 */
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

  // If user chooses to set up an Express backend, prompt for backend details
  let backendConfig = {};
  if (answers.addBackend) {
    backendConfig = await promptBackendOptions(); // Get additional backend options
  }

  await setupProject({ ...answers, ...backendConfig }); // Pass backendConfig along with other answers
}

// Prompt user for additional backend setup options
async function promptBackendOptions() {
  const { serverFile, databaseChoice } = await inquirer.prompt([
    {
      type: "input",
      name: "serverFile",
      message: "Enter the name of the server file (default: server.js):",
      default: "server.js",
    },
    {
      type: "list",
      name: "databaseChoice",
      message: "Choose the database to use:",
      choices: ["MySQL", "MongoDB"],
    },
  ]);

  return { serverFile, dbChoice: databaseChoice.toLowerCase() };
}
