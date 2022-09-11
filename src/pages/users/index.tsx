import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";

export default function UsersList() {
    const [page,setPage] = useState(1)
    const { data, isLoading, isFetching, error } = useUsers(page)
    console.log(data)

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
                            {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
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
                    {isLoading ? (
                        <Flex justify='center'>
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify='center'>
                            <Text>Falha ao obeter dados do usuários.</Text>
                        </Flex>
                    ) : (
                        <>
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
                                    {
                                        data.users.map(user => {
                                            return (
                                                <Tr key={user.id}>
                                                    <Td px='6'>
                                                        <Checkbox colorScheme='green' />
                                                    </Td>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight='bold'>{user.name}</Text>
                                                            <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                                                        </Box>
                                                    </Td>
                                                    <Td>
                                                        {user.created_at}
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
                                            )
                                        })
                                    }
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )
                    }
                </Box>
            </Flex>
        </Box>
    )
}