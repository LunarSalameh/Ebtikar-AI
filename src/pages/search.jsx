import React, {useState} from "react"
import VideoResult from "../components/videoResult"
import { FaSearch } from "react-icons/fa";
import videos from "../data/videos.json"
import { TiDelete } from "react-icons/ti";
import { useSidebarSize } from "../hooks/sidebarSize";
import { IoFilterSharp } from "react-icons/io5";

export default function Search() {
    const sidebarSize = useSidebarSize();
    
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selecterCategory, setSelecterCategory] = useState("");
    const distinctCategories = [...new Set(videos.videos.map(video => video.category))];


    return (
        <div className={`w-full min-h-screen ${sidebarSize} p-4 bg-light-background dark:bg-dark-background text-light-bodyText dark:text-dark-sideBarText`}>
            {/* search  input*/}
            <div className="flex justify-center flex-wrap gap-4 mt-4">
                <div className="w-[80%] flex items-center  text-dark-bodyText  ">
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
                <div className="hidden max-sm:flex justify-center items-center pr-4" onClick={()=>setShow(!show)}> 
                <IoFilterSharp size={22} color="white" />
            </div>
            </div>
        
           

            {/* Filter buttons */}
            <div className="flex justify-center gap-1 flex-wrap mt-2">
                
                {distinctCategories.map((category,index)=> (
                    <>
                        <button key={index}  
                                className="bg-[#D9D9D9] max-sm:hidden hover:bg-[#D9D9D9]/90 max-sm:text-sm  border-2 border-dark-accent text-light-accent py-1 px-3 rounded-full m-2"
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
                        
                    </>
                ))}
                {
                    show && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-dark-sideBarText bg-opacity-40 ">
                            <div className="bg-dark-sideBarBg p-6 rounded-xl shadow-md shadow-[#C5C5C5]">
                                <button onClick={() => setShow(false)} className="w-[40vh]  absolute font-bold  text-light-sideBarText hover:text-gray-900">
                                    &times;
                                </button>
                                <div className="flex flex-wrap gap-2 flex-col">
                                    <p className="text-start font-bold text-lg underline">Choose category:</p>
                                    {distinctCategories.map((category,index)=> (
                                        <button key={index}  
                                            className="text-start hover:bg-[#D9D9D9]/90  py-1 px-3 rounded-full m-2"
                                            value={category}
                                            onClick={(e) => {setSelecterCategory(e.target.value); setSearchValue(""); setShow(!show)} }  
                                            tabIndex="0"
                                            aria-label="Filter by category"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    setSelecterCategory(e.target.value); 
                                                    setSearchValue("");
                                                }
                                            }}
                                            >
                                            - {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }
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
            <div className="mt-4">
              
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