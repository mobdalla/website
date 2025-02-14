import { Link, Box, Text, Heading, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import { Grid } from "../components/Grid"
import { Experience } from "../components/Experience"
import Cursor from "../components/Cursor"
import { Avatar } from "../components/Avatar"

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>Mustafa Muhagr</title>
      </Head>
      <Cursor />
         <Button onClick={toggleColorMode} position="fixed" top="1rem" right="1rem">
        {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      
      <Box py="115px" px={4} maxWidth={500} mx="auto">
        <Grid fluid templateColumns="repeat(4, 1fr)" mb={10} alignItems="center">
          <GridItem colSpan={1}>
            <Avatar />
          </GridItem>
          <GridItem colSpan={3}>
            <Box>
              <Heading as="h1" size="lg">
                Mustafa Muhagr
              </Heading>
              <Text>Software Developer</Text>
            </Box>
          </GridItem>
        </Grid>
        <Box mb={14}>
          <Heading as="h2" size="md" mb={2}>
            About
          </Heading>
          <Text>
            GM, I'm Musty. I enjoy building dynamic, creative products from start to
            finish. Focused on developing intuitive experiences that constantly grow and
            improve based on user metrics. Always shipping.
          </Text>
        </Box>
        <Box mb={14}>
          <Heading as="h2" size="md" mb={10}>
            Work Experience
          </Heading>

          <Experience
            href="https://intranet.csi.it"
            side="2025 - present"
            title="Backend Developer – Csi Piemonte"
            desc="Robot Automation Process"
            stack="Openrpa • openflow •Kubernetes"
          />
          <Heading as="h2" size="md" mt={14} mb={10}>
            Side Projects
          </Heading>
          <Experience
            //href="https://offline.london"
            image="/offline-favicon.png"
            side="ongoing"
            title="Debba"
            desc=" Currency Exchange "
            stack="JAVA • javascript • Self-hosted"
          />
          <Experience
            image="/tamiko.svg"
            side="Paused"
            title="Tamiko"
            desc="Tamiko are non-fungible friends that live completely on-chain. You can hatch, feed, breed and evolve them."
            stack="Solidity • ERC721 • ERC1155 • Next.js"
          />
          <Experience
            href="https://kineticspectru.ms/"
            image="/kineticspectrum.png"
            side="2022"
            title="Kinetic Spectrums"
            desc="Generative on-chain NFTs. A collection of dynamic, ever changing artworks."
            stack="Solidity • ERC721 • Next.js"
          />

          <Heading as="h2" size="md" mt={14} mb={10}>
            Links
          </Heading>

          <Experience
            side="Github"
            title="@mobdalla"
            href="https://github.com/mobdalla"
            mb={4}
          />
        </Box>
      </Box>
    </>
  )
}
