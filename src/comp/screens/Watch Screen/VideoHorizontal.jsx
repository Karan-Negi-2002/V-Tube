import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import request from '../../../constants/api';

const VideoHorizontal = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video.id.videoId}`);
  };

  const dateStr = video.snippet.publishedAt;
  const formattedDate = moment(dateStr).fromNow();


  const [duration, setDuration] = useState(null);
  const [views, setViews] = useState(null);

  const seconds = duration ? moment.duration(duration).asSeconds() : 0;
  const _duration = duration ? moment.utc(seconds * 1000).format('mm:ss') : '00:00';
  useEffect(()=>{
    const getVideoDetails = async () => {
      try {
        const { data: { items } }= await request('/videos', {
          params: {
            part: 'contentDetails,statistics',
            id: video.id.videoId,
          },
        })
       

        

        if (items.length) {
          const { contentDetails, statistics } = items[0];
          setDuration(contentDetails.duration);
          setViews(statistics.viewCount);
        } else {
          console.error('No items found in video details response');
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    if (video.id.videoId) {
      getVideoDetails();
    } 
  },[video.id.videoId])
  return (
    <div
      className="py-2 m-1 flex items-center cursor-pointer border-b border-gray-300 dark:border-gray-600"
      onClick={handleClick}
    >
      <div className="w-1/2 md:w-[30%] lg:w-1/2 relative text-center">
        <LazyLoadImage
          src={video.snippet.thumbnails.medium.url}
          className="w-full h-auto rounded-lg"
        />
        {duration && (
          <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded">
            {_duration}
          </span>
        )}
      </div>
      <div className="w-1/2  ys:mb-6 sm:mb-20 md:w-[68%] ml-4 lg:w-1/2 mt-0 md:mb-16 lg:mb-4 xl:mb-5 2xl:mb-11 zs:mb-16 p-0">
        <p className="mb-1 text-base font-rb font-medium line-clamp-2 md:line-clamp-5 lg:line-clamp-2 lg:mt-4 xl:mt-0 dark:text-white">
          {video.snippet.title}
        </p>
        <div className="my-1 flex items-center">
          <p className="text-xs text-[#60607A] font-semibold dark:text-[#A0A0A0] line-clamp-1">
            {video.snippet.channelTitle}
          </p>
        </div>
        <div className="text-xs text-[#60607A] font-rob dark:text-gray-400">
          {formattedDate} • {views ? numeral(views).format('0a') : 'Loading views'}
        </div>
      </div>
    </div>
  );
};

export default VideoHorizontal;