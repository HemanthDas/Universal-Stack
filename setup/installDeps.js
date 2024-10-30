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
  dbChoice,
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
      serverFile,
      dbChoice
    );
  } catch (error) {
    spinner.error({ text: `Error: ${error.message}` });
    await cleanupProject(projectDir);
    process.exit(1);
  }
}

/**
 * Installs project dependencies and sets up additional configurations based on provided options.
 *
 * @param {boolean} addTailwind - Whether to set up Tailwind CSS.
 * @param {boolean} addReactRouter - Whether to set up React Router.
 * @param {boolean} addBackend - Whether to set up an Express backend.
 * @param {string} serverFile - The server file path for the Express backend.
 * @param {string} dbChoice - The database choice for the backend setup.
 * @returns {Promise<void>} - A promise that resolves when the setup is complete.
 */
async function installDependencies(
  addTailwind,
  addReactRouter,
  addBackend,
  serverFile,
  dbChoice
) {
  const spinner = createSpinner("Installing dependencies...").start();

  try {
    await runCommand("npm", ["install"]);
    spinner.success({ text: "Dependencies installed successfully!" });
    await editEslintConfig();
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
      await setupExpress(serverFile, dbChoice, spinner);
      spinner.success({ text: "Express backend setup complete!" });
    }
  } catch (error) {
    spinner.error({ text: `Error installing dependencies: ${error.message}` });
    await cleanupProject(projectDir);
    process.exit(1);
  }
}
async function editEslintConfig() {
  const eslintConfigPath = path.join(projectDir, "eslint.config.js");
  const eslintConfig = await fs.promises.readFile(eslintConfigPath, "utf8");
  const updatedConfig = eslintConfig.replace(
    /ignores: \['dist'\]/,
    "ignores: ['dist', 'backend']"
  );

  await fs.promises.writeFile(eslintConfigPath, updatedConfig, "utf8");
}
export { setupProject };
