import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form'
import { Input as ChackraInput, FormLabel, FormControl, InputProps as ChackraInputProps, FormErrorMessage } from '@chakra-ui/react';

interface InputProps extends ChackraInputProps {
    name: string;
    label?: string;
    error?: any;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
    = ({ name, label, error = null, ...rest }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
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
                    ref={ref}
                    {...rest}
                />
                {!!error && (
                    <FormErrorMessage>
                        {error.message}
                    </FormErrorMessage>
                )}
            </FormControl>
        )
    }

export const Input = forwardRef(InputBase)