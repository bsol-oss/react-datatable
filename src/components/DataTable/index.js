import React, { useState, useEffect, useRef } from 'react'
import {
    useTable,
    useSortBy,
    useFilters,
    useGlobalFilter,
    useRowSelect,
    useBlockLayout,
    useResizeColumns,
} from 'react-table'
import { withTheme } from '@emotion/react'
import { Search, Range, Slider, Dropdown } from './Filters'
import { Actions, Header, Body } from './defaultWrappers'
import { defaultHeaderTextWrap } from './defaultWrappers/header'
import AutoSizer from 'react-virtualized-auto-sizer'
import { AutoSizeWrapper, Loader, MainWrapper as Main } from './Styles'
import { Checkbox as ChakraCheckbox, useTheme, Center } from '@chakra-ui/react'

const Checkbox = ({ checked, indeterminate, ...props }) => (
    <ChakraCheckbox
        zIndex={99}
        isChecked={checked}
        isIndeterminate={indeterminate}
        {...props}
    />
)

/**
 * Main DataTable Function
 */
const DataTable = ({
    data,
    loading,
    totalCount,
    columns,
    wrapper = {},
    height = 500,
    view: initialView = 'ROW',
    enabledView = ['ROW', 'ROWCONDENSED', 'GRID'],
    showToggleButtons = true,
    showTotalRecords = true,
    showGlobalSearch = true,
    showTableHeader = true,
    selectable = false,
    disableWidth = false, // Mainly for test, 'disableWidth = true' will fix error of AutoSizer not rendering table body
    onSelect = () => {},
    recordTotalComponent = null,
    globalSearchBarComponent = null,
    isHeader = false, // solve design issue when brandHeader is available
    cellMaxWidth,
    cellMinWidth,
    cellHeight,
    arrowIcons = {},
    isColumnResizable = false,
}) => {
    // DataTable view (default): view = 'ROW'
    // Grid view: view = 'GRID'
    // Condensed view: view = 'ROWCONDENSED'

    const [view, setView] = useState(initialView)
    const [error, setError] = useState(null)

    const {
        ActionsWrapper = Actions,
        HeaderWrapper = Header,
        BodyWrapper = Body,
        MainWrapper = Main,
        RowWrapper,
        CellWrapper,
    } = wrapper

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id]

                    return rowValue !== undefined
                        ? String(rowValue)
                              .toLowerCase()
                              .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        //we receive Search component
        () => ({
            Filter: Search,
        }),
        []
    )
    //***
    //This is header filters

    // Memoize columns & data
    const cols = React.useMemo(() => defaultHeaderTextWrap(columns), [])
    const d = React.useMemo(() => data, [data])

    const {
        getTableProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        prepareRow,
        state,
        setGlobalFilter,
        preGlobalFilteredRows,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns: cols,
            data: d,
            defaultColumn,
            filterTypes,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        useBlockLayout,
        useResizeColumns,
        (hooks) => {
            if (selectable) {
                hooks.visibleColumns.push((columns) => [
                    // Adding a column for selection
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => {
                            if (selectable === 'multi')
                                return (
                                    <Center>
                                        <Checkbox
                                            {...getToggleAllRowsSelectedProps()}
                                        />
                                    </Center>
                                )
                            else return ''
                        },
                        disableFilters: true,
                        width: 20,
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        ),
                        CellForGrid: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        ),
                    },

                    ...columns,
                ])
            }
        }
    )

    // Hook to get previous value
    function usePrevious(value) {
        const ref = useRef()
        // Store current value in ref
        useEffect(() => {
            ref.current = value
        }, [value]) // Only re-run if value changes
        // Return previous value (happens before update in useEffect below)
        return ref.current
    }

    const prevSelected = usePrevious(selectedRowIds)

    // Calling onSelect based on selectedRowIds and selectable
    useEffect(() => {
        if (selectable === 'single') {
            const current = Object.keys(selectedRowIds)
            const previous = Object.keys(prevSelected || {})

            if (current.length === 1)
                onSelect(selectedFlatRows.map((row) => row.original))
            // Unselect previous
            if (current.length === 2)
                rows[parseInt(previous[0])].toggleRowSelected()
        }

        if (selectable === 'multi')
            onSelect(selectedFlatRows.map((row) => row.original))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRowIds])

    const commonProps = {
        view,
        totalColumnsWidth,
        columns,
        height,
        selectedRowIds,
        setGlobalFilter,
        getTableProps,
        setView,
        defaultColumn,
        setError,
        cellMaxWidth,
        cellMinWidth,
        cellHeight,
        isColumnResizable,
    }

    return (
        <MainWrapper view={view} className="main-wrapper">
            <ActionsWrapper
                headerGroups={headerGroups}
                showGlobalSearch={showGlobalSearch}
                showToggleButtons={showToggleButtons}
                showTotalRecords={showTotalRecords}
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                enabledView={enabledView}
                totalCount={totalCount}
                //searchedCount={rows.length || null}
                searchedCount={
                    headerGroups &&
                    headerGroups[0].headers &&
                    headerGroups[0].headers
                        .map((header) => header.filterValue !== undefined)
                        .includes(true)
                        ? rows.length
                        : null
                }
                selectedCount={selectedFlatRows.length || null}
                globalSearchBarComponent={globalSearchBarComponent}
                recordTotalComponent={recordTotalComponent}
                {...commonProps}
            />
            {showTableHeader && (
                <HeaderWrapper
                    headerGroups={headerGroups}
                    view={view}
                    arrowIcons={arrowIcons}
                    isColumnResizable={isColumnResizable}
                />
            )}
            {loading && <Loader />}
            {!loading && (
                <AutoSizeWrapper>
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <BodyWrapper
                                headerGroups={headerGroups}
                                rows={rows}
                                width={width}
                                prepareRow={prepareRow}
                                Row={RowWrapper}
                                Cell={CellWrapper}
                                isMainWrap={!!wrapper.MainWrapper}
                                isHeader={isHeader}
                                {...commonProps}
                            />
                        )}
                    </AutoSizer>
                </AutoSizeWrapper>
            )}
            {!!error && <div>{error}</div>}
        </MainWrapper>
    )
}

DataTable.Range = Range
DataTable.Search = Search
DataTable.Slider = Slider
DataTable.Dropdown = Dropdown

export default withTheme(DataTable)
