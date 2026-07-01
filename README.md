# 🌦️ WeatherGuard

WeatherGuard is a full-stack weather alert platform that allows users to request access, connect their Telegram account, and receive automated weather notifications after administrator approval.

The application demonstrates a secure approval workflow using Clerk Authentication, NestJS, MongoDB, React, and Telegram Bot API.

---

## 🚀 Features

### User Features

- 🔐 Sign in using Clerk Authentication
- 📝 Request access to the platform
- 📲 Connect Telegram account
- 🌦️ Receive weather notifications on Telegram after approval

### Admin Features

- 👥 View pending user requests
- ✅ Approve users
- 📊 View pending and approved user statistics
- 📩 Automatically notify approved users through Telegram

---

## 🏗️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Clerk Authentication
- Axios
- React Hot Toast
- Framer Motion
- Lucide React

### Backend

- NestJS
- TypeScript
- MongoDB Atlas
- Mongoose
- Telegram Bot API
- OpenWeather API
- Node Cron (Scheduler)

---

## 📁 Project Structure

```
WeatherGuard
│
├── admin/          # React Frontend
│
├── api/            # NestJS Backend
│
└── README.md
```

---

## 🔄 Application Workflow

```
User
   │
   ▼
Sign In (Clerk)
   │
   ▼
Request Access
   │
   ▼
Stored in MongoDB
(Status = Pending)
   │
   ▼
Admin Dashboard
   │
Approve User
   │
   ▼
Telegram Notification
   │
   ▼
Weather Alerts
```

---

## 📸 Screenshots

### Landing Page

> Add screenshot here

---

### User Dashboard

> Add screenshot here

---

### Admin Dashboard

> Add screenshot here

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5001

MONGODB_URI=

TELEGRAM_BOT_TOKEN=

OPENWEATHER_API_KEY=

CLERK_SECRET_KEY=
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5001

VITE_CLERK_PUBLISHABLE_KEY=
```

---

## ▶️ Running the Project

### Clone the repository

```bash
git clone https://github.com/komal0a/WeatherGuard.git
```

---

### Backend

```bash
cd api

npm install

npm run start:dev
```

---

### Frontend

```bash
cd admin

npm install

npm run dev
```

---

## 📦 APIs Used

- OpenWeather API
- Telegram Bot API
- Clerk Authentication API

---

## 🎯 Future Improvements

- JWT-based authorization using Clerk middleware
- Role-based route protection
- Real-time weather alerts using WebSockets
- Email notifications
- User profile management
- Deployment using Docker and CI/CD
- Multiple weather providers for improved reliability

---

## 🧪 Testing

The application was tested for:

- User authentication
- Request access workflow
- Admin approval workflow
- Telegram integration
- Weather API integration
- MongoDB CRUD operations

---

## 👨‍💻 Author

**Komal**

B.Tech Information Technology

Dr. B. R. Ambedkar National Institute of Technology, Jalandhar

GitHub: https://github.com/komal0a
