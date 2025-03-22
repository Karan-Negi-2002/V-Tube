import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosBySearch } from '../../../Redux/Actions/videoActions';
import SearchData from './SearchData';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroll-component'; 
import { clearSearchResults } from '../../../Redux/Slices/videoSlice'; 

const Search = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  const { results: videos, loading,nextPageToken } = useSelector((state) => state.videos.search);
  const open = useSelector((store) => store.app.open);


  useEffect(() => {
  
    dispatch(clearSearchResults());
    dispatch(getVideosBySearch({ nextPageToken: null, keyword: query }));
  }, [query, dispatch]);

  const fetchMoreVideos = () => {
    if (nextPageToken) {
      dispatch(getVideosBySearch({ nextPageToken, keyword: query }));
    }
  };

  return (
    <div className=" dark:bg-[#0f0f0f] w-full">
      <div
        className={`top-[90px] w-[100%] lg:w-[80%] absolute ${
          open ? 'left-[0%] lg:left-[19%] xl:left-[15%]' : 'left-[0%] lg:left-[12%]'
        } bg-white dark:bg-[#0f0f0f] dark:top-[86px] lg:top-[90px]`}
      >
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos}
          hasMore={!!nextPageToken}
        >
          {loading && videos.length === 0 ? (
            <div className="flex flex-col space-y-4">
              { [...Array(20)].map((_,index) => (
                <div key={index} className="flex flex-col md:flex-row items-center p-4 border-b border-gray-300 dark:border-gray-600">
                  <SkeletonTheme dark:baseColor="#C5C5C5" highlightColor="#C5C5C5" className='flex flex-col'>
                    <Skeleton  className=" w-[300px] ys:w-[390px] h-[180px] md:w-[320px] xl:h-[250px] xl:w-[450px] " />
                    <div className="hidden mr-5  mb-12 2xl:mb-24 md:ml-8 md:mt-8 md:flex flex-col md:w-full">
                      <Skeleton height={20} width="80%" className=" mt-4 md:mb-2" />
                      <Skeleton height={15} width={220} />
                      <div className="flex flex-row gap-3 mt-4 ">
                        <Skeleton height="30px" width="30px" className="rounded-full" />
                        <Skeleton height={15} width={252} className="mt-3" />
                      </div>
                      <div className='flex-row'>
                        <Skeleton height={20} width="80%" className="mt-8" />
                      </div>
                    </div>
                  </SkeletonTheme>
                </div>
              ))}
            </div>
          ) : (
            videos.map((video, index) => (
              <SearchData video={video} key={index} searchScreen />
            ))
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Search;
