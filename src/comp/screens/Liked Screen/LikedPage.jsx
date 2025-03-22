import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoCard from '../../VideoCard'; 
import WatchNav from '../../WatchNav';


const LikedPage = () => {
  const reduxLikedVideos = useSelector((state) => state.likedVideos.likedVideos);
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
    setLikedVideos(storedLikedVideos);
  }, []);

  useEffect(() => {
    if (reduxLikedVideos.length > 0) {
      const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];

      const mergedLikedVideos = [
        ...storedLikedVideos,
        ...reduxLikedVideos.filter(
          (video) => !storedLikedVideos.some((storedVideo) => storedVideo.id.videoId === video.id.videoId)
        ),
      ];

      setLikedVideos(mergedLikedVideos);
      localStorage.setItem('likedVideos', JSON.stringify(mergedLikedVideos));
    }
  }, [reduxLikedVideos]);

  if (!likedVideos || likedVideos.length === 0) {
    return <div>No liked videos found.</div>;
  }

  return (
    
 <>
    <WatchNav/>
    <div className='liked-videos-container grid grid-cols-1 ml-0 mt-24 rounded-none md:ml-10 lg:ml-[55px] xl:ml-20  p-4 sm:grid-cols-2 md:w-[90%] lg:grid-cols-3  lg:h-fit xl:grid-cols-4 zs:grid-cols-5  gap-4 xl:mt-24 dark:bg-black '>
     {likedVideos.map((video, index) => {
  
    return <VideoCard key={index} video={video} />;
})}

    </div>
 </>
  );
};

export default LikedPage;
