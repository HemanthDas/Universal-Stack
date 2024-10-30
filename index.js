#!/usr/bin/env node

import { checkNodeAndNpm } from "./utils/CheckNodeVersion.js";
import { promptForSetup } from "./setup/promptSetup.js";
import { cleanupProject } from "./utils/cleanup.js";

// Global variable to track the project directory
let projectDir = "";

async function main() {
  try {
    // Check if Node.js and npm are installed and meet the required versions
    await checkNodeAndNpm();
    console.log("All system requirements are met. Proceeding with setup...");

    // Handle process termination signals to ensure cleanup
    process.on("SIGINT", handleExit);
    process.on("SIGTERM", handleExit);

    // Gather all setup details before starting installation
    projectDir = await promptForSetup();
  } catch (error) {
    // Log any errors and handle exit
    console.error(`Error: ${error.message}`);
    await handleExit();
  }
}

// Function to handle cleanup on exit
async function handleExit() {
  console.log("Installation interrupted. Cleaning up...");
  if (projectDir) await cleanupProject(projectDir); // Ensure cleanup happens
  process.exit(1); // Exit the process
}

// Start the main function
main();
