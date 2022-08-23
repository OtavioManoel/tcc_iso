import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type File = {
    id: string;
    name: string;
    docs: any[]
}

type GetFilesResponse = {
    totalCount: number;
    files: File[];
}
export async function getFiles(page: number): Promise<GetFilesResponse> {
    const { data, headers } = await api.get('files', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])
    const files = data.files.map(file => {
        return {
            id: file.id,
            name: file.name,
            docs: file.docs
        }
    })
    return {
        files,
        totalCount,
    };
}
export function useFiles(page: number) {
    return useQuery(['files', page], () => getFiles(page), {
        staleTime: 1000 * 5
    })
}