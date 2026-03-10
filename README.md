# GrabRestaurant - Full-stack with Docker & Auth 🍔
<img width="948" height="440" alt="image" src="https://github.com/user-attachments/assets/594d03d1-8507-42e9-a183-d012c5a1a229" />

A robust Full-stack Restaurant Management application featuring a secure Authentication system, RESTful API, and containerized deployment using Docker.

---

## ✨ Key Features & Technical Highlights

- **Full-stack Architecture**: Seamless integration between a **Vite + React** frontend and a **Node.js (Express)** backend.
- **Secure Authentication**: Implemented user authentication and authorization using **JWT (JSON Web Tokens)** and **Bcryptjs** for secure password hashing.
- **Database Management**: Utilized **Sequelize ORM** to manage a **PostgreSQL** database, ensuring structured data and efficient querying.
- **Dockerization**: Fully containerized using **Docker** and **Docker Compose**, allowing for consistent development and deployment environments across any machine.
- **RESTful API**: Developed a clean and scalable API for restaurant management, including user roles and menu handling.

---

## 🛠️ Tech Stack

### Frontend
- **Core**: React 19, Vite
- **Styling**: Tailwind CSS 4, DaisyUI
- **Routing & API**: React Router 7, Axios

### Backend
- **Core**: Node.js, Express
- **Database/ORM**: PostgreSQL, Sequelize
- **Security**: JWT, Bcryptjs, CORS

### DevOps & Tools
- **Containerization**: Docker, Docker Compose
- **Utility**: Nodemon (Development), Postman (API Testing)

---
## 📊 Database Preview
<img width="433" height="473" alt="image" src="https://github.com/user-attachments/assets/48c79265-678e-4bdf-bb72-14ef1e3aecbe" />


## 🐳 Docker Setup

This project is ready to run with a single command, ensuring all dependencies and environments are perfectly synced:

1. **Start the containers**:
   ```bash
   docker-compose up --build

The Server will be available at http://localhost:5000 (or your configured port).

This project is ready to run with a single command, ensuring all dependencies and environments are perfectly synced:

1. **Start the containers**:
   ```bash
   docker-compose up --build

2. The Client will be available at http://localhost:5173.

3. The Server will be available at http://localhost:5000 (or your configured port).


**🚀 Manual Installation**
**Backend Setup**
1. Navigate to /server:
   cd server
   npm install
   
2. Configure your .env file with your Database credentials.
    Start the server:
     npm run dev
**Frontend Setup**
1. Navigate to /client:
   cd client
   npm install

2. Start the development server:
   npm run dev
