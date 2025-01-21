import React, { useRef, useState, useEffect } from "react";
import { IoIosHeart, IoIosHeartEmpty, IoIosShareAlt } from "react-icons/io";
import { FaRegBookmark, FaBookmark, FaVolumeMute, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";

export default function VideoCard({ video, onVideoEnd }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null); // Ref for the video container
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const [liked, setLiked] = useState(false)
  const [bookmark, setBookmark] = useState(false)
//   const [share, setShare] = useState(false)

    const handleLike = () => {
        setLiked(!liked);
    }

    const handleBookmark = () => {
        setBookmark(!bookmark);
    }

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const videoElement = entry.target;
              videoElement.src = videoElement.dataset.src;
              videoElement.autoplay = true;
              videoElement.play();
              observer.unobserve(videoElement); // Stop observing once loaded
            }
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.1, // Trigger when 10% of the video is visible
        }
      );
  
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        observer.observe(currentVideoRef);
      }
  
      return () => {
        if (currentVideoRef) {
          observer.unobserve(currentVideoRef);
        }
      };
    }, []);

    const togglePlayPause = () => {
        if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        } else {
        videoRef.current.pause();
        setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const handleTimeUpdate = () => {
        const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
    };

    const handleProgressChange = (e) => {
        const seekTime = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = seekTime;
    };

    const handleVideoClick = () => {
        setShowControls(true);
        togglePlayPause();

        setTimeout(() => {
        setShowControls(false);
        }, 1000);
    };

    const handleMouseLeave = () => {
        setShowControls(false);
    };

    const handleVideoEnd = () => {
        if (onVideoEnd) {
        onVideoEnd();
        }
    };

  return (
    <div className="flex gap-4 h-[100vh] justify-center items-center relative" ref={containerRef}>
      {/* Video Player */}
      <div className="text-center w-[80vh] h-[100vh]">
        <div
          className="rounded-xl h-full w-full overflow-hidden relative"
          onClick={handleVideoClick}
          onMouseLeave={handleMouseLeave}
          tabIndex="0"
          role="button"
          aria-label="Video player"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleVideoClick();
            }
          }}
        >
          <video
            ref={videoRef}
            data-src={video.videoUrl}
            muted={isMuted}
            loop={false}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            aria-label={`Video: ${video.title}`}
            className="h-full w-full object-cover"
          />
          {showControls && (
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none text-white text-2xl cursor-pointer rounded-full w-12 h-12 flex items-center justify-center"
              onClick={togglePlayPause}
              tabIndex="0"
              aria-label={isPlaying ? "Pause video" : "Play video"} 
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  togglePlayPause();
                }
              }}
            >
              {isPlaying ? <FaPauseCircle size={52} style={{ opacity: 0.9 }} /> : <FaPlayCircle size={52} style={{ opacity: 0.9 }} />}
            </button>
          )}
          {/* Custom Video Controls */}
          <div className="absolute flex items-center justify-center mx-2.5 bottom-0 -left-3 w-full">
            <input
              type="range"
              id="range1"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              tabIndex="0"
               aria-label="Video progress"
              className="w-full cursor-pointer text-dark-accent"
            />
          </div>
          <button
            className="absolute z-50 top-0 left-0 pt-3 pl-3 bg-transparent border-none text-white text-xl cursor-pointer"
            onClick={toggleMute}
          >
            {isMuted ? <FaVolumeMute size={22} /> : <AiFillSound size={22} />}
          </button>
        </div>

        {/* Video Title and Description */}
        <div className="text-start w-[80vh] text-light-sideBarText">
          <div className="absolute bottom-1.5 py-2 px-4 w-[80vh] bg-opacity-50 backdrop-blur-sm rounded-lg">
            <h1 className="text-lg z-50 font-semibold">{video.title}</h1>
            <h3 className="text-sm z-50 pl-1 pb-2">{video.description}</h3>
          </div>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex flex-col gap-2 h-full pb-4 justify-end">
        {/* Like */}
        <div className="flex flex-col items-center">
          <button className="p-2 bg-blue-500 text-white rounded-lg" 
                onClick={handleLike}
                tabIndex="0"
                aria-label={liked ? "Unlike video" : "Like video"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleLike();
                  }
                }}
                >
            <div className="bg-light-interaction rounded-full p-2">
              {liked ? <IoIosHeart size={30} color="black" /> : <IoIosHeartEmpty size={30} color="black" />}
            </div>
          </button>
          <p className="text-sm">{video.liked}</p>
        </div>

        {/* Save */}
        <div className="flex flex-col items-center">
          <button className="p-2 bg-blue-500 text-white rounded-lg" 
                onClick={handleBookmark}
                tabIndex="0"
                aria-label={bookmark ? "Remove from saved" : "Save video"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleBookmark();
                  }
                }}
                >
            <div className="bg-light-interaction rounded-full p-2">
              { bookmark ? <FaBookmark size={30} color="black" /> : <FaRegBookmark size={30} color="black" />}
            </div>
          </button>
          <p className="text-sm">{video.bookmarked}</p>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">

          <button className="p-2 bg-blue-500 text-white rounded-lg" aria-label="Share video" tabIndex="0" >
            <div className="bg-light-interaction rounded-full p-2">
              <IoIosShareAlt size={30} color="black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}