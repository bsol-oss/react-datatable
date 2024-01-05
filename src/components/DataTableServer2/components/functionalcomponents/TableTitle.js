import React from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const TableTitle = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Text fontSize="lg" fontWeight="medium">
      {t(`${children}`)}
    </Text>
  );
};

export default TableTitle;
