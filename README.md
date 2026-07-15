# 📚 LearnHive - Online Educational Platform

[![React](https://img.shields.io/badge/React-19-blue.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Hosting-orange.svg?style=flat&logo=firebase)](https://firebase.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet.svg?style=flat&logo=stripe)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**LearnHive** is a MERN stack education and course management platform designed to connect tutors, student learners, and educational administrators in a modern, interactive workspace. It streamlines course enrollment, schedules classes, facilitates secure payments, hosts educational materials, and provides dashboard controls customized for each user role.

<div align="center">
  <img height="500" src="https://drive.google.com/uc?export=view&id=19I04j34fJMtb7L8URSBoHSdbyGTfIScg" />
</div>

---

## 🌍 Relevant Links & Live Demos

*   **⚡ Live Application:** [LearnHive Web App](https://learnhive-4ed81.web.app/)
*   **🔌 Backend API URL:** [https://learn-hive-server-three.vercel.app](https://learn-hive-server-three.vercel.app)
*   **📁 Frontend Repository:** [Learn-hive-client Github](https://github.com/mdashraful24/Learn-hive-client)

---

## ✨ Main Features

LearnHive provides a role-based workflow tailored to three distinct user archetypes:

### 🎓 For Students
*   **Course Discovery:** Seamlessly browse, search, and filter premium and free courses taught by experienced tutors.
*   **Secure Checkout:** Smooth course enrollment using the integrated **Stripe** payment gateway.
*   **Personal Dashboard:** Track enrolled courses, view class schedules, check notifications, and download payment receipts or certificates.
*   **Course Feedback:** Rate and review completed courses to guide other student learners.

### 🏫 For Tutors
*   **Course Authoring:** Easily create, update, and manage classes and curricula.
*   **Interactive Tutee Tracking:** Monitor enrollments, student lists, and ongoing course progress.
*   **Media Management:** Upload course banners and resources powered by Cloudinary and ImgBB.

### 🛡️ For Administrators
*   **User Management:** Review and manage accounts (approve/reject/promote students, tutors, and administrators).
*   **Course Approval System:** Review newly proposed courses by tutors before publishing them live.
*   **Revenue Insights & Reporting:** Track overall enrollment metrics, sales logs, and financial transactions.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React (v19), Vite (v6) |
| **Styling & UI Components** | Tailwind CSS, DaisyUI, FontAwesome Icons, React Icons |
| **Routing & Navigation** | React Router DOM (v7) |
| **State Management** | React Context API, TanStack React Query (v5) |
| **Backend & API** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | Firebase Authentication |
| **Payment Gateway** | Stripe (Client & Server SDKs) |
| **Media & File Hosting** | Cloudinary, ImgBB |
| **Deployment & Hosting** | Firebase Hosting (Frontend), Vercel (Backend) |

---

## 📦 Key Dependencies Used

Here are the primary npm packages driving the client application:

### Core Libraries
*   `react` & `react-dom` (v19): Main library for user interface development.
*   `react-router-dom` (v7): Handle single-page application routing, layouts, and route protections.
*   `@tanstack/react-query` (v5): Robust server-state caching, automatic refetching, and query synchronization.
*   `axios`: Promise-based HTTP client for calling backend endpoints.

### Authentication & Integration
*   `firebase` (v11): Firebase SDK for email/password and social (Google) login authentication.
*   `@emailjs/browser` (v4): Send transactional emails directly from the client.
*   `@stripe/react-stripe-js` & `@stripe/stripe-js`: Elements-based checkout interface for secure Stripe payments.

### Media & Animations
*   `cloudinary` & `@cloudinary/react`: Upload and fetch optimized images/videos.
*   `swiper` (v11): Touch-enabled carousel/slider for course displays and testimonials.
*   `gsap`, `@react-spring/web`, `motion`: Custom interactive animations and micro-interactions.
*   `aos` (Animate On Scroll): Reveal components smoothly as the user scrolls.

### Utilities & UI Polishing
*   `react-hook-form` (v7): Efficient form management and validation.
*   `sweetalert2` & `react-toastify`: Rich alert boxes and non-blocking toast notifications.
*   `recharts` (v2): Interactive charting components used in student, tutor, and admin dashboards.
*   `jspdf` & `jspdf-autotable`: Generate downloadable PDF invoice receipts on the fly.
*   `qrcode`: Render QR codes for payment or enrollment records.

---

## ⚙️ Running Locally (Guidelines)

Follow these steps to run the client project on your local machine:

### Prerequisites
Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (Recommended: LTS version `>= 18`)
*   [Git](https://git-scm.com/)

---

### Step 1: Clone the Repository
Clone the frontend client repository to your local directory:
```bash
git clone https://github.com/mdashraful24/Learn-hive-client.git
cd learn-hive-client
```

---

### Step 2: Install Project Dependencies
Run the installation command to fetch all required npm libraries:
```bash
npm install
```

---

### Step 3: Configure Environment Variables
Create a `.env` (or `.env.local`) file in the root directory and specify the following variables:

```env
# Server Connection
VITE_API_URL=http://localhost:5000

# Firebase Credentials
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID

# ImgBB API Key
VITE_IMAGE_HOSTING_KEY=YOUR_IMGBB_API_KEY

# Cloudinary Storage Configuration
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_CLOUDINARY_PRESET_NAME
VITE_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME

# Stripe Payment Keys (Public Key)
VITE_Payment_Gateway_PK=YOUR_STRIPE_PUBLISHABLE_KEY

# EmailJS Service Keys
VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
```

> [!IMPORTANT]
> Make sure to replace `YOUR_...` placeholders with your actual API credentials. Never commit your `.env` or `.env.local` files to public repository branches.

---

### Step 4: Run the Development Server
Launch the local Vite server:
```bash
npm run dev
```
Once the dev server is active, open your browser and navigate to `http://localhost:5173` (or the port specified by Vite in your console).

---

### Step 5: Build for Production (Optional)
To generate the static distribution bundle:
```bash
npm run build
```
This output is saved to the `/dist` directory, ready to be deployed to static hosting providers (such as Firebase Hosting).

---

## 🔑 Admin Credentials (Demo/Testing)

To log in as an administrator for demo or verification purposes:
*   **Email:** `admin@gmail.com`
*   **Password:** `123456As`

---

## 🛡️ License

This project is licensed under the MIT License.

---

🚀 **Transform the way education works with LearnHive!** 📚✨
