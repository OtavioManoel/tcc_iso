import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useAudits } from "../../services/hooks/useAudits";

export default function Audits() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useAudits(page);

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8" overflow="scroll">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Auditoria
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Link href="/audits/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Nova Auditoria
              </Button>
            </Link>
          </Flex>
          <Box flex="1" borderRadius={8} bg="gray.800" p="8" overflow="scroll">
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
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px="6" color="gray.300" width="8">
                        <Checkbox colorScheme="green" />
                      </Th>
                      <Th px="20" alignItems="center">
                        N.º Auditoria
                      </Th>
                      <Th px="50" alignItems="center">
                        Requisitos instalações
                      </Th>
                      <Th alignItems="center">Equipe auditora</Th>
                      <Th px="50" alignItems="center">
                        Acompanhamento
                      </Th>
                      <Th px="10" alignItems="center">
                        Data criação
                      </Th>
                      <Th px="10" alignItems="center">
                        Data atualização
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.audits.map((audit) => {
                      return (
                        <Tr>
                          <Td px="6">
                            <Checkbox colorScheme="green" />
                          </Td>
                          <Td textAlign="center">{audit.id}</Td>
                          <Td textAlign="center">{audit.requirements}</Td>
                          <Td textAlign="center">{audit.audit_team}</Td>
                          <Td textAlign="center">{audit.status}</Td>
                          <Td textAlign="center">{audit.created_at}</Td>
                          <Td textAlign="center">{audit.updated_at}</Td>

                          <Td textAlign="center">
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="blue"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </>
            )}
          </Box>
          <Pagination
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </Flex>
    </Box>
  );
}
