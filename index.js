import { checkNodeAndNpm } from "./utils/CheckNodeVersion.js";
import { promptForSetup } from "./setup/promptSetup.js";
import { cleanupProject } from "./utils/cleanup.js";

let projectDir = ""; // Track the project directory globally

async function main() {
  try {
    await checkNodeAndNpm();
    console.log("All system requirements are met. Proceeding with setup...");

    process.on("SIGINT", handleExit);
    process.on("SIGTERM", handleExit);

    // Gather all setup details before starting installation
    projectDir = await promptForSetup();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    await handleExit();
  }
}

async function handleExit() {
  console.log("Installation interrupted. Cleaning up...");
  if (projectDir) await cleanupProject(projectDir); // Ensure cleanup happens
  process.exit(1); // Exit the process
}

main();
