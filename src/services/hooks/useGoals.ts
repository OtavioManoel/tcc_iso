import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type Goal = {
    id: string;
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

type GetGoalsResponse = {
    totalCount: number;
    goals: Goal[];
}
export async function getGoals(page: number): Promise<GetGoalsResponse> {
    const { data, headers } = await api.get('goals', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])
    const goals = data.goals.map(goal => {
        return {
            id: goal.id,
            source: goal.source,
            what: goal.what,
            why: goal.why,
            when: new Date(goal.when).toLocaleString('pt-br', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }),
            who: goal.who,
            validation: goal.validation,
            how: goal.how,
            how_much: goal.how_much,
            status: goal.status,
            extended_to: new Date(goal.extended_to).toLocaleString('pt-br', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            })

        }
    })
    return {
        goals,
        totalCount,
    };
}
export function useGoals(page: number) {
    return useQuery(['goals', page], () => getGoals(page), {
        staleTime: 1000 * 5
    })
}