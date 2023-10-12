import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useShowToast from './useShowToast';

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://threads-backend-zeta.vercel.app//api/users/profile/${username}`
        );
        const data = await res.json();

        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setUser(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username, showToast]);

  return { user, loading };
};

export default useGetUserProfile;
