import React, { useEffect, useState } from "react";
import users from "../data/user.json";
import { useSidebarSize } from "../hooks/sidebarSize";

export default function Users() {

    const sidebarSize = useSidebarSize();

    const handleUser = (userId) => {
        console.log(userId);
        localStorage.setItem("userId", userId);
        document.body.classList.add(`${userId}`);
        window.location.href = `/profile/${userId}`;
    };

    
    return (
        <div
            className={`w-full flex flex-col gap-8 justify-center min-h-screen ${sidebarSize} p-4 bg-light-background dark:bg-dark-background text-light-bodyText dark:text-dark-sideBarText`}
        >
            <h1 className="flex items-center justify-center font-bold text-2xl text-center">Who Are You:</h1>
            <div className="flex flex-wrap gap-4 items-center justify-center">
                {users.users.map((user, index) => {
                    return (
                        <div key={user.id}>
                            <button
                                className="flex flex-col gap-2 items-center justify-center"
                                onClick={() => handleUser(user.id)}
                                value={user.id}
                            >
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <img
                                        src={user.profilePicture}
                                        alt="profile"
                                        className="rounded-full  max-sm:w-24 max-sm:h-24"
                                    />
                                    <h1 className="font-semibold text-lg">{user.fullName}</h1>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}