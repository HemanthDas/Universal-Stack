import { exec as execCallback } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const exec = promisify(execCallback);

export async function setupExpress(serverFile, dbChoice, spinner) {
  try {
    const backendDir = path.join(process.cwd(), "backend");
    await fs.mkdir(backendDir);
    spinner.update({ text: "Creating Express server file..." });

    await createServerFile(backendDir, serverFile);
    await createDirectoriesAndSampleFiles(backendDir, dbChoice);

    // Install dependencies based on the selected database
    const dbDependencies = dbChoice === "mysql" ? "mysql2" : "mongoose";
    await exec(
      `cd ${backendDir} && npm init -y && npm install express cors dotenv nodemon ${dbDependencies}`
    );

    const packageJsonPath = path.join(backendDir, "package.json");
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
    packageJson.main = serverFile;
    packageJson.type = "module";
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
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sampleRoute from "./routes/sampleRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use('/api', sampleRoute);

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`;

  await fs.writeFile(path.join(backendDir, serverFile), serverFileContent);
}

async function createDirectoriesAndSampleFiles(backendDir, dbChoice) {
  const dbFile =
    dbChoice === "mysql" ? "dbConnection.js" : "mongoConnection.js";
  const dbContent =
    dbChoice === "mysql" ? dbConnectionSample() : mongoConnectionSample();

  const structure = [
    { dir: "routes", files: ["sampleRoute.js"], content: routeSample() },
    {
      dir: "controllers",
      files: ["sampleController.js"],
      content: controllerSample(),
    },
    { dir: "services", files: ["sampleService.js"], content: serviceSample() },
    { dir: "db", files: [dbFile], content: dbContent },
    { dir: "models", files: ["SampleModel.js"], content: modelSample() },
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

// Controller Sample
function controllerSample() {
  return `
export const getSampleData = (req, res) => {
  res.json({ message: 'Hello from the controller!' });
};
`;
}

// Service Sample
function serviceSample() {
  return `
export const getData = () => {
  return { message: 'This is data from the service layer.' };
};
`;
}

// MySQL Connection Sample
function dbConnectionSample() {
  return `
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Add your username here
  password: '', // Add your password here
  database: 'sample_db', // Add your database name here
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

export default connection;
`;
}

// MongoDB Connection Sample
function mongoConnectionSample() {
  return `
import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/sample_db';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default mongoose;
`;
}

// Route Sample
function routeSample() {
  return `
import express from 'express';
const router = express.Router();
import { getSampleData } from '../controllers/sampleController.js';
import mongoose from 'mongoose';

router.get('/sample', getSampleData);

export default router;
`;
}

// Model Sample
function modelSample() {
  return `

const sampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const SampleModel = mongoose.model('Sample', sampleSchema);

export default SampleModel;
`;
}
