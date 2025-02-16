import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import TeachOnLearnHive from "../pages/TeachOnLearnHive/TeachOnLearnHive";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import AllClasses from "../pages/AllClasses/AllClasses";
import Dashboard from "../Layout/Dashboard";
import TeacherRequest from "../pages/Dashboard/TeacherRequest/TeacherRequest";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import UsersProfile from "../pages/Dashboard/UsersProfile/UsersProfile";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import AdminClass from "../pages/Dashboard/AdminClass/AdminClass";
import ClassDetails from "../pages/Dashboard/ClassDetails/ClassDetails";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import Payment from "../pages/Payment/Payment";
import MyEnrolled from "../pages/Dashboard/MyEnrolled/MyEnrolled";
import EnrolledClass from "../pages/Dashboard/EnrolledClass/EnrolledClass";
import StudentProfile from "../pages/Dashboard/StudentProfile/StudentProfile";
import Progress from "../pages/Dashboard/Progress/Progress";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";
import StudentRoute from "./StudentRoute";
import TeacherProfile from "../pages/Dashboard/TeacherProfile/TeacherProfile";
import MyRequest from "../pages/Dashboard/MyRequest/MyRequest";
import ApproveJob from "../pages/Dashboard/ApproveJob/ApproveJob";
import AboutUs from "../pages/AboutUs/AboutUs";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "aboutUs",
                element: <AboutUs></AboutUs>
            },
            {
                path: "allClasses",
                element: <AllClasses></AllClasses>
            },
            {
                path: "details/:id",
                element: <PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>,
                loader: ({ params }) => fetch(`https://mw-assignments12-server.vercel.app/all-classes/${params.id}`)
            },
            {
                path: "/payment/:id",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: ({ params }) => fetch(`https://mw-assignments12-server.vercel.app/all-classes/${params.id}`)
            },
            {
                path: "tech",
                element: <PrivateRoute><TeachOnLearnHive></TeachOnLearnHive></PrivateRoute>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin panel
            {
                path: "request",
                element: <AdminRoute><TeacherRequest></TeacherRequest></AdminRoute>
            },
            {
                path: "users",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "admin-class",
                element: <AdminRoute><AdminClass></AdminClass></AdminRoute>
            },
            {
                path: "progress/:id",
                element: <AdminRoute><Progress></Progress></AdminRoute>,
                loader: ({ params }) => fetch(`https://mw-assignments12-server.vercel.app/details/${params.id}`)
            },
            {
                path: "users-profile",
                element: <AdminRoute><UsersProfile></UsersProfile></AdminRoute>
            },

            // teacher panel
            {
                path: "add-class",
                element: <TeacherRoute><AddClass></AddClass></TeacherRoute>
            },
            {
                path: "my-class",
                element: <TeacherRoute><MyClasses></MyClasses></TeacherRoute>
            },
            {
                path: "my-class/:id",
                element: <TeacherRoute><ClassDetails></ClassDetails></TeacherRoute>,
                loader: ({ params }) => fetch(`https://mw-assignments12-server.vercel.app/details/${params.id}`)
            },
            {
                path: "teacher-profile",
                element: <TeacherRoute><TeacherProfile></TeacherProfile></TeacherRoute>
            },
            {
                path: "approve",
                element: <TeacherRoute><ApproveJob></ApproveJob></TeacherRoute>
            },
            // student
            {
                path: "myEnroll-class",
                element: <StudentRoute><MyEnrolled></MyEnrolled></StudentRoute>
            },
            {
                path: "myEnroll-class/:id",
                element: <StudentRoute><EnrolledClass></EnrolledClass></StudentRoute>,
                loader: ({ params }) => fetch(`https://mw-assignments12-server.vercel.app/all-classes/${params.id}`)
            },
            {
                path: "student-profile",
                element: <StudentRoute><StudentProfile></StudentProfile></StudentRoute>
            },
            {
                path: "my-request",
                element: <StudentRoute><MyRequest></MyRequest></StudentRoute>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);