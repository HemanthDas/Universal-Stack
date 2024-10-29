import inquirer from "inquirer";
import { setupProject } from "./installDeps.js";

async function promptForSetup() {
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

  await setupProject(answers);
}

export { promptForSetup };
