import { Box, Flex, Image } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [hasMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!hasMounted) return false;

  return (
    <Flex
      position="fixed"
      top={0}
      width="full"
      p={4}
      as="header"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image src="/basketball.png" alt="Bonhomme" />
      {address ? (
        <Flex alignItems="center" height="24px">
          <ConnectButton
            accountStatus="avatar"
            chainStatus="icon"
            showBalance={false}
          />
        </Flex>
      ) : (
        <Box
          onClick={openConnectModal}
          height="24px"
          position="relative"
          as="button"
          role="button"
          textTransform="uppercase"
          px={3}
          color="white"
          borderRadius="lg"
          bg="blue.500"
          fontSize="sm"
          fontWeight="semibold"
          transition="0.1s"
          _hover={{ bg: 'blue.700' }}
        >
          <Box as="span" position="relative" zIndex={10}>
            Connect Wallet
          </Box>
        </Box>
      )}
    </Flex>
  );
};
