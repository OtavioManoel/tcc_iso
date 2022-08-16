import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";
import Faker from "./fake";

export default function UsersList() {
    const { data, isLoading, isFetching, error } = useUsers()
    console.log('error ===>', error);

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
                            Acompanhamento
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
                                        <Th px='20'>Fontes</Th>
                                        <Th px='10'>What?</Th>
                                        <Th>Where</Th>
                                        <Th px='10'>When</Th>
                                        <Th>Who</Th>
                                        <Th>Validação</Th>
                                        <Th px='140'>How?</Th>
                                        <Th>How Much</Th>
                                        <Th>Status</Th>
                                        <Th>Prorrogado para</Th>
                                        <Th width='8'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        Faker.map(pgi => {
                                            return (
                                                <Tr>
                                                    <Td px='6'>
                                                        <Checkbox colorScheme='green' />
                                                    </Td>
                                                    <Td>
                                                        {pgi.source}
                                                    </Td>
                                                    <Td>
                                                        {pgi.what}
                                                    </Td>
                                                    <Td>
                                                        {pgi.why}
                                                    </Td>
                                                    <Td>
                                                        {pgi.when}
                                                    </Td>
                                                    <Td>
                                                        {pgi.who}
                                                    </Td>
                                                    <Td>
                                                       {pgi.validation}
                                                    </Td>
                                                    <Td>
                                                        {pgi.how}
                                                    </Td>
                                                    <Td>
                                                        {pgi.how_much}
                                                    </Td>
                                                    <Td>
                                                        {pgi.status}
                                                    </Td>
                                                    <Td>
                                                        {pgi.extended_to}
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
                                totalCountOfRegisters={200}
                                currentPage={5}
                                onPageChange={() => { }}
                            />
                        </>
                    )
                    }
                </Box>
            </Flex>
        </Box>
    )
}