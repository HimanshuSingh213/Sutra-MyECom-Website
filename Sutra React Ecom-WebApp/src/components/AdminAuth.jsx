import React from 'react'

function AdminSection({ isOpen, onClose, adminKey, setAdminKey, onLogin }) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            {/* Backdrop */}
            <div 
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
                onClick={() => {onClose(), setAdminKey("")}}
                
            ></div>
            
            {/* Modal Content */}
            <div className='relative rounded-xl bg-white p-8 shadow-2xl w-full max-w-md mx-4 z-10'>
                <button 
                    onClick={() => {onClose(), setAdminKey("")}}
                    
                    className="absolute top-4 right-4 text-gray-400 hover:bg-gray-100 p-1 rounded-md transition duration-50 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className='flex flex-col items-center mb-6 w-full'>
                    <div className="p-4 rounded-full bg-orange-50 mb-4">
                        <svg className="w-8 h-8 text-[#f97316]"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900'>Admin Access</h3>
                    <p className='text-sm text-gray-500 mt-1'>Enter Admin key to continue</p>
                </div>
                
                <div className="space-y-4">
                    <input 
                        className='px-4 py-3 border border-gray-200 rounded-xl w-full focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all'
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        type="password" 
                        placeholder='Enter Admin Key' 
                        onKeyDown={(e) => e.key === 'Enter' && onLogin()}
                    />
                    
                    <button 
                        onClick={onLogin}
                        className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl font-medium transition-colors duration-200"
                    >
                        Unlock Access
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSection