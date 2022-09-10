import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type Audits = {
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

type GetAuditsResponse = {
    totalCount: number;
    audits: Audits[];
}
export async function getAudits(page: number): Promise<GetAuditsResponse> {
    const { data, headers } = await api.get('auidts', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])
    const audits = data.audits.map(audit => {
        return {
            id: audit.id,
            names: audit.names,
            goal: audit.goal,
            requirements: audit.requirements,
            reference_documents: audit.reference_documents,
            audit_date: audit.audit_date,
            audit_duration: audit.audit_duration,
            audit_team: audit.audit_team,
            comments: audit.comments,
            non_compliance: audit.non_compliance,
            date: audit.date
        }
    })
    return {
        audits,
        totalCount,
    };
}
export function useAudits(page: number) {
    return useQuery(['audits', page], () => getAudits(page), {
        staleTime: 1000 * 5
    })
}