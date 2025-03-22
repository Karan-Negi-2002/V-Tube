import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import BarLoader from "react-spinners/BarLoader";

const Animation = () => {
 
  useGSAP(() => {
    var t1 = gsap.timeline();

    t1.from('.elem img', {
      x: 150,
      duration: 0.8,
      opacity: 0,
      stagger: 0.2,
      rotate: 720
    });

    t1.from('.elem span', {
      x: -150,
      duration: 0.8,
      opacity: 0,
      stagger: 0.2
    });

    t1.to('.elem img', {
      x: -150,
      rotate: 720,
      opacity: 0,
      stagger: 0.2,
      display: 'none'
    });

    t1.to('.elem span', {
      x: 150,
      opacity: 0,
      stagger: 0.4,
      display: 'none'
    });

    t1.from('.loader', {
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      display: 'none'
    });

    t1.to('.loader', {
      opacity: 0,
      stagger: 0.4,
      duration: 0.5,
      display: 'none'
    });

    t1.to('.screen', {
      opacity: 0,
      display: 'none'
    });
  });

  return (
    <>
      <style>
        {`
          @media (max-width: 640px) {
            .bar-loader {
              width: 300px !important;
            }
          }
        `}
      </style>
      <div className='bg-black h-screen w-screen fixed top-0 left-0 text-white z-[200] flex justify-center items-center screen'>
        <div className="loader">
          <BarLoader
            color={'#D70040'}
            width={500}
            height={5}
            className="bar-loader"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>

        <div className="elem flex gap-4">
          <img className="w-20 md:w-24" src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_0a6be931be68dea8372307b2fcd6b053/eway-crm.png" alt="VTube logo" />
          <span className="md:block text-[58px] bg-gradient-to-r from-blue-500 to-red-900 text-transparent bg-clip-text font-rob after:content-['IN'] after:absolute after:top-0 after:h-0 after:text-[11px] after:tracking-normal after:right-[-9%] after:text-zinc-400">
            VTube
          </span>
        </div>
      </div>
    </>
  );
}

export default Animation;
