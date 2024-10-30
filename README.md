# UniversalStack

A powerful CLI tool to set up versatile full-stack projects quickly and efficiently. UniversalStack offers seamless integration of frontend frameworks like React, backend setups such as Express and Flask, and database configurations including MongoDB and SQL. It simplifies the project setup process, making it easy for developers to get started with their preferred tech stack.

## ✨ Features

### Frontend Support:
- React (with JavaScript or TypeScript)
- Vite integration for modern and fast builds

### Backend Options:
- Express (Flask support coming soon)

### Optional Add-ons:
- Tailwind CSS
- React Router

### Database Integration:
- MongoDB and SQL planned in future updates.

### One-stop Full Stack Setup:
- Set up both frontend and backend from a single CLI command.

## 📦 Installation

To install UniversalStack globally using npx:

```bash
npx universalstack
```

## 🚀 Usage

After running the CLI, follow the interactive prompts to configure your project:

```bash
npx universalstack
```

### Example Run:
```plaintext
✔ Enter your project name: my-cool-app
✔ Select the Vite + React variant: JavaScript
✔ Do you want to add Tailwind CSS? Yes
✔ Do you want to add React Router? No
✔ Do you want to set up an Express backend? Yes
✔ Enter the name of the server file (default: server.js): index.js
```

## 🛠️ Project Structure

After setup, your project will have the following structure:

```plaintext
my-cool-app/
├── backend/
│   ├── routes/
│   │   └── sampleRoute.js
│   ├── controllers/
│   │   └── sampleController.js
│   ├── services/
│   │   └── sampleService.js
│   ├── db/
│   │   └── dbConnection.js
│   ├── .env
│   └── index.js
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

## 🔧 Commands

Once your project is set up, you can start the development server:

### Frontend:
```bash
# Navigate to your frontend directory
cd my-cool-app
npm install
npm run dev
```

### Backend (if Express is included):
```bash
# Navigate to the backend directory
cd backend
npm start
```

## 📂 Configurations

### Tailwind CSS
Tailwind CSS is configured in `tailwind.config.js` and used in `src/index.css`.

### Express Backend
The backend is scaffolded with a simple Express server. Update `backend/routes/sampleRoute.js` and `backend/controllers/sampleController.js` to add your custom logic.

## 🛡️ License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue on GitHub.

## 📄 Changelog

### v1.0.0:
- Initial release with React, Express, Tailwind CSS, and React Router integration.

## 💡 Future Roadmap
- Add Flask support for backend.
- Integrate MongoDB and SQL database options.
- Support for more frontend frameworks (e.g., Next.js).

## 🧑‍💻 Author

Maintained by Your Name.