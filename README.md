# 🧠 Dashboard Analytics and Reporting

Comprehensive supermarket data visualization dashboard with ETL process features, backend API, and interactive frontend using React & Plotly.

![Preview Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20PostgreSQL-blue)

---

## 📦 Tech Stack

- **Database:** PostgreSQL (via pgAdmin)
- **Backend:** Node.js, Express, Prisma ORM
- **Frontend:** React, TanStack Query, Zustand, Plotly.js
- **ETL Pipeline:** Node.js + xlsx parser
- **Data Source:** Supermarket Dataset from Kaggle

---
## 🖱️Demo
### 💻 Live Demo - ([Click here](https://analytics-task.vercel.app/))
### 🎥 Demo Video - ([Click here](https://www.youtube.com/watch?v=CSa8QfW5UAo))
---

## 🚀 Quick Start Guide

### System Requirements
- Node.js (v16 or higher)
- PostgreSQL with pgAdmin
- Git

### 1. Clone Repository & Install Dependencies

```bash
# Clone repository
git clone https://github.com/RoyceAndrew/analytics-task
cd analytics-task

# Install ETL dependencies
cd etl && npm install

# Install backend dependencies
cd ../backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Database Setup

1. **Install and open pgAdmin**
2. **Create new database:**
   - Database name: `analytics_task`
   - Ensure PostgreSQL is running on the appropriate port

### 3. Backend Configuration

Create `.env` file in `backend/` directory:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/analytics_task?schema=public"
```

### 4. Database Migration

**IMPORTANT:** Run database migration first before ETL:

```bash
cd backend
npx prisma generate
npx prisma db push  # Synchronize database schema
```

### 5. ETL Configuration

Create `.env` file in `etl/` directory:

```env
USER=postgres
PASSWORD=your_postgresql_password
HOST=localhost
PORT=your_postgresql_port
DATABASE=analytics_task
```

### 6. Run ETL Process

Transform Excel data to PostgreSQL:

```bash
cd etl
node etl.js
```

**Expected Output:**
```
Data inserted successfully!
```

### 7. Run Backend Server

```bash
cd backend
npm run start
```

**Backend will run at:** `http://localhost:3000`

### 8. Run Frontend Application

```bash
cd frontend
npm run dev
```

**Frontend will run at:** `http://localhost:5173`

---

## 📊 Dashboard Features

### Main Visualizations

| Visualization | Description | Technology |
|---------------|-------------|-----------|
| 🥧 **Pie Chart** | Best-selling product distribution | Plotly.js |
| 🔵 **Scatter Plot** | Discount vs sales correlation by state | Plotly.js |
| 🗺️ **Heatmap** | Sales volume by geographical region | Plotly.js |

### Interactive Features
- **Real-time data filtering**
- **Geographical analysis by state**
- **Product category breakdown**
- **Responsive design for all devices**

---

## 🎯 Key Technical Decisions

### Why Local PostgreSQL?
- **ETL Process Relevance:** Using cloud database would skip the ETL pipeline learning value
- **Development Speed:** Local setup allows rapid iteration and testing
- **Cost Efficiency:** No cloud database costs during development

### State Management Choice
- **Zustand:** Lightweight alternative to Redux for React state management
- **TanStack Query:** Efficient server state management with smart caching

---

## 📈 Performance Optimization

- **Database Indexing:** Queries optimized for large datasets
- **React Query Caching:** Reduces API calls with smart caching
- **Lazy Loading:** Components loaded on demand

---

## 📬 Contact

**Royce Andrew Wijaya**  
📧 Email: royceandrew142@gmail.com  
🐱 GitHub: [@royceandrew](https://github.com/RoyceAndrew)  
💼 LinkedIn: [Royce Andrew Wijaya](https://linkedin.com/in/royceandrewwijaya)

---

## 🙏 Acknowledgments

- **Dataset Source:** [Supermarket Dataset - Kaggle](https://www.kaggle.com/datasets/wellkilo/supermarket-dataset?phase=FinishSSORegistration&returnUrl=/datasets/wellkilo/supermarket-dataset/versions/1?resource=download&SSORegistrationToken=CfDJ8JWxt6IrvD9KktVh6Ttp9j0BH_xTsYdKsTNlyLHxONiuuWp-Wr3i70crNNjTL7c3B8gj4xF2mZlilAHZTovcGPvTFsYMLKHkMl0D240-Sdze2lU-05Q_ls7vDTbx905V1yXsnI6BJtp-Mknqun9yYcfrqGgRvdPKUuHmjA10hT1uGMY-mrtuyaBBQtRW11f4rNy8G1CoJyw6mxY_rm7m1voU8Q-Tja8_tHmsdPhDHE51dNv_YTFHErv-iPHfRPbaeOg0ReyPiUTM8PumpyQmjbD2PeOf0PWm7B_FAkMRxRk3UHK2VpAvpVenSAdEFJSO0tDtqfuzdG-pXOFtzOUflmZeQCNb&DisplayName=David%20Tobing)
- **Visualization Library:** [Plotly.js](https://plotly.com/javascript/)
- **Backend Framework:** [Express.js](https://expressjs.com/)
- **Frontend Framework:** [React](https://reactjs.org/)

---

<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red.svg"/>
  <img src="https://img.shields.io/badge/Developed%20by-Royce%20Andrew-blue.svg"/>
</div>
