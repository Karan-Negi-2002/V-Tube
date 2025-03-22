import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './comp/screens/Home Screen/Home';
import Body from './comp/Body';  
import LoginScreen from './Loaders/LoginScreen';
import Watch from './comp/screens/Watch Screen/Watch';
import LoadBar from './Loaders/LoadBar';
import Search from './comp/screens/Search Screen/Search';
import './App.css';
import Creator from './comp/screens/Creator Screen/Creator';
import LikedPage from './comp/screens/Liked Screen/LikedPage';
import Animation from './Loaders/Animation'; 


function App() {
  const { accessToken, loading } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false); 
  const [isAuthenticatedChecked, setIsAuthenticatedChecked] = useState(false);
  const [showLoadBar, setShowLoadBar] = useState(false); 

  const handleAuthenticationComplete = () => {
    setShowLoader(true); 
    setTimeout(() => {
      setShowLoader(false); 
      navigate('/'); 
    }, 4000);
  };

  useEffect(() => {
    if (!loading && accessToken) {
      if (!isAuthenticatedChecked) {
        setIsAuthenticatedChecked(true);
        handleAuthenticationComplete(); 
      }
    } else if (!loading && !accessToken) {
      navigate('/auth'); 
    }
  }, [accessToken, loading, navigate, isAuthenticatedChecked]);

  useEffect(() => {
    if (loading) {
      setShowLoadBar(true); 
    } else {
      setShowLoadBar(false); 
    }
    window.scrollTo({ top: 0 });
  }, [location, loading]);

  return (
    <>
      {showLoader && <Animation />} 
      {showLoadBar && <LoadBar />} 
      {!showLoader && !showLoadBar && (
        <div className="dark:bg-black dark:text-white">
          <Routes>
            {/* Unauthenticated Routes */}
            <Route path="/auth" element={<LoginScreen />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="channel/:channelId" element={<Creator />} />

            {/* Authenticated Routes */}
            <Route path="/" element={<Body />}>
              <Route index element={<Home />} />
              <Route path="search/:query" element={<Search />} />
             
            </Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
