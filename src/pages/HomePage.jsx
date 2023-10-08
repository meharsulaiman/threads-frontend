import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post';

export default function HomePage() {
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/posts/feed');
        const data = await res.json();

        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }

        setPosts(data);
        console.log(data);
      } catch (error) {
        showToast('Error', 'Could not fetch posts', 'error');
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow someone to see the posts</h1>
      )}

      {loading && (
        <Flex justifyContent='center'>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {posts.length !== 0 &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
}
