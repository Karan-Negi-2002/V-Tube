import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import SingleComment from './SingleComment'; 
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsOfVideoById } from '../../../Redux/Actions/commentaction';

const Comments = ({ videoId, totalComments }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { photoURL } = useSelector(state => state.auth?.user);

 
  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
    const savedComments = JSON.parse(localStorage.getItem(`comments-${videoId}`)) || [];
    setLocalComments(savedComments);
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.comments.comments);
  const [localComments, setLocalComments] = useState([]);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;

    
    const newComment = {
      authorDisplayName: 'You',
      authorProfileImageUrl: photoURL,
      publishedAt: new Date().toISOString(),
      textDisplay: text,
    };

    const updatedComments = [newComment, ...localComments];
    setLocalComments(updatedComments);

    localStorage.setItem(`comments-${videoId}`, JSON.stringify(updatedComments));

    setText('');
  };

  return (
    <div>
      <p>{totalComments || 0} comments</p>

      <div className="flex w-full my-3 gap-3 items-center">
        <Avatar
          src={photoURL}
          size="35"
          round={true}
        />

        <form onSubmit={handleComment} className="flex w-[90%]">
          <input
            type="text"
            className="flex-grow-1 bg-transparent border-b outline-none border-b-[#353946] w-full"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 border-0 bg-neutral-500 text-white hover:scale-110 rounded-sm tracking-wide"
          >
            Comment
          </button>
        </form>
      </div>

      <div>
        {localComments.concat(_comments || []).map((comment, i) => (
          <SingleComment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
