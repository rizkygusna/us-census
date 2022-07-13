import { useState, useEffect } from 'react';
import { Box, Text, Heading, VStack } from '@chakra-ui/react';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import { YearRangePicker } from 'react-year-range-picker';

function App() {
  const [source, setSource] = useState({ name: '', desc: '' });
  const [populationData, setPopulationData] = useState({
    labels: [],
    datasets: [
      {
        label: 'US Population',
        data: [],
        borderColor: '#000',
        backgroundColor: [
          '#F56565',
          '#ED8936',
          '#ECC94B',
          '#48BB78',
          '#38B2AC',
          '#4299E1',
          '#9F7AEA',
        ],
      },
    ],
  });

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
      );
      const resObj = await res.json();
      const newSource = {
        name: resObj.source[0].annotations.source_name,
        desc: resObj.source[0].annotations.source_description,
      };
      setSource(newSource);

      const dataArray = resObj.data;
      dataArray.sort((a, b) => a.Year - b.Year);
      const newLabels = dataArray.map((item) => item.Year);
      const newPopulations = dataArray.map((item) => item.Population);
      setPopulationData({
        labels: newLabels,
        datasets: [
          {
            label: 'US Population',
            data: newPopulations,
          },
        ],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      w={{ base: '100%', md: '80%' }}
      maxW='900px'
      bg='blue.50'
      marginInline='auto'
      paddingX={{ base: 4 }}
      paddingY={{ base: 4 }}
    >
      <Heading marginBottom={4} color='blue.500'>
        {source.name === '' ? 'Test' : source.name}
      </Heading>
      <Text marginBottom={4}>{source.desc}</Text>
      <YearRangePicker
        minYear={2013}
        maxYear={2019}
        spacer='-'
      ></YearRangePicker>
      <VStack spacing={16}>
        <LineChart chartData={populationData} />
        <PieChart chartData={populationData} />
      </VStack>
    </Box>
  );
}

export default App;
