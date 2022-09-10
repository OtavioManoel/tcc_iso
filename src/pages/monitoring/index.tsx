import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Text, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useGoals } from "../../services/hooks/useGoals";

export default function UsersList() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isFetching, error } = useGoals(page)
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
                        <Link href='/monitoring/create' passHref>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='green'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                            >
                                Criar nova meta
                            </Button>
                        </Link>
                    </Flex>
                    <Box flex='1' borderRadius={8} bg='gray.800' p='8' overflow='scroll'>
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
                                            <Th px='20' alignItems='center'>Fontes</Th>
                                            <Th px='10' alignItems='center'><h2>What?</h2> O que?</Th>
                                            <Th alignItems='center'><h2>Where?</h2>Onde?</Th>
                                            <Th px='10' alignItems='center'><h2>When?</h2>Quando?</Th>
                                            <Th px='10' alignItems='center'><h2>Who?</h2>Quem?</Th>
                                            <Th alignItems='center'>Validação</Th>
                                            <Th px='140' alignItems='center'><h2>How?</h2>Como?</Th>
                                            <Th alignItems='center'><h2>How Much?</h2>Quanto?</Th>
                                            <Th alignItems='center'>Status</Th>
                                            <Th alignItems='center'>Prorrogado para</Th>
                                            <Th width='8' alignItems='center'></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            data.goals.map(goal => {
                                                return (
                                                    <Tr>
                                                        <Td px='6'>
                                                            <Checkbox colorScheme='green' />
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.source}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.what}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.why}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.when}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.who}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.validation}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.how}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.how_much}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.status}
                                                        </Td>
                                                        <Td textAlign='center'>
                                                            {goal.extended_to}
                                                        </Td>

                                                        <Td textAlign='center'>
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
                            </>
                        )
                        }
                    </Box>
                    <Pagination
                        totalCountOfRegisters={data?.totalCount}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                </Box>
            </Flex>
        </Box>
    )
}