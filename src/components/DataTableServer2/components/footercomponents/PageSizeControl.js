import React, { useContext, useEffect, useState } from 'react';
import { Box, Select } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FilterContext } from '../globalpartials/GlobalContext';

const PageSizeControl = ({ pages }) => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);

  useEffect(() => {
    setFilterTerm({ ...filterTerm, offset: 1, rows: pageSize });
  }, [pageSize]);

  return (
    <Box display="flex" gap="5px" justifyContent="center" alignItems="center">
      <Box>{t('Results per page')}</Box>
      <Select
        focusBorderColor="none"
        width="75px"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {pages.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default PageSizeControl;
