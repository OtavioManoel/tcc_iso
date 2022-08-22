import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}
const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatório').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'Senhas estão diferentes')
})

export default function UserCreate() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })
    const { errors } = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(values)
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
                    <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>
                    <Divider my='6' borderColor='gray.700'></Divider>
                    <VStack spacing={['6', '8']}>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='name' label='Fonte' error={errors.name} {...register('name')} />
                            <Input name='name' label='What?' error={errors.name} {...register('name')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='name' label='Where?' error={errors.name} {...register('name')} />
                            <Input name='name' label='When?' error={errors.name} {...register('name')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='name' label='Who?' error={errors.name} {...register('name')} />
                            <Input name='name' label='Validação' error={errors.name} {...register('name')} />
                            <Input name='name' label='How?' error={errors.name} {...register('name')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='name' label='How Much?' error={errors.name} {...register('name')} />
                            <Input name='name' label='Status' error={errors.name} {...register('name')} />
                            <Input name='name' label='Prorrogado para' error={errors.name} {...register('name')} />
                        </SimpleGrid>
                    </VStack>

                    <Flex
                        mt='8'
                        justify='flex-end'
                    >
                        <HStack spacing='4'>
                            <Link href='/monitoring' passHref>
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