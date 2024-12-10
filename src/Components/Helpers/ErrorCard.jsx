import ErrorImg from '../../assets/image/error.png'

function ErrorCard({ errorText }) {
  return (
    <div className="fixed w-[348px] p-6 top-[60px] right-[100px] rounded-[6px] bg-white shadow flex gap-6 items-center">
    <img src={ErrorImg} alt="error" className="w-[44px] h-[44px]" />

    <div className="flex flex-col gap-[1rem]">
      <p className="text-text-color-2 font-semibold text-[16px]">Error</p>

      <p className="text-text-color-2 font-semibold text-[16px]">{errorText}</p>
    </div>
  </div>
  )
}

export default ErrorCard
