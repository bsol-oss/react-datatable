import React, { useContext } from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { TableStatusContext } from './globalpartials/GlobalContext';

const Header = ({ children }) => {
  const { tableWidth } = useContext(TableStatusContext);
  return (
    <Box px={{ base: '4', md: '6' }} pt="5" width={tableWidth}>
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
        {children}
      </Stack>
    </Box>
  );
};

export default Header;
