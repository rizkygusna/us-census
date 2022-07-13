import { useState, useEffect } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import LineChart from './components/LineChart';

function App() {
  const [source, setSource] = useState({ name: '', desc: '' });
  const [labels, setLabels] = useState([]);
  const [populations, setPopulations] = useState([]);

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
      const newLabels = dataArray.map((item) => item.Year);
      setLabels(newLabels);

      const newPopulations = dataArray.map((item) => item.Population);
      setPopulations(newPopulations);
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
      <Heading marginBottom={4}>
        {source.name === '' ? 'Test' : source.name}
      </Heading>
      <Text marginBottom={4}>{source.desc}</Text>
      {/* <LineChart labels={labels} data={populations}></LineChart> */}
    </Box>
  );
}

export default App;
