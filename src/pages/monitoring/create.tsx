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

type CreateGoalFormData = {
    source: string;
    what: string;
    why: string;
    when: string;
    who: string;
    validation: string;
    how: string;
    how_much: string;
    status: string;
    extended_to: string;
}
const createGoalFormSchema = yup.object().shape({
    source: yup.string().required('campo obrigatório'),
    what: yup.string().required('campo obrigatório'),
    why: yup.string().required('campo obrigatório'),
    when: yup.string().required('campo obrigatório'),
    who: yup.string().required('campo obrigatório'),
    validation: yup.string().required('campo obrigatório'),
    how: yup.string().required('campo obrigatório'),
    how_much: yup.string().required('campo obrigatório'),
    status: yup.string().required('campo obrigatório'),
    extended_to: yup.string().required('campo obrigatório'),
})

export default function GoalCreate() {
    const router = useRouter()
    const createGoal = useMutation(async (goal: CreateGoalFormData) => {
        const response = await api.post('goals', {
            goals: {
                ...goal,
                created_at: new Date()
            }
        })

        return response.data.goal;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['goals']);
        }
    })
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createGoalFormSchema)
    })
    const { errors } = formState

    const handleCreateGoal: SubmitHandler<CreateGoalFormData> = async (values) => {
        await createGoal.mutateAsync(values);

        router.push('/monitoring')
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

                <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6', '8']} onSubmit={handleSubmit(handleCreateGoal)}>
                    <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>
                    <Divider my='6' borderColor='gray.700'></Divider>
                    <VStack spacing={['6', '8']}>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='source' label='source' error={errors.source} {...register('source')} />
                            <Input name='what' label='what' error={errors.what} {...register('what')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='why' label='why' error={errors.why} {...register('why')} />
                            <Input name='when' label='when' error={errors.when} {...register('when')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='who' label='who' error={errors.source} {...register('who')} />
                            <Input name='validation' label='validation' error={errors.validation} {...register('validation')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='how' label='source' error={errors.how} {...register('how')} />
                            <Input name='how_much' label='how_much' error={errors.how_much} {...register('how_much')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input name='status' label='status' label='status' error={errors.status} {...register('status')} />
                            <Input name='extended_to'  label='extended_to' error={errors.extended_to} {...register('extended_to')} />
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