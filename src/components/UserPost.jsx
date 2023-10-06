import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Actions from './Actions';
import { useState } from 'react';

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={'/mark/post/1'}>
      <Flex gap='3' mb='4' py='5'>
        <Flex flexDirection='column' alignItems='center'>
          <Avatar size='md' name='mark' src='/zuck-avatar.png' />
          <Box w='1px' h='full' bg='gray.light'></Box>
          <Box position='relative' w='full'>
            <Avatar
              size='xs'
              name='john doe'
              position='absolute'
              top='0px'
              left='15px'
              src='https://bit.ly/dan-abramov'
              padding='2px'
            />
            <Avatar
              size='xs'
              name='john doe'
              position='absolute'
              bottom='0px'
              right='-5px'
              src='https://bit.ly/tioluwani-kolawole'
              padding='2px'
            />
            <Avatar
              size='xs'
              name='john doe'
              position='absolute'
              bottom='0px'
              left='4px'
              src='https://bit.ly/ryan-florence'
              padding='2px'
            />
          </Box>
        </Flex>

        <Flex gap='2' flexDirection='column' flex='1'>
          <Flex justifyContent='space-between' w='full'>
            <Flex w='full' alignItems='center'>
              <Text fontSize='sm' fontWeight='bold'>
                markzukerberg
              </Text>
              <Image w='4' h='4' ml='1' src='/verified.png' />
            </Flex>
            <Flex alignItems='center' gap='4'>
              <Text fontSize='sm' color='gray.light'>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize='sm'>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius='6'
              overflow='hidden'
              border='1px solid'
              borderColor='gray.light'
            >
              <Image w='full' src={postImg} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={'center'}>
            <Text color='gray.light' fontSize='sm'>
              {replies} replies
            </Text>
            <Box w='0.5' h='0.5' borderRadius='full' bg='gray.light'></Box>
            <Text color='gray.light' fontSize='sm'>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
