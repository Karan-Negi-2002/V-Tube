import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/authaction';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = () => {
      dispatch(login());
   };

   const accessToken = useSelector(state => state.auth.accessToken);

   useEffect(() => {
      if (accessToken) {
         navigate('/');
      }
   }, [accessToken, navigate]);

   return (
      <div className="h-screen w-screen grid place-items-center bg-gray-900  ">
         <div className="bg-black p-20  mx-4 rounded-lg flex flex-col items-center text-white ">
         <span className="text-[40px] bg-gradient-to-r from-blue-500 to-red-900 text-transparent bg-clip-text font-rob  ">
              VTube
            </span>
            <img className="w-32 h-32 object-contain mb-4" src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_0a6be931be68dea8372307b2fcd6b053/eway-crm.png" alt="VTube logo" />
            <button
               onClick={handleLogin}
               className="bg-red-600 dark:bg-red-600 py-2 px-3 text-white ys:py-2 ys:px-4 rounded mb-4 focus:outline-none"
            >
               Login With Vtube
            </button>
            
         </div>
      </div>
   );
};

export default LoginScreen;
