import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type User = {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

type GetUsersResponse = {
    totalCount: number;
    users: User[];
}
export async function getUsers(page: number): Promise<GetUsersResponse> {
    const { data, headers } = await api.get('users', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])
    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user. created_at,
        }
    })
    return {
        users,
        totalCount,
    };
}
export function useUsers(page: number) {
    return useQuery(['users', page], () => getUsers(page), {
        staleTime: 1000 * 5
    })
}