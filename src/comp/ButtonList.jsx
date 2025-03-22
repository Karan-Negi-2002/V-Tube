import React from 'react';
import { useSelector } from 'react-redux';

const buttonList = [
  "All", "JavaScript", "Mern", "Anime", "React Courses", "Gojo", 
  "Grim", "Manga", "Fish", "Vlogs", "Films", "Comedy", 
  "Bounty", "Entertainment", "Trending", "Sports", "Dell", 
  "Infosys", "Cats"
];

const ButtonList = ({ onCategoryChange }) => {
  const { activeCategory } = useSelector((state) => state.videos);
  const open = useSelector((store) => store.app.open);

  return (
    <div className={`fixed top-[86px] shadow-xl   z-[98] ${open ? 'w-[100%] lg:w-[100%] lg:ml-6  ' : 'w-[100%] xl:w-[100%] lg:ml-3 xl:ml-2 '} h-12 bg-white dark:bg-[#0f0f0f]`}>
      <div className={`overflow-x-auto whitespace-nowrap custom-scroll ${open ? 'flex w-[100%] lg:w-[80%] xl:w-[84.7%]' : "w-[100%] lg:w-[90%]"}`}>
        {buttonList.map((value, i) => (
          <button
            onClick={() => onCategoryChange(value)}
            key={i}
            className={`${
              activeCategory === value 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black' 
              : 'bg-gray-200 dark:bg-[#3f3f3f] '
            } border outline-none min-w-fit py-2 px-4 mx-1 rounded-md font-medium border-none `}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
