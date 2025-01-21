import React, { useState, useEffect } from "react";
import videos from "../data/videos.json";
import { IoIosHeart } from "react-icons/io";

export default function VideoResult({ category, search, filterType }) {
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(() => {
        const filtered = videos.filter((video) => {
            const matchesCategory = category ? video.category === category : true;
            const matchesSearch = search ? video.title.toLowerCase().includes(search.toLowerCase()) : true;
            const matchesFilterType = filterType === "liked" ? video.liked : filterType === "bookmarked" ? video.bookmarked : true;
            return matchesCategory && matchesSearch && matchesFilterType;
        });
        setFilteredVideos(filtered);
    }, [category, search, filterType]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVideos.map((video, index) => (
                    <div key={index} className="relative p-4 bg-light-cardBg dark:bg-dark-cardBg rounded-lg">
                        <div className="relative flex justify-center w-72 h-72 rounded-lg overflow-hidden">
                            <video
                                className="object-cover w-full h-full transition-all duration-300 ease-in-out"
                                controls={false}
                                muted={true}
                                src={video.videoUrl}
                                onMouseEnter={e => {
                                    e.target.currentTime = 0;
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