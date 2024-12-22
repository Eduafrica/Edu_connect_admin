import { useState } from "react";
import Button from "../Helpers/Button";
import { useNavigate } from "react-router-dom";
import LoadingBtn from "../Helpers/LoadingBtn";
import { updateUser } from "../../Helpers/api";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../Redux/Admin/adminSlice";

function MyDetails({ setErrorText, setSuccessMsg }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.admin);
    const user = data?.currentAdmin;

    const [formData, setFormData] = useState({ id: user?._id });
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setErrorText("Only image files are allowed.");
            setTimeout(() => setErrorText(), 2500);
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            setErrorText("Image size must be less than 5MB.");
            setTimeout(() => setErrorText(), 2500);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
            setFormData({ ...formData, profileImg: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const res = await updateUser(formData);
            if (res.success) {
                setSuccessMsg(res.msg);
                setTimeout(() => {
                    setSuccessMsg();
                }, 2500);

                dispatch(signInSuccess(res.data));
            } else {
                setErrorText(res.data);
                setTimeout(() => {
                    setErrorText();
                }, 2500);
            }
        } catch (error) {
            console.error("Update profile failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 py-5 rounded-t-[12px] border-[1px] border-white bg-white flex flex-col gap-6 shadow-sm">
            <div className="flex items-start gap-4 justify-between border-b-[1px] border-[#EAECF0] pb-4">
                <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-semibold text-[#101828]">Personal Profile</h3>
                    <p className="text-[14px] font-normal text-[#475467]">Update your photo and personal details here.</p>
                </div>
                <div className="flex items-center gap-3">
                    {loading ? (
                        <LoadingBtn style={``} />
                    ) : (
                        <>
                            <Button text={`Cancel`} onClick={handleBack} style={`!bg-white !text-[#344054] !border-[#344054]`} />
                            <div onClick={handleUpdateProfile} className="">
                                <Button text={`Save`} onClick={handleUpdateProfile} style={``} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-start gap-8 mb-4">
                    <div className="w-[280px] flex flex-col">
                        <p className="text-[14px] text-[#344054] font-medium">Your photo</p>
                        <p className="text-[12px] text-[#475467] font-medium">This will be displayed on your profile.</p>
                    </div>
                    <div className="flex items-center gap-6 w-[512px]">
                        <div className="w-[64px] h-[64px] rounded-[200px] relative overflow-hidden">
                            <img src={selectedImage || user?.profileImg} alt="Profile" />
                            <div className="absolute h-[25px] bottom-0 w-full left-0 bg-[#53474780] flex items-center justify-center text-[10.23px] font-normal text-white">
                                <label htmlFor="profileImg" className="cursor-pointer">Edit</label>
                                <input
                                    id="profileImg"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                    </div>
                </div>


        <div className="flex items-start gap-8">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Name</p>
            </div>
            <div className="flex items-center gap-6 w-[512px]">
                <input defaultValue={user.firstName} onChange={handleChange} id="firstName" type="text" className="input" />
                <input defaultValue={user.lastName} onChange={handleChange} id="lastName" type="text" className="input" />
            </div>
        </div>

        <hr className="border-[#EAECF0]" />

        <div className="flex items-start gap-8">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Email</p>
            </div>
            <div className="flex items-center gap-6 w-[512px]">
                <input defaultValue={user?.email} onChange={handleChange} id="email" type="text" className="input" />
            </div>
        </div>

        <hr className=" border-[#EAECF0]" />

        <div className="flex items-start gap-8">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Role</p>
            </div>
            <div className="flex items-center gap-6 w-[512px]">
                <input disabled readOnly value={user?.role} type="text" className="input" />
            </div>
        </div>

        <hr className="border-[#EAECF0]" />

        <div className="flex items-start gap-8">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Country</p>
            </div>
            <div className="flex items-center gap-6 w-[512px]">
                <input defaultValue={user?.country} onChange={handleChange} id="country" type="text" className="input" />
            </div>
        </div>

        <hr className="border-[#EAECF0]" />

        <div className="flex items-start gap-8">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Phone Number</p>
            </div>
            <div className="flex items-center gap-6 w-[512px]">
                <input defaultValue={user?.phoneNumber} onChange={handleChange} id="phoneNumber" type="text" className="input" />
            </div>
        </div>

        <hr className="border-[#EAECF0]" />

        <div className="flex items-start gap-8">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Bio</p>
            </div>
            <div className="flex items-center gap-[6px] w-[512px] flex-col">
                <textarea defaultValue={user?.bio} onChange={handleChange} id="bio" className="input h-[180px] resize-none"></textarea>
                <p className="text-start w-full text-[13px] font-normal text-[#475467]">275 characters left</p>
            </div>
        </div>


      </div>

    </div>
  )
}

export default MyDetails
