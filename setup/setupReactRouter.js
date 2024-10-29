import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

export async function setupReactRouter() {
  console.log("Adding React Router...");
  try {
    await exec("npm install react-router-dom");
    console.log("React Router added successfully!");
  } catch (error) {
    console.error(`Error installing React Router: ${error.message}`);
    process.exit(1);
  }
}
