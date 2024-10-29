import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

export async function setupExpress() {
  console.log("Setting up Express backend...");
  try {
    await exec(
      `mkdir backend && cd backend && npm init -y && npm install express cors dotenv`
    );
    console.log("Express backend created successfully!");
  } catch (error) {
    console.error(`Error setting up Express: ${error.message}`);
    process.exit(1);
  }
}
