import React, {useState} from "react"
import VideoResult from "../components/videoResult"
import { FaSearch } from "react-icons/fa";
import videos from "../data/videos.json"
import { TiDelete } from "react-icons/ti";

export default function Search() {

    const [searchValue, setSearchValue] = useState("");
    const [selecterCategory, setSelecterCategory] = useState("");
    const distinctCategories = [...new Set(videos.videos.map(video => video.category))];


    return (
        <div className="w-full min-h-screen pl-64 p-4 bg-light-background dark:bg-dark-background text-light-bodyText dark:text-dark-sideBarText">
            {/* search  input*/}
            <div className="flex justify-center flex-wrap">
                <div className="w-[80%] flex items-center pt-6 text-dark-bodyText  ">
                    <FaSearch className=" ml-4 text-dark-sideBarBg absolute text-start" />
                    <input 
                        type="search"
                        placeholder="Search ... "
                        className=" w-full p-2 rounded-full pl-12 pr-4 border-2 border-solid border-dark-accent"
                        value={searchValue}
                        tabIndex="0"
                         aria-label="search input"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                </div>
            </div>
            {/* Filter buttons */}
            <div className="flex justify-center flex-wrap gap-2 mt-2">
                {distinctCategories.map((category,index)=> (
                    <button key={index}  
                            className="bg-[#D9D9D9] hover:bg-[#D9D9D9]/90  border-2 border-dark-accent text-light-accent py-1 px-4 rounded-full m-2"
                            value={category}
                            onClick={(e) => {setSelecterCategory(e.target.value); setSearchValue("");} }  
                            tabIndex="0"
                            aria-label="Filter by category"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    setSelecterCategory(e.target.value); 
                                    setSearchValue("");
                                }
                              }}
                            >
                                {category}
                    </button>
                ))}
                {selecterCategory &&(
                    <div className="flex justify-end items-center ml-4">
                        <TiDelete size={22} 
                                onClick={()=>setSelecterCategory("")}
                                tabIndex="0"
                                aria-label="clear filter"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        setSelecterCategory("")
                                    }
                                }}
                                />
                    </div>
                )}
            </div>
            

            {/* show video card based on filter/search */}
            <div>
              
                {selecterCategory ? (
                    <h1>Category: {selecterCategory}</h1>
                ) : searchValue ? (
                    <h1>Search: {searchValue}</h1>
                ) : (
                    <h1>All Videos</h1>
                )}

               <VideoResult category={selecterCategory} search={searchValue} />
            </div>
        </div>
    )
}