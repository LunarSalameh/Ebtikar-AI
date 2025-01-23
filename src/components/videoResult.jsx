import React, { useState, useEffect } from "react";
// import videos from "../data/videos.json";
import { IoIosHeart } from "react-icons/io";

export default function VideoResult({ category, search, id }) {
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        const fetchVideos = async () => {
          try {
              const response = await fetch(`http://localhost:3001/videos`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setVideos(data);
              console.log("Fetched videos:", data.videos);
          } catch (error) {
              console.error('Error fetching videos:', error);
          }
        };
        
        fetchVideos();
    }, []);

    useEffect(() => {
        const filtered = videos.filter((video) => {
            const matchesCategory = category ? video.category === category : true;
            const matchesSearch = search ? video.title.toLowerCase().includes(search.toLowerCase()) : true;
            const matchesId = id 
            ? (Array.isArray(id) ? id.includes(video.id) : id === video.id) 
            : true;
            return matchesCategory && matchesSearch &&  matchesId;
        });
        setFilteredVideos(filtered);
    }, [category, search , id,videos]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVideos.map((video, index) => (
                    <div key={index} className="relative p-4 rounded-lg">
                        <div className="relative flex items-center justify-center w-72 h-72 max-sm:w-[14rem] max-sm:h-32 rounded-lg overflow-hidden">
                            <video
                                className="object-cover w-full h-full transition-all duration-300 ease-in-out"
                                controls={false}
                                muted={true}
                                src={video.videoUrl}
                                type="video/mp4"
                                
                                onMouseEnter={e => {
                                    e.target.play();
                                }}
                                onMouseLeave={e => {
                                    e.target.pause();
                                    e.target.currentTime = 0;
                                }}
                            >
                            </video>
                            <div className="absolute bottom-2 left-2 z-10 p-2 rounded-full bg-white flex gap-1 items-center justify-center">
                                <IoIosHeart size={22} className="text-light-interaction" />
                                <span className="text-sm font-semibold text-light-interaction">{video.liked}</span>
                            </div>
                        </div>
                        <h1 className="text-lg font-semibold mt-2">{video.title}</h1>
                        <p className="pl-2 text-sm">{video.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}