import { checkNodeAndNpm } from "./utils/CheckNodeVersion.js";
import { promptForSetup } from "./setup/promptSetup.js";
import { cleanupProject } from "./utils/cleanup.js";

async function main() {
  try {
    await checkNodeAndNpm();
    console.log("All system requirements are met. Proceeding with setup...");

    process.on("SIGINT", handleExit); 
    process.on("SIGTERM", handleExit);  

    await promptForSetup();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    handleExit();
  }
}

function handleExit() {
  console.log("Installation interrupted. Cleaning up...");
  cleanupProject();  
  process.exit(1); 
}

main();
