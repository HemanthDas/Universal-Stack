import { exec as execCallback } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const exec = promisify(execCallback);

export async function setupExpress(serverFile, spinner) {
  try {
    const backendDir = path.join(process.cwd(), "backend");
    await fs.mkdir(backendDir);
    spinner.update({ text: "Creating Express server file..." });
    await createServerFile(backendDir, serverFile);

    await createDirectoriesAndSampleFiles(backendDir);
    await exec(
      `cd ${backendDir} && npm init -y && npm install express cors dotenv nodemon`
    );

    const packageJsonPath = path.join(backendDir, "package.json");
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
    packageJson.main = serverFile;
    packageJson.scripts = { start: `nodemon ${serverFile}` };
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    spinner.success({ text: "Express setup complete!" });
  } catch (error) {
    spinner.error({ text: `Error setting up Express: ${error.message}` });
    process.exit(1);
  }
}

async function createServerFile(backendDir, serverFile) {
  const serverFileContent = `
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use('/api', require('./routes/sampleRoute'));

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`;

  await fs.writeFile(path.join(backendDir, serverFile), serverFileContent);
}

async function createDirectoriesAndSampleFiles(backendDir) {
  const structure = [
    { dir: "routes", files: ["sampleRoute.js"], content: routeSample() },
    {
      dir: "controllers",
      files: ["sampleController.js"],
      content: controllerSample(),
    },
    { dir: "services", files: ["sampleService.js"], content: serviceSample() },
    { dir: "db", files: ["dbConnection.js"], content: dbConnectionSample() },
    { dir: ".", files: [".env"], content: "PORT=5000\n" },
  ];

  for (const { dir, files, content } of structure) {
    const targetDir = path.join(backendDir, dir);
    await fs.mkdir(targetDir, { recursive: true });
    for (const file of files) {
      await fs.writeFile(path.join(targetDir, file), content);
    }
  }
}

function controllerSample() {
  return `
exports.getSampleData = (req, res) => {
  res.json({ message: 'Hello from the controller!' });
};
`;
}

function serviceSample() {
  return `
exports.getData = () => {
  return { message: 'This is data from the service layer.' };
};
`;
}

function dbConnectionSample() {
  return `
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sample_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
`;
}

function routeSample() {
  return `
const express = require('express');
const router = express.Router();
const { getSampleData } = require('../controllers/sampleController');

router.get('/sample', getSampleData);

module.exports = router;
`;
}
