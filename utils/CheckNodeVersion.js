import { exec } from "child_process";
import semver from "semver";

/**
 * Checks if the installed Node.js and NPM versions meet the minimum requirements.
 * 
 * This function checks if Node.js and NPM are installed on the system and verifies
 * that the Node.js version is at least 14.0.0. If either Node.js or NPM is not installed,
 * or if the Node.js version is too old, it rejects the promise with an appropriate error message.
 * 
 * @returns {Promise<void>} A promise that resolves if the checks pass, or rejects with an error message if they fail.
 */
function checkNodeAndNpm() {
  const MIN_NODE_VERSION = "14.0.0";

  return new Promise((resolve, reject) => {
    exec("node -v", (err, stdout) => {
      if (err) {
        reject(
          "Node.js is not installed. Please install it from https://nodejs.org."
        );
        return;
      }
      const nodeVersion = stdout.trim();
      if (!semver.gte(nodeVersion, MIN_NODE_VERSION)) {
        reject(
          `Node.js version ${nodeVersion} is too old. Please upgrade to v14.0.0 or later.`
        );
        return;
      }

      exec("npm -v", (err, stdout) => {
        if (err) {
          reject("NPM is not installed. Please install it along with Node.js.");
          return;
        }
        console.log(
          `Node.js version: ${nodeVersion}, NPM version: ${stdout.trim()}`
        );
        resolve();
      });
    });
  });
}

export { checkNodeAndNpm };
