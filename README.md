# 🌦️ WeatherGuard

A full-stack weather alert platform that allows users to request access, connect their Telegram account, and receive automated weather notifications after administrator approval.

The application demonstrates a secure approval workflow using **React**, **NestJS**, **MongoDB**, **Clerk Authentication**, **Telegram Bot API**, and **OpenWeather API**.

---

## 🚀 Features

### 👤 User Features

- 🔐 Secure authentication using Clerk
- 📝 Request access to the platform
- 📲 Connect Telegram account
- 🌦️ Receive automated weather alerts after admin approval
- 🔔 Receive approval confirmation via Telegram

### 👨‍💼 Admin Features

- View pending access requests
- Approve or reject users
- View pending and approved user statistics
- Automatically notify approved users on Telegram

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Clerk Authentication
- Axios
- React Hot Toast
- Framer Motion
- Lucide React

## Backend

- NestJS
- TypeScript
- MongoDB Atlas
- Mongoose
- Telegram Bot API
- OpenWeather API
- Node Cron Scheduler

---

# 🏛️ System Architecture

```text
                                 +----------------------+
                                 |       User           |
                                 +----------+-----------+
                                            |
                                            |
                                  Sign In (Clerk)
                                            |
                                            ▼
                             +---------------------------+
                             |      React Frontend       |
                             |     (Vite + TypeScript)   |
                             +-------------+-------------+
                                           |
                                   REST API Requests
                                           |
                                           ▼
                             +---------------------------+
                             |      NestJS Backend       |
                             +-------------+-------------+
                                           |
                  +------------------------+-------------------------+
                  |                        |                         |
                  ▼                        ▼                         ▼
         MongoDB Atlas             Telegram Bot API          OpenWeather API
          (User Data)              (Notifications)          (Weather Data)
                  |
                  ▼
      User Approval & Weather Alert Workflow
```

---

# 🔄 Application Workflow

```text
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
Connect Telegram
   │
   ▼
Admin Dashboard
   │
Approve User
   │
   ▼
Status Updated to Approved
   │
   ▼
Telegram Approval Message
   │
   ▼
Weather Scheduler
   │
   ▼
OpenWeather API
   │
   ▼
Telegram Weather Alerts
```

---

# 🗄️ Database Schema

The application uses a single **Users** collection.

| Field | Type | Description |
|--------|------|-------------|
| `_id` | ObjectId | MongoDB document ID |
| `name` | String | User's full name |
| `email` | String | User email |
| `clerkId` | String | Unique Clerk Authentication ID |
| `telegramChatId` | String | Telegram Chat ID used for notifications |
| `status` | Enum | pending / approved / rejected |
| `role` | Enum | user / admin |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last updated timestamp |

### Sample Document

```json
{
  "_id": "...",
  "name": "Ayush Chaudhary",
  "email": "ayush@gmail.com",
  "clerkId": "user_xxxxxxxxx",
  "telegramChatId": "1021570701",
  "status": "approved",
  "role": "user"
}
```

---

# 🔒 How Only Approved Users Receive Alerts

WeatherGuard ensures that only users approved by an administrator receive weather notifications.

### Step 1 – Authentication

Users authenticate securely using Clerk Authentication.

### Step 2 – Request Access

A new document is created in MongoDB.

```text
status = pending
role = user
```

At this stage, users cannot receive alerts.

### Step 3 – Connect Telegram

The user connects their Telegram account.

The Telegram Chat ID is stored in MongoDB.

### Step 4 – Admin Approval

The administrator approves the request.

```text
status = approved
```

A confirmation message is immediately sent through Telegram.

### Step 5 – Scheduler

The scheduler periodically fetches weather data from OpenWeather API.

Before sending notifications, it queries:

```javascript
status = "approved"
```

Only approved users are selected.

### Step 6 – Notification

Weather alerts are sent only to the Telegram Chat IDs of approved users.

Users with

- pending
- rejected

status are excluded from receiving alerts.

---

# 📂 Folder Structure

```text
WeatherGuard
│
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── api/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── telegram/
│   │   ├── weather/
│   │   ├── scheduler/
│   │   └── admin/
│   │
│   └── package.json
│
└── README.md
```

---

# 📸 Screenshots

## Landing Page

_Add screenshot here_

---

## User Dashboard

_Add screenshot here_

---

## Admin Dashboard

_Add screenshot here_

---

## Telegram Notification

_Add screenshot here_

---

# ⚙️ Environment Variables

## Backend (`api/.env`)

```env
PORT=5001

MONGODB_URI=

CLERK_SECRET_KEY=

TELEGRAM_BOT_TOKEN=

OPENWEATHER_API_KEY=
```

---

## Frontend (`admin/.env`)

```env
VITE_API_URL=http://localhost:5001

VITE_CLERK_PUBLISHABLE_KEY=
```

---

# ▶️ Installation

## Clone Repository

```bash
git clone https://github.com/komal0a/WeatherGuard.git
```

---

## Backend

```bash
cd api

npm install

npm run start:dev
```

---

## Frontend

```bash
cd admin

npm install

npm run dev
```

---

# 📦 APIs Used

- Clerk Authentication
- Telegram Bot API
- OpenWeather API

---

# 🧪 Testing

The application was tested for:

- Clerk Authentication
- User request access workflow
- Admin approval workflow
- Telegram integration
- MongoDB CRUD operations
- Weather API integration

---

# 📚 Key Learnings

- Built a scalable full-stack application using React and NestJS.
- Implemented secure authentication using Clerk.
- Designed a MongoDB schema for user approval management.
- Integrated Telegram Bot API for real-time notifications.
- Consumed external REST APIs using Axios.
- Built reusable React components with TypeScript.
- Implemented an administrator approval workflow.

---

# 🚀 Future Improvements

- Role-based authorization using JWT middleware
- Docker support
- CI/CD pipeline
- Email notifications
- Weather analytics dashboard
- Support for multiple weather providers
- Admin audit logs
- Real-time weather alerts using WebSockets

---

# 👨‍💻 Author

**Komal**

B.Tech Information Technology

Dr. B. R. Ambedkar National Institute of Technology, Jalandhar

GitHub: https://github.com/komal0a

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!
