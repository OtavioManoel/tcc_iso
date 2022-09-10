import { Flex, SimpleGrid } from "@chakra-ui/react";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useGoals } from "../../services/hooks/useGoals";

export const optionsExtendedTo = {
    title: "Prorrogado",
};
export const optionsStaus = {
    title: "Status",
};
export default function Dashboard() {
    const [dataStaus, setDataStaus] = useState<any[]>();
    const [dataExtendedTo, setDataExtendedTo] = useState<any[]>();
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useGoals(page);

    useEffect(() => {
        let countProrrogado = 0;
        let countNoPraso = 0;
        let countNoStatus = 0;

        data?.goals.map((goal: any) => {
            if (goal.extended_to != 'Invalid Date' || !goal.extended_to) {
                countProrrogado += 1;
            } else {
                countNoPraso += 1;
            }
        })
        const arrExtendedTo = [
            ["Extended to", ""],
            ["Prorrogado", countProrrogado],
            ["No Praso", countNoPraso],
            ['Sem status', countNoStatus]
        ];

        setDataExtendedTo(arrExtendedTo)
    }, [data])

    useEffect(() => {
        let countPlanejado = 0;
        let countConcluido = 0;
        let countEmAndmento = 0;
        let countNoStatus = 0;

        data?.goals.map((goal: any) => {
            if (goal.status === 'Planejada') {
                countPlanejado += 1;
            } else if (goal.status === 'Concluído') {
                countConcluido += 1;
            } else if (goal.status === 'Em andamento') {
                countEmAndmento += 1;
            } else {
                countNoStatus += 1;
            }
        })

        const arrStaust = [
            ["Staus", ""],
            ['Planejada', countPlanejado],
            ['Concluído', countConcluido],
            ['Andamento', countEmAndmento],
            ['Sem status', countNoStatus],
        ]
        setDataStaus(arrStaust)
    }, [data])



    return (
        <Flex
            direction='column'
            h='100vh'
        >
            <Header />
            <Flex
                w='100%'
                my='6'
                maxWidth={1480}
                mx='auto'
                px='6'
            >
                <Sidebar />
                <SimpleGrid flex='1' gap='4' minChildWidth='320px'>
                    <Chart
                        chartType="PieChart"
                        data={dataExtendedTo}
                        options={optionsExtendedTo}
                        width={"100%"}
                        height={"400px"}
                    />
                    <Chart
                        chartType="PieChart"
                        data={dataStaus}
                        options={optionsStaus}
                        width={"100%"}
                        height={"400px"}
                    />
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}