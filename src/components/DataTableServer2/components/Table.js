// @ts-nocheck

import React, { useContext, useEffect, useState } from 'react'
import { Box, Table as TableControl } from '@chakra-ui/react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'

import {
    FilterContext,
    TableStatusContext,
} from './globalpartials/GlobalContext'
import { getFilteredData } from '../Data/Api'

const Table = ({
    columns,
    apiUrl,
    extraSortFilters,
    extraFieldFilters,
    axios,
    LoadingComponent,
    ErrorComponent,
    children,
}) => {
    const { filterTerm, setFilterTerm } = useContext(FilterContext)
    const {
        setTableWidth,
        setTotalCount,
        selectedRows,
        setSelectedRows,
        // isLoading,
        setIsLoading,
        error,
        setError,
    } = useContext(TableStatusContext)

    const saveSeletedRows = (obj) => {
        const newObj = {}
        if (filterTerm.offset !== 0) {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const newKey =
                        parseInt(key) +
                        filterTerm.rows * (filterTerm.offset - 1)
                    newObj[newKey] = obj[key]
                }
            }
            return newObj
        }
        return obj
    }

    const readSelectedRows = (obj) => {
        const newObj = {}
        if (filterTerm.offset !== 0) {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const newKey =
                        parseInt(key) -
                        filterTerm.rows * (filterTerm.offset - 1)
                    newObj[newKey] = obj[key]
                }
            }
            return newObj
        }
        return obj
    }

    const [rowSelection, setRowSelection] = useState(
        readSelectedRows(selectedRows)
    )

    useEffect(() => {
        setSelectedRows(saveSeletedRows(rowSelection))
    }, [rowSelection])

    const columnResizeMode = 'onChange'
    const [sorting, setSorting] = useState([])
    const [data, setData] = useState([])
    const [dropOptions, setDropOptions] = useState([])

    useEffect(() => {
        const fields = []
        const sort = []
        sorting.map((column) => {
            fields.push(column.id)
            sort.push(column.desc ? 'desc' : 'asc')
        })
        setFilterTerm({
            ...filterTerm,
            field: fields.join(','),
            sort: sort.join(','),
        })
    }, [sorting])

    useEffect(() => {
        const fetchSubareas = async () => {
            setIsLoading(true)
            const res = await getFilteredData(
                filterTerm,
                apiUrl,
                extraSortFilters,
                extraFieldFilters,
                axios
            )
            setIsLoading(false)
            if (res && !res.ok) {
                setError(res?.message)
            }
            if (res && res.ok) {
                setTotalCount(res.filterCount)
                setData(res.results)
                setDropOptions(res.dropOptions || [])
            }
        }
        fetchSubareas()
        setRowSelection(readSelectedRows(selectedRows))
    }, [filterTerm])

    const tableInstance = useReactTable({
        data,
        columns: columns || [],
        state: {
            sorting,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableMultiSort: true,
    })

    useEffect(() => {
        const windowWidth = window.innerWidth
        if (tableInstance.getCenterTotalSize() <= windowWidth - 64) {
            setTableWidth(tableInstance.getCenterTotalSize())
        } else {
            setTableWidth(window.innerWidth - 94)
        }
    }, [tableInstance.getCenterTotalSize(), window.innerWidth])

    console.log('LoadingComponent=', LoadingComponent)

    // if (isLoading) {
    //   return LoadingComponent ? <LoadingComponent /> : null;
    // }

    if (error && ErrorComponent) return ErrorComponent

    return (
        <Box marginTop="10px" overflow="auto" className="TableContainer">
            <TableControl
                {...{
                    style: {
                        width: tableInstance.getCenterTotalSize(),
                    },
                }}
                size="md"
                colorScheme="gray"
                variant="striped"
            >
                {Array.isArray(children)
                    ? React.Children.map(children, (child) => {
                          return React.cloneElement(child, {
                              tableInstance: {
                                  ...tableInstance,
                                  dropOptions: dropOptions,
                              },
                          })
                      })
                    : React.cloneElement(children, {
                          tableInstance: {
                              ...tableInstance,
                              dropOptions: dropOptions,
                          },
                      })}
            </TableControl>
        </Box>
    )
}

export default Table
