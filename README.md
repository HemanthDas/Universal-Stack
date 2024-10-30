# UniversalStack v1.0.2

UniversalStack is a command-line utility that simplifies the setup of web applications using Vite, React, and Express. It allows you to quickly scaffold projects with optional Tailwind CSS, React Router, and Express backend configurations, including support for either MySQL or MongoDB databases.

## Features

- **Easy Setup**: Quickly create a Vite + React project with optional features.
- **Flexible Configurations**: Choose between JavaScript and TypeScript.
- **Backend Integration**: Option to set up an Express backend with configurable server file names.
- **Database Support**: Automatically generates connection files for either MySQL or MongoDB.
- **Environment Management**: Automatically creates a .env file for configuration.
- **Modular Architecture**: Organizes your project into clear directories for routes, controllers, services, and database connections.

## Installation

To use UniversalStack, you can either install it globally or use it directly with npx.

### Global Installation

Install the package globally:

```bash
npm install -g universalstack
```

After installation, you can start the project setup by running:

```bash
universalstack
```

### Using npx

Alternatively, you can use npx to run UniversalStack without installing it globally:

```bash
npx universalstack
```

## Usage

To start the project setup, run:

```bash
universalstack
```

You will be prompted for the following configurations:

- **Project Name**: Enter the desired name for your project.
- **Language**: Choose between JavaScript or TypeScript.
- **Add Tailwind CSS**: Confirm if you want to include Tailwind CSS.
- **Add React Router**: Confirm if you want to include React Router.
- **Set Up Express Backend**: Confirm if you want to create an Express backend.
- **Database Choice**: If you opt for the Express backend, select your preferred database (MySQL or MongoDB).

### Example

```bash
$ universalstack
Enter your project name: my-awesome-project
Select the Vite + React variant: TypeScript
Do you want to add Tailwind CSS? Yes
Do you want to add React Router? Yes
Do you want to set up an Express backend? Yes
Select your database: MySQL
```

## Project Structure

After running the setup, your project structure will look like this:

```plaintext
my-awesome-project/
├── backend/
│   ├── controllers/
│   │   └── sampleController.js
│   ├── db/
│   │   ├── dbConnection.js  // MySQL or mongoConnection.js for MongoDB
│   ├── models/
│   │   └── sampleModel.js
│   ├── routes/
│   │   └── sampleRoute.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── src/
    ├── App.tsx
    └── main.tsx
```

## Dependencies

The following dependencies are installed based on your configuration:

### For Express backend:

- `express`
- `cors`
- `dotenv`
- `nodemon`
- `mysql2` or `mongoose` (depending on the selected database)

## Ignored Files

The backend directory is ignored from ESLint checks by default to avoid linting issues with server-side code.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or feature requests.
