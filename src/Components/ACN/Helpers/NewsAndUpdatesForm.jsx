import { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';

function NewsAndUpdatesForm({ data, formData, setFormData, handleChange }) {
    const [titleActive, setTitleActive] = useState(true);
    const [configorationsActive, setConfigorationsActive] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const handleTitleDelete = () => {
        setFormData({ ...formData, title: '' });
    };

    const handleFileDelete = () => {
        setFormData({ ...formData, image: null });
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
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
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        
        // Append other form fields
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);

        // Append the image if it exists
        if (formData.image) {
            const imageBlob = dataURItoBlob(formData.image); // Convert the base64 image to a Blob
            formDataToSend.append('image', imageBlob, 'image.png');
        }

        // Send the FormData
        fetch('/submit-form', {
            method: 'POST',
            body: formDataToSend,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Form submitted successfully:', data);
            // Handle success
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
            // Handle error
        });
    };

    // Convert base64 image to Blob for FormData
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([uintArray], { type: 'image/png' });
    };

    useEffect(() => {
        console.log('DATA', formData);
    }, [formData]);

    return (
        <form onSubmit={submitForm} className='flex w-full flex-col gap-[30px]'>
            <div className="flex flex-col w-full gap-[30px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div onClick={() => setTitleActive((prev) => !prev)} className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-acn-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <p className='text-acn-main-color text-[16px] font-semibold'>Title</p>
                    </div>

                    <div onClick={handleTitleDelete} className="py-[10px] px-[12px] rounded-[4px] border-[1px] border-[#E6E6E6] flex items-center justify-center gap-[6px] text-[13px] font-normal text-[#F81414] cursor-pointer">
                        <span className='flex items-center justify-center w-5 h-5'>
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-[#F81414]'>
                                <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        Delete
                    </div>
                </div>
                {titleActive && (
                    <>
                        <input id='title' defaultValue={data?.title} value={formData?.title} onChange={handleChange} type="text" placeholder='Enter Title' className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]' />
                    
                        <div className="">
                            <RichTextEditor handleChange={handleChange} setFormData={setFormData} formData={formData} />
                        </div>
                    </>
                )}
            </div>


            <div className="flex flex-col w-full gap-[30px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div onClick={() => setConfigorationsActive((prev) => !prev)} className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-acn-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <p className='text-acn-main-color text-[16px] font-semibold'>Additional Configurations</p>
                    </div>

                    <div onClick={handleFileDelete} className="py-[10px] px-[12px] rounded-[4px] border-[1px] border-[#E6E6E6] flex items-center justify-center gap-[6px] text-[13px] font-normal text-[#F81414] cursor-pointer">
                        <span className='flex items-center justify-center w-5 h-5'>
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-[#F81414]'>
                                <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        Delete
                    </div>
                </div>
                {configorationsActive && (
                    <>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleImageDrop}
                            className="border-[1px] border-[#D0D5DD] border-dashed rounded-[11px] py-[19px] text-center w-full flex items-center justify-center flex-col"
                        >
                            {formData?.image ? (
                                <div className="relative">
                                    <img className="w-full h-[300px] object-cover rounded-[6px]" src={formData?.image} alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={handleFileDelete}
                                        className="absolute top-2 right-2 bg-white text-red-600 p-2 rounded-full"
                                    >
                                        <svg width="16" height="16" fill="currentColor" className="bi bi-x" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 1 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </button>
                                </div>
                            ) : isDragging ? ( 
                                <>
                                    <p className="text-[#585858] text-[10px] font-normal">Drop here</p>
                                </>
                            ) : (
                                <div className='flex items-center justify-center flex-col gap-[10px]'>
                                    <p className="text-[#585858] text-[10px] font-normal">Drop an Image here or</p>
                                    <label
                                        htmlFor="file-upload"
                                        className="border-[1px] cursor-pointer rounded-[16px] p-[10px] inline-block border-[#EBEBEB] text-center"
                                    >
                                        <span className="text-[12px] font-semibold text-[#929292]">Browse file</span>
                                    </label>
                                    <p className="text-[#585858] text-[10px] font-normal">Max of 5mb</p>
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

                        <input id='category' value={formData?.category} onChange={handleChange} type="text" placeholder='Enter category seprated bg coma,' className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]' />
                    </>
                )}
            </div>

            
        </form>
    );
}

export default NewsAndUpdatesForm;
