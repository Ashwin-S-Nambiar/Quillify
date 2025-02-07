# Quillify ✍️

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, full-stack blogging application built with Next.js and JavaScript, powered by MongoDB for database operations.

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Installation](#-installation--running-locally) • [Screenshots](#-screenshots) • [Live](#-live) • [Author](#-author)

</div>

## ✨ Features

- **🔐 Secure Authentication** - Login and registration with JWT and bcryptjs
- **📝 Rich Text Editing** - Create and edit posts with WYSIWYG editor
- **📱 Responsive Design** - Fully adaptive across all devices
- **📅 Smart Date Formatting** - Intuitive published date displays
- **🔔 Real-time Notifications** - Toast notifications for user interactions

## 🛠️ Tech Stack

### Frontend
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[React](https://reactjs.org/)** - UI component development
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Backend & Database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for flexible data storage
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - Secure authentication
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password encryption

## 🚀 Installation & Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ashwin-S-Nambiar/Quillify.git
   cd Quillify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set Up MongoDB Database**
   - Visit [MongoDB Cloud](https://cloud.mongodb.com/) and create a new cluster
   - Click "Connect" and choose "Connect to your application"
   - Copy the connection string
   - Create / Open `.env` 
   - Add your MongoDB connection string:

     ```
     DATABASE_URL=your_mongodb_connection_string
     ```

4. **Configure Additional Environment Variables**

   ```bash
   # Generate JWT Secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   
   Create / Open `.env.local` and add:

   ```
   JWT_SECRET=generated_secret_from_above_command
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   ```

5. **Create Admin Account**

   ```bash
   # Creating an Admin
   node -r dotenv/config scripts/createAdmin.js
   ```

6. **Launch development server**

   ```bash
   npm run dev
   ```

## 📸 Screenshots

<div align="center"> 
   
</div>

## 🌐 Live

Deployment: [here]()

## 👤 Author

### Ashwin S Nambiar
- Portfolio: [ashwin-s-nambiar.is-a.dev](https://ashwin-s-nambiar.is-a.dev/)
- GitHub: [@Ashwin-S-Nambiar](https://github.com/Ashwin-S-Nambiar)

---

<div align="center">
Made with ❤️ by Ashwin S Nambiar
</div>