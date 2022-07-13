import { useState, useEffect } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

function App() {
  const [source, setSource] = useState({ name: '', desc: '' });

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
      );
      const data = await res.json();
      const newSource = {
        name: data.source[0].annotations.source_name,
        desc: data.source[0].annotations.source_description,
      };
      setSource(newSource);
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
      <Text>{source.desc}</Text>
    </Box>
  );
}

export default App;
