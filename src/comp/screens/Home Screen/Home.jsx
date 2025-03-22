import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'react-loading-skeleton/dist/skeleton.css';
import Videos from './Videos';
import ButtonList from '../../ButtonList';
import { getPopularVideos, getVideosByCategory } from '../../../Redux/Actions/videoActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setActiveCategory } from '../../../Redux/Slices/videoSlice';
import LoadBar from '../../../Loaders/LoadBar';
import SkeletonBody from '../../../Loaders/SkeletonBody';
const Home = () => {
  const dispatch = useDispatch();
  const open = useSelector((store) => store.app.open);
  const [showLoadBar, setShowLoadBar] = useState(false);

  const { videos, activeCategory, nextPageToken, loading } = useSelector((state) => state.videos);

  useEffect(() => {
    setShowLoadBar(true);

    if (videos.length === 0) {
      if (activeCategory === 'All') {
        dispatch(getPopularVideos({ nextPageToken: null }));
      } else {
        dispatch(getVideosByCategory({ keyword: activeCategory, nextPageToken: null }));
      }
    }
  }, [dispatch, activeCategory]);

  useEffect(() => {
    if (!loading) {
      setShowLoadBar(false);
    }
  }, [loading]);

  const fetchData = () => {
    if (!nextPageToken) return;

    if (activeCategory === 'All') {
      dispatch(getPopularVideos({ nextPageToken }));
    } else {
      dispatch(getVideosByCategory({ keyword: activeCategory, nextPageToken }));
    }
  };

  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setShowLoadBar(true);
      dispatch(setActiveCategory(category));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`absolute ${open ? 'left-[0%] lg:left-[16%] xl:left-[13%]' : 'left-[0%] lg:left-[8%]'} dark:bg-black`}>
      <ButtonList onCategoryChange={handleCategoryChange} />
      {showLoadBar && <LoadBar />}
      <div className="overflow-hidden dark:text-white dark:bg-[#0f0f0f]">
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={!!nextPageToken}
          scrollThreshold={0.6}
          Animation={
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2'>
              {[...Array(20)].map((_, index) => (
                <div key={index} className="p-2">
                  <SkeletonBody />
                </div>
              ))}
            </div>
          }
          endMessage={
            <p className={`${open ? 'w-[100vw] lg:w-[84vw] xl:w-[87vw] 2xl:w-[86vw]  h-[85vh]' : 'h-[85vh] w-[100vw] lg:w-[92vw] xl:w-[92vw] 2xl:w-[91vw] '} text-center py-4 dark:bg-black dark:text-white`}>
              No more videos to load
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          <div className='mt-36 overflow-x-hidden'>
            <div className={`${open ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 zs:grid-cols-4 lg:ml-4 gap-2' : 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 zs:grid-cols-5 gap-3'} dark:bg-[#0f0f0f]`}>
              {loading && videos.length === 0
                ? [...Array(20)].map((_, index) => (
                  <div key={index} className="p-2">
                    <SkeletonBody />
                  </div>
                ))
                : videos.map((video) => (
                    <div key={video.id.videoId || video.id} className='p-2'>
                      <Videos video={video} />
                    </div>
                  ))
              }
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
