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
import { queryClient } from "../../services/queryclient";
import { useRouter } from "next/router";

type CreateUserFormData = {
    name: string
}
const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
})

export default function FilesCreate() {
    const router = useRouter()
    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            users: {
                ...user,
                created_at: new Date()
            }
        })

        return response.data.user;
    },{
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    })
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })
    const { errors } = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
       await createUser.mutateAsync(values);

       router.push('/users')
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

                <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6', '8']} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size='lg' fontWeight='normal'>Nova Pasta</Heading>
                    <Divider my='6' borderColor='gray.700'></Divider>
                    <VStack spacing={['6', '8']}>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='name' label='Nome' error={errors.name} {...register('name')} />
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