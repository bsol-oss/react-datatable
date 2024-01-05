import React, { useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';

import {
  FilterContext,
  TableStatusContext,
} from './globalpartials/GlobalContext';
import Footer from './Footer';

const DataTable = ({ children }) => {
  const [selectedRows, setSelectedRows] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [tableWidth, setTableWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterTerm, setFilterTerm] = useState({
    offset: 1,
    rows: 10,
    field: '',
    sort: '',
    searchTerm: '',
    individualSearchTerm: {},
  });

  useEffect(() => {
    let hasFooter = false;

    React?.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Footer) {
        hasFooter = true;
      }
    });

    if (!hasFooter) {
      setFilterTerm({ ...filterTerm, rows: 0 });
    }
  }, []);

  return (
    <Container
      maxW="100%"
      py={{ base: '4', md: '8' }}
      px={{ base: '0', md: 8 }}
    >
      <Box
        bg="bg.surface"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <FilterContext.Provider value={{ filterTerm, setFilterTerm }}>
          <TableStatusContext.Provider
            value={{
              tableWidth,
              setTableWidth,
              totalCount,
              setTotalCount,
              selectedRows,
              setSelectedRows,
              isLoading,
              setIsLoading,
              error,
              setError
            }}
          >
            {children}
          </TableStatusContext.Provider>
        </FilterContext.Provider>
      </Box>
    </Container>
  );
};

export default DataTable;
