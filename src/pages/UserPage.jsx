import { useEffect, useState } from 'react';
import UserHeader from '../components/UserHeader';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postAtom from '../atoms/postsAtom';

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(
          `https://threads-backend-zeta.vercel.app//api/posts/user/${username}`
        );
        const data = await res.json();

        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    fetchUserPosts();
  }, [username, showToast, setPosts]);

  console.log(posts);

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User not found</h1>;
  }

  return (
    <>
      <UserHeader user={user} />

      {!fetchingPosts && posts.length === 0 && (
        <Text textAlign={'center'} my={12}>
          User has no post yet.
        </Text>
      )}

      {fetchingPosts && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {posts.length &&
        posts.map((post) => (
          <Post post={post} postedBy={post.postedBy} key={post._id} />
        ))}
    </>
  );
};

export default UserPage;
