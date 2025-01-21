import React,{useState} from "react"
import users from "../data/user.json"
import { IoIosHeart  } from "react-icons/io";
import { FaBookmark} from "react-icons/fa";
import VideoResult from "../components/videoResult";
import videos from "../data/videos.json";


export default function UserProfile () {

    const [liked, setLiked] = useState(false)
    const [bookmark, setBookmark] = useState(false)
    const [filterType, setFilterType] = useState("liked");
    
    const likedCount = videos.filter(video => video.liked).length;
    const bookmarkedCount = videos.filter(video => video.bookmarked).length;


    return (
        <div className="w-full min-h-screen pl-64 p-4 bg-light-background dark:bg-dark-background text-light-bodyText dark:text-dark-sideBarText">
            {/* user details */}
            <div className="flex gap-6 flex-wrap px-8 py-2">
                {/* profile picture */}
                <div>
                    <img src={users[0].profilePicture} alt="profile" className="w-48 h-48 rounded-full"/>
                </div>

                {/* details */}
                {/* name */}
                <div className="flex flex-col gap-5 items-start justify-center">
                    <h1 className="font-semibold text-2xl">{users[0].fullName}</h1>
                    
                    {/* liked and watched # */}
                    <div className="flex gap-4">
                        <p className="text-md ">{likedCount} &nbsp;Likes</p>|
                        <p className="text-md">{bookmarkedCount}  &nbsp;Saved</p>
                    </div>
                </div>

                </div>


                {/* second section */}
                <div className="mt-12">

                    {/* liked and watched buttons  */}
                    <div className="flex gap-6">
                        <button className={`flex gap-2 items-center p-2 ${liked && 'focus:border-b-2'} ` }
                                onClick={()=>{setLiked(true); setBookmark(false); setFilterType("liked")}} 
                                id="liked">
                            < IoIosHeart size={22}/> Liked Videos
                        </button>

                        <button className={`flex gap-2 items-center p-2 ${bookmark && 'focus:border-b-2'} ` }
                                onClick={()=> {setLiked(false); setBookmark(true); setFilterType("bookmarked")}}  
                                id="saved">
                        < FaBookmark size={22}/> Saved Videos
                        </button>

                    </div>

                    <hr className="w-full border-1 border-solid border-dark-interaction"/>

                    {/* videos */}
                    <div>
                        <VideoResult filterType={filterType} />
                    </div>
                </div>
        </div>
    )

}