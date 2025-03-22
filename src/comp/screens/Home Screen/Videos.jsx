import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import moment from "moment";
import numeral from "numeral";
import request from "../../../constants/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Videos = memo(({ video }) => {
  if (!video || !video.snippet) {
    return null;
  }

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { high },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const formatDuration = (duration) => {
    if (!duration)  {
      return "Live";
    }
    const seconds = moment.duration(duration).asSeconds();
    return moment
      .utc(seconds * 1000)
      .format(seconds >= 3600 ? "HH:mm:ss" : "mm:ss");
  };

  const open = useSelector((store) => store.app.open);
  const _videoId = id?.videoId || id;

  const navigate = useNavigate();

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const {
          data: { items },
        } = await request("/videos", {
          params: {
            part: "contentDetails,statistics",
            id: _videoId,
          },
        });
      
        if (items.length) {
          const { contentDetails, statistics } = items[0];
          setDuration(contentDetails.duration);
          setViews(statistics.viewCount);
        } else {
          console.error("No items found in video details response");
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (_videoId) {
      getVideoDetails();
    }
  }, [_videoId]);

  useEffect(() => {
    const getChannelIcon = async () => {
      try {
        const {
          data: { items },
        } = await request("/channels", {
          params: {
            part: "snippet",
            id: channelId,
          },
        });


        if (items.length) {
          setChannelIcon(items[0].snippet.thumbnails.high);
        } else {
          console.error("No items found in channel icon response");
        }
      } catch (error) {
        console.error("Error fetching channel icon:", error);
      }
    };

    if (channelId) {
      getChannelIcon();
    }
  }, [channelId]);

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  const handleChannelClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelId}`);
  };

  return (
    <div
      onClick={handleVideoClick}
      className={`p-2 sm:pl-1 md:p-2 2xl:p-3 rounded-lg shadow-xl cursor-pointer dark:bg-[#0f0f0f] dark:text-white `}
    >
      <div
        className={`relative ${
          open
            ? "w-full h-44 xs:h-[170px] ys:h-[230px] sm:min-w-fit sm:h-44 md:min-w-fit md:h-48 lg:min-w-fit lg:h-52 xl:min-w-fit 2xl:min-w-fit"
            : "w-full h-44 xs:h-[170px] ys:h-[230px] sm:min-w-fit sm:h-40 md:min-w-fit md:h-48 lg:min-w-fit lg:h-40 xl:min-w-fit 2xl:min-w-fit"
        }`}
      >
        <LazyLoadImage
          className="absolute w-full h-full object-cover rounded-md"
          src={high?.url || defaultThumbnail}
          alt={title}
        />
        <span
          className={`absolute bg-[rgb(15,15,15)] text-white text-sm ${
            open ? "bottom-2 right-2" : "bottom-2 right-2"
          } z-[90]   ${formatDuration(duration) === "Live" ? "bg-red-700 w-8 text-center"  : ""}`}
        >
          {formatDuration(duration)}
        </span>
      </div>
      <div className="flex flex-row space-x-4 mt-2">
        <div className="flex-none" onClick={handleChannelClick}>
          {channelIcon ? (
            <LazyLoadImage
              className="rounded-full h-9 w-9"
              src={channelIcon.url}
              
              alt="Channel Icon"
            />
          ) : (
            <Avatar
              name={channelTitle}
              size="36"
              round={true}
              textSizeRatio={2}
            />
          )}
        </div>
        <div className="flex-auto flex flex-col">
          <p className="font-semibold text-sm line-clamp-2">{title}</p>
          <div className="text-sm text-[#60607A] font-semibold mt-1 dark:text-gray-400">
            <span>{channelTitle}</span>
          </div>
          <div className="text-[#60607A] font-rob text-sm dark:text-gray-400 uppercase">
            <span>
              {numeral(views).format("0.a")}{" "}
              <span className="lowercase text-sm">views</span> •{" "}
            </span>
            <span className="lowercase">{moment(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Videos;
