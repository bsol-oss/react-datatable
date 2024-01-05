import React, { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { TableStatusContext } from '../globalpartials/GlobalContext';

const SelectedNumber = () => {
  const { t } = useTranslation();
  const { totalCount, selectedRows } = useContext(TableStatusContext);

  return (
    <Text color="fg.muted" fontSize="sm" ml="5">
      {Object.keys(selectedRows).length} {t('of')} {totalCount}{' '}
      {t('Total Rows Selected')}
    </Text>
  );
};

export default SelectedNumber;
