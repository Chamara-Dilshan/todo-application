# Todo Application Frontend

This is the frontend of the Todo Application, built using React. It allows users to manage their tasks efficiently with a clean and interactive user interface.

## Features

- **Task Management**: Create, view, and manage tasks.
- **Validation**: Ensures tasks have valid titles and descriptions.
- **Animations**: Smooth transitions and hover effects for a polished user experience.
- **Error Handling**: Graceful handling of API errors.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making API requests.
- **Jest & React Testing Library**: For testing components.
- **CSS**: For styling and animations.

## Folder Structure

```
frontend/
├── public/                 # Static files
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # Web app manifest
│   └── robots.txt          # Robots exclusion file
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── TaskCard.js     # Displays individual tasks
│   │   ├── TaskForm.js     # Form for creating tasks
│   │   └── TaskList.js     # Displays list of tasks
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   ├── index.js            # Entry point
│   └── api.js              # API functions
└── package.json            # Project metadata and dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chamara-Dilshan/todo-application.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd todo-application/frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Running Tests

To run the tests:
```bash
npm test
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Happy coding!
