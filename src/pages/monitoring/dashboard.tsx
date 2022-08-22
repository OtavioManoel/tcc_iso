import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import Header from "../../components/Header";
import dynamic from "next/dynamic";
import { Sidebar } from "../../components/Sidebar";
import React from "react";
import { Chart } from "react-google-charts";

export const dataExtendedTo = [
    ["Task", "Hours per Day"],
    ["Prorrogado", 36],
    ["No Praso", 14]
];

export const optionsExtendedTo = {
    title: "Prorrogado",
};

export const dataStaus = [
    ["Task", "Hours per Day"],
    ["Planejada", 10],
    ["Concluído", 23],
    ["Em andamento", 17]
];

export const optionsStaus = {
    title: "Status",
};
export default function Dashboard() {
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
                <SimpleGrid flex='1' gap='4' minChildWidth='320px' align='flex-start'>
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