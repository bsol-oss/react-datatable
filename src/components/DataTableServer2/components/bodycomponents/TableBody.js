import React, { useContext } from 'react'
import { Tbody, Box, Td, Tr, Spinner } from '@chakra-ui/react'
import { flexRender } from '@tanstack/react-table'

import { TableStatusContext } from '../globalpartials/GlobalContext'

const TableBody = ({ tableInstance, height = '400px' }) => {
    const { isLoading } = useContext(TableStatusContext)
    return (
        <Tbody height={height}>
            {tableInstance ? (
                isLoading ? (
                    <Tr>
                        <Td
                            colSpan={
                                tableInstance.getHeaderGroups()[0].headers
                                    .length
                            }
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Spinner size="xl" color="gray.500" />
                            </Box>
                        </Td>
                    </Tr>
                ) : (
                    tableInstance.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td
                                        key={cell.id}
                                        {...{
                                            style: {
                                                width: cell.column.getSize(),
                                            },
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        )
                    })
                )
            ) : (
                ''
            )}
        </Tbody>
    )
}

export default TableBody
