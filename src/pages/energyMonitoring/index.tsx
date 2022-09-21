import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import React, { useState } from "react";
import { Chart } from "react-google-charts";
import * as XLSX from "xlsx";

export const options = {
  curveType: "function",
  legend: { position: "bottom" },
  pageSize: 10,
};

export default function EnergyMonitoring() {
  const [datas, setDatas] = useState<any>([]);
  const [tablesName, setTablesName] = useState([]);
  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (erro) => {
        reject(erro);
      };
    });

    promise.then((data: any) => {
      let label = [];
      let respArr = [];
      data.map((d) => {
        let arr = [];
        label = Object.keys(d);
        label.map((k) => {
          arr.push(d[k]);
        });
        respArr = [...respArr, arr];
      });
      respArr = [label, ...respArr];
      const allData = [...datas, respArr];
      setDatas(allData);
    });
  };
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Tabelas
            </Heading>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="green"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              <label>
                Nova tabela
                <input
                  id="inputTag"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const name = e.target.files[0].name;
                    setTablesName([...tablesName, name]);
                    console.log(e.target.files[0].name);
                    readExcel(file);
                  }}
                />
              </label>
            </Button>
          </Flex>
          <Box color="blackAlpha.900">
            {datas?.map((_, index) => {
              return (
                <Box p="3" bg="white" borderRadius="3" margin="10">
                  <h2>{tablesName[index]}</h2>
                  <Chart
                    chartType="Table"
                    width="100%"
                    height="400px"
                    data={datas[index]}
                    options={options}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
