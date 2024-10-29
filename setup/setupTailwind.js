import { exec as execCallback } from "child_process";
import { writeFile } from "fs/promises";
import { promisify } from "util";

const exec = promisify(execCallback);

export async function setupTailwind() {
  console.log("Adding Tailwind CSS...");
  try {
    await exec(
      `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
    );
    console.log("Tailwind CSS added successfully!");

    const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
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
    console.log("Tailwind configuration updated successfully!");

    await writeFile(
      "src/index.css",
      `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
    );
    console.log("index.css updated with Tailwind directives successfully!");
  } catch (error) {
    console.error(`Error setting up Tailwind CSS: ${error.message}`);
    process.exit(1);
  }
}
