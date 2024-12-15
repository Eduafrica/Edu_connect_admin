import { useState } from "react"
import { Toaster } from 'react-hot-toast'
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
import EduConnectContactUs from "./Pages/EduConnect/EduConnectContactUs"
import EducConnectContactUsInfo from "./Pages/EduConnect/EducConnectContactUsInfo"
import EduConnectFaq from "./Pages/EduConnect/EduConnectFaq"
import EduConnectFaqForm from "./Pages/EduConnect/EduConnectFaqForm"
import EduconnectSettings from "./Pages/EduConnect/EduconnectSettings"
import AcnDasboard from "./Pages/AfricanChlidNetwork/AcnDasboard"
import AcnDonations from "./Pages/AfricanChlidNetwork/AcnDonations"
import AcnDonationInfo from "./Pages/AfricanChlidNetwork/AcnDonationInfo"
import AcnTestimonies from "./Pages/AfricanChlidNetwork/AcnTestimonies"
import AcnContactUs from "./Pages/AfricanChlidNetwork/AcnContactUs"
import AcnContactUsInfo from "./Pages/AfricanChlidNetwork/AcnContactUsInfo"
import AcnFaq from "./Pages/AfricanChlidNetwork/AcnFaq"
import AcnFaqForm from "./Pages/AfricanChlidNetwork/AcnFaqForm"
import AcnNewsAndUpdates from "./Pages/AfricanChlidNetwork/AcnNewsAndUpdates"
import AcnTestimoniesInfo from "./Pages/AfricanChlidNetwork/AcnTestimoniesInfo"

function App() {
  const [ educonnectFaqId, setEduconnectFaqId ] = useState()
  const [ acnFaqId, setAcnFaqId ] = useState()


  return (
    <div className='app'>
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
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

          {/**AFRICAN CHILD NETWORK */}
          <Route path="/acn/dashboard" element={<AcnDasboard />} />
          <Route path="/acn/donations" element={<AcnDonations />} />
          <Route path="/acn/donations/info/:id" element={<AcnDonationInfo />} />
          <Route path="/acn/testimonies" element={<AcnTestimonies />} />
          <Route path="/acn/testimonies/info/:id" element={<AcnTestimoniesInfo />} />
          <Route path="/acn/contact-us" element={<AcnContactUs />} />
          <Route path="/acn/contact-us/info/:id" element={<AcnContactUsInfo />} />
          <Route path="/acn/faq" element={<AcnFaq setAcnFaqId={setAcnFaqId} />} />
          <Route path="/acn/faq/faq-form" element={<AcnFaqForm acnFaqId={acnFaqId} setAcnFaqId={setAcnFaqId} />} />
          <Route path="/acn/annual-report" element={<AcnFaq />} />
          <Route path="/acn/news-and-updates" element={<AcnNewsAndUpdates />} />

          
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
