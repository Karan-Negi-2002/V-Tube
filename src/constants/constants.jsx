
import { IoMdHome } from "react-icons/io";
import { MdSubscriptions } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { FaPodcast } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { HiShoppingBag, HiNewspaper } from "react-icons/hi2";
import { MdMusicNote } from "react-icons/md";
import { PiFilmReelFill } from "react-icons/pi";
import { SiYoutubegaming } from "react-icons/si";
import { FaTrophy } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";


export const sidebarItem = [
    {
      icon: <IoMdHome className="size-[23px] leading-[24px] " />,
      title: "Home",
      action: "changeCategory"
    },
    {
      icon: <MdSubscriptions className="size-[23px] leading-[24px] " />,
      title: "Subscriptions",
      action: "changeCategory"
    },
    {
      icon: <BiSolidLike className="size-[23px] leading-[24px] " />,
      title: "Liked Videos",
      

      
    },
    {
      icon: <IoMdTrendingUp className="size-[23px] leading-[24px] " />,
      title: "Trending",
      action: "changeCategory"
    },
    {
      icon: <HiShoppingBag className="size-[23px] leading-[24px] " />,
      title: "Shopping",action: "changeCategory"
    },
    {
      icon: <MdMusicNote className="size-[23px] leading-[24px] " />,
      title: "Music",
      action: "changeCategory"
    },
    {
      icon: <PiFilmReelFill className="size-[23px] leading-[24px] " />,
      title: "Films",
      action: "changeCategory"
    },

    {
      icon: <SiYoutubegaming className="size-[23px] leading-[24px] " />,
      title: "Gaming",
      action: "changeCategory"
    },
    {
      icon: <HiNewspaper className="size-[23px] leading-[24px] " />,
      title: "News",
      action: "changeCategory"
    },
    {
      icon: <FaTrophy className="size-[23px] leading-[24px] " />,
      title: "Sports",
      action: "changeCategory"
    },

    {
      icon: <FaRegLightbulb  className="size-[23px] leading-[24px] " />,
      title: "Courses",
      action: "changeCategory"
    },

    {
      icon: < MdOutlineTravelExplore className="size-[23px] leading-[24px] " />,
      title: "Travel",
      action: "changeCategory"
    },
    {
      icon: <GiClothes  className="size-[23px] leading-[24px] " />,
      title: "Fashion",
      action: "changeCategory"
    },

    {
      icon: <FaPodcast className="size-[23px] leading-[24px] " />,
      title: "Podcast",
      action: "changeCategory"
    },
    {
      icon: <FiLogOut className="size-[23px] pl-1 leading-[24px] " />,
      title: "Log Out",
      action: "logout",
    },
  
   
  ];
  
  export const toggleitem = [
    {
      icon: <IoMdHome size={'23px'} />,
      title: "Home",
      action: "changeCategory"
    },
    {
      icon: <HiNewspaper className="size-[23px] leading-[24px] " />,
      title: "News",
      action: "changeCategory"
    },
    {
      icon: <PiFilmReelFill className="size-[23px] leading-[24px] " />,
      title: "Films",
      action: "changeCategory"
    },
    {
      icon: <FaTrophy className="size-[23px] leading-[24px] " />,
      title: "Sports",action: "changeCategory"
    },
  ];
  