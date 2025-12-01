import React, { useState } from 'react'
import ProductEdit from './ProductEdit';
import AddProduct from './AddProduct';
import { useEffect } from 'react';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

function AccessCRUD({ isOpen, onClose, products, setProducts, isProductEditOpen, setProductEditOpen }) {
    if (!isOpen) return null;

    const [editingProduct, setEditingProduct] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const deleteProduct = async (item) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${item._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "admin-key": ADMIN_KEY,
                    }
                }
            )

            if (!res.ok) {
                alert("Delete failed");
                return;
            }

            setProducts((oldProducts) =>
                oldProducts.filter((p) => p._id !== item._id)
            );

            // onClose();

        }
        catch (err) {
            console.log(err);
            alert("Server error while deleting!");
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        const handleBack = (e) => {
            onClose();
        };

        window.history.pushState({ modal: "AccessCRUD" }, "");

        window.addEventListener("popstate", handleBack);

        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, [isOpen, onClose]);

    return (
        <div className='fixed inset-0 p-5 flex items-center justify-center z-50'>
            {/* Backdrop */}
            <div
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
                onClick={() => {
                    if (window.innerWidth > 1024) {
                        onClose();
                    }
                }}
            ></div>

            {/* CRUD operation Modal */}
            <div className='bg-[#FAFAFA] rounded-xl z-55 w-3xl overflow-hidden min-h-1/2'>
                <div className='px-5 py-4 flex justify-between items-center border-b border-b-gray-200'>
                    <div className='flex gap-3 items-center'>
                        <div className='text-[#f97316]'>
                            सूत्र
                        </div>
                        <span className='text-gray-300'>|</span>
                        <div className='text-gray-900 text-sm'>Product Manaegement</div>
                    </div>
                    <div onClick={onClose}
                        className='p-1 rounded-md hover:bg-gray-100 cursor-pointer'>
                        <svg className="w-4 h-4 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                        </svg>
                    </div>
                </div>
                <div className='overflow-y-auto p-5 bg-[#FAFAFA] w-full max-h-[500px]'>
                    <div className='h-9 flex items-center justify-between w-full mb-10'>
                        <div className='h-full text-gray-500 text-sm flex items-center justify-center'>
                            {products.length} {products.length === 1 ? "Product" : "Products"}
                        </div>
                        <div onClick={() => setIsAddOpen(true)}
                            className='flex gap-2 items-center justify-center px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] transition duration-100 ease-in-out rounded-xl h-full text-white text-sm cursor-pointer'>
                            <svg className=''
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            Add Product
                        </div>
                    </div>

                    {/* Products will be Shown Here */}
                    <div className="space-y-2">

                        {products.map((item) => (

                            <div key={item._id}
                                className='w-full bg-white border border-gray-200 hover:border-gray-300 rounded-lg p-4 flex lg:flex-row flex-col gap-4 items-center mb-[10px] hover:shadow-sm transition duration-200 ease-in-out'>
                                <div className='lg:size-16 h-45 overflow-hidden bg-gray-100 rounded-md'>
                                    <img className=' h-full w-full'
                                        src={item.poster ? item.poster : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="}
                                        alt={item.title} />
                                </div>
                                <div className='w-8/10 h-full flex flex-col items-start'>
                                    <h3 className='text-sm text-[#111] mb-0.5'>{item.title}</h3>
                                    <p className='text-xs text-gray-500 mb-1'>{item.subtitle}</p>
                                    <p className='text-[#f97316] text-sm'>₹{item.price}</p>
                                </div>
                                <div className=' h-full flex items-center lg:justify-center justify-between w-full lg:w-auto gap-4 p-1'>
                                    <div onClick={() => {
                                        setEditingProduct(item);
                                        setProductEditOpen(true);
                                    }}
                                        className='flex gap-2 items-center justify-center text-xs text-gray-600 border border-gray-300 rounded-sm px-3 py-1.5 hover:text-[#f97316] hover:border-[#f97316] transition duration-100 ease-in-out cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                                        </svg>
                                        Edit
                                    </div>
                                    <div onClick={() => { deleteProduct(item) }}
                                        type="button"
                                        className='h-full rounded-md hover:bg-red-50 transition duration-150 ease-in-out text-red-500 p-1.5 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </div>
                                </div>

                            </div>

                        ))}

                    </div>
                </div>
            </div>

            {/* ProductEdit Modal */}
            <ProductEdit
                isOpen={isProductEditOpen}
                onClose={() => setProductEditOpen(false)}
                product={editingProduct}
                setProducts={setProducts}
            />

            {/* AddProduct Modal */}
            <AddProduct
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                setProducts={setProducts}
            />
        </div>
    )
}

export default AccessCRUD