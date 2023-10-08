import { Flex, Image, Link, useColorMode } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { Link as RouteLink } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  return (
    <Flex justify={user ? 'space-between' : 'center'} mt='6' mb='12'>
      {user && (
        <Link as={RouteLink} to='/'>
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor='pointer'
        w='6'
        alt='Threads logo'
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        onClick={toggleColorMode}
      />

      {user && (
        <Link as={RouteLink} to={`/${user.username}`}>
          <RxAvatar size={24} />
        </Link>
      )}
    </Flex>
  );
};

export default Header;
