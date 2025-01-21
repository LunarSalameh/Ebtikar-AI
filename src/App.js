import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <BrowserRouter>
            <div className="flex">
                <div className='dark:bg-dark-sideBarBg shadow-xl bg-light-sideBarBg  text-dark-sideBarText p-4 fixed top-0'>
                    <Sidebar />
                </div>
                <Routes> 
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
        </BrowserRouter>
  );
}

export default App;
