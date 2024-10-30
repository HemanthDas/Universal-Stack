import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

/**
 * Sets up React Router by installing the necessary package.
 *
 * @param {Object} spinner - The spinner object to display progress.
 * @param {Function} spinner.update - Updates the spinner text.
 * @param {Function} spinner.success - Displays a success message.
 * @param {Function} spinner.error - Displays an error message.
 * @returns {Promise<void>} - A promise that resolves when the setup is complete.
 * @throws {Error} - Throws an error if the installation fails.
 */
export async function setupReactRouter(spinner) {
  spinner.update({ text: "Adding React Router..." });
  try {
    await exec("npm install react-router-dom");
    spinner.success({ text: "React Router installed successfully!" });
  } catch (error) {
    spinner.error({ text: `Error adding React Router: ${error.message}` });
    process.exit(1);
  }
}
