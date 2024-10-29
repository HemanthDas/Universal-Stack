import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

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
