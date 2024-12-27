import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import Button from "../../Components/Helpers/Button";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import { educonnectfaq } from "../../Data/faq";
import Sidebar from "../../Components/ACN/Sidebar";
import FaqCard from "../../Components/ACN/FaqCard";
import { useFetchFaq } from "../../Helpers/acn/fetch.hooks";

function AcnFaq({ setAcnFaqId }) {
    const navigate = useNavigate()
    const { data: educonnectfaqData, isFetching } = useFetchFaq()
    const faqData = educonnectfaqData?.data || educonnectfaq || []

    const handleNavigate = (id) => {
      if(id){
          setAcnFaqId(id)
          navigate('/acn/annual-report/annual-report-form')
      } else {
          setAcnFaqId()
          navigate('/acn/annual-report/annual-report-form')
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

              <DashBoardLinks name={'acn'} color={`text-acn-main-color border-acn-main-color`} />

                <div className="flex items-center justify-center gap-8 flex-col">
                    <h2 className="text-gray-900 text-[36px] font-semibold text-center">Annual report</h2>
                    <p className="text-gray-600 font-normal text-[20px] text-center">Yearly report of African child network</p>
                </div>
                
                <div className="flex w-[768px] items-center justify-center">
                    <FaqCard data={faqData} loading={isFetching} setAcnFaqId={setAcnFaqId} />
                </div>

                <div className="w-[299px]">
                  <Button onCLick={handleNavigate} text={`Add Annaul Report`} style={`!bg-acn-main-color`}  />
                </div>

            </div>
        </div>


      </div>

    </div>
  );
}

export default AcnFaq;
