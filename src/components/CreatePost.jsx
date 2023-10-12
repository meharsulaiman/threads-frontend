import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import userAtom from '../atoms/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useShowToast from '../hooks/useShowToast';
import postAtom from '../atoms/postsAtom';

const MAX_POST_LENGTH = 500;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userAtom);
  const [postText, setPostText] = useState('');
  const [remainingText, setRemainingText] = useState(MAX_POST_LENGTH);
  const [loaidng, setLoading] = useState(false);
  const imageRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);

  const handlePostText = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_POST_LENGTH) {
      const truncatedText = inputText.slice(0, MAX_POST_LENGTH);
      setPostText(truncatedText);
      setRemainingText(0);
    } else {
      setPostText(inputText);
      setRemainingText(MAX_POST_LENGTH - postText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://threads-backend-zeta.vercel.appapi/posts/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            postedBy: user._id,
            text: postText,
            img: imgUrl,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        showToast('Error creating post', data.error, 'error');
        return;
      }
      showToast('Post created', 'Your post created successfully', 'success');
      console.log(data);
      setPosts([data.post, ...posts]);
      onClose();
      setImgUrl('');
      setPostText('');
    } catch (error) {
      showToast('Error creating post', error.message, 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        position={'fixed'}
        bottom={10}
        right={10}
        bg={useColorModeValue('gray.300', 'gray.dark')}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                value={postText}
                onChange={handlePostText}
                placeholder='Post content goas here...'
              />

              <Text
                fontSize='xs'
                fontWeight='bold'
                m={1}
                textAlign='right'
                color={'gray.800'}
              >
                {remainingText}/{MAX_POST_LENGTH}
              </Text>

              <Input
                type='file'
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                style={{ marginLeft: '5px', cursor: 'pointer' }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>

            {imgUrl && (
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt='Post selected' />
                <CloseButton
                  onClick={() => setImgUrl('')}
                  position='absolute'
                  top={2}
                  right={2}
                  bg={'gray.300'}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={handleCreatePost}
              isLoading={loaidng}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
