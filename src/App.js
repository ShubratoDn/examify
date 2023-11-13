import "./App.css";
import UserRedirect from "./pages/protected/UserRedirect";
import Login from "./pages/Login";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import StudentDashboard from "./pages/protected/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/protected/dashboard/TeacherDashboard";
import ProtectedGate from "./pages/protected/ProtectedGate";
import Logout from "./pages/protected/Logout";
import StudentGuard from "./pages/protected/StudentGuard";
import TeacherGuard from "./pages/protected/TeacherGuard";
import StudentHome from "./pages/protected/student/StudentHome";
import TeacherHome from "./pages/protected/teacher/TeacherHome";

import AddExams from "./pages/protected/teacher/AddExams";


function App() {
    return (
        <BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Routes>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>

                <Route path="/" element={<ProtectedGate></ProtectedGate>}>
                    <Route path="" element={<UserRedirect></UserRedirect>}></Route>
                    <Route path="/home" element={<UserRedirect></UserRedirect>}></Route>
                    <Route path="/logout" element={<Logout></Logout>}></Route>
                    <Route path="/dashboard" element={<UserRedirect></UserRedirect>}></Route>



                    <Route path="/student" element={<StudentGuard></StudentGuard>}>
                        <Route path="/student/" element={<StudentHome></StudentHome>}></Route>
                        <Route path="/student/dashboard" element={<StudentHome></StudentHome>}></Route>
                    </Route>

                    <Route path="/teacher" element={<TeacherGuard></TeacherGuard>}>
                        <Route path="/teacher/" element={<TeacherHome></TeacherHome>}></Route>
                        <Route path="/teacher/dashboard" element={<TeacherHome></TeacherHome>}></Route>
                        <Route path="/teacher/add-exam" element={<AddExams></AddExams>}></Route>
                    </Route>
                    {/* <Route path="/teacher/add-exam" element={<AddExam></AddExam>}></Route> */}

                </Route>

                <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
