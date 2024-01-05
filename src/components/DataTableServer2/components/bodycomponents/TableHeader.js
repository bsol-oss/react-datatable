// @ts-nocheck

import React, { useContext } from 'react';
import { Thead, Flex, Box, Th, Tr, Spinner, Icon } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import { TableStatusContext } from '../globalpartials/GlobalContext';

const TableHeader = ({
  tableInstance, 
  // arrowIcons= [FaSort, FaSortUp, FaSortDown],
  // isColumnResizable = false
}) => {
  const { isLoading } = useContext(TableStatusContext);
  return (
    <Thead>
      {tableInstance
        ? tableInstance
            .getHeaderGroups()
            .map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                    position="relative"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Flex flexDirection="column" gap={4}>
                      <Box>
                        <Flex
                          direction="row"
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: !isLoading
                              ? header.column.getToggleSortingHandler()
                              : undefined,
                          }}
                          _hover={{ cursor: 'pointer' }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.columnDef.id !== 'select' &&
                            header.column.columnDef.id !== 'actions' &&
                            (!isLoading ? (
                              (header.column.getIsSorted()) ? (
                                (header.column.getIsSorted()) ===
                                'asc' ? (
                                  <Icon as={FaSortUp} ml={1} w={3} h={3} />
                                ) : (
                                  <Icon as={FaSortDown} ml={1} w={3} h={3} />
                                )
                              ) : (
                                <Box ml={1} alignItems="center" display="flex">
                                  <Icon as={FaSort} w={3} h={3} />
                                </Box>
                              )
                            ) : (
                              <Box ml={1} alignItems="center" display="flex">
                                <Spinner size="xs" />
                              </Box>
                            ))}
                        </Flex>
                        <Box
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            background: ` ${
                              header.column.getIsResizing()
                                ? 'blue;'
                                : 'rgba(0, 0, 0, 0.5)'
                            }`,
                            opacity: ` ${header.column.getIsResizing() && '1'}`,
                          }}
                          position="absolute"
                          right={0}
                          top={0}
                          height="100%"
                          width="5px"
                          cursor="col-resize"
                          _hover={{ opacity: 1 }}
                          opacity="0"
                        />
                      </Box>
                      {header.column.columnDef.Filter && (
                        <header.column.columnDef.Filter
                          column={header.column}
                          dropOptions={tableInstance.dropOptions}
                        />
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))
        : ''}
    </Thead>
  );
};
export default TableHeader;
