import React, { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import { TableStatusContext } from './globalpartials/GlobalContext';

const Footer = ({ children }) => {
  const { tableWidth } = useContext(TableStatusContext);
  return (
    <Box
      px={{ base: '4', md: '6' }}
      pb="5"
      w={{ base: '100%', sm: '100%', md: '100%', lg: tableWidth }}
    >
      {children}
    </Box>
  );
};

export default Footer;
