import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
    children: ReactElement
    shouldMatchExactHref?: boolean

}
export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: ActiveLinkProps) {
    const { asPath } = useRouter()
    let inActive = false;

    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        inActive = true
    }

    if (!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
        inActive = true
    }

    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: inActive ? 'green.600' : 'gray.50'
            })}
        </Link>
    )
}