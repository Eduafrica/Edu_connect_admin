
function LoadingBtn({ style }) {
    return (
      <button disabled className={`bg-edu-main-color w-full cursor-pointer hover:bg-edu-main-hover-color text-white text-center flex items-center justify-center border-[1px] border-primary-color-2 rounded-[8px] py-[10px] px-[18px] ${style}`} >
          <div className="loader">
  
          </div>
      </button>
    )
  }
  
  export default LoadingBtn
  