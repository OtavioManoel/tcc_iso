import { Box, Button, Flex, Heading, Icon, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function files() {

    return (
        <Box>
            <Header />
            <Flex
                w='100%'
                my='6'
                maxWidth={1480}
                mx='auto'
                px='6'
            >
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p='8' overflow='scroll'>
                    <Flex
                        mb='8'
                        justify='space-between'
                        align='center'
                    >
                        <Heading
                            size='lg'
                            fontWeight='normal'
                        >
                            Documentos
                        </Heading>
                        <Link href='/files/create' passHref>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='green'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                            >
                                Nova pasta
                            </Button>
                        </Link>
                    </Flex>

                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'green.600', color: 'white' }} >
                                    <Box flex='1' textAlign='left'>
                                        Política Energética
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'green.600', color: 'white' }} >
                                    <Box flex='1' textAlign='left'>
                                        Contas de Luz
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Flex>
        </Box>
    )
}