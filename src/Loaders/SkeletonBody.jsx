import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonBody = () => {
  return (
    <SkeletonTheme dark:baseColor="#C5C5C5" highlightColor="#C5C5C5">
      <div className='flex flex-col'>
        <Skeleton height={180} />
        
        <div className="flex flex-row space-x-4 mt-2">
          <Skeleton height={36} width={36} className='rounded-full ' />
          <Skeleton height={30} width={252} className='w-[80%]' />
        </div>
        
        <Skeleton height={20} width="70%" className="mt-1" />
      </div>
    </SkeletonTheme>
  );
}

export default SkeletonBody;
