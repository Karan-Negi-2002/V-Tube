import axios from 'axios';

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});
export default request;
