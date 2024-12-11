import { useNavigate } from "react-router-dom";
import FaqCard from "../../Components/EduConnect/FaqCard";
import Navbar from "../../Components/EduConnect/Navbar";
import Sidebar from "../../Components/EduConnect/Sidebar";
import Button from "../../Components/Helpers/Button";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import { educonnectfaq } from "../../Data/faq";
import { useFetchFaq } from "../../Helpers/educonnect/fetch.hooks";

function EduConnectFaq({ setEduconnectFaqId }) {
    const navigate = useNavigate()
    const { data: educonnectfaqData, isFetching } = useFetchFaq()
    const faqData = educonnectfaqData?.data || educonnectfaq || []

    const handleNavigate = (id) => {
      if(id){
          setEduconnectFaqId(id)
          navigate('/edu-connect/faq/faq-form')
      } else {
          setEduconnectFaqId()
          navigate('/edu-connect/faq/faq-form')
      }
  }
  return (
    <div className="page flex-row">

      {/* Sidebar */}
      <div className="fixed w-[280px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative ml-[280px] w-[calc(100vw-280px)]">
        <div className=" w-full h-[60px] top-0 left-0 bg-white">
          <Navbar />
        </div>

        <div className="bg-bgColor pad1 flex flex-col gap-[39px]">
            <div className="flex flex-col gap-[39px] items-center">

              <DashBoardLinks name={'educonnect'} />

                <div className="flex items-center justify-center gap-8 flex-col">
                    <h2 className="text-gray-900 text-[36px] font-semibold text-center">Frequently asked questions</h2>
                    <p className="text-gray-600 font-normal text-[20px] text-center">Everything you need to know about the Educonnect Africa</p>
                </div>
                
                <div className="flex w-[768px] items-center justify-center">
                    <FaqCard data={faqData} loading={isFetching} setEduconnectFaqId={setEduconnectFaqId} />
                </div>

                <div className="w-[299px]">
                  <Button onCLick={handleNavigate} text={`Add FAQ`}  />
                </div>

            </div>
        </div>


      </div>

    </div>
  );
}

export default EduConnectFaq;
