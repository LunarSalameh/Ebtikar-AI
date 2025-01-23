import React,{useState, useEffect} from "react"
import users from "../data/user.json"
import { IoIosHeart  } from "react-icons/io";
import { FaBookmark} from "react-icons/fa";
import VideoResult from "../components/videoResult";
// import videos from "../data/videos.json";
import { useParams } from "react-router-dom";
import { useSidebarSize } from "../hooks/sidebarSize";

export default function UserProfile () {
    const sidebarSize = useSidebarSize();

    const { id } = useParams();

    const [liked, setLiked] = useState(false);
    const [bookmark, setBookmark] = useState(false);
  
    const [user, setUser] = useState({});
    
    const [filterType, setFilterType] = useState("liked");
  
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch(`http://localhost:3002/users/${id}`);
        const data = await response.json();
        setUser(data);
      };
  
      fetchUser();
    }, [id]);
  
    const likedCount = user.likedVideosIDs ? user.likedVideosIDs.length : 0;
    const bookmarkedCount = user.savedVideosIDs ? user.savedVideosIDs.length : 0;


    return (
        <div className={`w-full min-h-screen ${sidebarSize} p-4 bg-light-background dark:bg-dark-background text-light-bodyText dark:text-dark-sideBarText`}>
            {/* user details */}
            <div className="flex gap-6 flex-wrap px-8 py-2 max-sm:justify-center">
                {/* profile picture */}
                <div>
                    <img src={user.profilePicture} alt="profile" className="w-48 h-48 max-sm:w-32 max-sm:h-32 rounded-full"/>
                </div>

                {/* details */}
                {/* name */}
                <div className="flex flex-col gap-5 items-start justify-center">
                    <h1 className="font-semibold text-2xl">{user.fullName}</h1>
                    
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
                    <div className="flex gap-6  max-sm:gap-10 max-sm:justify-center">
                        <button className={`flex gap-2 items-center p-2 ${liked && 'focus:border-b-2'} ` }
                                onClick={()=>{setLiked(true); setBookmark(false); setFilterType("liked")}} 
                                id="liked">
                            <div>
                                < IoIosHeart size={22}/>
                            </div> 
                            <p className="max-sm:hidden">Liked Videos</p>
                        </button>

                        <button className={`flex gap-2 items-center p-2 ${bookmark && 'focus:border-b-2'} ` }
                                onClick={()=> {setLiked(false); setBookmark(true); setFilterType("bookmarked")}}  
                                id="saved">
                            <div>
                                < FaBookmark size={22}/>
                            </div>
                            <p className="max-sm:hidden"> Saved Videos </p>
                        </button>

                    </div>

                    <hr className="w-full border-1 border-solid border-dark-interaction"/>

                    {/* videos */}
                    <div>
            {console.log(user.savedVideosIDs)}
                        {liked ? 
                            <VideoResult id={user.likedVideosIDs}/> 
                            : bookmark ? <VideoResult id={user.savedVideosIDs} /> 
                            : '' }

                        {/* <VideoResult filterType={filterType} /> */}
                    </div>
                </div>
        </div>
    )

}