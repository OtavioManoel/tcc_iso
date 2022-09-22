import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiSurveyLine, RiTableAltLine, RiBarChart2Line, RiFileCopyLine, RiAlarmLine, RiPieChart2Line } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing='12' align='flex-start'>
            <NavSection title="GESTÃO DA INFTOMÇÃO">
                <NavLink icon={RiFileCopyLine} href='/files'>Arquivos</NavLink>
            </NavSection>
            <NavSection title="ACOMPANHAMENTO DE ATIVIDADES">
                <NavLink icon={RiBarChart2Line} href='/monitoring' shouldMatchExactHref={true}>Acompanhamento</NavLink>
                <NavLink icon={RiDashboardLine} href='/monitoring/dashboard'>Dashboard</NavLink>
            </NavSection>
            <NavSection title="AUDITORIAS">
                <NavLink icon={RiSurveyLine} href='/audits' shouldMatchExactHref={true}>Auditorias Internas</NavLink>
            </NavSection>
            <NavSection title="ACOMPANHAMENTO ENERGÉTICO">
                <NavLink icon={RiTableAltLine} href='/energyMonitoring' shouldMatchExactHref={true} >Tabelas</NavLink>
                <NavLink icon={RiPieChart2Line} href='/energyMonitoring/dashboard'>Gráficos</NavLink>
            </NavSection>
            <NavSection title="ADM">
                <NavLink icon={RiContactsLine} href='/users'>Usuários</NavLink>
            </NavSection>
        </Stack>
    )
}