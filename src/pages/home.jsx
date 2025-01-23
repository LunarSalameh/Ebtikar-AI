import React from "react"
import VideoCard from "../components/videoCard"
import videos from "../data/videos.json"

export default function Home() {

    const handleVideoEnd = (index) => {
        const nextVideo = document.getElementById(`video-${index + 1}`);
        if (nextVideo) {
          nextVideo.scrollIntoView({ behavior: "smooth" });
        }
      };
  

  
    return (
        <div className="w-full pl-64 p-4 bg-light-background dark:bg-dark-background text-light-bodyText dark:text-dark-sideBarText">

            <div className="flex flex-col gap-4">
            {videos.videos.map((video, index) => (
                <div id={`video-${index}`} key={index}>
                    <VideoCard video={video}  onVideoEnd={() => handleVideoEnd(index)} />
                </div>
            ))}
            </div>

        </div>
    )
}