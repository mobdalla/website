import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  Text,
  Link,
  Image,
} from "@chakra-ui/react"
import PropTypes from "prop-types"
import { useState, useCallback, useEffect } from "react"
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi"
import ABI from "../nft-collection-3x3/abi/bonhommeABI.json"
import cfg from "../config"

const { contractAddress } = cfg

export const MintModal = ({ name, isOpen, onClose }) => {
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const { address } = useAccount()
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: ABI,
    functionName: "mint",
  })
  const { data, write: mint } = useContractWrite(config)
  const { data: hasMinted, isLoading: readMintedLoading } = useContractRead({
    address: contractAddress,
    abi: ABI,
    functionName: "hasAddressMinted",
    args: [address],
  })

  const waitForTx = useCallback(async () => {
    if (!data) return

    setLoading(true)
    await data.wait()
    setLoading(false)
    setSuccess(true)
  }, [data])

  useEffect(() => {
    waitForTx()
  }, [data, waitForTx])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="white"
        textColor="black"
        p={12}
        borderRadius="3xl"
        textAlign="center"
      >
        <Image mx="auto" mb={6} width="96px" src="/bonhomme.gif" alt="Free 3x3 NFT" />
        <Text fontWeight="semibold" mb={2}>
          Thanks, {name}
        </Text>
        <Text color="blackAlpha.700">
          As you've come all this way and even connected your wallet, it's only right to
          give you something in return. You can mint one of my 3x3 generated NFTs for
          free.
        </Text>
        {isSuccess ? (
          <Text my={4}>
            Success!{" "}
            <Link href={`https://rainbow.me/${address}`}>Check your wallet</Link>
          </Text>
        ) : (
          <>
            <Button
              _hover={{ bg: "blackAlpha.900" }}
              bg="black"
              color="white"
              fontWeight="normal"
              textTransform="uppercase"
              fontSize="sm"
              borderRadius="lg"
              py={6}
              mt={4}
              mb={2}
              onClick={mint}
              isLoading={isLoading}
              disabled={readMintedLoading || hasMinted}
            >
              {hasMinted ? "You already minted one" : "Mint for free"}
            </Button>
            {data?.hash ? (
              <Link
                opacity={0.7}
                href={`https://etherscan.io/tx/${data?.hash}`}
                fontSize="12px"
              >
                view transaction
              </Link>
            ) : (
              <Link
                opacity={0.7}
                href={`https://etherscan.io/address/${contractAddress}`}
                fontSize="12px"
              >
                view contract
              </Link>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

MintModal.propTypes = {
  name: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}
