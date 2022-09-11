import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type Audit = {
  id: string;
  names: any;
  goal: string;
  requirements: string;
  reference_documents: string;
  audit_date: string;
  audit_duration: string;
  audit_team: string;
  comments: string;
  non_compliance: string;
  created_at: string;
  updated_at: string;
  status: string;
};

type GetAuditsResponse = {
  totalCount: number;
  audits: Audit[];
};
export async function getAudits(page: number): Promise<GetAuditsResponse> {
  const { data, headers } = await api.get("audits", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);
  const audits = data.audits.map((audit) => {
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
      created_at: audit.created_at,
      updated_at: audit.updated_at,
      status: audit.status,
    };
  });
  return {
    audits,
    totalCount,
  };
}
export function useAudits(page: number) {
  return useQuery(["audits", page], () => getAudits(page), {
    staleTime: 1000 * 5,
  });
}
