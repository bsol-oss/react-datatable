import React, { useContext, useState } from 'react';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';

const GlobalSearch = () => {
  const { t } = useTranslation();
  const placeholder = t('Search') || 'Search';
  const [inputValue, setInputValue] = useState('');
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const { isLoading } = useContext(TableStatusContext);

  const handleSearch = () => {
    setFilterTerm({ ...filterTerm, offset: 1, searchTerm: inputValue });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup maxW="xs">
      <InputLeftElement>
        {!isLoading ? (
          <Icon
            as={FiSearch}
            color="fg.muted"
            boxSize="5"
            cursor="pointer"
            onClick={handleSearch}
          />
        ) : (
          <Spinner size="sm" />
        )}
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
    </InputGroup>
  );
};

export default GlobalSearch;
