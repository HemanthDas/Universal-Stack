import { exec } from "child_process";
import semver from "semver";

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
