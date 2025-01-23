import React, { useState, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { LuTextSearch } from "react-icons/lu";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";

export default function Sidebar() {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('Mode') === 'dark');
    const location = useLocation();
    const userId = localStorage.getItem('userId');
    const [userPicture, setUserPicture] = useState();

    const [open,setOpen] = useState(localStorage.getItem('open') === 'large');

    const menu = [
        {title: "Home", src:<GoHomeFill size={22}/> , path:"/home"},
        {title: "profile", src:<img src={userPicture} className="rounded-full h-[22px] w-[22px]" alt="User Profile"/>, path:`/profile/${userId}` },
        {title: "Search", src:<LuTextSearch size={22} />  , path:"/search" },
        {title: "Change User", src:<FaUsers size={22} />, path:"/"},
    ]

    useEffect(() => {
        if (open){
            localStorage.setItem('open', 'large');
        }
        else{
            localStorage.setItem('open', 'small');
        }

    }, [open])

    useEffect(() => {
        fetch(`http://localhost:3002/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('user', JSON.stringify(data));
                setUserPicture(data.profilePicture);
    }, [userId])});

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('Mode', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('Mode', 'light');
        }
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        console.log(darkMode);
    }

    return (
        <section>
                <div className={`flex flex-col gap-6 h-screen ${open ? "w-52" : "w-16" }`}>
                    <div  onClick={() => setOpen(!open)} className="flex justify-center items-center p-2">
                        { open ?
                            <img src='/assets/logo.png' alt="Logo" className="w-48" />
                            :
                            <HiViewList size={22}/>
                        }
                        
                    </div>

                    <div className="mx-4 gap-4 flex flex-col">
                    
                    {
                        menu.map((item, index) => (
                            <div key={index} className={` ${ !open && 'py-2' } rounded-lg ${location.pathname === item.path ? "bg-dark-accent" : "dark:hover:bg-dark-sidebarHover hover:bg-light-sideBarHover"}`}>
                                <a href={item.path} className={`flex p-2  ${ !open && 'justify-center p-0'} gap-2`}>
                                    <div className="flex justify-center items-center">{item.src} </div>
                                    <h1 className={`${ !open  && "hidden"}`}>{item.title}</h1>
                                </a>
                            </div>
                        ))

                    }

                        <div className="bottom-0 dark:hover:bg-dark-sidebarHover hover:bg-light-sideBarHover rounded-lg">
                            <button onClick={handleDarkMode} className="p-2">
                                
                                {darkMode  ? 
                                    <div className="flex gap-2 items-center">
                                        <div> 
                                            <MdOutlineLightMode className="flex items-center font-bold"/> 
                                        </div>
                                        <p className={`${!open && 'hidden'}`}>Light Mode</p>
                                    </div>: 
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <MdDarkMode className="flex items-center font-bold" />
                                        </div> 
                                        <p className={`${!open && 'hidden'}`}>Dark Mode</p>
                                    </div>
                                }
                            </button>
                        </div>
                    </div>
                </div>
        </section>
    );
}