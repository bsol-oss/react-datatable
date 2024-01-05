import { createContext } from 'react';

export const FilterContext = createContext({
  filterTerm: {
    offset: 1,
    rows: 10,
    field: '',
    sort: '',
    searchTerm: '',
    individualSearchTerm: {},
  },
  setFilterTerm() {
    throw new Error('setFilterTerm function has not been implemented');
  },
});

export const TableStatusContext = createContext({
  tableWidth: 0,
  setTableWidth: () => {
    throw new Error('record function has not been implemented');
  },
  totalCount: 0,
  setTotalCount: () => {
    throw new Error('totalCount function has not been implemented');
  },
  selectedRows: {},
  setSelectedRows() {
    throw new Error('selectedrows function has not been implemented');
  },
  isLoading: false,
  setIsLoading: () => {
    throw new Error('isLoading function has not been implemented');
  },
  error: '',
  setError: () => {
    throw new Error('error function has not been implemented');
  },
});
