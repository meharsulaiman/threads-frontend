import { Container } from '@chakra-ui/react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useRecoilState } from 'recoil';
import userAtom from './atoms/userAtom';
import LogoutButton from './components/LogoutButton';
import UpdateProfilePage from './pages/UpdateProfilePage';
import CreatePost from './components/CreatePost';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUSer = async () => {
      const res = await fetch(
        `https://vercel.com/meharsuleiman/threads-backend/api/users/currentUserProfile/${user?.username}`
      );
      const data = await res.json();

      if (res.status === 200) {
        setUser(data);
        localStorage.setItem('user-threads', JSON.stringify(data));
      } else if (res.status === 401) {
        setUser(null);
        localStorage.removeItem('user-threads');
        navigate('/auth');
      }
    };

    getCurrentUSer();
  }, [setUser, user?.username, navigate]);

  console.log(user);
  return (
    <Container maxW={'620px'}>
      <Header />
      <Routes>
        <Route
          path='/'
          element={user ? <HomePage /> : <Navigate to='/auth' />}
        />
        <Route
          path='/auth'
          element={!user ? <AuthPage /> : <Navigate to='/' />}
        />
        <Route
          path='/update'
          element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />}
        />

        <Route
          path='/:username'
          element={
            user ? (
              <>
                <UserPage />
                <CreatePost />
              </>
            ) : (
              <UserPage />
            )
          }
        />
        <Route path='/:username/post/:pid' element={<PostPage />} />
      </Routes>

      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
