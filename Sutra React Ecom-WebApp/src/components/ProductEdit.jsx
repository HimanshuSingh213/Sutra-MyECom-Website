import React, { useEffect, useState } from 'react'

// Admin Key
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;


function ProductEdit({ isOpen, onClose, product, setProducts }) {
    if (!isOpen) return null;

    // Product details
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [price, setPrice] = useState("");
    const [poster, setPoster] = useState("");

    // Loading product Details 
    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setSubtitle(product.subtitle);
            setPrice(product.price);
            setPoster(product.poster);

        }
    }, [product]);

    if (!product) return null;

    const saveProduct = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            title,
            subtitle,
            price,
            poster
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "admin-key": ADMIN_KEY
                    },
                    body: JSON.stringify(updatedProduct)
                }
            );

            if (!res.ok) {
                alert("Update failed");
                return;
            }

            const finalData = await res.json();

            setProducts((oldProducts) =>
                oldProducts.map((p) =>
                    p._id === finalData._id ? finalData : p
                )
            );

            onClose();

        }
        catch (err) {
            console.error(err);
            alert("Something went wrong while updating the Data!");
        }
    }


    return (
        <div className='fixed inset-0 flex items-center justify-center z-60'>
            <div
                className='absolute inset-0 bg-black/50 backdrop-blur-xs'
            ></div>
            <div className='relative bg-white rounded-xl w-4/10 overflow-hidden min-h-1/3'>
                <div className='border-b border-b-gray-300 px-4 py-3 flex justify-between items-center'>
                    <p>Edit Product</p>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:bg-gray-100 p-1 rounded-md transition duration-50 ease-in-out cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div className='p-4 space-y-4 h-full w-full'>
                    <form onSubmit={saveProduct}>
                        <div className='mb-4 flex flex-col items-start'>
                            <label className='text-xs h-4 mb-1.5'
                                htmlFor="imgURL">Image Path</label>
                            <input value={poster}
                                onChange={(e) => setPoster(e.target.value)}
                                className='px-3 py-2 border border-gray-300 rounded-lg size-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-2 focus:outline-[#f97316]'
                                type="text" id='imgURL' placeholder='e.g., /src/assets/poster' required />
                            <div className='p-2'>
                                <img className='w-20 rounded-md'
                                    src={poster ? poster : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="} alt={poster} />
                            </div>
                        </div>
                        <div className='mb-4 flex flex-col items-start'>
                            <label className='text-xs h-4 mb-1.5'
                                htmlFor="title">Title</label>
                            <input value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='px-3 py-2 border border-gray-300 rounded-lg size-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-2 focus:outline-[#f97316]'
                                type="text" id='title' placeholder='e.g., PeaceFul Mind' required />
                        </div>
                        <div className='mb-4 flex flex-col items-start'>
                            <label className='text-xs h-4 mb-1.5'
                                htmlFor="subtitle">Sub-title</label>
                            <input value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className='px-3 py-2 border border-gray-300 rounded-lg size-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-2 focus:outline-[#f97316]'
                                type="text" id='subtitle' placeholder='e.g., शान्तिः शान्तिः शान्तिः' required />
                        </div>
                        <div className='mb-4 flex flex-col items-start'>
                            <label className='text-xs h-4 mb-1.5'
                                htmlFor="price">Price (₹)</label>
                            <input value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='px-3 py-2 border border-gray-300 rounded-lg size-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-2 focus:outline-[#f97316]'
                                type="text" id='price' placeholder='e.g., ₹159' required />
                        </div>

                        <div className='pt-2 flex gap-3 items-center'>
                            <button className='w-1/2 bg-[#f97316] text-white text-sm flex items-center justify-center rounded-xl py-3 px-4 hover:bg-[#ea580c] transition duration-100 ease-in-out'
                                type="submit">Submit</button>
                            <button onClick={onClose}
                                className='w-1/2 text-gray-600 border border-gray-300 text-sm flex items-center justify-center rounded-xl py-3 px-4 hover:bg-gray-50 transition duration-100 ease-in-out'
                                type="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductEdit