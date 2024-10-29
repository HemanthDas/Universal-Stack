import { exec as execCallback } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

const exec = promisify(execCallback);

export async function cleanupProject(dir = "") {
  if (dir && existsSync(dir)) {
    try {
      console.log(`Removing temporary files from ${dir}...`);
      await exec(`rm -rf ${dir}`); // Use recursive deletion
      console.log("Cleanup completed successfully.");
    } catch (error) {
      console.error(`Error during cleanup: ${error.message}`);
    }
  } else {
    console.log("No temporary files found to clean up.");
  }
}
