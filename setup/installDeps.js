import { spawn } from "child_process";
import { createSpinner } from "nanospinner";
import { setupTailwind } from "./setupTailwind.js";
import { setupReactRouter } from "./setupReactRouter.js";
import { setupExpress } from "./setupExpress.js";
import { cleanupProject } from "../utils/cleanup.js";
import path from "path";
import fs from "fs";

let projectDir = "";

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: true });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    child.on("error", (error) => reject(error));
  });
}

async function setupProject({
  projectName,
  language,
  addTailwind,
  addReactRouter,
  addBackend,
  serverFile,
}) {
  const variant = language === "JavaScript" ? "react" : "react-ts";
  projectDir = path.resolve(process.cwd(), projectName); // Resolve absolute path

  const spinner = createSpinner(
    `Creating Vite ${language} project: ${projectName}...`
  ).start();

  try {
    // Create the Vite project
    await runCommand("npm", [
      "create",
      "vite@latest",
      projectName,
      "--",
      "--template",
      variant,
    ]);
    spinner.success({ text: `Project ${projectName} created successfully!` });

    // Verify the directory exists before changing
    if (!fs.existsSync(projectDir)) {
      throw new Error(`Directory ${projectDir} does not exist.`);
    }

    process.chdir(projectDir); // Change to the project directory
    await installDependencies(
      addTailwind,
      addReactRouter,
      addBackend,
      serverFile
    );
  } catch (error) {
    spinner.error({ text: `Error: ${error.message}` });
    await cleanupProject(projectDir); // Clean up on failure
    process.exit(1);
  }
}

async function installDependencies(
  addTailwind,
  addReactRouter,
  addBackend,
  serverFile
) {
  const spinner = createSpinner("Installing dependencies...").start();

  try {
    // Install project dependencies
    await runCommand("npm", ["install"]);
    spinner.success({ text: "Dependencies installed successfully!" });

    // Setup additional features based on user input
    if (addTailwind) {
      await setupTailwind();
    }
    if (addReactRouter) {
      await setupReactRouter();
    }
    if (addBackend) {
      await setupExpress(serverFile); // Pass backend details to setupExpress
    }
  } catch (error) {
    spinner.error({ text: `Error installing dependencies: ${error.message}` });
    await cleanupProject(projectDir); // Clean up on failure
    process.exit(1);
  }
}

export { setupProject };
