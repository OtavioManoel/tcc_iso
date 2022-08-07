import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from '@tanstack/react-query'
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UsersList() {
    const query = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json()

        return data;
    })

    console.log(query)
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

                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex
                        mb='8'
                        justify='space-between'
                        align='center'
                    >
                        <Heading
                            size='lg'
                            fontWeight='normal'
                        >
                            Usuários
                        </Heading>
                        <Link href='/users/create' passHref>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='green'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                            >
                                Criar novo usuário
                            </Button>
                        </Link>
                    </Flex>
                    <Table
                        colorScheme='whiteAlpha'
                    >
                        <Thead>
                            <Tr>
                                <Th px='6' color='gray.300' width='8'>
                                    <Checkbox colorScheme='green' />
                                </Th>
                                <Th>Usuário</Th>
                                <Th>Data de cadastro</Th>
                                <Th width='8'></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px='6'>
                                    <Checkbox colorScheme='green' />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight='bold'> Otavio Miranda</Text>
                                        <Text fontSize='sm' color='gray.300'> otavio.mpm@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>
                                    04 de Junho, 2022
                                </Td>
                                <Td>
                                    <Button
                                        as='a'
                                        size='sm'
                                        fontSize='sm'
                                        colorScheme='blue'
                                        leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
                                    >
                                        Editar
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}