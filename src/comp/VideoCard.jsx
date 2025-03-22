import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import request from '../constants/api';
import numeral from 'numeral';

const VideoCard = ({ video }) => {
    const navigate = useNavigate();
    const [viewCount, setViewCount] = useState('Loading...');

    if (!video || !video.id) {
        return <div>Invalid video data</div>;
    }

    const videoId = video.id.videoId || video.id;

    const { snippet: { channelTitle, title, publishedAt, thumbnails, channelId } } = video;

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const { data } = await request('/videos', {
                    params: {
                        part: 'statistics',
                        id: videoId,
                    },
                });

                if (data.items.length > 0) {
                    setViewCount(data.items[0].statistics.viewCount);
                } else {
                    setViewCount('N/A');
                }
            } catch (error) {
                console.error('Error fetching video details:', error);
                setViewCount('N/A');
            }
        };

        fetchVideoDetails();
    }, [videoId]);

    const handleVideoClick = () => {
        navigate(`/watch/${videoId}`);
    };

    const handleChannelClick = (e) => {
        e.stopPropagation();
        navigate(`/channel/${channelId}`);
    };

    const cleanTitle = (title) => {
        const decodedTitle = new DOMParser().parseFromString(title, 'text/html').documentElement.textContent;
        return decodedTitle.replace(/#\S+/g, '').trim();
    };

    return (
        <div onClick={handleVideoClick} className='cursor-pointer ys:w-[90%] ys:mx-auto sm:w-full'>
            <LazyLoadImage
                src={thumbnails.high.url}
                alt={cleanTitle(title)}
                className=' w-full  xl:w-[95%]  h-40 object-cover xl:ml-4  rounded-lg'
            />
            <div className='my-4 xl:mx-4 '>
                <h3 className='text-sm font-semibold line-clamp-2'>{cleanTitle(title)}</h3>
                <p 
                    onClick={handleChannelClick} 
                    className='text-xs text-gray-600 dark:text-gray-400 cursor-pointer hover:underline'>
                    {channelTitle}
                </p>
                <div className="text-[#60607A] font-rob text-xs dark:text-gray-400 uppercase">
                    <span>{numeral(viewCount).format("0.a")} <span className='lowercase text-sm'>views</span> • </span>
                    <span className='lowercase'>{moment(publishedAt).fromNow()}</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
