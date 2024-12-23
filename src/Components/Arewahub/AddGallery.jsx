import React, { useState } from 'react';

const MAX_FILE_SIZE_MB = 5;

function AddGallery({ setErrorMsg, formData, setFormData }) {
    const [isDragging, setIsDragging] = useState(false);

    // Handle drag-over events
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    // Handle drag-leave events
    const handleDragLeave = () => {
        setIsDragging(false);
    };

    // Handle image drop events
    const handleImageDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        await processFiles(files);
    };

    // Handle image selection via file input
    const handleImageSelect = async (e) => {
        const files = e.target.files;
        await processFiles(files);
    };

    // Process files (convert to base64 and validate size)
    const processFiles = async (files) => {
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setErrorMsg(`File ${file.name} exceeds the maximum size of ${MAX_FILE_SIZE_MB}MB.`);
                setTimeout(() => {
                    setErrorMsg()
                }, 2500)
                continue;
            }
            const base64 = await convertToBase64(file);
            newImages.push(base64);
        }
        setFormData((prev) => ({
            ...prev,
            eventGallery: [...(prev.eventGallery || []), ...newImages],
        }));
    };

    // Convert file to base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Remove image from the gallery
    const handleFileDelete = (index) => {
        setFormData((prev) => {
            const updatedGallery = [...(prev.eventGallery || [])];
            updatedGallery.splice(index, 1);
            return { ...prev, eventGallery: updatedGallery };
        });
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleImageDrop}
            className={`border-[1px] border-[#D0D5DD] border-dashed rounded-[11px] py-[19px] text-center flex items-center justify-center flex-col ${isDragging ? 'bg-gray-100' : ''}`}
        >
            {formData?.eventGallery?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {formData.eventGallery.map((eventImage, index) => (
                        <div key={index} className="relative">
                            <img className="w-full h-[100px] object-cover rounded-[6px]" src={eventImage} alt={`Preview ${index + 1}`} />
                            <button
                                type="button"
                                onClick={() => handleFileDelete(index)}
                                className="absolute top-2 right-2 bg-white text-red-600 p-2 rounded-full"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center flex-col gap-[10px]">
                    <p className="text-[#585858] text-[10px] font-normal">Drop images here or</p>
                    <label
                        htmlFor="file-upload"
                        className="border-[1px] cursor-pointer rounded-[16px] p-[10px] border-[#EBEBEB] text-center"
                    >
                        <span className="text-[12px] font-semibold text-[#929292]">Browse files</span>
                    </label>
                    <p className="text-[#585858] text-[10px] font-normal">Each image must be at most {MAX_FILE_SIZE_MB}MB</p>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleImageSelect}
                        accept="image/*"
                        multiple
                    />
                </div>
            )}
        </div>
    );
}

export default AddGallery;
