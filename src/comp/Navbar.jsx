import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggle, setSearchSuggestion } from "../Redux/Slices/appslice";
import { FaMicrophone, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { recognition } from "../constants/VoiceReco";
import { debounce } from "lodash";
import { IoMdClose } from "react-icons/io";

import axios from "axios";

function Navbar({ showHamburger = true }) {
  const dispatch = useDispatch();
  const userAvatar = useSelector((state) => state?.user?.avatar);
  const list = useSelector((state) => state.app.searchSuggestion);
  const [input, setInput] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const [isVoice, setIsVoice] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAvatar(
      userAvatar ||
        "https://lh3.googleusercontent.com/a/ACg8ocJx_FlkS-U2NOlAUKuyOlRScE3IlyHotRPtF_ytKmUKJ69Wwjc=s360-c-no"
    );
  }, [userAvatar]);

 
  useEffect(() => {

    const fetchSuggestions = async () => {
      if (input !== "") {
        
  
        try {
          const response = await axios(
            `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${input}`
          );
  
      
          dispatch(setSearchSuggestion(response?.data[1]));
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }
    };
  
    const timer=setTimeout(()=>{
      fetchSuggestions();
    },500)
   
    return (()=>{
      clearTimeout(timer)
    })
  }, [input]);
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleSidebar = () => {
    dispatch(toggle());
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search/${input}`);
    }
  };

  const debouncedVoiceSearch = debounce((transcript) => {
    navigate(`/search/${transcript}`);
    recognition.stop();
    setIsVoice(false);
  }, 300);

  const handleVoice = () => {
    setIsVoice(true);
    setInput("");
    setVoiceText("");
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceText(transcript);
      debouncedVoiceSearch(transcript);
      setInput(transcript);
    };
  };

  const closeVoiceBox = () => {
    setIsVoice(false);
    recognition.stop();
  };

  const handledelete = () => {
    setInput("");
  };


  const handleNav=(item)=>{
    navigate(`/search/${item}`);
    setInput(`/search/${item}`); 
    
  }
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
    } else if (e.key === "ArrowDown" && selectedItem < list.length - 1) {
      setSelectedItem((prev) => prev + 1);
    } else if (e.key === "Enter" && selectedItem >= 0) {
      handleNav(list[selectedItem]); 
    }
  };

  return (
    <>
      <div className="fixed top-0 w-full z-[99] h-[86px] bg-white dark:bg-[#0f0f0f]  flex justify-between items-center px-0 md:px-4">
        <div className="flex items-center space-x-1 md:space-x-4">
          {showHamburger && (
            <RxHamburgerMenu
              onClick={toggleSidebar}
              size={"32px"}
              className="cursor-pointer size-[45%] ys:w-[35%] md:size-6 text-gray-800 dark:text-white"
            />
          )}
          <Link to="/">
            <div className="flex items-center relative">
              <img
                className="w-12 h-9 ys:w-10 md:w-10 md:h-10"
                src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_0a6be931be68dea8372307b2fcd6b053/eway-crm.png"
                alt="VTube logo"
              />
              <span className="hidden md:block text-[28px] bg-gradient-to-r from-blue-500 to-red-900 text-transparent bg-clip-text font-rob after:content-['IN'] after:absolute after:top-0 after:h-0 after:text-[11px] after:tracking-normal after:right-[-9%] after:text-zinc-400 ">
                VTube
              </span>
            </div>
          </Link>
        </div>

        <div className="flex group items-center w-[80%] md:w-[45%] ml-2 md:ml-0">
          <form onSubmit={handleSubmit} className="flex w-full">
            <div className="flex items-center flex-grow border border-zinc-500 p-1 group-focus-within:border-blue-500 md:group-focus-within xl:p-2 rounded-l-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full outline-none ml-2 px-2 font-rob md:group-focus-within bg-transparent text-gray-800 dark:text-white"
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Search..."
              />

              {input && (
                <span
                  className="cursor-pointer flex-shrink-0"
                  onClick={handledelete}
                >
                  <IoMdClose
                    size={"18px"}
                    className="text-gray-800 dark:text-white"
                  />
                </span>
              )}
            </div>
            <button
              type="submit"
              className="border border-l-0 border-zinc-500 p-[4.9px] xl:p-[8.9px] bg-neutral-400 rounded-r-full"
            >
              <IoIosSearch
                size={"23px"}
                className="text-gray-800 dark:text-white"
              />
            </button>

          </form>
         

          <div className="hidden md:block bg-[#685e5e6b] ml-4 rounded-full py-2 px-2 hover:bg-zinc-500 transition-all ease-in cursor-pointer">
            <MdKeyboardVoice
              size={"23px"}
              onClick={handleVoice}
              className="text-gray-800 dark:text-white"
            />
          </div>

          
          {input && (
  <div className="absolute top-[66px]  p-2 rounded-md z-[200] w-[55%] ys:w-[65%] sm:w-[75%] md:w-[35%] lg:w-[38%] xl:w-[40%] zs:w-[42%] bg-white text-black dark:text-white dark:bg-[#212121]">
    <ul>
      {list.map((item, index) => (
        <div
          key={index}
          className={`${
            selectedItem === index ? "bg-gray-200 dark:bg-gray-500" : "bg-white text-black dark:text-white dark:bg-[#212121] "
          } cursor-pointer`}
          onClick={() => handleNav(item)} // Navigate on click
        >
          <li className="line-clamp-2">{item}</li>
          
        </div>
      ))}
    </ul>
  </div>
)}

        </div>

        <div className="flex items-center space-x-3 mr-4 pl-2 xl:ml-0 md:space-x-6 lg:space-x-8">
          <div onClick={toggleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <FaToggleOn
                size={"25px"}
                className="text-gray-800 dark:text-white"
              />
            ) : (
              <FaToggleOff
                size={"25px"}
                className="text-gray-800 dark:text-white"
              />
            )}
          </div>
          <IoMdNotificationsOutline
            className="hidden md:block text-gray-800 dark:text-white"
            size={"25px"}
          />
          <img
            src={userAvatar}
            alt="User Avatar"
            onError={(e) =>
              (e.target.src =
                "https://lh3.googleusercontent.com/a/ACg8ocJx_FlkS-U2NOlAUKuyOlRScE3IlyHotRPtF_ytKmUKJ69Wwjc=s360-c-no")
            }
            className="rounded-full size-[30px]"
          />
        </div>
      </div>

      {isVoice && (
        <div className="fixed inset-0 z-[990] flex items-center justify-center bg-black bg-opacity-55">
          <div className="w-full max-w-md p-4">
            <div className="bg-white dark:bg-[#0f0f0f] rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h5 className="text-lg font-medium text-gray-800 dark:text-white">
                  {voiceText === "" ? "Listening..." : voiceText}
                </h5>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 dark:bg-transparent dark:hover:text-gray-300"
                  onClick={closeVoiceBox}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center py-5">
                <div
                  onClick={handleVoice}
                  className="relative flex items-center justify-center w-20 h-20 bg-red-600 rounded-full shadow-sm"
                >
                  <FaMicrophone className="size-[24px] text-white" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full animate-ping"></div>
                </div>
                <p className="py-2 font-rob text-2xl font-bold text-blue-600">
                  Speak
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
