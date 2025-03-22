import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById, getRelatedVideos } from "../../../Redux/Actions/videoActions";
import { clearRelatedVideos } from "../../../Redux/Slices/relatedVideosSlice";
import Comments from "./Comments";
import VideoHorizontal from "./VideoHorizontal";
import VideoMetaData from "./VideoMetaData";
import WatchNav from "../../WatchNav";
import Skeleton from "react-loading-skeleton";

const Watch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    video,
    loading: videoLoading,
    error: videoError,
  } = useSelector((state) => state.videos.selectedVideo);

  
  const {
    videos: relatedVideos,
    loading: relatedLoading,
   
  } = useSelector((state) => state.relatedVideos);


  useEffect(() => {
    dispatch(getVideoById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (video) {
      dispatch(clearRelatedVideos()); 
      if (video.snippet?.title) {
        dispatch(getRelatedVideos(video.snippet.title));
      }
    }
  }, [dispatch, video]);

  return (
    <>
      <WatchNav />
      <div className="bg-white dark:bg-black">
        <div className="flex flex-col lg:flex-row relative top-20 ml-0 lg:ml-24 z-10 h-auto gap-3 dark:bg-black dark:text-white">
          <div className="relative flex flex-col w-[100%] lg:w-[63%]">
            <div className="relative pt-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
                title={video?.snippet?.title || "Video Player"}
                allowFullScreen
                className="absolute top-2 left-0 w-full h-full lg:rounded-lg"
              />
            </div>
            <div className="relative top-4 lg:top-[20px]">
              {!videoLoading ? (
                <>
                  {videoError ? (
                    <h6>Error loading video: {videoError}</h6>
                  ) : (
                    <>
                      <VideoMetaData video={video} videoId={id} />
                      <Comments
                        videoId={id}
                        totalComments={video?.statistics?.commentCount}
                      />
                    </>
                  )}
                </>
              ) : (
                <h6>Loading video...</h6>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:w-[32%]">
            {!relatedLoading
              ? relatedVideos.map((relatedVideo, index) => (
                  <VideoHorizontal
                    key={relatedVideo.id.videoId || index}
                    video={relatedVideo}
                  />
                ))
              : [...Array(10)].map((_,index) => (
                  <div key={index} className="p-2 flex ">
                    <Skeleton height={130} width={200} />

                    <div className="flex flex-col  space-x-4 ml-2">
                    
                      <Skeleton width={252} className="" />
                      <Skeleton height={20} width="100%"  className="mt-3 md:w-[60%]" />
                      <Skeleton height={20} width="30%" className="mt-2" />

                    </div>


                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
