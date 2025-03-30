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
import EduConnectTestimonies from "./Pages/EduAfrica/EduAfricaTestimonies"
import EduConnectTestimoniesInfo from "./Pages/EduAfrica/EduAfricaTestimoniesInfo"
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
import AcnNewsAndUpdatesInfo from "./Pages/AfricanChlidNetwork/AcnNewsAndUpdatesInfo"
import AcnNewsAndUpdatesForm from "./Pages/AfricanChlidNetwork/AcnNewsAndUpdatesForm"
import { AuthorizeAdmin } from "./Auth/ProtectRoutes"
import AcnSettings from "./Pages/AfricanChlidNetwork/AcnSettings"
import ArewaHubDashboard from "./Pages/ArewaHub/ArewaHubDashboard"
import ArewaHubProducts from "./Pages/ArewaHub/ArewaHubProducts"
import ArewaHubOrders from "./Pages/ArewaHub/ArewaHubOrders"
import ArewaHubProductInfo from "./Pages/ArewaHub/ArewaHubProductInfo"
import ArewaHubNewProduct from "./Pages/ArewaHub/ArewaHubNewProduct"
import ArewaHubOrderInfo from "./Pages/ArewaHub/ArewaHubOrderInfo"
import ArewaHubEvents from "./Pages/ArewaHub/ArewaHubEvents"
import ArewaHubNewEvent from "./Pages/ArewaHub/ArewaHubNewEvent"
import ArewaHubTestimonies from "./Pages/ArewaHub/ArewaHubTestimonies"
import ArewaHubTestimoniesInfo from "./Pages/ArewaHub/ArewaHubTestimoniesInfo"
import ArewaHubFaq from "./Pages/ArewaHub/ArewaHubFaq"
import ArewaHubFaqForm from "./Pages/ArewaHub/ArewaHubFaqForm"
import ArewaHubContactUs from "./Pages/ArewaHub/ArewaHubContactUs"
import ArewaHubContactUsInfo from "./Pages/ArewaHub/ArewaHubContactUsInfo"
import ArewaHubSettings from "./Pages/ArewaHub/ArewaHubSettings"
import EduAfricaDashboard from "./Pages/EduAfrica/EduAfricaDashboard"
import EduAfricaContactUs from "./Pages/EduAfrica/EduAfricaContactUs"
import EduAfricaContactUsInfo from "./Pages/EduAfrica/EduAfricaContactUsInfo"
import EduAfricaSettings from "./Pages/EduAfrica/EduAfricaSettings"
import AcnTeams from "./Pages/AfricanChlidNetwork/AcnTeams"
import AcnTeamsInfo from "./Pages/AfricanChlidNetwork/AcnTeamsInfo"
import ResetPasswordSentSuccess from "./Pages/Authorization/ResetPasswordSentSuccess"
import EduConnectNewsletter from "./Pages/EduConnect/EduConnectNewsletter"
import AcnNewTeamMember from "./Pages/AfricanChlidNetwork/AcnNewTeamMember"
import EduConnectTeams from "./Pages/EduConnect/EduConnectTeams"
import EduConnectTeamsInfo from "./Pages/EduConnect/EduConnectTeamsInfo"
import EduConnectNewTeamMember from "./Pages/EduConnect/EduConnectNewTeamMember"
import ArewHubTeams from "./Pages/ArewaHub/ArewHubTeams"
import ArewHubTeamsInfo from "./Pages/ArewaHub/ArewHubTeamsInfo"
import ArewHubNewTeamMember from "./Pages/ArewaHub/ArewHubNewTeamMember"
import EduAfricaTeams from "./Pages/EduAfrica/EduAfricaTeams"
import EduAfricaTeamsInfo from "./Pages/EduAfrica/EduAfricaTeamsInfo"
import EduAfricaNewTeamMember from "./Pages/EduAfrica/EduAfricaNewTeamMember"
import AcnStories from "./Pages/AfricanChlidNetwork/AcnStories"
import AcnStoryInfo from "./Pages/AfricanChlidNetwork/AcnStoryInfo"
import AcnStoryForm from "./Pages/AfricanChlidNetwork/AcnStoryForm"
import AcnAmbassador from "./Pages/AfricanChlidNetwork/AcnAmbassador"
import AcnAmbassadorInfo from "./Pages/AfricanChlidNetwork/AcnAmbassadorInfo"
import AcnNewAmnbassador from "./Pages/AfricanChlidNetwork/AcnNewAmbassador"
import EduAfricaTestimonies from "./Pages/EduAfrica/EduAfricaTestimonies"
import EduAfricaTestimoniesInfo from "./Pages/EduAfrica/EduAfricaTestimoniesInfo"
import AcnNewAmbassador from "./Pages/AfricanChlidNetwork/AcnNewAmbassador"
import EduConnectNewsletterList from "./Pages/EduConnect/EduConnectNewsletterList"
import ArewaHubMembers from "./Pages/ArewaHub/ArewahubMembers"
import ArewaHubMemberInfo from "./Pages/ArewaHub/ArewaHubMemberInfo"
{/**
import BecomeMemberForm from "./Test/Arewahubmember"
*/}

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/resetPasswordSentSuccess" element={<ResetPasswordSentSuccess />} />
          <Route path="/resetPasswordSuccess" element={<ResetPasswordSuccess />} />

          {/**EDU CONNECT */}
          <Route element={<AuthorizeAdmin />}>
            <Route path="/edu-connect/dashboard" element={<EduConnectDashboard />} />
          </Route>

          <Route path="/edu-connect/contact-us" element={<EduConnectContactUs />} />
          <Route path="/edu-connect/contact-us/info/:id" element={<EducConnectContactUsInfo />} />
          <Route path="/edu-connect/faq" element={<EduConnectFaq setEduconnectFaqId={setEduconnectFaqId} />} />
          <Route path="/edu-connect/faq/faq-form" element={<EduConnectFaqForm educonnectFaqId={educonnectFaqId} setEduconnectFaqId={setEduconnectFaqId} />} />
          <Route path="/edu-connect/settings" element={<EduconnectSettings />} />
          <Route path="/edu-connect/newsletter" element={<EduConnectNewsletterList />} />
          <Route path="/edu-connect/newsletter-form/:id" element={<EduConnectNewsletter />} />
          {/**
           * 
          <Route path="/edu-connect/team" element={<EduConnectTeams />} />
          <Route path="/edu-connect/team/info/:id" element={<EduConnectTeamsInfo />} />
          <Route path="/edu-connect/new-team/:id" element={<EduConnectNewTeamMember />} />
           */}

          {/**AFRICAN CHILD NETWORK */}
          <Route path="/acn/dashboard" element={<AcnDasboard />} />
          <Route path="/acn/donations" element={<AcnDonations />} />
          <Route path="/acn/donation/info/:id" element={<AcnDonationInfo />} />
          <Route path="/acn/testimonies" element={<AcnTestimonies />} />
          <Route path="/acn/testimonies/info/:id" element={<AcnTestimoniesInfo />} />
          <Route path="/acn/contact-us" element={<AcnContactUs />} />
          <Route path="/acn/contact-us/info/:id" element={<AcnContactUsInfo />} />
          <Route path="/acn/annual-report" element={<AcnFaq setAcnFaqId={setAcnFaqId} />} />
          <Route path="/acn/annual-report/annual-report-form" element={<AcnFaqForm acnFaqId={acnFaqId} setAcnFaqId={setAcnFaqId} />} />
          <Route path="/acn/news-and-updates" element={<AcnNewsAndUpdates />} />
          <Route path="/acn/news-and-updates/info/:id" element={<AcnNewsAndUpdatesInfo />} />
          <Route path="/acn/news-and-updates/post-form/:id" element={<AcnNewsAndUpdatesForm />} />
          <Route path="/acn/stories" element={<AcnStories />} />
          <Route path="/acn/story/info/:id" element={<AcnStoryInfo />} />
          <Route path="/acn/story/story-form/:id" element={<AcnStoryForm />} />
          <Route path="/acn/team" element={<AcnTeams />} />
          <Route path="/acn/team/info/:id" element={<AcnTeamsInfo />} />
          <Route path="/acn/new-team/:id" element={<AcnNewTeamMember />} />
          <Route path="/acn/ambassador" element={<AcnAmbassador />} />
          <Route path="/acn/ambassador/info/:id" element={<AcnAmbassadorInfo />} />
          <Route path="/acn/new-ambassador/:id" element={<AcnNewAmbassador />} />
          <Route path="/acn/settings" element={<AcnSettings />} />
          
          {/**AFRICAN CHILD NETWORK */}
          <Route path="/arewahub/dashboard" element={<ArewaHubDashboard />} />
          <Route path="/arewahub/products" element={<ArewaHubProducts />} />
          <Route path="/arewahub/product/info/:id" element={<ArewaHubProductInfo />} />
          <Route path="/arewahub/new-product/:id" element={<ArewaHubNewProduct />} />
          <Route path="/arewahub/orders" element={<ArewaHubOrders />} />
          <Route path="/arewahub/order/info/:id" element={<ArewaHubOrderInfo />} />
          <Route path="/arewahub/events" element={<ArewaHubEvents />} />
          <Route path="/arewahub/members" element={<ArewaHubMembers />} />
          <Route path="/arewahub/view-member/:id" element={<ArewaHubMemberInfo />} />
          <Route path="/arewahub/new-event/:id" element={<ArewaHubNewEvent />} />
          <Route path="/arewahub/testimonies" element={<ArewaHubTestimonies />} />
          <Route path="/arewahub/testimonies/info/:id" element={<ArewaHubTestimoniesInfo />} />
          <Route path="/arewahub/faq" element={<ArewaHubFaq setAcnFaqId={setAcnFaqId} />} />
          <Route path="/arewahub/faq/faq-form" element={<ArewaHubFaqForm acnFaqId={acnFaqId} setAcnFaqId={setAcnFaqId} />} />
          <Route path="/arewahub/contact-us" element={<ArewaHubContactUs />} />
          <Route path="/arewahub/contact-us/info/:id" element={<ArewaHubContactUsInfo />} />
          <Route path="/arewahub/settings" element={<ArewaHubSettings />} />
          <Route path="/arewahub/team" element={<ArewHubTeams />} />
          <Route path="/arewahub/team/info/:id" element={<ArewHubTeamsInfo />} />
          <Route path="/arewahub/new-team/:id" element={<ArewHubNewTeamMember />} />

          {/**EDU AFRICA */}
          <Route path="/edu-africa/dashboard" element={<EduAfricaDashboard />} />
          <Route>
            <Route path="/edu-africa/testimonies" element={<EduAfricaTestimonies />} />
          </Route>
          <Route path="/edu-africa/testimonies/info/:id" element={<EduAfricaTestimoniesInfo />} />
          <Route path="/edu-africa/contact-us" element={<EduAfricaContactUs />} />
          <Route path="/edu-africa/contact-us/info/:id" element={<EduAfricaContactUsInfo />} />
          <Route path="/edu-africa/team" element={<EduAfricaTeams />} />
          <Route path="/edu-africa/team/info/:id" element={<EduAfricaTeamsInfo />} />
          <Route path="/edu-africa/new-team/:id" element={<EduAfricaNewTeamMember />} />
          <Route path="/edu-africa/settings" element={<EduAfricaSettings />} />

          
          {/**TEST */}
          {/**
           * 
          <Route path="/test/arewahub-member" element={<BecomeMemberForm />} />
           */}
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
