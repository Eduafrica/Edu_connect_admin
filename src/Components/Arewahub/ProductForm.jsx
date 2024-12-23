import { useState, useEffect } from 'react';
import RichTextEditor from './Helpers/RichTextEditor';

function ProductForm({ setErrorMsg, data, formData, setFormData, handleChange }) {
    const [titleActive, setTitleActive] = useState(true);
    const [configurationsActive, setConfigurationsActive] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const MAX_FILE_SIZE_MB = 2;

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
                setErrorMsg()
            }, 2500)
            return false;
        }

        if (!isWithinSizeLimit) {
            setErrorMsg(`File size must not exceed ${MAX_FILE_SIZE_MB}MB.`);
            setTimeout(() => {
                setErrorMsg()
            }, 2500)
            return false;
        }

        return true;
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
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
        if (file && validateFile(file)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
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
                            id='productName'
                            value={formData?.productName}
                            onChange={handleChange}
                            defaultValue={data?.productName}
                            type="text"
                            placeholder='Enter product name'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />
                        <RichTextEditor handleChange={handleChange} setFormData={setFormData} formData={formData} />
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
                            className={`border-[1px] border-[#D0D5DD] border-dashed rounded-[11px] py-[19px] text-center flex items-center justify-center flex-col ${isDragging ? 'bg-gray-100' : ''}`}
                        >
                            {formData?.image ? (
                                <div className="relative">
                                    <img className="w-full h-[300px] object-cover rounded-[6px]" src={formData?.image} alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={handleFileDelete}
                                        className="absolute top-2 right-2 bg-white text-red-600 p-2 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div className='flex items-center justify-center flex-col gap-[10px]'>
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
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Amount</p>
                        </div>
                        <input
                            id='price'
                            value={formData?.price}
                            onChange={handleChange}
                            defaultValue={data?.price}
                            type="text"
                            placeholder='Enter amount'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />

                        <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Price Currency</p>
                        </div>
                        <input
                            id='priceCurrency'
                            value={formData?.priceCurrency}
                            onChange={handleChange}
                            defaultValue={data?.priceCurrency}
                            type="text"
                            placeholder='Enter price currency'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />

                        <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Quantity</p>
                        </div>
                        <input
                            id='quantityInStock'
                            value={formData?.quantityInStock}
                            onChange={handleChange}
                            defaultValue={data?.quantityInStock}
                            type="text"
                            placeholder='Enter unit'
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        />

                        <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-arewahub-main-color'>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className='text-arewahub-main-color text-[16px] font-semibold'>Add Quantity</p>
                        </div>
                        <select 
                            onChange={handleChange} 
                            name="" id="productType"
                            className='rounded-[5px] border-[1px] border-[#E6E6E6] h-[63px] py-[19px] px-[20px] outline-none text-[#585858] placeholder:text-[#585858]'
                        >
                            <option value="">-- SELECT TYPE --</option>
                            <option value="Physical">Physical</option>
                            <option value="Digital">Digital</option>
                            <option value="Both Digital and Physical">Both Digital and Physical</option>
                        </select>
                    </>
                )}
            </div>
        </form>
    );
}

export default ProductForm;
