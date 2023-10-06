import { Flex, Image, useColorMode } from '@chakra-ui/react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justify='center' mt='6' mb='12'>
      <Image
        cursor='pointer'
        w='6'
        alt='Threads logo'
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
