import React, { useState } from 'react';
import moment from 'moment';
import he from 'he'; 

const SingleComment = ({ comment }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
    textDisplay,
  } = comment;

 
  const decodedText = he.decode(textDisplay);


  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 152; 

  const truncatedText = decodedText.length > maxLength
    ? `${decodedText.slice(0, maxLength)}...`
    : decodedText;

  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className='py-2 gap-4 border-b outline-none border-b-[#717997]  flex'>
      <img src={authorProfileImageUrl}   onError={(e) => (e.target.src = "https://s.gravatar.com/avatar/75d185dcef5ae38d8a74c047e98c73b5?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fab.png")}
      className='w-9 h-9 rounded-full' alt="" />
     
      <div>
        <p className='text-sm font-medium'>
          {authorDisplayName} • <span className='font-normal text-[13px]'>{moment(publishedAt).fromNow()}</span>
        </p>
        <p
          className='mt-1 text-[15px] leading-[20px] font-rob text-black dark:text-white whitespace-pre-line'
          dangerouslySetInnerHTML={{ __html: isExpanded ? decodedText : truncatedText }}
        />
        {decodedText.length > maxLength && (
          <button
            className='text-blue-500 dark:text-blue-500 dark:bg-transparent mt-2'
            onClick={toggleExpand}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
