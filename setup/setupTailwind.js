import { exec as execCallback } from "child_process";
import { writeFile } from "fs/promises";
import { promisify } from "util";

// Promisify the exec function to use async/await
const exec = promisify(execCallback);

/**
 * Sets up Tailwind CSS in the project.
 *
 * @param {object} spinner - A spinner object to show progress.
 */
export async function setupTailwind(spinner) {
  // Start the spinner with a message
  spinner.start({ text: "Adding Tailwind CSS..." });
  try {
    // Install Tailwind CSS, PostCSS, and Autoprefixer, then initialize Tailwind CSS with a PostCSS config
    await exec(
      `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
    );
    // Indicate success with the spinner
    spinner.success({ text: "Tailwind CSS added successfully!" });

    // Tailwind CSS configuration content
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    // Write the Tailwind CSS configuration to a file
    await writeFile("tailwind.config.js", tailwindConfig);
    // Indicate success with the spinner
    spinner.success({ text: "Tailwind configuration updated successfully!" });

    // Write the Tailwind CSS directives to the index.css file
    await writeFile(
      "src/index.css",
      `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
    );
    // Indicate success with the spinner
    spinner.success({
      text: "index.css updated with Tailwind directives successfully!",
    });
  } catch (error) {
    // Indicate an error with the spinner and exit the process
    spinner.error({ text: `Error setting up Tailwind CSS: ${error.message}` });
    process.exit(1);
  }
}
