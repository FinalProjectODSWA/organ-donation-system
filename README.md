# 🏥 Organ Donation Management System

A full-stack web application to streamline organ donation and transplantation management. Built with **Node.js**, **React**, and **MySQL**, this system allows for donor/recipient registrations, secure document handling, organ availability tracking, and admin approval workflows.

---

## 🚀 Features

- Donor and recipient registration forms
- Hospital admin login and dashboard
- Document uploads with secure storage (e.g., death certificates)
- OTP-protected access to sensitive data
- Email/SMS notifications (Twilio/SendGrid)
- Organ availability notifications
- Role-based access control
- Admin approval system
- JWT-based authentication

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|------------|----------------------------------|
| Frontend   | React, JavaScript, HTML, CSS     |
| Backend    | Node.js, Express.js              |
| Database   | MySQL                            |
| Auth       | JWT, OTP (Twilio/Email)          |
| File Store | AWS S3 / Firebase (Pluggable)    |
| Hosting    | Vercel (Frontend), Railway/Render (Backend) |

---

## 📁 Project Structure

```
organ-donation-system/
├── backend/               # Node.js API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/              # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── docker-compose.yml     # Dev environment bootstrap
└── README.md
```

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- Node.js & npm
- MySQL
- Git
- Optional: Docker

---

### 💻 Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your DB credentials

npm install
npm start
```

> Ensure MySQL is running and the database `organ_donation` exists.

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Visit: `http://localhost:3000`

---

### 🐳 Docker Setup (Optional)

```bash
docker-compose up
```

---

## 🔐 Environment Variables (`.env` for backend)

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=organ_donation
```

---

## 🧪 Testing

- API testing with Postman
- Unit tests using Jest / Mocha (optional setup)
- File upload restrictions & OTP validations

---

## 📈 Future Enhancements

- Organ compatibility filters (blood type, age, etc.)
- AI-powered organ matching suggestions
- Admin analytics dashboard
- Multilingual support
- Mobile app version

---

## 🧑‍💻 Contributors

- **Fahad** – Full Stack Developer  
- Open for contributions! Create an issue or PR.

---

## 📄 License

MIT License © 2025 Organ Donation System Team
