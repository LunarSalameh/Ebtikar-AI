import React  from "react"

import users from "../data/user.json"

export default function Users() {

    const handleUser = (userId) => {
        console.log(userId)
        localStorage.setItem('userId', userId);
        document.body.classList.add(`${userId}`);
        window.location.href = `/profile/${userId}`;
    }

    return (
        <div className="w-full flex flex-col gap-8 justify-center min-h-screen pl-64 p-4 bg-light-background dark:bg-dark-background text-light-bodyText dark:text-dark-sideBarText">
            <h1 className="flex items-center justify-center font-bold text-2xl">Who Are you: </h1>
            <div className="flex flex-wrap gap-4 items-center justify-center">
            {
                users.users.map((user,index) => {
                    return (
                        <div  className="">
                                <button 
                                    className="flex flex-col gap-2 items-center justify-center"
                                    onClick={() => handleUser(user.id)}
                                    key={user.id}
                                    value={user.id}
                                    >
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <img src={user.profilePicture} alt="profile" className="rounded-full"/>
                                        <h1 className="font-semibold text-lg">{user.fullName}</h1>
                                    </div>
                                </button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}