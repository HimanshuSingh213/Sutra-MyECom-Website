import React from 'react'

function AccessCRUD({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 p-5 flex items-center justify-center z-50'>
            {/* Backdrop */}
            <div
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'

            ></div>

            {/* CRUD operation Modal */}
            <div className='bg-white rounded-lg z-55 w-3xl overflow-hidden'>
                <div className='px-5 py-4 flex justify-between items-center border-b border-b-gray-200'>
                    <div className='flex gap-3 items-center'>
                        <div className='text-[#f97316]'>
                            सूत्र
                        </div>
                        <span className='text-gray-300'>|</span>
                        <div className='text-gray-900 text-sm'>Product Manaegement</div>
                    </div>
                    <div onClick={onClose}
                        className='p-1 rounded-md hover:bg-gray-100'>
                        <svg className="w-4 h-4 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                        </svg>
                    </div>
                </div>
                <div className='overflow-y-auto p-5 bg-[#FAFAFA] w-full'>
                    <div className='h-9 flex items-center justify-between w-full mb-10'>
                        <div className='h-full text-gray-500 text-sm flex items-center justify-center'>
                            6 Products
                        </div>
                        <div className='flex gap-2 items-center justify-center px-4 py-2 bg-[#f97316] rounded-xl h-full text-white text-sm'>
                            <svg className=''
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            Add Product
                        </div>
                    </div>

                    {/* Products will be Shown Here */}
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccessCRUD