import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Sidebar from "./components/sidebar";
import Users from './pages/users';

function App() {

  return (
    <BrowserRouter>
            <div className="flex">
                <div className='dark:bg-dark-sideBarBg shadow-xl bg-light-sideBarBg  text-dark-sideBarText p-4 fixed top-0'>
                    <Sidebar />
                </div>
                <Routes> 
                    <Route path='/' element={<Users />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
  );
}

export default App;
