import { exec as execCallback } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

const exec = promisify(execCallback);

/**
 * Asynchronously cleans up temporary files in the specified directory.
 *
 * @param {string} [dir=""] - The directory to clean up. If not provided or empty, no action is taken.
 * @returns {Promise<void>} - A promise that resolves when the cleanup is complete.
 * @throws {Error} - Throws an error if the cleanup process fails.
 */
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
