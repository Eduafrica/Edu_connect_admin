import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Helpers/Button";
import LoadingBtn from "../Helpers/LoadingBtn";
import { verifyOtp } from "../../Helpers/educonnect/api";

function VerifyOtpCard({ setErrorText, setSuccessText }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const storedExpireTime = localStorage.getItem("resendOtpExpireTime");

    if (storedExpireTime) {
      const remainingTime = Math.ceil(
        (new Date(storedExpireTime).getTime() - new Date().getTime()) / 1000
      );

      if (remainingTime > 0) {
        setCountdown(remainingTime);
        setResendAvailable(false);
      } else {
        setCountdown(0);
        setResendAvailable(true);
      }
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setResendAvailable(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startResendCountdown = () => {
    const newExpireTime = new Date().getTime() + 60 * 1000; // 60 seconds
    localStorage.setItem("resendOtpExpireTime", new Date(newExpireTime).toISOString());
    setCountdown(60);
    setResendAvailable(false);
  };

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setIsCompleted(newOtp.every((digit) => digit !== ""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      setIsCompleted(false);
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, otp.length).split("");
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (index < otp.length) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    if (pastedData.length === otp.length) {
      setIsCompleted(true);
    }
  };

  const handleSubmit = async () => {
    if (!isCompleted) {
      setErrorText("Enter correct code");
      setTimeout(() => {
        setErrorText();
      }, 2000);
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp({ otp: `${otp.join("")}` });
      if (res.success) {
        setSuccessText(res?.data);
        setTimeout(() => {
          setSuccessText();
        }, 2000);
        navigate("/success");
      } else {
        setErrorText(res?.data);
        setTimeout(() => {
          setErrorText();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    startResendCountdown();
    try {
      // API call to resend OTP
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-[574px] gap-[64px]">
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-[30px] text-text-color font-bold">
          Please enter your verification code
        </h1>
        <p className="text-[16px] text-text-color-1 font-normal">
          A 4 digit code has been sent to your email address and phone number.
          <br /> Enter the code to continue
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center justify-center">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[index] = el)}
              className={`w-16 h-16 py-[2px] px-[8px] bg-white text-center border-2 text-lg font-semibold rounded-lg focus:outline-none ${
                isCompleted
                  ? "border-edu-main-hover-color"
                  : value
                  ? "border-error"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {!resendAvailable ? (
          <p className="text-xs text-center text-gray-500 font-bold">
            Resend OTP in {countdown}s
          </p>
        ) : (
          <p
            onClick={handleResendOtp}
            className="text-xs cursor-pointer text-center text-edu-main-color font-bold"
          >
            Resend OTP
          </p>
        )}
      </div>

      <div>
        {loading ? <LoadingBtn /> : <Button onClick={handleSubmit} text={"Verify"} />}
      </div>

      <div className="text-xs font-medium text-text-color-3">
        Already have an account?{" "}
        <Link to="/" className="font-bold text-edu-main-color">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default VerifyOtpCard;
