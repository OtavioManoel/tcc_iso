import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, Text, Textarea, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Icon } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "@tanstack/react-query"
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";
import { RiAddLine, RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

type CreateAuditFormData = {
    names: any
    goal: string
    requirements: string
    reference_documents: string
    audit_date: string
    audit_duration: string
    audit_team: string
    comments: string
    non_compliance: string
    date: string
}
const createAuditFormSchema = yup.object().shape({
})

export default function AuditCreate() {
    const [responsible, setResponsible] = useState([''])
    const router = useRouter()
    const createAudit = useMutation(async (audit: CreateAuditFormData) => {
        const response = await api.post('audits', {
            audits: {
                ...audit,
                created_at: new Date()
            }
        })
        return response.data.audit;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['audits']);
        }
    })
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createAuditFormSchema)
    })
    const { errors } = formState

    const handleCreateAudit: SubmitHandler<CreateAuditFormData> = async (values) => {
        console.log('Values:', values)
        await createAudit.mutateAsync(values);
        router.push('/audits')
    }
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

                <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6', '8']} onSubmit={handleSubmit(handleCreateAudit)}>
                    <Heading size='lg' fontWeight='normal'>Criar auditorias</Heading>
                    <Divider my='6' borderColor='gray.700'></Divider>
                    <VStack spacing={['6', '8']}>
                        <Flex justify='flex-start' w='100%' >
                            <Text fontSize='lg'>
                                Responsáveis contactados:
                            </Text>
                        </Flex>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            {responsible.map((res, index) => {
                                return (
                                    <Flex>
                                        <Input name={`name[${index}]`} label='Nome:' {...register(`names[${index}]`)} />
                                        {(responsible.length === (index + 1) && responsible.length !== 1) &&
                                            <Button
                                                as='a'
                                                size='sm'
                                                fontSize='sm'
                                                colorScheme='red'
                                                leftIcon={<Icon as={RiDeleteBin5Line} fontSize='20' />}
                                                marginTop='10'
                                                marginLeft='5'
                                                onClick={() => {
                                                    setResponsible((products) => products.filter((_, i) => i !== index));
                                                }}
                                            >
                                                Remover
                                            </Button>
                                        }
                                    </Flex>
                                )
                            })
                            }
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='green'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                                marginTop='15'
                                onClick={() => { setResponsible([...responsible,'']) }}
                            >
                                ADD Responsável
                            </Button>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            <Text fontSize='lg' paddingBottom='2'>
                                Objetivo da auditoria:
                            </Text>
                            <Textarea placeholder='' bg='gray.900'  {...register('goal')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            <Text fontSize='lg' paddingBottom='2'>
                                Âmbito da auditoria (Requisitos e instalações e auditar):
                            </Text>
                            <Textarea placeholder='' bg='gray.900'  {...register('requirements')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            <Text fontSize='lg' paddingBottom='2'>
                                Documentos de Referência:
                            </Text>
                            <Textarea placeholder='' bg='gray.900' {...register('reference_documents')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input
                                placeholder="Select Date"
                                size="lg"
                                type="date"
                                name="Data da auditoria"
                                label="Data da auditoria"
                                {...register('audit_date')}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            <Text fontSize='lg' paddingBottom='2'>
                                Duração da auditoria:
                            </Text>
                            <NumberInput defaultValue={0} precision={2} step={0.5} w='100%' size='lg' >
                                <NumberInputField  {...register('audit_duration')} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            <Text fontSize='lg' paddingBottom='2' {...register('audit_team')}>
                                Equipe Auditoria:
                            </Text>
                            <Textarea placeholder='' bg='gray.900' />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            <Text fontSize='lg' paddingBottom='2'>
                                Observações e oportunidade de melhoria:
                            </Text>
                            <Textarea placeholder='' bg='gray.900' {...register('comments')}/>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' display='block'>
                            <Text fontSize='lg' paddingBottom='2'>
                                Anexos ao Relátorio: Registro de Não Conformidades:
                            </Text>
                            <Textarea placeholder='' bg='gray.900' {...register('non_compliance ')}/>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input
                                placeholder="Select Date"
                                size="lg"
                                type="date"
                                name="Data"
                                label="Data"
                                {...register('date')}
                            />
                        </SimpleGrid>
                    </VStack>
                    <Flex
                        mt='8'
                        justify='flex-end'
                    >
                        <HStack spacing='4'>
                            <Link href='/audits' passHref>
                                <Button colorScheme='whiteAlpha'>Cancelar</Button>
                            </Link>
                            <Button type='submit' colorScheme='green' isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}