# UniversalStack v1.0.1

UniversalStack is a command-line utility for rapidly setting up a full-stack web application using Vite, React, and Express. It allows you to scaffold projects with optional configurations like Tailwind CSS, React Router, and an Express backend with MySQL or MongoDB support.

## Features

- **Streamlined Setup**: Quickly create a Vite + React project with selected add-ons.
- **Customizable Configurations**: Choose between JavaScript or TypeScript.
- **Backend with Express**: Optionally set up an Express backend with custom server file names.
- **Database Integration**: Supports MySQL or MongoDB, creating connection files automatically.
- **Environment Management**: Generates a `.env` file with initial configurations.
- **Enhanced Project Structure**: Organizes files for controllers, routes, services, and database connections for maintainable code.

## Installation

To use UniversalStack, you can either install it globally or run it directly with `npx`.

### Global Installation

Install the package globally:

```bash
npm install -g create-universalstack
```

After installation, initiate the setup with:

```bash
npm create universalstack
```

### Using `npx`

Alternatively, use `npx` to run UniversalStack without a global installation:

```bash
npx create-universalstack
```

## Usage

To start creating a project, run:

```bash
npm create universalstack
```

### Prompts

You will be guided through configuration prompts:

- **Project Name**: Name your project.
- **Language**: Choose JavaScript or TypeScript.
- **Add Tailwind CSS**: Include Tailwind CSS if desired.
- **Add React Router**: Optionally add React Router.
- **Set Up Express Backend**: Opt-in to create an Express backend.
- **Database Choice**: If an Express backend is chosen, select either MySQL or MongoDB.

### Example

```bash
$ npm create universalstack
✔ Enter your project name: my-awesome-project
✔ Select the Vite + React variant: TypeScript
✔ Do you want to add Tailwind CSS? Yes
✔ Do you want to add React Router? Yes
✔ Do you want to set up an Express backend? Yes
✔ Enter the name of the server file (default: server.js): server.js
✔ Choose the database to use: MySQL
```

## Project Structure

After setup, your project will have the following structure:

```plaintext
my-awesome-project/
├── backend/
│   ├── controllers/
│   │   └── sampleController.js
│   ├── db/
│   │   ├── mysqlConnection.js  // or mongoConnection.js for MongoDB
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

Dependencies are installed based on the configuration selected:

### For Express backend:

- `express`
- `cors`
- `dotenv`
- `nodemon`
- `mysql2` (for MySQL) or `mongoose` (for MongoDB)

### Frontend Add-Ons:

- `tailwindcss` if Tailwind CSS is selected.
- `react-router-dom` if React Router is selected.

## ESLint Configuration

To keep frontend and backend code linted separately, the backend directory is ignored by default.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Open an issue or submit a pull request for new features or improvements.
