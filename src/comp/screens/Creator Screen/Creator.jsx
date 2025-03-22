import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../../constants/api'; 
import VideoCard from '../../VideoCard'; 
import numeral from 'numeral'; 
import WatchNav from '../../WatchNav';

const Creator = () => {
    const { channelId } = useParams(); 
    const [channelVideos, setChannelVideos] = useState([]);
    const [channelInfo, setChannelInfo] = useState(null);
    const [bannerUrl, setBannerUrl] = useState('');
    const [retry, setRetry] = useState(0); 

    useEffect(() => {
        const fetchChannelVideos = async () => {
            try {
               
                const {
                    data: { items },
                } = await request('/search', {
                    params: {
                        part: 'snippet',
                        channelId: channelId,
                        maxResults: 50,
                        order: 'date', 
                    },
                });
                setChannelVideos(items);
            } catch (error) {
                console.error('Failed to fetch channel videos:', error);
            }
        };

        const fetchChannelInfo = async () => {
            try {
                
                const {
                    data: { items },
                } = await request('/channels', {
                    params: {
                        part: 'snippet,statistics,brandingSettings',
                        id: channelId,
                    },
                });

                if (items.length > 0) {
                    const channelData = items[0];
                    setChannelInfo(channelData);

                    const banner = channelData.brandingSettings?.image;
                   
                    const bannerUrl = banner?.bannerTvImageUrl ||
                                      banner?.bannerTabletHdImageUrl ||
                                      banner?.bannerTabletImageUrl ||
                                      banner?.bannerMobileHdImageUrl ||
                                      banner?.bannerExternalUrl || '';

                    if (!bannerUrl && retry < 3) {
                     
                        setRetry(retry + 1);
                    } else {
                        setBannerUrl(bannerUrl);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch channel info:', error);
            }
        };

        fetchChannelVideos();
        fetchChannelInfo();
    }, [channelId, retry]); 

    return (
      <>
        <WatchNav/>
        <div className=' w-full  mx-auto bg-white dark:bg-black '>
            {bannerUrl ? (
                <div className='my-4 flex justify-center items-center'>
                    <img
                        src={bannerUrl}
                        alt="Channel Banner"
                        className='w-full xl:w-[95%] mt-20 h-48 object-cover rounded-none lg:rounded-xl'
                    />
                </div>
            ) : (
                <div className='mb-6 flex justify-center items-center'>
                    <img
                        src='https://yt3.googleusercontent.com/nnNqCv3ugtPVooXnUA3yLpQzmlhIhgURN9mrxhpgjaO8FvdzMw85VJbrI3ME10_b_FTBJqXoWA=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj' 
                        alt="Default Channel Banner"
                        className='w-full xl:w-[95%] mt-20 h-48 object-cover rounded-none lg:rounded-xl'
                    />
                </div>
            )}
            {channelInfo && (
                <div className='flex flex-col items-center mb-6'>
                    <img
                        src={channelInfo.snippet.thumbnails.high.url}
                        alt={channelInfo.snippet.title}
                        className='w-24 h-24 rounded-full'
                    />
                    <h1 className='text-2xl font-bold mt-4'>{channelInfo.snippet.title}</h1>
                    <p className='text-sm text-gray-600'>
                        {numeral(channelInfo.statistics.subscriberCount).format('0.a')} subscribers
                    </p>
                </div>
            )}
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 zs:grid-cols-5 gap-3 '>
                {channelVideos.map((video) => (
                    <VideoCard key={video.id.videoId} video={video} />
                ))}
            </div>
        </div>
      </>
    );
};

export default Creator;
