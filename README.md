## Todo Application – Docker Compose Quick Start

Welcome to the Todo Application! This project is a simple, full-stack ToDo application featuring a backend built with Spring Boot and MySQL, and a frontend built with React. The project leverages Docker Compose to easily spin up the backend, frontend, and database with a single command.

---

## Prerequisites

- Docker Desktop (version 4.x or above)
- Docker Compose (v2 or above)
- Ports: Make sure 8080 (for backend API), 3306 (for MySQL database), and 80 (for frontend) are available on your system.

---

## Quick start

1. Clone the repository:

```
git clone https://github.com/Chamara-Dilshan/todo-application.git
cd todo-application
```

2. Build the Docker images and start the containers in the background:

```
docker compose up -d --build
```
3. Once everything is up and running, you can access the app in your browser:

- Frontend: http://localhost:80

- Backend API: http://localhost:8080

- MySQL Database: You can connect to MySQL on port 3306.

---

## Stopping and cleanup

```powershell
# Stop and remove containers and volume

docker compose down -v
```

---

## Troubleshooting

If you encounter any issues, here are a few common problems and their solutions:

1. Port Already in Use
```
If you see errors related to port conflicts (e.g., 8080, 3306, or 80), ensure that nothing else is using these ports. This might happen if you have another MySQL server, web server, or application already running on those ports.

Solution: Stop any conflicting services or change the port mappings in the docker-compose.yml file.
```

2. Permission Issues with Docker

```
On some systems, Docker might not have the required permissions to bind to the specified ports.

Solution: Ensure that Docker has the correct permissions to bind to these ports or run Docker with elevated privileges (e.g., as an administrator).
```
---

## Project structure

```
backend/   # Spring Boot API
database/  # MySQL initialization script
frontend/  # React application

```
