import { exec as execCallback } from "child_process";
import { writeFile } from "fs/promises";
import { promisify } from "util";

const exec = promisify(execCallback);

export async function setupTailwind(spinner) {
  spinner.start({ text: "Adding Tailwind CSS..." }); // Start the spinner
  try {
    await exec(
      `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
    );
    spinner.success({ text: "Tailwind CSS added successfully!" }); // Use spinner for success

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

    await writeFile("tailwind.config.js", tailwindConfig);
    spinner.success({ text: "Tailwind configuration updated successfully!" }); // Use spinner for success

    await writeFile(
      "src/index.css",
      `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
    );
    spinner.success({
      text: "index.css updated with Tailwind directives successfully!",
    }); // Use spinner for success
  } catch (error) {
    spinner.error({ text: `Error setting up Tailwind CSS: ${error.message}` }); // Use spinner for error
    process.exit(1);
  }
}
