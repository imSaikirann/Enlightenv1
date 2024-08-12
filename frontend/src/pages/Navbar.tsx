import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userStateSelector } from '../store/atoms/signupAtom';
import { Link } from 'react-router-dom';
import { getNotifications } from '../api/data';
import { notificatiosnCount, notificatiosnData } from '../store/atoms/dataAtoms'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isUser = useRecoilValue(userStateSelector);
    const setUserState = useSetRecoilState(userState);
    const [notificationsCount, setNotificationsCount] = useRecoilState(notificatiosnCount)
    const [mark, setMark] = useState(false)
    const setNotificatiosData = useSetRecoilState(notificatiosnData)

    useEffect(() => {
        const storedCount = localStorage.getItem('count');
        const parsedStoredCount = storedCount ? parseInt(storedCount, 10) : 0
        console.log(parsedStoredCount,notificationsCount)
        if (notificationsCount > parsedStoredCount) {
            localStorage.setItem('count', notificationsCount.toString());
            setMark(true)
           
        }
    }, [notificationsCount]);


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
   
        
            localStorage.removeItem('count')
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleNotifications = async () => {
        try {
            const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
            console.log(isUserLoggedIn)
            if (isUserLoggedIn === 'true') {
                const res = await getNotifications();
                setNotificationsCount(res.answers.length);
                setNotificatiosData(res.answers.reverse())
   
          
            }


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleNotifications();
    }, []);
    const handleResetMark = () => {
        setMark(false)
    }
    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-[65px] px-4 md:w-full md:h-[80px] md:px-6 bg-primary border-b-1 border-secondary flex flex-row justify-between items-center z-40">
                <div className="flex items-center">
               <Link to='/'>
               <div className='flex flex-row items-center justify-center' >
                  
                    <div>
                    <h2 className="font-medium font-logo text-textColor text-2xl md:text-3xl">Enlighten</h2>
                    </div>
                   </div></Link>
                </div>

                <div className='flex flex-row items-center justify-center space-x-6 md:hidden'>
                    <div className='flex flex-row items-center justify-center space-x-4'>

                        <Link to={isUser ? "/questions" : "/signup"} onClick={handleMenuClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 opacity-65 text-textColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </Link>

                        {isUser && (
                            <Link to="/notifications">
                                <div className="relative flex items-center space-x-1 text-primary opacity-95 cursor-pointer" onClick={handleResetMark} >
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5 md:w-6 md:h-6 opacity-65 text-textColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                            />
                                        </svg>


                                        {mark ? (
                                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                        ) : (
                                            <div>
                                            </div>
                                        )}
                                    </div>

                                </div>

                            </Link>
                        )}

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
                    <div className='flex flex-row space-x-6'>
                        {isUser && (
                            <Link to="/notifications">
                                <div className="relative flex items-center  text-primary opacity-95 cursor-pointer" onClick={handleResetMark} >
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5 text-slate-200 opacity-75"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                            />
                                        </svg>


                                        {mark ? (
                                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                        ) : (
                                            <div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h2 className="text-textColor px-2 opacity-75">Notifications</h2>
                                    </div>
                                </div>

                            </Link>

                        )}

                        <div className="flex items-center  text-primary opacity-95 cursor-pointer">


                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-200 opacity-75">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>



                            <Link to="/questions">
                                <h2 className="text-textColor px-2 opacity-75">QuestionsCube</h2>
                            </Link>
                        </div>
                    </div>
                    
                    {isUser ? (
                        <button onClick={handleLogout} className="bg-red-500 text-white font-buttons px-6 py-2 rounded-full">Logout</button>
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
                        <div className={`relative bg-zinc-950 opacity-90 h-full w-3/4 max-w-md transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="absolute top-4 right-4 cursor-pointer" onClick={toggleMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex flex-col h-full p-6 ">
                            {isUser ? (
    <div className="flex flex-col justify-between h-full font-sans">
        <div className="flex flex-col space-y-4 mt-14">
            <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-200 opacity-75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <Link to="/profile">
                    <button onClick={handleMenuClose} className="border-primary text-textColor px-6 py-2 rounded-md w-full text-left flex items-center space-x-2 hover:bg-slate-700">
                        <span>Your Answers</span>
                    </button>
                </Link>
            </div>

            <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-200 opacity-75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                <Link to="/questions">
                    <button className="border-primary text-textColor px-6 py-2 rounded-md w-full text-left hover:bg-slate-700"  onClick={handleMenuClose}>QuestionsCube</button>
                </Link>
            </div>
        </div>
        <div className="mt-6">
            <button onClick={handleLogout} className="bg-red-400 text-white px-4 py-2 rounded-full w-full">Logout</button>
        </div>
    </div>
) : (
    <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between flex-grow p-4 space-y-4">
        <div className="flex flex-col space-y-4 mt-14">

            <div className="flex items-center space-x-3">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-200 opacity-75">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                <Link to="/create">
                    <button onClick={handleMenuClose} className="border-primary text-textColor px-6 py-2 rounded-md w-full text-left flex items-center space-x-2 " >
                        <span>Write</span>
                    </button>
                </Link>
            </div>

            <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-200 opacity-75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                <Link to="/questions">
                    <button className="border-primary text-textColor px-6 py-2 rounded-md w-full text-left hover:bg-slate-700 "  onClick={handleMenuClose}>QuestionsCube</button>
                </Link>
            </div>

         
        </div>
        <div className="mt-auto flex flex-col space-y-3">
    <div>
        <Link to="/signin">
            <button className="bg-slate-900 text-textColor text-center px-6 py-2 rounded-md w-full hover:bg-slate-700"  onClick={handleMenuClose}>
                Sign in
            </button>
        </Link>
    </div>
    <div>
        <Link to="/signup">
            <button className="text-textColor px-6 py-2 rounded-md w-full text-center bg-slate-900 hover:bg-slate-700"  onClick={handleMenuClose}>
                Get Started
            </button>
        </Link>
    </div>
</div>

        </div>
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
