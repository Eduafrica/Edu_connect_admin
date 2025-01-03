import { useState, useEffect } from 'react';
import EventRichTextEditor from './Helpers/Events/EventRichTextEditor';
import AddGallery from './AddGallery';

function EventForm({ setErrorMsg, data, formData, setFormData, handleChange }) {
    const [titleActive, setTitleActive] = useState(true);
    const [configurationsActive, setConfigurationsActive] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const MAX_FILE_SIZE_MB = 1;

    const handleTitleDelete = () => {
        setFormData({ ...formData, title: '' });
    };

    const handleFileDelete = () => {
        setFormData({ ...formData, image: null });
    };

    const validateFile = (file) => {
        const isValidImage = file.type.startsWith('image/');
        const isWithinSizeLimit = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

        if (!isValidImage) {
            setErrorMsg('Only image files are allowed.');
            setTimeout(() => {
                setErrorMsg();
            }, 2500);
            return false;
        }

        if (!isWithinSizeLimit) {
            setErrorMsg(`File size must not exceed ${MAX_FILE_SIZE_MB}MB.`);
            setTimeout(() => {
                setErrorMsg();
            }, 2500);
            return false;
        }

        return true;
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && validateFile(file)) {
            setFormData({ ...formData, image: file });
        }
    };

    useEffect(() => {
        console.log('Form Data:', formData);
    }, [formData]);

    return (
        <form className='flex w-full flex-col gap-[30px]'>
            <div className="flex flex-col w-full gap-[30px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div onClick={() => setTitleActive((prev) => !prev)} className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Title</p>
                    </div>
                    <div onClick={handleTitleDelete} className="py-[10px] px-[12px] rounded-[4px] border-[1px] border-[#E6E6E6] text-[#F81414] cursor-pointer">
                        Delete
                    </div>
                </div>
                {titleActive && (
                    <>
                        <input
                            id='eventName'
                            value={formData?.eventName}
                            onChange={handleChange}
                            defaultValue={data?.eventName}
                            type="text"
                            placeholder='Enter event name'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />
                        <EventRichTextEditor data={data?.schedule} handleChange={handleChange} setFormData={setFormData} formData={formData} formDataValue={`schedule`} placeholder={`Schedule`} />

                        <EventRichTextEditor data={data?.eventDescription} handleChange={handleChange} setFormData={setFormData} formData={formData} formDataValue={'eventDescription'} placeholder={'Event Description'} />
                    </>
                )}
            </div>

            <div className="flex flex-col w-full gap-[30px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div onClick={() => setConfigurationsActive((prev) => !prev)} className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Additional Configurations</p>
                    </div>
                    <div onClick={handleFileDelete} className="py-[10px] px-[12px] rounded-[4px] border-[1px] border-[#E6E6E6] text-[#F81414] cursor-pointer">
                        Delete
                    </div>
                </div>
                {configurationsActive && (
                    <>
          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleImageDrop}
                            className={`border-[1px] border-[#D0D5DD] border-dashed rounded-[11px] py-[19px] text-center flex items-center justify-center flex-col ${
                                isDragging ? 'bg-gray-100' : ''
                            }`}
                        >
                            {formData?.image ? (
                                <div className="relative">
                                    <p className="text-[14px] font-semibold">File Selected: {formData?.image.name}</p>
                                    <button
                                        type="button"
                                        onClick={handleFileDelete}
                                        className="absolute top-2 right-2 bg-white text-red-600 p-2 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center flex-col gap-[10px]">
                                    <p className="text-[#585858] text-[10px] font-normal">Drop an image here or</p>
                                    <label
                                        htmlFor="file-upload"
                                        className="border-[1px] cursor-pointer rounded-[16px] p-[10px] border-[#EBEBEB] text-center"
                                    >
                                        <span className="text-[12px] font-semibold text-[#929292]">Browse file</span>
                                    </label>
                                    <p className="text-[#585858] text-[10px] font-normal">Max of {MAX_FILE_SIZE_MB}MB</p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleImageSelect}
                                        accept="image/*"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Event Date</p>
                    </div>
                        <input
                            id='eventDate'
                            value={formData?.eventDate}
                            onChange={handleChange}
                            defaultValue={data?.eventDate}
                            type="date"
                            placeholder='Enter event date'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />

<div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Event Time</p>
                    </div>
                        <input
                            id='eventTime'
                            value={formData?.eventTime}
                            onChange={handleChange}
                            defaultValue={data?.eventTime}
                            type="time"
                            placeholder='Enter event time'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />
                        
                        <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Speaker</p>
                    </div>
                        <input
                            id='speakers'
                            value={formData?.speakers}
                            onChange={handleChange}
                            defaultValue={data?.speakers}
                            type="text"
                            placeholder='Enter speakers'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />

                        {/**Add Gallery */}
                        <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Gallery</p>
                        </div>

                        <AddGallery formData={formData} setErrorMsg={setErrorMsg} setFormData={setFormData} />

                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Location</p>
                    </div>
                        <input
                            id='location'
                            value={formData?.location}
                            onChange={handleChange}
                            defaultValue={data?.location}
                            type="text"
                            placeholder='Enter location'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />

<div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Registration link</p>
                    </div>
                        <input
                            id='registerUrl'
                            value={formData?.registerUrl}
                            onChange={handleChange}
                            defaultValue={data?.registerUrl}
                            type="text"
                            placeholder='Enter registration link'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />

                    </>
                )}
            </div>
        </form>
    );
}

export default EventForm;
