
function Stats() {
    const dataObject = {
      totalAppDownload: {
        total: 40689,
        percentage: 8.5,
        percentageType: 'positive',
      },
      totalCourseSearch: {
        total: 10293,
        percentage: 1.3,
        percentageType: 'positive',
      },
      totalClickedCourse: {
        total: 89000,
        percentage: 4.3,
        percentageType: 'negative',
      },
      totalCourseOnWeb: {
        total: 2040,
        percentage: 1.5,
        percentageType: 'positive',
      }
    }
    return (
      <div className='w-full flex items-center gap-[33px] justify-between'>
        <div className="card1 bg-white">
          <div className="flex flex-col gap-[34px] w-full">
            <h3 className='text-[16px[ font-medium text-[#202224]'>Total App download</h3>
            <div className="flex items-center gap-[60px] justify-between">
              <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalAppDownload?.total.toLocaleString()}</p>
              <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalAppDownload?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
                <span className="flex items-center justify-center w-5 h-5">
                    {
                      dataObject?.totalAppDownload?.percentageType === 'positive' ? (
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00B69B]">
                          <path d="M14.2689 0.900391L16.4541 3.19039L11.7976 8.07039L7.98077 4.07039L0.910156 11.4904L2.25558 12.9004L7.98077 6.90039L11.7976 10.9004L17.809 4.61039L19.9941 6.90039V0.900391H14.2689Z" fill="#00B69B"/>
                        </svg>
                      ) : (
                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F93C65]">
                          <path d="M14.2689 11.8495L16.4541 9.64224L11.7976 4.93862L7.98077 8.79405L0.910156 1.64224L2.25558 0.283203L7.98077 6.06634L11.7976 2.21091L17.809 8.27356L19.9941 6.06634V11.8495H14.2689Z" fill="#F93C65"/>
                        </svg>
                      )
                    }
                  </span>
                {dataObject?.totalAppDownload?.percentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="card1 bg-white">
          <div className="flex flex-col gap-[34px] w-full">
            <h3 className='text-[16px[ font-medium text-[#202224]'>Total course searched</h3>
            <div className="flex items-center gap-[60px] justify-between">
              <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalCourseSearch?.total.toLocaleString()}</p>
              <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalCourseSearch?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
                <span className="flex items-center justify-center w-5 h-5">
                  {
                    dataObject?.totalCourseSearch?.percentageType === 'positive' ? (
                      <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00B69B]">
                        <path d="M14.2689 0.900391L16.4541 3.19039L11.7976 8.07039L7.98077 4.07039L0.910156 11.4904L2.25558 12.9004L7.98077 6.90039L11.7976 10.9004L17.809 4.61039L19.9941 6.90039V0.900391H14.2689Z" fill="#00B69B"/>
                      </svg>
                    ) : (
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F93C65]">
                        <path d="M14.2689 11.8495L16.4541 9.64224L11.7976 4.93862L7.98077 8.79405L0.910156 1.64224L2.25558 0.283203L7.98077 6.06634L11.7976 2.21091L17.809 8.27356L19.9941 6.06634V11.8495H14.2689Z" fill="#F93C65"/>
                      </svg>
                    )
                  }
                </span>
                {dataObject?.totalCourseSearch?.percentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="card1 bg-white">
          <div className="flex flex-col gap-[34px] w-full">
            <h3 className='text-[16px[ font-medium text-[#202224]'>Total clicked course</h3>
            <div className="flex items-center gap-[60px] justify-between">
              <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalClickedCourse?.total.toLocaleString()}</p>
              <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalClickedCourse?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
                <span className="flex items-center justify-center w-5 h-5">
                    {
                      dataObject?.totalClickedCourse?.percentageType === 'positive' ? (
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00B69B]">
                          <path d="M14.2689 0.900391L16.4541 3.19039L11.7976 8.07039L7.98077 4.07039L0.910156 11.4904L2.25558 12.9004L7.98077 6.90039L11.7976 10.9004L17.809 4.61039L19.9941 6.90039V0.900391H14.2689Z" fill="#00B69B"/>
                        </svg>
                      ) : (
                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F93C65]">
                          <path d="M14.2689 11.8495L16.4541 9.64224L11.7976 4.93862L7.98077 8.79405L0.910156 1.64224L2.25558 0.283203L7.98077 6.06634L11.7976 2.21091L17.809 8.27356L19.9941 6.06634V11.8495H14.2689Z" fill="#F93C65"/>
                        </svg>
                      )
                    }
                  </span>
                {dataObject?.totalClickedCourse?.percentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="card1 bg-white">
          <div className="flex flex-col gap-[34px] w-full">
            <h3 className='text-[16px[ font-medium text-[#202224]'>Total course on the web</h3>
            <div className="flex items-center gap-[60px] justify-between">
              <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalCourseOnWeb?.total.toLocaleString()}</p>
              <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalCourseOnWeb?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
                <span className="flex items-center justify-center w-5 h-5">
                    {
                      dataObject?.totalCourseOnWeb?.percentageType === 'positive' ? (
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00B69B]">
                          <path d="M14.2689 0.900391L16.4541 3.19039L11.7976 8.07039L7.98077 4.07039L0.910156 11.4904L2.25558 12.9004L7.98077 6.90039L11.7976 10.9004L17.809 4.61039L19.9941 6.90039V0.900391H14.2689Z" fill="#00B69B"/>
                        </svg>
                      ) : (
                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F93C65]">
                          <path d="M14.2689 11.8495L16.4541 9.64224L11.7976 4.93862L7.98077 8.79405L0.910156 1.64224L2.25558 0.283203L7.98077 6.06634L11.7976 2.21091L17.809 8.27356L19.9941 6.06634V11.8495H14.2689Z" fill="#F93C65"/>
                        </svg>
                      )
                    }
                  </span>
                {dataObject?.totalCourseOnWeb?.percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Stats
  
  