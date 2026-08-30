# 🎓 Placement Management System

A full-stack web application for managing student placements, colleges, certificates, and placement drives — built with **Spring Boot** (backend) and **React + Vite** (frontend).

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [Contributing](#contributing)

---

## 📖 About the Project

The **Placement Management System** is designed to streamline the entire campus placement process. It allows admins to manage student profiles, college information, placement drives, and certificates — all through a clean and responsive web interface.

---

## 🛠️ Tech Stack

### Backend
| Technology | Version |
|---|---|
| Java | 26 |
| Spring Boot | 4.1.0 |
| Spring Data JPA | - |
| Spring Validation | - |
| PostgreSQL | - |
| Maven | - |

### Frontend
| Technology | Version |
|---|---|
| React | 19.x |
| Vite | 8.x |
| Axios | 1.x |
| JavaScript (ESM) | - |

---

## 📁 Project Structure

```
placement-management-system/
│
├── PlacementManagementSystem1/        # Spring Boot Backend
│   ├── src/main/java/com/example/demo/
│   │   ├── controller/                # REST Controllers
│   │   │   ├── CertificateController.java
│   │   │   ├── CollegeController.java
│   │   │   ├── PlacementController.java
│   │   │   ├── StudentController.java
│   │   │   └── UserController.java
│   │   ├── entity/                    # JPA Entities
│   │   │   ├── Admin.java
│   │   │   ├── Certificate.java
│   │   │   ├── College.java
│   │   │   ├── Placement.java
│   │   │   ├── Student.java
│   │   │   └── User.java
│   │   ├── repository/                # Spring Data Repositories
│   │   ├── service/                   # Business Logic Layer
│   │   └── exception/                 # Custom Exceptions
│   └── src/main/resources/
│       └── application.properties     # App Configuration
│
└── frontend/                          # React + Vite Frontend
    ├── src/
    │   ├── App.jsx                    # Main App Component
    │   ├── services/
    │   │   └── api.js                 # Axios API Service
    │   └── main.jsx                   # Entry Point
    ├── index.html
    └── vite.config.js
```

---

## ✨ Features

- 👤 **User & Admin Management** — Role-based user accounts
- 🏫 **College Management** — Add, update, and manage college information
- 🎓 **Student Management** — Maintain complete student profiles
- 💼 **Placement Tracking** — Record and track placement drives and offers
- 📜 **Certificate Management** — Manage student certifications
- 🔍 **Search & Filter** — Query students and placements with ease
- ⚠️ **Exception Handling** — Custom error responses for clean API behavior

---

## 🌐 API Endpoints

Base URL: `http://localhost:8080`

| Resource | Endpoint |
|---|---|
| Users | `/users` |
| Students | `/students` |
| Colleges | `/colleges` |
| Placements | `/placements` |
| Certificates | `/certificates` |

Each resource supports standard CRUD operations (`GET`, `POST`, `PUT`, `DELETE`).

---

## 🚀 Getting Started

### Prerequisites

- **Java 26+**
- **Maven 3.x**
- **Node.js 18+** and **npm**
- **PostgreSQL** (running locally on port `5432`)

---

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/krithick27/PlacementManagementSystem.git
   cd PlacementManagementSystem/PlacementManagementSystem1
   ```

2. **Create the PostgreSQL database**
   ```sql
   CREATE DATABASE placement_management;
   ```

3. **Update credentials** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/placement_management
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

4. **Run the backend**
   ```bash
   mvn spring-boot:run
   ```
   The API will be available at `http://localhost:8080`

---

### Frontend Setup

1. **Navigate to the frontend folder**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

## ⚙️ Configuration

| Property | Default Value |
|---|---|
| Database URL | `jdbc:postgresql://localhost:5432/placement_management` |
| Backend Port | `8080` |
| Frontend Port | `5173` |
| DDL Auto | `update` |

> ⚠️ **Note:** Never commit sensitive credentials to version control. Use environment variables or a secrets manager in production.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ | Placement Management System
</div>
