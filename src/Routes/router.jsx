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
                path: "allClasses",
                element: <AllClasses></AllClasses>
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
        element: <Dashboard></Dashboard>,
        children: [
            // admin panel
            {
                path: "request",
                element: <TeacherRequest></TeacherRequest>
            },
            {
                path: "users",
                element: <AllUsers></AllUsers>
            },
            {
                path: "users-profile",
                element: <UsersProfile></UsersProfile>
            },

            // teacher panel
            {
                path: "add-class",
                element: <AddClass></AddClass>
            },
            {
                path: "my-class",
                element: <MyClasses></MyClasses>
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);