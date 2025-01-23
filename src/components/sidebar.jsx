import React, { useState, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { LuTextSearch } from "react-icons/lu";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

export default function Sidebar() {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('Mode') === 'dark');
    const location = useLocation();
    const userId = localStorage.getItem('userId');
    const [userPicture, setUserPicture] = useState();

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
                <div className="flex flex-col gap-6 h-screen ">
                    <a href="/home">
                        <img src='/assets/logo.png' alt="Logo" className="w-48" />
                    </a>

                    <div className="mx-4 gap-4 flex flex-col">
                        <div className={`p-2 rounded-lg ${location.pathname === "/home" ? "bg-dark-accent" : "dark:hover:bg-dark-sidebarHover hover:bg-light-sideBarHover"}`}>
                            <a href="/home" className="flex gap-2">
                                <GoHomeFill size={22} /> <h1>Home</h1>
                            </a>
                        </div>

                        <div className={`p-2 rounded-lg ${location.pathname === `/profile/${userId}` ? "bg-dark-accent" : "dark:hover:bg-dark-sidebarHover hover:bg-light-sideBarHover"}`}>
                            <a href={`/profile/${userId}`} className="flex gap-2">
                                <img src={userPicture} className="rounded-full h-[22px] w-[22px]" alt="User Profile"/> <h1>Profile</h1>
                            </a>
                        </div>

                        <div className={`p-2 rounded-lg ${location.pathname === "/search" ? "bg-dark-accent" : "dark:hover:bg-dark-sidebarHover hover:bg-light-sideBarHover"}`}>
                            <a href="/search" className="flex gap-2">
                                <LuTextSearch size={22} /> <h1>Search</h1>
                            </a>
                        </div>

                        <div className={`p-2 rounded-lg ${location.pathname === "/" ? "bg-dark-accent" : "dark:hover:bg-dark-sidebarHover hover:bg-light-sideBarHover"}`}>
                            <a href="/" className="flex gap-2">
                                <FaUsers size={22} /> <h1>Change User</h1>
                            </a>
                        </div>

                        <div className="bottom-0 dark:hover:bg-dark-sidebarHover hover:bg-light-sideBarHover rounded-lg">
                            <button onClick={handleDarkMode} className="p-2">
                                {darkMode ? 
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineLightMode className="flex items-center"/> <p>Light Mode</p>
                                    </div>: 
                                    <div className="flex gap-2 items-center">
                                        <MdDarkMode className="flex items-center" /> <p>Dark Mode</p>
                                    </div>
                                }
                            </button>
                        </div>
                    </div>
                </div>
        </section>
    );
}