import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Pages/Authorization/Login"
import Register from "./Pages/Authorization/Register"
import VerifyOtp from "./Pages/Authorization/VerifyOtp"
import ForgotPassword from "./Pages/Authorization/ForgotPassword"
import ResetPassword from "./Pages/Authorization/ResetPassword"
import ResetPasswordSuccess from "./Pages/Authorization/ResetPasswordSuccess"
import EduConnectDashboard from "./Pages/EduConnect/EduConnectDashboard"
import EduConnectTestimonies from "./Pages/EduConnect/EduConnectTestimonies"
import EduConnectTestimoniesInfo from "./Pages/EduConnect/EduConnectTestimoniesInfo"
import { Toaster } from 'react-hot-toast'
import EduConnectContactUs from "./Pages/EduConnect/EduConnectContactUs"
import EducConnectContactUsInfo from "./Pages/EduConnect/EducConnectContactUsInfo"
import EduConnectFaq from "./Pages/EduConnect/EduConnectFaq"
import { useState } from "react"
import EduConnectFaqForm from "./Pages/EduConnect/EduConnectFaqForm"
import EduconnectSettings from "./Pages/EduConnect/EduconnectSettings"

function App() {
  const [ educonnectFaqId, setEduconnectFaqId ] = useState()

  return (
    <div className='app'>
      <Toaster></Toaster>
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
          <Route path="/edu-connect/testimonies" element={<EduConnectTestimonies />} />
          <Route path="/edu-connect/testimonies/info/:id" element={<EduConnectTestimoniesInfo />} />
          <Route path="/edu-connect/contact-us" element={<EduConnectContactUs />} />
          <Route path="/edu-connect/contact-us/info/:id" element={<EducConnectContactUsInfo />} />
          <Route path="/edu-connect/faq" element={<EduConnectFaq setEduconnectFaqId={setEduconnectFaqId} />} />
          <Route path="/edu-connect/faq/faq-form" element={<EduConnectFaqForm educonnectFaqId={educonnectFaqId} setEduconnectFaqId={setEduconnectFaqId} />} />
          <Route path="/edu-connect/settings" element={<EduconnectSettings />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
