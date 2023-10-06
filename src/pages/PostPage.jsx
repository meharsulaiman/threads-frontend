import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/Actions';
import { useState } from 'react';
import Comment from '../components/Comment';

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w='full' alignItems='center' gap='3'>
          <Avatar src='/zuck-avatar.png' size='md' name='Mark zukerberg' />
          <Flex alignItems='center'>
            <Text fontWeight='bold' fontSize='sm'>
              Mark zukerberg
            </Text>
            <Image src='/verified.png' w='4' h='4' ml='4' />
          </Flex>
        </Flex>

        <Flex gap='4' alignItems='center'>
          <Text fontSize='sm' color='gray.light'>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my='3'>Lets talk about threads.</Text>

      <Box
        borderRadius='6'
        overflow='hidden'
        border='1px solid'
        borderColor='gray.light'
      >
        <Image w='full' src='/post1.png' />
      </Box>

      <Flex gap='3' my='3'>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={'center'}>
        <Text color='gray.light' fontSize='sm'>
          {123} replies
        </Text>
        <Box w='0.5' h='0.5' borderRadius='full' bg='gray.light'></Box>
        <Text color='gray.light' fontSize='sm'>
          {200 + (liked ? 1 : 0)} likes
        </Text>
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

      <Comment
        comment={'This is just amazing.'}
        likes={100}
        createdAt={'1d'}
        username={'johndoe'}
        userAvatar='https://bit.ly/dan-abramov'
      />
      <Comment
        comment={'This is just amazing. I love it!'}
        likes={200}
        createdAt={'1w'}
        username={'elonmusk'}
        userAvatar='https://bit.ly/ryan-florence'
      />
    </>
  );
};

export default PostPage;
