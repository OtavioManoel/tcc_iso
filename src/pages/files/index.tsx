import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiFileDownloadLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useFiles } from "../../services/hooks/useFiles";

export default function files() {
  const { data, isLoading, error } = useFiles(1);

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8" overflow="scroll">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Documentos
            </Heading>
            <Link href="/files/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Nova pasta
              </Button>
            </Link>
          </Flex>

          <Accordion allowMultiple>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obeter dados do usuários.</Text>
              </Flex>
            ) : (
              <>
                {data.files.map((file) => {
                  return (
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "green.600", color: "white" }}
                        >
                          <Box flex="1" textAlign="left">
                            {file.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                          {file.docs.map((doc) => {
                            return (
                              <Box w="90" p={4} color="white">
                                <IconButton
                                  aria-label={doc.name}
                                  w="20"
                                  h="20"
                                  colorScheme="green"
                                  variant="outline"
                                  icon={
                                    <Icon
                                      as={RiFileDownloadLine}
                                      fontSize="30"
                                    />
                                  }
                                  onClick={() => {
                                    window.open(
                                      "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf"
                                    );
                                  }}
                                />
                                <Text>{doc.name}</Text>
                              </Box>
                            );
                          })}
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </>
            )}
          </Accordion>
        </Box>
      </Flex>
    </Box>
  );
}
