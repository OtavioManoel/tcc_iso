import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "@tanstack/react-query"
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { queryClient } from "../../services/queryClient";

type CreateFileFormData = {
    name: string
}
const createFileFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
})

export default function FileCreate() {
    const router = useRouter()
    const createFile = useMutation(async (file: CreateFileFormData) => {
        const response = await api.post('files', {
            files: {
                ...file,
                docs: []
            }
        })

        return response.data.file;
    },{
        onSuccess: () => {
            queryClient.invalidateQueries(['files']);
        }
    })
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createFileFormSchema)
    })
    const { errors } = formState

    const handleCreateFile: SubmitHandler<CreateFileFormData> = async (values) => {
       await createFile.mutateAsync(values);

       router.push('/files')
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

                <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6', '8']} onSubmit={handleSubmit(handleCreateFile)}>
                    <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>
                    <Divider my='6' borderColor='gray.700'></Divider>
                    <VStack spacing={['6', '8']}>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='name' label='Nome completo' error={errors.name} {...register('name')} />
                        </SimpleGrid>
                    </VStack>

                    <Flex
                        mt='8'
                        justify='flex-end'
                    >
                        <HStack spacing='4'>
                            <Link href='/files' passHref>
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