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
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });
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
  projectDir = path.resolve(process.cwd(), projectName);

  const spinner = createSpinner(
    `Creating Vite ${language} project: ${projectName}...`
  ).start();

  try {
    await runCommand("npm", [
      "create",
      "vite@latest",
      projectName,
      "--",
      "--template",
      variant,
    ]);
    spinner.success({ text: `Project ${projectName} created successfully!` });

    if (!fs.existsSync(projectDir)) {
      throw new Error(`Directory ${projectDir} does not exist.`);
    }

    process.chdir(projectDir);
    await installDependencies(
      addTailwind,
      addReactRouter,
      addBackend,
      serverFile
    );
  } catch (error) {
    spinner.error({ text: `Error: ${error.message}` });
    await cleanupProject(projectDir);
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
    await runCommand("npm", ["install"]);
    spinner.success({ text: "Dependencies installed successfully!" });

    if (addTailwind) {
      spinner.start({ text: "Setting up Tailwind CSS..." });
      await setupTailwind(spinner);
      spinner.success({ text: "Tailwind CSS setup complete!" });
    }
    if (addReactRouter) {
      spinner.start({ text: "Setting up React Router..." });
      await setupReactRouter(spinner);
      spinner.success({ text: "React Router setup complete!" });
    }
    if (addBackend) {
      spinner.start({ text: "Setting up Express backend..." });
      await setupExpress(serverFile, spinner);
      spinner.success({ text: "Express backend setup complete!" });
    }
  } catch (error) {
    spinner.error({ text: `Error installing dependencies: ${error.message}` });
    await cleanupProject(projectDir);
    process.exit(1);
  }
}

export { setupProject };
