import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userStateSelector } from '../store/atoms/signupAtom';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isUser = useRecoilValue(userStateSelector);
    const setUserState = useSetRecoilState(userState);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
        setUserState(isLoggedIn);
    }, [setUserState]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await localStorage.removeItem('token');
            localStorage.removeItem('isUserLoggedIn');
            setUserState(false);
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-[65px] px-4 md:w-full md:h-[80px] md:px-6 bg-primary border-b-1 border-secondary flex flex-row justify-between items-center z-40">
                <div className="flex items-center">
                    <Link to='/'><h2 className="font-medium font-logo text-textColor text-2xl md:text-3xl">Enlighten</h2></Link>
                </div>

                <div className='flex flex-row items-center justify-center space-x-6 md:hidden'>
                    <div className='flex flex-row items-center justify-center space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-200 opacity-75">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <Link to={isUser ? "/create" : "/signup"} onClick={handleMenuClose}>
                            <h2 className="text-sm font-create opacity-75 font-normal text-textColor text-center">Write</h2>
                        </Link>
                    </div>
                    <div className="cursor-pointer md:hidden flex items-center" onClick={toggleMenu}>


                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (

                            <div className='flex flex-row items-center justify-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F6F6F7" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <div>

                        <div className="flex items-center space-x-1 text-primary opacity-95 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-slate-200 opacity-75">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                            </svg>

                            <Link to="/questions">
                                <h2 className="text-textColor px-2 opacity-75">Questions</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 text-primary opacity-95 cursor-pointer">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-200 opacity-75">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <div>
                            <Link to='/create'><h3 className="text-textColor opacity-75 px-2  ">Write</h3></Link>
                        </div>
                    </div>
                    {isUser ? (
                        <button onClick={handleLogout} className="bg-red-400 text-white px-4 py-2 rounded-full">Logout</button>
                    ) : (
                        <>
                            <Link to="/signin">
                                <h2 className="text-textColor px-4 py-2 opacity-75">Sign in</h2>
                            </Link>
                            <Link to="/signup">
                                <h2 className="text-white px-4 py-2">Get Started</h2>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-slate-600 bg-opacity-90 flex items-center justify-end z-50">
                        <div className={`relative bg-zinc-950 h-full w-3/4 max-w-md transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="absolute top-4 right-4 cursor-pointer" onClick={toggleMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex flex-col  space-y-4 p-6">
                                {isUser ? (

                                    <div className="flex flex-col pt-20 items-center justify-center space-y-4">

                                        <Link to="/profile">
                                            <button onClick={handleMenuClose} className=" border-primary text-textColor px-6 py-2 rounded-md w-[200px] hover:text-lg ">Profile</button>
                                        </Link>
                                      

                                            <Link to="/questions">
                                                <button  className=" border-primary text-textColor px-6 py-2 rounded-md w-[200px] hover:text-lg">Questions</button>
                                            </Link>
                                 
                                        <button onClick={handleLogout} className="bg-red-400 text-white px-4 py-2  rounded-full w-full">Logout</button>

                                    </div>

                                ) : (
                                    <div className="flex flex-col pt-20 items-start justify-start space-y-4">

                                        <Link to="/questions">
                                            <button className=" border-primary text-textColor px-6 py-2 rounded-md w-[200px] hover:text-lg">Questions</button>
                                        </Link>
                                        <Link to="/signin">
                                            <button className=" border-primary text-textColor px-6 py-2 rounded-md w-[200px] hover:text-lg">Sign in</button>
                                        </Link>
                                        <Link to="/signup">
                                            <button className="bg-primary text-textColor px-6 py-2 rounded-md w-[200px] hover:text-lg">Get Started</button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
