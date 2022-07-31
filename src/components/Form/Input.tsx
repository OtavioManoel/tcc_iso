import { Input as ChackraInput, FormLabel, FormControl, InputProps as ChackraInputProps } from '@chakra-ui/react';

interface InputProps extends ChackraInputProps {
    name: string;
    label?: string;
}
export function Input({ name, label, ...rest}: InputProps) {
    return (
        <FormControl>
            {!!label && <FormLabel hmtlFor={name}>{label}</FormLabel>}
            <ChackraInput
                id={name}
                name={name}
                bgColor="gray.900"
                variant='filled'
                focusBorderColor='green.600'
                _hover={{
                    bgColor: 'gray.900'
                }}
                size='lg'
                {...rest}
            />
        </FormControl>
    )
}