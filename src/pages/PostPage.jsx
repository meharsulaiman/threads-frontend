import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { DeleteIcon } from '@chakra-ui/icons';
import userAtom from '../atoms/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import postAtom from '../atoms/postsAtom';

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postAtom);
  const [loadingPost, setLoadingPost] = useState(true);
  const showToast = useShowToast();
  const { pid } = useParams();
  const navigate = useNavigate();

  const currentPost = posts?.[0];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(
          `https://threads-backend-zeta.vercel.app//api/posts/${pid}`
        );
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }

        // setPost(data);
        setPosts((prev) => [data, ...prev]);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setLoadingPost(false);
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  if (!user && loading && loadingPost) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) return;

      const res = await fetch(
        `https://threads-backend-zeta.vercel.app//api/posts/${currentPost?._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast('Success', data.message, 'success');
      navigate(`/${user.username}`);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  console.log('post', posts);

  if (!posts) return null;

  return (
    <>
      <Flex>
        <Flex w='full' alignItems='center' gap='3'>
          <Avatar src={user?.profilePic} size='md' name={user?.name} />
          <Flex alignItems='center'>
            <Text fontWeight='bold' fontSize='sm'>
              {user?.username}
            </Text>
            <Image src='/verified.png' w='4' h='4' ml='4' />
          </Flex>
        </Flex>

        <Flex gap='4' alignItems='center'>
          <Text fontSize='sm' color='gray.light' width={36} textAlign={'right'}>
            {currentPost?.createdAt &&
              formatDistanceToNow(new Date(currentPost?.createdAt))}{' '}
            ago
          </Text>
          {currentUser && currentUser?._id === user?._id && (
            <DeleteIcon size={20} onClick={handleDeletePost} />
          )}
        </Flex>
      </Flex>

      <Text my='3'>{currentPost?.text}</Text>

      {currentPost?.img && (
        <Box
          borderRadius='6'
          overflow='hidden'
          border='1px solid'
          borderColor='gray.light'
        >
          <Image w='full' src={currentPost?.img} />
        </Box>
      )}

      <Flex gap='3' my='3'>
        <Actions post={currentPost} postedBy={currentPost?.postedBy} />
      </Flex>

      <Divider my='4' />

      <Flex justifyContent='space-between'>
        <Flex gap='2' alignItems='center'>
          <Text fontSize='2xl'>👋</Text>
          <Text color='gray.light'>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my='4' />

      {currentPost?.replies?.map((reply, index) => (
        <Comment key={index} reply={reply} />
      ))}
    </>
  );
};

export default PostPage;
