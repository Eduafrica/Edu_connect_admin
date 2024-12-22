import successImg from '../../assets/image/success.png'

function SuccessCard({ successText}) {
  return (
    <div className="z-[9999] fixed w-[348px] p-6 top-[60px] right-[100px] rounded-[6px] bg-white shadow flex gap-6 items-center">
    <img src={successImg} alt="error" className="w-[44px] h-[44px]" />

    <div className="flex flex-col gap-[1rem]">
      <p className="text-text-color-2 font-semibold text-[16px]">Success</p>

      <p className="text-text-color-2 font-semibold text-[16px]">{successText}</p>
    </div>
  </div>
  )
}

export default SuccessCard
