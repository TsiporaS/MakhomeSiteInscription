import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { UserProvider } from "./components/UserContext";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import HomeManager from "./components/HomeManager";
import SignUpManager from "./components/SignUpManager";
import StudentsToAccept from "./components/StudentsToAccept";
import AllStudents from "./components/AllStudents";
import StudentPreinscritDetails from "./components/StudentPreinscritDetails";
import Accept from "./components/Accept";
import VirtualCard from "./components/VirtualCard";
import StudentDetails from "./components/StudentDetails";
import PointsStudent from "./components/PointsStudents";
import QRCodeScanner from "./components/QRCodeScanner";
import ComingsStudent from "./components/ComingsStudent";


function App() {

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/login" index element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/manager/home" element={<HomeManager />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/manager/signup" element={<SignUpManager />} />
          <Route path="/manager/home/students" element={<StudentsToAccept />} />
          <Route path="/manager/home/allStudents" element={<AllStudents />} />
          <Route path="/manager/studentpreinscrit/:studentId" element={<StudentPreinscritDetails />} />
          <Route path="/manager/accept/student/:studentId" element={<Accept />} />
          <Route path="/barcode/:barcodeValue" element={<VirtualCard />} />
          <Route path="/manager/student/:studentId" element={<StudentDetails />} />
          <Route path="/points/student/:studentId" element={<PointsStudent />} />
          <Route path="/manager/comings/student/:studentId" element={<ComingsStudent />} />
          <Route path="/scann" element={<QRCodeScanner />} />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
        {/* </Router> */}
      </UserProvider>
    </div>
  );
}

export default App;
