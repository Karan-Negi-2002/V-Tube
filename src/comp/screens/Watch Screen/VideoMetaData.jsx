import React, { useState, useEffect } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import Avatar from 'react-avatar';
import ShowMoreText from 'react-show-more-text';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelDetails } from '../../../Redux/Actions/channelDetailaction';
import { addLikedVideo, removeLikedVideo } from '../../../Redux/Slices/likedVideosSlice';
import {  useNavigate } from 'react-router-dom';

const VideoMetaData = ({ video }) => {
  const { snippet, statistics } = video;
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics;

  const { snippet: channelSnippet, statistics: channelStatistics } = useSelector(
    (state) => state.channel.channel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);


 

 

  const [likeClicked, setLikeClicked] = useState(() => {
    const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
    return storedLikedVideos.some((likedVideo) => likedVideo.id === video.id);
  });

  const [dislikeClicked, setDislikeClicked] = useState(false);

  const handleLikeClick = () => {
    setLikeClicked(!likeClicked);
     const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];

    if (!likeClicked) {
      dispatch(addLikedVideo(video));
      localStorage.setItem('likedVideos', JSON.stringify([...storedLikedVideos, video]));
    } else {
      dispatch(removeLikedVideo(video));
      const updatedLikedVideos = storedLikedVideos.filter(v => v.id !== video.id);
      localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
    }

    if (dislikeClicked) setDislikeClicked(false);
  };

  const handleDislikeClick = () => {
    setDislikeClicked(!dislikeClicked);
    const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];

    if (likeClicked) {
      dispatch(removeLikedVideo(video));
      const updatedLikedVideos = storedLikedVideos.filter(v => v.id !== video.id);
      localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
    }

    setLikeClicked(false);
  };

  const navigate=useNavigate()
  const handleChannelClick = (e) => {
    e.stopPropagation(); 
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className='bg-white dark:bg-black text-black dark:text-white'>
      <div className='text-xl font-bold font-robb'>{title}</div>
      <div className='flex justify-between items-center py-2'>
        
        <span className='font-rob text-sm md:text-base'>
          {numeral(viewCount).format('0.a')} Views • {moment(publishedAt).fromNow()}
        </span>
        <div className='flex gap-2 border border-slate-200 dark:border-slate-600 px-2 py-1 rounded-l-full rounded-r-full bg-slate-200 dark:bg-slate-800 cursor-pointer'>
          <span className='mr-2 flex gap-1' onClick={handleLikeClick}>
            <MdThumbUp
              size={20}
              className={`md:size-[24px] ${likeClicked ? 'text-blue-700' : 'text-black dark:text-white'} hover:scale-110`}
            />
            <span className='border-r border-r-slate-400 dark:border-r-slate-700 px-2 font-rob uppercase'>
              {numeral(likeCount).format('0.a')}
            </span>
          </span>
          <span className='mr-3 flex gap-1' onClick={handleDislikeClick}>
            <MdThumbDown
              size={20}
              className={`md:size-[24px] ${dislikeClicked ? 'text-red-600' : 'text-black dark:text-white'} hover:scale-110`}
            />
          </span>
        </div>
      </div>
      <div className='border-t border-slate-400 dark:border-slate-600'>
        <div className='flex flex-row justify-between mt-3'>
          <div className='flex flex-row gap-2' onClick={handleChannelClick}>
            <Avatar
              src={channelSnippet?.thumbnails?.default?.url}
              className='cursor-pointer'
              size={40}
              round={true}
            />
            <div className='flex flex-col mr-2'>
              <span className='text-[16px] font-rob font-bold cursor-pointer'>{channelTitle}</span>
              <span className='text-[13px] leading-[18px] font-robm uppercase'>
                {numeral(channelStatistics?.subscriberCount).format('0.a')}{' '}
                <span className='lowercase'>subscribers</span>
              </span>
            </div>
          </div>
          <div>
           
          </div>
        </div>
        <div className='border-t border-slate-400 dark:border-slate-600 mt-2'>
          <div className='my-4'>
            <ShowMoreText
              lines={3}
              more='Show more'
              less='Show less'
              anchorClass='block font-bold text-blue-600 dark:text-blue-400'
              expanded={false}
            >
              <div className='whitespace-pre-line'>{description}</div>
            </ShowMoreText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMetaData;
