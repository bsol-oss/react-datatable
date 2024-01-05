import React from 'react'
import { Avatar, Badge, Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import IndeterminateCheckbox from '../globalpartials/InterminateCheckbox';

import ColumnSearch from '../bodycomponents/ColumnSearch';
import DropdownFilter from '../bodycomponents/DropdownFilter';

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
    size: 30,
  },
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
    cell: ({ row }) => (
      <HStack spacing="3">
        <Avatar name={row.original.name} boxSize="10" />
        <Box>
          <Text fontWeight="medium">{row.original.name}</Text>
        </Box>
      </HStack>
    ),
    size: 200,
    Filter: () => ColumnSearch,
  },
  {
    header: 'Status',
    accessorKey: 'is_active',
    id: 'is_active',
    cell: ({ row }) => (
      <Badge
        size="sm"
        colorScheme={row.original.is_active === 1 ? 'green' : 'red'}
      >
        {row.original.is_active === 1 ? 'Active' : 'Inactive'}
      </Badge>
    ),
    size: 200,
    Filter: DropdownFilter,
  },
  {
    header: 'Description',
    accessorKey: 'description',
    id: 'description',
    cell: ({ row }) => (
      <Text color="fg.muted">
        {row.original.description === null ? '' : row.original.description}
      </Text>
    ),
    Filter: () => ColumnSearch,
    size: 200,
  },
  {
    header: 'Hub ID',
    accessorKey: 'hub_id',
    id: 'hub_id',
    cell: ({ row }) => <Text color="fg.muted">{row.original.hub_id}</Text>,
    size: 200,
    Filter: DropdownFilter,
  },
  {
    header: 'BU ID',
    accessorKey: 'bu_id',
    id: 'bu_id',
    cell: ({ row }) => <Text color="fg.muted">{row.original.bu_id}</Text>,
    size: 400,
    Filter: () => ColumnSearch,
  },
  {
    header: '',
    accessorKey: 'actions',
    id: 'actions',
    cell: () => (
      <HStack spacing="1">
        <IconButton
          icon={<FiTrash2 fontSize="1.25rem" />}
          variant="tertiary"
          aria-label="Delete Column"
        />
        <IconButton
          icon={<FiEdit2 fontSize="1.25rem" />}
          variant="tertiary"
          aria-label="Edit Column"
        />
      </HStack>
    ),
    size: 200,
  },
];

export default columns;
