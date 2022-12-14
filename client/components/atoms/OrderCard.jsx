import Link from "next/link";
import {
  Flex,
  Box,
  useColorModeValue,
  Tooltip,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UtilitiesContext } from "../../context/UtilitiesProvider";

function OrderCard({ content }) {
  const { shortenAddress, shortenText } = useContext(UtilitiesContext);

  const [orderName, setOrderName] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  const fetchMetaData = async () => {
    let res = await axios.get(
      `https://${content.ipfsHash}.ipfs.nftstorage.link/metadata.json`
    );
    setOrderName(res.data.name);
    setOrderDescription(res.data.description);
    const [cid, fileName] = res.data.image.slice(7).split("/");
    console.log(cid, fileName);
  };
  useEffect(() => {
    fetchMetaData();
  }, []);
  return (
    <Box
      maxW="full"
      minW="2xl"
      h="fit-content"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position={"relative"}
    >
      <Link href={`/orderScreen/${content.id}`}>
        <IconButton
          aria-label={"Play Button"}
          variant={"ghost"}
          _hover={{ bg: "transparent" }}
          icon={
            <Icon as={FiExternalLink} style={{ color: "gray" }} w={6} h={6} />
          }
          size={"lg"}
          color={"gray"}
          position={"absolute"}
          right={"0"}
          top={"3"}
          transform={"translateX(-50%) translateY(-50%)"}
        />
      </Link>

      <Box p="6">
        <Box mt="1" as="h4" lineHeight="tight">
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {shortenText(orderName, 100)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{orderDescription}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Flex justifyContent="space-between" alignContent="center">
          <Text>{`${content.biddersArray.length} bidders`}</Text>
          <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
            <Box as="span" color={"gray.600"} fontSize="lg">
              $
            </Box>
            {content.budget.value}
          </Box>
        </Flex>
        <Flex justifyContent="space-between" alignContent="center">
          <Tooltip
            label="Seller's Address"
            bg="white"
            placement={"top"}
            color={"gray.800"}
            fontSize={"1.2em"}
          >
            <Button>{shortenAddress(content.address)}</Button>
          </Tooltip>
          <Box
            fontSize="xs"
            color={useColorModeValue("gray.800", "white")}
            pt={5}
          >
            {new Date(content.timestamp).toDateString()}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default OrderCard;
