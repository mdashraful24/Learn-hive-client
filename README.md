# LearnHive

LearnHive is a MERN stack platform designed to revolutionize how educational institutions, tutors, and students interact. By offering features for course management, personalized dashboards, and an intuitive environment for managing educational content, LearnHive is dedicated to making skill learning and class management more efficient and accessible.

## Features

- **Course Management**: Tutors can create, organize, and manage courses. Students can enroll, track progress, and access course materials.
- **Personalized Dashboards**: Students and tutors get unique dashboards, displaying relevant data, upcoming classes, and other personalized content.
- **Ratings & Reviews**: A system for students to rate and review courses and tutors to help improve quality and transparency.
- **Stripe Integration**: Secure payment integration for students to pay for courses.
- **User Authentication**: Firebase Authentication for user sign-ups and logins.
- **Cloudinary Integration**: Upload and manage media resources for courses and profiles.
- **Responsive Design**: Fully responsive layout built with Tailwind CSS and DaisyUI for a modern and fluid design experience.

## Technologies Used

### Frontend
- **React**: JavaScript library for building the user interface.
- **React Router**: For routing and navigation between different pages.
- **React Query**: For data fetching and managing server-state in React.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **DaisyUI**: UI components built with Tailwind CSS for rapid UI development.
- **AOS**: Animation on scroll library for adding interactive animations to the page.
- **Cloudinary**: For image hosting and media management.

### Backend
- **Node.js**: Server-side JavaScript environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data, courses, and course materials.
- **Firebase Authentication**: For handling user authentication and authorization.
- **Stripe**: Payment processing for course enrollments.

### Other Libraries and Tools
- **Axios**: For making HTTP requests to interact with APIs.
- **React Hook Form**: For easy form handling and validation.
- **React Icons**: Icons for better UI/UX.
- **React Modal**: For displaying modals.
- **React-Paginate**: For pagination features in courses and reviews.
- **SweetAlert2**: For better user interaction and alerts.

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (Local or Cloud instance)
- **Stripe** account (for payment gateway)
- **Cloudinary** account (for media management)

### 1. Clone the repository
Clone the repository to your local machine:

bash

git clone https://github.com/mdashraful24/Learn-hive-client.git
cd Learn-hive-client

### 2. Install dependencies
Run the following command in both client and server directories:

bash

npm install

### 3. Set up environment variables
Create a `.env` file in the root directory and configure the following:

env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_IMAGE_HOSTING_KEY=YOUR_IMGBB_KEY
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_CLOUDINARY_UPLOAD_PRESET
VITE_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
VITE_Payment_Gateway_PK=YOUR_STRIPE_PAYMENT_PK

### 4. Run the app
- To start the frontend, run the following:

bash

npm run dev

- To start the backend server, use:

bash

npm run server

Visit the app at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Sign Up/Login**: Users can sign up or log in via Firebase Authentication (using email or social login).
2. **Browse Courses**: Students can explore available courses, filter by category, or search for specific topics.
3. **Enroll in Courses**: After selecting a course, students can enroll and start learning.
4. **Course Management**: Tutors can create, manage, and update course content directly from their dashboard.
5. **Payments**: Stripe integration allows students to securely pay for their course enrollments.

## Contributing

We welcome contributions to LearnHive! Whether you're fixing bugs, adding new features, or improving documentation, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request with a detailed explanation of your changes.

## Acknowledgments

- **Firebase** for providing authentication and real-time database solutions.
- **Stripe** for secure payment processing.
- **Cloudinary** for hosting and managing media files.
- **Tailwind CSS** and **DaisyUI** for building a modern, responsive interface.
- **React** and its ecosystem for making frontend development easier.

This format includes detailed sections like Features, Technologies, Installation, Usage, Contributing, and more. You can personalize it by updating the placeholders (like `your-username` in the repository URL) and adjusting any other specific details for your project.

## Admin Related Info:

  - **Username**: Ashraful Islam
  - **Email**: admin@gmail.com
  - **Password**: 123456As

## Live Demo

You can view the live version of **LearnHive** at the following link:

- **[Link 1](https://learnhive-4ed81.web.app/)**
- **[Link 2](https://learnhive-4ed81.firebaseapp.com/)**
