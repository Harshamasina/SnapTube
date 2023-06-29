import { auth } from './Config/Firebase';
import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import VideoDetail from './components/VideoDetail';
import ChannelDetail from './components/ChannelDetail';
import SearchFeed from './components/SearchFeed';
import SignIn from './components/SignIn';
import Error from './components/Error';

const App = () => {
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem('login')));

  useEffect(() => {
    const handleLogIn = auth.onAuthStateChanged((user) => {
        if(user){
            localStorage.setItem('login', JSON.stringify(user));
            setLogin(user);
        } else {
            localStorage.removeItem('login');
            setLogin(null);
        }
    });
    return () => handleLogIn();
  }, []);

  return (
    <BrowserRouter>
      { login && <Navbar /> }
      <Box sx={{ backgroundColor: '#18191A' }}>
        <Routes>
          <Route path='/' exact element={login ? <Feed /> : <Navigate to='/signin' />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/video/:id' element={login ? <VideoDetail /> : <Navigate to='/signin' />} />
          <Route path='/channel/:id' element={login ? <ChannelDetail /> : <Navigate to='/signin' />} />
          <Route path='/search/:searchTerm' element={login ? <SearchFeed /> : <Navigate to='/signin' />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App
