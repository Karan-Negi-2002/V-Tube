import React, { useState, useEffect } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import request from '../../../constants/api'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

const SearchData = ({ video }) => {
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { high },
        },
    } = video;

    const isVideo = id.kind !== 'youtube#channel';
    const videoId = id.videoId || id;
    const [views, setViews] = useState(null);
    const [duration, setDuration] = useState(null);
    const [channelIcon, setChannelIcon] = useState(null);

    useEffect(() => {
        if (isVideo) {
            const get_video_details = async () => {
                const {
                    data: { items },
                } = await request('/videos', {
                    params: {
                        part: 'contentDetails,statistics',
                        id: videoId,
                    },
                });
                setDuration(items[0].contentDetails.duration);
                setViews(items[0].statistics.viewCount);
            };

            get_video_details();
        }
    }, [videoId, isVideo]);

    useEffect(() => {
        const get_channel_icon = async () => {
            const {
                data: { items },
            } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                },
            });
            setChannelIcon(items[0].snippet.thumbnails.default);
        };

        get_channel_icon();
    }, [channelId]);

    const formatDuration = (duration) => {
        if (!duration || duration === "P0D") {
            return "Live";
        }
        const seconds = moment.duration(duration).asSeconds();
        return moment.utc(seconds * 1000).format(seconds >= 3600 ? 'HH:mm:ss' : 'mm:ss');
    };

    const navigate = useNavigate();

    const handleClick = () => {
        isVideo
            ? navigate(`/watch/${id.videoId}`)
            : navigate(`/channel/${channelId}`);
    };

    const handleChannelIconClick = (event) => {
        event.stopPropagation(); 
        navigate(`/channel/${channelId}`);
    };

    return (
        <div 
            onClick={handleClick} 
            className='flex flex-col md:flex-row p-4 mb-4  rounded-lg shadow-md overflow-x-auto bg-white dark:bg-[#0f0f0f] dark:text-white'
        >
            <div className='relative w-full md:w-[70%]'>
                {isVideo ? (
                    <>
                        <LazyLoadImage
                            src={high.url}
                            alt={title}
                            className='w-full h-[170px] lg:h-[180px] xl:h-[270px] object-cover rounded-lg'
                        />
                        <span className={`absolute bottom-2 right-2 text-xs md:text-sm px-1 bg-[#0f0f0f] bg-opacity-75 text-white rounded  ${formatDuration(duration) === "Live" ? "bg-red-700 w-8 text-center"  : ""}`}>
                            {formatDuration(duration)}
                        </span>
                    </>
                ) : (
                    <LazyLoadImage
                        src={high.url}
                        alt={title}
                        className='rounded-full m-auto h-[100px] w-[100px]'
                    />
                )}
            </div>
            <div className='flex flex-col mt-4 md:mt-0 md:ml-4 w-full'>
                <h3 className='text-sm md:text-base lg:text-lg font-semibold line-clamp-2'>
                    {title}
                </h3>

                {isVideo && (
                    <span className='text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1'>
                        {numeral(views).format('0.a')} views • {moment(publishedAt).fromNow()}
                    </span>
                )}

                {isVideo && channelIcon && (
                    <div className='flex items-center mt-2'>
                        <LazyLoadImage
                            src={channelIcon.url}
                            alt={channelTitle}
                            className='w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 cursor-pointer'
                            onClick={handleChannelIconClick}
                        />
                        <span className='text-xs md:text-sm font-medium'>{channelTitle}</span>
                    </div>
                )}

                <p className='text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2'>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SearchData;
