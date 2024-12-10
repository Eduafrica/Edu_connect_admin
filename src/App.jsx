import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Pages/Authorization/Login"
import Register from "./Pages/Authorization/Register"
import VerifyOtp from "./Pages/Authorization/VerifyOtp"
import ForgotPassword from "./Pages/Authorization/ForgotPassword"
import ResetPassword from "./Pages/Authorization/ResetPassword"
import ResetPasswordSuccess from "./Pages/Authorization/ResetPasswordSuccess"
import EduConnectDashboard from "./Pages/EduConnect/EduConnectDashboard"

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/resetPasswordSuccess" element={<ResetPasswordSuccess />} />

          {/**EDU CONNECT */}
          <Route path="/edu-connect/dashboard" element={<EduConnectDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
